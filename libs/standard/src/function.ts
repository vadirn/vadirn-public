export type Fn<Return, Args extends unknown[] = []> = (...args: Args) => Return;
export type UnknownFn = Fn<unknown, unknown[]>;

export function isFunction<T extends UnknownFn>(value: unknown): value is T {
	return typeof value === 'function';
}
