export interface Fn<Return = void, Args extends unknown[] = []> {
	(...args: Args): Return;
}
export type UnknownFn = Fn<unknown, unknown[]>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFn = Fn<any, any[]>;

export function isFunction<T extends UnknownFn>(value: unknown): value is T {
	return typeof value === 'function';
}

export const noop = (() => {}) as AnyFn;
