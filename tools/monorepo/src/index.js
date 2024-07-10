import { findUpSync } from 'find-up';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const root = path.dirname(
	findUpSync('pnpm-lock.yaml', {
		cwd: __dirname,
	})
);

export const monorepo = {
	get root() {
		return root;
	},
	resolve: (...args) => path.resolve(root, ...args),
	apps: (...args) => path.resolve(root, 'apps', ...args),
	core: (...args) => path.resolve(root, 'core', ...args),
	libs: (...args) => path.resolve(root, 'libs', ...args),
	tools: (...args) => path.resolve(root, 'tools', ...args),
	ui: (...args) => path.resolve(root, 'ui', ...args),
};
