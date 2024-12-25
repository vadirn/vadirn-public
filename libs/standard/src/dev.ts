export function logAndReturn<T>(value: T): T {
	console.dir(value);

	return value;
}
