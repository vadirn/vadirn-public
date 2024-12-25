import { setDefaultFiles } from './utils.js';

export const final = () => setDefaultFiles({
	rules: {
		'no-restricted-syntax': [
			'error',
			{
				// eslint-disable-next-line @stylistic/max-len
				selector: 'CallExpression[callee.object.name="console"][callee.property.name="log"]',
				// eslint-disable-next-line @stylistic/max-len
				message: 'Use console.info() instead of console.log() for production code.',
			},
			{
				selector: 'CallExpression[callee.name="logAndReturn"]',
				message: 'Not allowed in production code.',
			},
		],
		'@typescript-eslint/no-empty-object-type': [
			'error',
			{
				allowInterfaces: 'never', allowObjectTypes: 'always',
			},
		],
		'prefer-const': ['error', { destructuring: 'all' }],
	},
});
