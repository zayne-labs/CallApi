import type {
	ApiErrorVariant,
	BaseCallApiConfig,
	BaseExtraOptions,
	CallApiConfig,
	ExtraOptions,
	PossibleErrorNames,
	RequestOptions,
	ResultModeMap,
} from "../types";
import type { AnyFunction, Awaitable } from "./type-helpers";
import { isArray, isObject } from "./typeof";

// prettier-ignore
export const generateRequestKey = (url: string, config: Record<string, unknown>) => `${url} ${ampersand} ${JSON.stringify(config)}`;

type ToQueryStringFn = {
	(params: ExtraOptions["query"]): string | null;
	(params: Required<ExtraOptions>["query"]): string;
};

export const toQueryString: ToQueryStringFn = (params) => {
	if (!params) {
		console.error("toQueryString:", "No query params provided!");

		return null as never;
	}

	return new URLSearchParams(params as Record<string, string>).toString();
};

const slash = "/";
const column = ":";
const mergeUrlWithParams = (url: string, params: ExtraOptions["params"]) => {
	if (!params) {
		return url;
	}

	let newUrl = url;

	if (isArray(params)) {
		const matchedParamArray = newUrl
			.split(slash)
			.filter((matchedParam) => matchedParam.startsWith(column));

		for (const [index, matchedParam] of matchedParamArray.entries()) {
			const param = params[index] as string;
			newUrl = newUrl.replace(matchedParam, param);
		}

		return newUrl;
	}

	for (const [key, value] of Object.entries(params)) {
		newUrl = newUrl.replace(`:${key}`, String(value));
	}

	return newUrl;
};

const questionMark = "?";
const ampersand = "&";

const mergeUrlWithQuery = (url: string, query: ExtraOptions["query"]): string => {
	if (!query) {
		return url;
	}

	const queryString = toQueryString(query);

	if (queryString?.length === 0) {
		return url;
	}

	if (url.endsWith(questionMark)) {
		return `${url}${queryString}`;
	}

	if (url.includes(questionMark)) {
		return `${url}${ampersand}${queryString}`;
	}

	return `${url}${questionMark}${queryString}`;
};

export const mergeUrlWithParamsAndQuery = (
	url: string,
	params: ExtraOptions["params"],
	query: ExtraOptions["query"]
) => {
	const urlWithMergedParams = mergeUrlWithParams(url, params);

	return mergeUrlWithQuery(urlWithMergedParams, query);
};

export const objectifyHeaders = (headers: RequestInit["headers"]): Record<string, string> | undefined => {
	if (!headers || isObject(headers)) {
		return headers;
	}

	return Object.fromEntries(isArray(headers) ? headers : headers.entries());
};

const retryCodesLookup = {
	408: "Request Timeout",
	409: "Conflict",
	425: "Too Early",
	429: "Too Many Requests",
	500: "Internal Server Error",
	502: "Bad Gateway",
	503: "Service Unavailable",
	504: "Gateway Timeout",
};

export const defaultRetryCodes: Required<BaseCallApiConfig>["retryCodes"] =
	Object.keys(retryCodesLookup).map(Number);

export const defaultRetryMethods: Required<BaseCallApiConfig>["retryMethods"] = ["GET"];

export const fetchSpecificKeys = [
	"body",
	"integrity",
	"method",
	"headers",
	"signal",
	"cache",
	"redirect",
	"window",
	"credentials",
	"keepalive",
	"referrer",
	"priority",
	"mode",
	"referrerPolicy",
] satisfies Array<keyof CallApiConfig>;

export const omitKeys = <
	TObject extends Record<string, unknown>,
	const TOmitArray extends Array<keyof TObject>,
>(
	initialObject: TObject,
	keysToOmit: TOmitArray
) => {
	const arrayFromFilteredObject = Object.entries(initialObject).filter(
		([key]) => !keysToOmit.includes(key)
	);

	const updatedObject = Object.fromEntries(arrayFromFilteredObject);

	return updatedObject as Omit<TObject, keyof TOmitArray>;
};

const pickKeys = <TObject extends Record<string, unknown>, const TPickArray extends Array<keyof TObject>>(
	initialObject: TObject,
	keysToPick: TPickArray
) => {
	const keysToPickSet = new Set(keysToPick);

	const arrayFromInitObject = Object.entries(initialObject);

	const filteredArray = arrayFromInitObject.filter(([objectKey]) => keysToPickSet.has(objectKey));

	const updatedObject = Object.fromEntries(filteredArray);

	return updatedObject as Pick<TObject, TPickArray[number]>;
};

// eslint-disable-next-line ts-eslint/no-explicit-any
export const splitBaseConfig = (baseConfig: Record<string, any>) =>
	[
		pickKeys(baseConfig, fetchSpecificKeys) as RequestOptions,
		omitKeys(baseConfig, [...fetchSpecificKeys, "requestKey"] satisfies Array<
			keyof CallApiConfig
		>) as BaseExtraOptions,
	] as const;

// eslint-disable-next-line ts-eslint/no-explicit-any
export const splitConfig = (config: Record<string, any>) =>
	[
		pickKeys(config, fetchSpecificKeys) as RequestOptions,
		omitKeys(config, fetchSpecificKeys) as ExtraOptions,
	] as const;

export const handleInterceptorsMerge = <
	TBaseInterceptor extends AnyFunction<Awaitable<void>> | Array<AnyFunction<Awaitable<void>>>,
	TInterceptor extends AnyFunction<Awaitable<void>>,
