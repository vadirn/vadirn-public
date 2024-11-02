export const setFiles = (...configArray) => configArray.map(conf => ({
	...conf,
	files: [
		'**/*.js',
		'**/*.ts',
		'**/*.svelte',
	],
}));
