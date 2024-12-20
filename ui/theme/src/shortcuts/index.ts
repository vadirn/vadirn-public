export const shortcuts = {
	'text-title': 'font-size-title line-height-title tracking-tight',
	'text-heading': 'font-size-heading line-height-heading',
	'text-body': 'font-size-body line-height-body',
	'text-small': 'font-size-small line-height-small',
	'text-inherit': 'font-size-inherit line-height-inherit',
	'interactive':
		'text-black bg-grey-100 hover:bg-grey-200 active:bg-grey-200 '
		+ dark(
			'text-white bg-grey-500 hover:bg-grey-600 active:bg-grey-600',
		),
	'interactive-selected':
		'text-black bg-yellow-100 hover:bg-yellow-100 active:bg-yellow-100 '
		+ dark(
			'text-white bg-yellow-400 hover:bg-yellow-400 active:bg-yellow-400',
		),
	'interactive-primary':
		'text-black bg-yellow-100 hover:bg-yellow-200 active:bg-yellow-200 '
		+ dark(
			'text-white bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-500',
		),
};

function dark(...args: string[]) {
	return 'dark:(' + args.join(' ') + ')';
}
