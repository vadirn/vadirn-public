import type { Variant } from 'unocss';
import type { Theme } from '../theme';

export const darkMode: Variant<Theme>[] = [
	(matcher) => {
		if (!matcher.startsWith('dark:')) return matcher;

		return {
			matcher: matcher.replace('dark:', ''),
			selector: (s) => {
				return `.dark ${s}`;
			},
		};
	},
];
