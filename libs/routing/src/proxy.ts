export const key = Symbol('key');

export function proxy<T>(
	property: T,
	handler: ProxyHandler<{ (): void; [key]: T }>,
) {
	const callable = () => {};

	callable[key] = property;

	return new Proxy(callable, handler);
}
