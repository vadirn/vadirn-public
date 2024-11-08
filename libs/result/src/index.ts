import { isFunction, type Fn } from '@workspace/standard/function';
import { sleep } from '@workspace/standard/promise';

class OkResult<Value = unknown> {
	public readonly ok = true;
	public readonly error = null;
	constructor(public readonly value: Value) { }
}

class ErrorResult<Err = Error, Value = undefined> {
	public readonly ok = false;
	constructor(public readonly error: Err, public readonly value?: Value) { }
}

export type Result<Value = unknown, Err = Error> =
      OkResult<Value> | ErrorResult<Err, Value>;

export function isResult(something: unknown): something is Result {
	return something instanceof OkResult || something instanceof ErrorResult;
}

export function ok<Value = unknown>(value: Value): OkResult<Value> {
	return new OkResult(value);
}

export function error<Err = Error, Value = undefined>(
	error: Err,
	value?: Value,
): ErrorResult<Err, Value> {
	return new ErrorResult(error, value);
}

export async function resultOf<
	ExpectedValue,
	ExpectedError = Error,
>(
	something:
		Fn<Promise<ExpectedValue>> |
		Promise<ExpectedValue>,
):
	Promise<Result<ExpectedValue, ExpectedError>> {
	try {
		const value = await (isFunction(something) ? something() : something);

		return ok(value);
	}
	catch (e) {
		return error(e as ExpectedError);
	}
}

export function attempt<ExpectedValue, ExpectedError = Error>(
	fn: Fn<ExpectedValue>,
): Result<ExpectedValue, ExpectedError> {
	try {
		return ok(fn());
	}
	catch (e) {
		return error(e as ExpectedError);
	}
}

export function unwrap<ExpectedValue, ExpectedError = Error>(
	result: Result<ExpectedValue, ExpectedError>,
): ExpectedValue {
	if (result.ok) {
		return result.value;
	}
	throw result.error;
}

export function unwrapOr<ExpectedValue, ExpectedError = Error>(
	result: Result<ExpectedValue, ExpectedError>,
	fallback: ExpectedValue,
): ExpectedValue {
	return result.value ?? fallback;
}

type RetryOptions = {
	attempts?: number;
	bail?: Fn<Promise<boolean>, [Error]>;
	sleep?: Fn<Promise<void>, [number]>;
};

export function resilient<Return, Args extends []>(
	fn: Fn<Promise<Return>, Args>,
	options?: RetryOptions,
): Fn<Promise<Result<Return>>, Args> {
	return async (...args: Args) => {
		const { bail, attempts, sleep } = getRetryOptions(options);
		let attemptNo = 0;

		while (true) {
			attemptNo += 1;
			const result = await resultOf(() => fn(...args));

			if (result.ok || attemptNo >= attempts) return result;
			if (await bail(result.error)) return result;
			await sleep(attemptNo);
		}
	};
}

function getRetryOptions(options?: RetryOptions): Required<RetryOptions> {
	return {
		bail: async () => false,
		attempts: 3,
		sleep: (attemptNo: number) => sleep(exponentialDelay(attemptNo)),
		...options,
	};
}

function exponentialDelay(attemptNo = 0) {
	const delay = Math.pow(2, attemptNo) * 100;
	const randomSum = delay * 0.2 * Math.random(); // 0-20% of the delay

	return delay + randomSum;
}
