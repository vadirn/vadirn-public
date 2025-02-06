import { concat, style, where } from '../utils/style';
import { colors, darkModeColors } from '../variables/colors';
import { borderRadii, boxShadows, lineWidths } from '../variables/decorative';
import { sizes } from '../variables/sizes';
import {
	fontFamilies,
	fontSizes,
	fontWeights,
	lineHeights,
} from '../variables/typography';
import type { Theme } from '../theme';
import type { Preflight } from 'unocss';

export const variablesPreflight: Preflight<Theme> = {
	getCSS: () => {
		return concat(
			style(where('body'), {
				...colors,
				...fontFamilies,
				...fontSizes,
				...fontWeights,
				...lineHeights,
				...sizes,
				...borderRadii,
				...lineWidths,
				...boxShadows,
			}),
			style(where('.dark body'), {
				...darkModeColors,
			}),
		);
	},
};
