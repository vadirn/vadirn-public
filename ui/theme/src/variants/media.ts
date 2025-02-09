import type { Variant } from 'unocss';
import type { Theme } from '../theme';

export const media: Variant<Theme>[] = [
	(matcher, { theme }) => {
		// get media query names
		const mediaQueries = Object.keys(theme.media);
		const mediaQuery = mediaQueries.find(
			mediaQuery => matcher.startsWith(mediaQuery),
		) as keyof Theme['media'] | undefined;

		if (!mediaQuery) return matcher;

		const prefix = `${mediaQuery}:`;

		return {
			matcher: matcher.replace(prefix, ''),
			selector: s => s,
			parent: `@media (${theme.media[mediaQuery]})`,
		};
	},
];
