import type {
	$RequestOptions,
	BaseConfig,
	ExtraOptions,
	FetchConfig,
	GetCallApiResult,
	ResultModeUnion,
} from "./types";
import { isObject, isQueryString, isString } from "./utils/typeof";
import {
	HTTPError,
	defaultRetryCodes,
	defaultRetryMethods,
	getRequestKey,
	getResolveErrorResultFn,
	getResponseData,
	isHTTPErrorInstance,
	mergeUrlWithParamsAndQuery,
	objectifyHeaders,
	omitKeys,
	resolveSuccessResult,
	splitConfig,
	waitUntil,
} from "./utils/utils";

export const createFetchClient = <
	TBaseData,
	TBaseErrorData = unknown,
	TBaseResultMode extends ResultModeUnion = undefined,
>(
	baseConfig?: BaseConfig<TBaseData, TBaseErrorData, TBaseResultMode>
) => {
	const abortControllerStore = new Map<string, AbortController>();

	const [baseFetchConfig, baseExtraOptions] = splitConfig(baseConfig ?? {});

	const {
		body: baseBody,
		headers: baseHeaders,
		signal: baseSignal,
		...restOfBaseFetchConfig
	} = baseFetchConfig;

	/* eslint-disable complexity */
	const callApi = async <
		TData = TBaseData,
		TErrorData = TBaseErrorData,
		TResultMode extends ResultModeUnion = TBaseResultMode,
	>(
		url: string,
		config?: FetchConfig<TData, TErrorData, TResultMode>
	): Promise<GetCallApiResult<TData, TErrorData, TResultMode>> => {
		type CallApiResult = GetCallApiResult<TData, TErrorData, TResultMode>;

		const [fetchConfig, extraOptions] = splitConfig(config ?? {});

		const { body = baseBody, headers, signal = baseSignal, ...restOfFetchConfig } = fetchConfig;

		// == Default Extra Options
		const options = {
			baseURL: "",
			bodySerializer: JSON.stringify,
			dedupeStrategy: "cancel",
			defaultErrorMessage: "Failed to fetch data from server!",
			responseType: "json",
			retries: 0,
			retryCodes: defaultRetryCodes,
			retryDelay: 0,
			retryMethods: defaultRetryMethods,
			...baseExtraOptions,
			...extraOptions,
		} satisfies ExtraOptions;

		// == Default Fetch Config
		const defaultFetchOptions = {
			method: "GET",

			// eslint-disable-next-line perfectionist/sort-objects
			body: isObject(body) ? options.bodySerializer(body) : body,

			// == Return undefined if the following conditions are not met (so that native fetch would auto set the correct headers):
			// - headers are provided
			// - The body is an object
			// - The auth option is provided
			headers:
				baseHeaders || headers || options.auth || isObject(body)
					? {
							...(isObject(body) && {
								Accept: "application/json",
								"Content-Type": "application/json",
							}),
							...(isQueryString(body) && {
								"Content-Type": "application/x-www-form-urlencoded",
							}),
							...((isString(options.auth) || options.auth == null) && {
								Authorization: `Bearer ${options.auth}`,
							}),
							...(isObject(options.auth) && {
								Authorization:
									"bearer" in options.auth
										? `Bearer ${options.auth.bearer}`
										: `Token ${options.auth.token}`,
							}),
							...objectifyHeaders(baseHeaders),
							...objectifyHeaders(headers),
						}
					: undefined,

			...restOfBaseFetchConfig,
			...restOfFetchConfig,
		} satisfies $RequestOptions;

		const requestKey = getRequestKey(
			url,
			omitKeys({ ...defaultFetchOptions, ...options }, [
				"onRequest",
				"onResponse",
				"onResponseError",
				"onError",
				"onRequestError",
			])
		);

		const prevFetchController = abortControllerStore.get(requestKey);

		if (
			prevFetchController &&
			// eslint-disable-next-line @typescript-eslint/no-deprecated
			(options.dedupeStrategy === "cancel" || options.cancelRedundantRequests)
		) {
			const reason = new DOMException(
				`Request aborted as another request to this same endpoint: ${url}, with the same request options was initiated.`,
				"AbortError"
			);

			prevFetchController.abort(reason);
		}

		const newFetchController = new AbortController();

		abortControllerStore.set(requestKey, newFetchController);

		const timeoutSignal = options.timeout ? AbortSignal.timeout(options.timeout) : null;

		const combinedSignal = AbortSignal.any([
			newFetchController.signal,
			...(timeoutSignal ? [timeoutSignal] : []),
			...(signal ? [signal] : []),
		]);

		const requestInit = {
			signal: combinedSignal,
			...defaultFetchOptions,
		} satisfies $RequestOptions;

		try {
			await options.onRequest?.({ options, request: requestInit });

			const response = await fetch(
				`${options.baseURL}${mergeUrlWithParamsAndQuery(url, options.params, options.query)}`,
				requestInit
			);

			const shouldRetry =
				!response.ok &&
				!combinedSignal.aborted &&
				options.retries > 0 &&
				options.retryCodes.includes(response.status) &&
				options.retryMethods.includes(requestInit.method);

			if (shouldRetry) {
				await waitUntil(options.retryDelay);

				return await callApi(url, { ...config, retries: options.retries - 1 });
			}

			if (!response.ok) {
				const errorData = await getResponseData<TErrorData>(
					options.cloneResponse ? response.clone() : response,
					options.responseType,
					options.responseParser
				);

				// == Pushing all error handling responsibilities to the catch block
				throw new HTTPError({
					defaultErrorMessage: options.defaultErrorMessage,
					errorData,
					response,
				});
			}

			const successData = await getResponseData<TData>(
				options.cloneResponse ? response.clone() : response,
				options.responseType,
				options.responseParser
			);

			const validSuccessData = options.responseValidator
				? options.responseValidator(successData)
				: successData;

			await options.onResponse?.({
				data: validSuccessData,
				options,
				request: requestInit,
				response: options.cloneResponse ? response.clone() : response,
			});

			return resolveSuccessResult<CallApiResult>({ options, response, successData: validSuccessData });

			// == Exhaustive Error handling
		} catch (error) {
			const resolveErrorResult = getResolveErrorResultFn<CallApiResult>({ error, options });

			if (error instanceof DOMException && error.name === "TimeoutError") {
				const message = `Request timed out after ${options.timeout}ms`;

				console.error(`${error.name}:`, message);

				return resolveErrorResult({ message });
			}

			if (error instanceof DOMException && error.name === "AbortError") {
				const { message, name } = error;

				console.error(`${name}:`, message);

				return resolveErrorResult({ message });
			}

			if (isHTTPErrorInstance<TErrorData>(error)) {
				const { errorData, response } = error;

				void (await Promise.all([
					options.onResponseError?.({
						errorData,
						options,
						request: requestInit,
						response: options.cloneResponse ? response.clone() : response,
					}),

					// == Also call the onError interceptor
					options.onError?.({
						error,
						options,
						request: requestInit,
						response,
					}),
				]));

				return resolveErrorResult(error);
			}

			const errorResult = resolveErrorResult();

			void (await Promise.all([
				// == At this point only the request errors exist, so the request error interceptor is called
				options.onRequestError?.({ error: error as Error, options, request: requestInit }),

				// == Also call the onError interceptor
				options.onError?.({
					error: (errorResult as { error: never }).error,
					options,
					request: requestInit,
					response: null,
				}),
			]));

			return errorResult;

			// == Removing the now unneeded AbortController from store
		} finally {
			abortControllerStore.delete(requestKey);
		}
	};

	callApi.create = createFetchClient;

	return callApi;
};

export const callApi = createFetchClient();
