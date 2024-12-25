export function assert(
	condition: unknown,
	messageOrError?: string | Error,
): asserts condition {
	if (!condition) {
		if (messageOrError instanceof Error) {
			throw messageOrError;
		}
		throw new Error(messageOrError);
	}
}

export function assertFalse(
	condition: unknown,
	message?: string,
): asserts condition is false {
	assert(condition === false, message);
}
