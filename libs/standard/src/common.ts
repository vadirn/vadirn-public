/** Check if the provided value is null or undefined. */
export function isNil(value: unknown): value is null | undefined {
	return value == null;
}

export function notNil<T>(value: T | null | undefined): value is T {
	return !isNil(value);
}

export function isRecord<T extends Record<string, unknown>>(
	value: unknown,
): value is T {
	return (
		typeof value === 'object'
		&& notNil(value)
		&& !Array.isArray(value)
		&& !(value instanceof Date)
		&& !(value instanceof RegExp)
		&& !(value instanceof Map)
		&& !(value instanceof Set)
		&& !(value instanceof WeakMap)
		&& !(value instanceof WeakSet));
}
