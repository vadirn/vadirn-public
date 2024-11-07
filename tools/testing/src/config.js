import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [],
	test: {
		globals: true,
		environment: 'jsdom',
	},
	resolve: process.env.VITEST
		? {
				conditions: ['browser'],
			}
		: undefined,
});
