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
		],

	},
});