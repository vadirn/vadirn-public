export function assert(
	condition: unknown,
	message?: string,
): asserts condition {
	if (!condition) {
		throw new Error(message);
	}
}

export function assertFalse(
	condition: unknown,
	message?: string,
): asserts condition is false {
	assert(condition === false, message);
}
