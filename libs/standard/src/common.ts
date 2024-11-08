/** Check if the provided value is null or undefined. */
export function isNil(value: unknown): value is null | undefined {
	return value == null;
}

export function notNil<T>(value: T | null | undefined): value is T {
	return !isNil(value);
}
