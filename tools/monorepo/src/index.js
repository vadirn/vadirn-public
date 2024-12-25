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
	ui: (...args) => path.resolve(root, 'ui', ...args),
	core: (...args) => path.resolve(root, 'core', ...args),
	domain: (...args) => path.resolve(root, 'domain', ...args),
	tools: (...args) => path.resolve(root, 'tools', ...args),
	libs: (...args) => path.resolve(root, 'libs', ...args),
};
