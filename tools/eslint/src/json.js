import jsonEslintPlugin from '@eslint/json';

export const json = () => ([
	{
		files: ['**.*.json'],
		ignores: ['package-lock.json'],
		language: 'json/json',
		...jsonEslintPlugin.configs['recommended'],
	},
]);
