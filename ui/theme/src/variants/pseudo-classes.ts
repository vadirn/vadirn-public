import type { Variant } from 'unocss';
import type { Theme } from '../theme';

export const pseudoClasses: Variant<Theme>[] = [
	(matcher) => {
		if (!matcher.startsWith('hover:')) return matcher;

		return {
			matcher: matcher.replace('hover:', ''),
			selector: (s) => {
				return `${s}:hover`;
			},
		};
	},
	(matcher) => {
		if (!matcher.startsWith('active:')) return matcher;

		return {
			matcher: matcher.replace('active:', ''),
			selector: (s) => {
				return `${s}:active`;
			},
		};
	},
];
