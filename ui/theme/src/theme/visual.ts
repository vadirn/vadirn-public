import { rem } from '../utils/style';

export const borderRadius = {
	none: '0',
	4: rem(4),
	8: rem(8),
	12: rem(12),
	16: rem(16),
	full: '9999px',
};

export const boxShadow = {
	modal: '0 10px 15px -3px oklch(0 0 0 / 0.4), '
		+ '0 4px 6px -4px oklch(0 0 0 / 0.6)',
};

export const ringWidth = {
	DEFAULT: '3px',
	none: '0',
};