>(
	baseInterceptor: TBaseInterceptor | undefined,
	interceptor: TInterceptor | undefined,
	shouldMergeInterceptors: ExtraOptions["shouldMergeInterceptors"],
	mergedInterceptorsExecutionMode: ExtraOptions["mergedInterceptorsExecutionMode"]
) => {
	if (isArray(baseInterceptor) && shouldMergeInterceptors) {
		const mergedInterceptor = async (ctx: Record<string, unknown>) => {
			if (!interceptor) return;

			const interceptorArray = [...baseInterceptor, interceptor] as Array<AnyFunction<Awaitable<void>>>;

			const uniqueInterceptorArray = [...new Set(interceptorArray)];

			if (mergedInterceptorsExecutionMode === "sequential") {
				for (const uniqueInterceptor of uniqueInterceptorArray) {
					// eslint-disable-next-line no-await-in-loop
					await uniqueInterceptor(ctx);
				}
			}

			if (mergedInterceptorsExecutionMode === "parallel") {
				await Promise.all(uniqueInterceptorArray.map((uniqueInterceptor) => uniqueInterceptor(ctx)));
			}
		};

		return mergedInterceptor;
	}

	return interceptor ?? (baseInterceptor as typeof interceptor);
};

export const handleResponseType = <TResponse>(
	response: Response,
	parser?: Required<ExtraOptions>["responseParser"]
) => ({
	arrayBuffer: () => response.arrayBuffer() as Promise<TResponse>,
	blob: () => response.blob() as Promise<TResponse>,
	formData: () => response.formData() as Promise<TResponse>,
	json: async () => {
		if (parser) {
			return parser(await response.text());
		}

		return response.json() as Promise<TResponse>;
	},
	text: () => response.text() as Promise<TResponse>,
});

export const getResponseData = <TResponse>(
	response: Response,
	responseType: keyof ReturnType<typeof handleResponseType>,
	parser: ExtraOptions["responseParser"]
) => {
	const RESPONSE_TYPE_LOOKUP = handleResponseType<TResponse>(response, parser);

	if (!Object.hasOwn(RESPONSE_TYPE_LOOKUP, responseType)) {
		throw new Error(`Invalid response type: ${responseType}`);
	}

	return RESPONSE_TYPE_LOOKUP[responseType]();
};

type SuccessInfo = {
	response: Response;
	resultMode: ExtraOptions["resultMode"];
	successData: unknown;
};

// == The CallApiResult type is used to cast all return statements due to a design limitation in ts.
// LINK - See https://www.zhenghao.io/posts/type-functions for more info
export const resolveSuccessResult = <CallApiResult>(info: SuccessInfo): CallApiResult => {
	const { response, resultMode, successData } = info;

	const apiDetails = {
		data: successData,
		error: null,
		response,
	};

	if (!resultMode) {
		return apiDetails as CallApiResult;
	}

	return {
		all: apiDetails,
		onlyError: apiDetails.error,
		onlyResponse: apiDetails.response,
		onlySuccess: apiDetails.data,
	}[resultMode] as CallApiResult;
};

type ErrorInfo = {
	defaultErrorMessage: Required<ExtraOptions>["defaultErrorMessage"];
	error?: unknown;
	message?: string;
	resultMode: ExtraOptions["resultMode"];
};

export const resolveErrorResult = <CallApiResult>(info: ErrorInfo) => {
	const { defaultErrorMessage, error, message: customErrorMessage, resultMode } = info;

	let apiDetails!: ResultModeMap["all"];

	if (isHTTPErrorInstance(error)) {
		const { errorData, message = defaultErrorMessage, name, response } = error;

		apiDetails = {
			data: null,
			error: { errorData, message, name },
			response,
		};
	}

	if (error) {
		const { message, name } = error as Error;

		apiDetails = {
			data: null,
			error: {
				errorData: error as Error,
				message: customErrorMessage ?? message,
				name: name as PossibleErrorNames,
			},
			response: null,
		};
	}

	const generalErrorResult = ({
		all: apiDetails,
		onlyError: apiDetails.error,
		onlyResponse: apiDetails.response,
		onlySuccess: apiDetails.data,
	}[resultMode ?? "all"] ?? apiDetails) as CallApiResult;

	// prettier-ignore
	const resolveCustomErrorInfo = ({ message }: Pick<ErrorInfo, "message">) => {
		const errorResult = resolveErrorResult<CallApiResult>({ ...info, message });

		return errorResult.generalErrorResult;
	};

	return { generalErrorResult, resolveCustomErrorInfo };
};

export const isHTTPError = <TErrorData>(error: ApiErrorVariant<TErrorData>["error"] | null) => {
	return isObject(error) && error.name === "HTTPError";
};

type ErrorDetails<TErrorResponse> = {
	defaultErrorMessage: string;
	errorData: TErrorResponse;
	response: Response;
};

type ErrorOptions = {
	cause?: unknown;
};

export class HTTPError<TErrorResponse = Record<string, unknown>> extends Error {
	errorData: ErrorDetails<TErrorResponse>["errorData"];
	isHTTPError = true;

	override name = "HTTPError" as const;

	response: ErrorDetails<TErrorResponse>["response"];

	constructor(errorDetails: ErrorDetails<TErrorResponse>, errorOptions?: ErrorOptions) {
		const { defaultErrorMessage, errorData, response } = errorDetails;

		super((errorData as { message?: string }).message ?? defaultErrorMessage, errorOptions);

		this.errorData = errorData;
		this.response = response;

		Error.captureStackTrace(this, this.constructor);
	}
}

export const isHTTPErrorInstance = <TErrorResponse>(
	error: unknown
): error is HTTPError<TErrorResponse> => {
	return (
		// prettier-ignore
		error instanceof HTTPError || (isObject(error) && error.name === "HTTPError" && error.isHTTPError === true)
	);
};

export const waitUntil = (delay: number) => {
	if (delay === 0) return;

	const { promise, resolve } = Promise.withResolvers();

	setTimeout(resolve, delay);

	return promise;
};
