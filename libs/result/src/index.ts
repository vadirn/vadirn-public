import { isFunction, type Fn } from '@workspace/standard/function';

class OkResult<Value = unknown> {
	public readonly ok = true;
	public readonly error = null;
	constructor(public readonly value: Value) { }
}

class ErrorResult<Error = unknown, Value = undefined> {
	public readonly ok = false;
	constructor(public readonly error: Error, public readonly value?: Value) { }
}

export type Result<Value = unknown, Error = unknown> =
      OkResult<Value> | ErrorResult<Error, Value>;

export function isResult(something: unknown): something is Result {
	return something instanceof OkResult || something instanceof ErrorResult;
}

export function ok<Value = unknown>(value: Value): OkResult<Value> {
	return new OkResult(value);
}

export function error<Error = unknown, Value = undefined>(
	error: Error,
	value?: Value,
): ErrorResult<Error, Value> {
	return new ErrorResult(error, value);
}

export async function resultOf<
	ExpectedValue,
	ExpectedError = unknown,
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

export function wrap<ExpectedValue, ExpectedError = unknown>(
	fn: Fn<ExpectedValue>,
): Result<ExpectedValue, ExpectedError> {
	try {
		return ok(fn());
	}
	catch (e) {
		return error(e as ExpectedError);
	}
}

export function unwrap<ExpectedValue, ExpectedError = unknown>(
	result: Result<ExpectedValue, ExpectedError>,
): ExpectedValue {
	if (result.ok) {
		return result.value;
	}
	throw result.error;
}

export function unwrapOr<ExpectedValue, ExpectedError = unknown>(
	result: Result<ExpectedValue, ExpectedError>,
	fallback: ExpectedValue,
): ExpectedValue {
	return result.value ?? fallback;
}
