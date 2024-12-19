export function position(sizes) {
	const position = new Map([
		['static', { position: 'static' }],
		['relative', { position: 'relative' }],
		['absolute', { position: 'absolute' }],
		['fixed', { position: 'fixed' }],
		['sticky', { position: 'sticky' }],
	]);
}
