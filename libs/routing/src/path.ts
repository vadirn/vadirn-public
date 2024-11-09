import { notNil } from '@workspace/standard/common';
import { key, proxy } from './proxy';

function joinPaths(...paths: string[]) {
	return paths.map(stripTrailingSlashes).filter(notNil).join('/');
}

function stripTrailingSlashes(path: unknown) {
	const pathString = `${path}`;
	let i = pathString.length - 1;

	while (i >= 0 && pathString[i] === '/') i -= 1;

	return pathString.slice(0, i + 1);
}

function handler(): ProxyHandler<{ (): void; [key]: string }> {
	return {
		get: (target, property) => {
			if (property === 'toString') return () => target[key];

			return proxy(
				joinPaths(target[key], property.toString()),
				handler(),
			);
		},
		apply: (target, thisArg, args) => {
			console.log(target, thisArg, args);

			return proxy(
				joinPaths(target[key], ...args),
				handler(),
			);
		},
	};
}

export function pathBuilder<Paths>(): Paths {
	return proxy('/', handler()) as Paths;
}
