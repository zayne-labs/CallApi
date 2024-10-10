import type { AnyFunction } from "./type-helpers";

export const isArray = <TArrayItem>(value: unknown): value is TArrayItem[] => Array.isArray(value);

export const isObject = <TObject extends Record<string, unknown>>(value: unknown): value is TObject => {
	return typeof value === "object" && value !== null && !(value instanceof FormData) && !isArray(value);
};

export const isFunction = <TFunction extends AnyFunction>(value: unknown): value is TFunction =>
	typeof value === "function";

export const isQueryString = (value: unknown): value is string => isString(value) && value.includes("=");

export const isString = (value: unknown) => typeof value === "string";
