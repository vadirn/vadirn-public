export type UnknownFn = (...args: unknown[]) => unknown;
export type Fn<Return, Args extends [] = []> = (...args: Args) => Return;

export function isFunction<T extends UnknownFn>(value: unknown): value is T {
	return typeof value === 'function';
}
