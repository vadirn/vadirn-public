export const setDefaultFiles = (...configArray) => setFiles([
	'**/*.js',
	'**/*.ts',
	'**/*.svelte',
], configArray);

const setFiles = (files, configArray) => configArray.map(conf => ({
	...conf,
	files,
}));
