import { isPropertyOf } from '@libs/standard/object';
import { isRecord } from '@libs/standard/common';
import { isNonEmptyString } from '@libs/standard/string';
import type { Theme } from '../theme';

export function getColorValue(
	color: string | undefined,
	theme: Theme,
) {
	const [colorName, colorVariant] = color?.split('-') ?? [];

	if (
		isPropertyOf(theme.colors, colorName)
	) {
		const colorValue = theme.colors[colorName];

		if (isRecord(colorValue) && isPropertyOf(colorValue, colorVariant)) {
			return colorValue[colorVariant];
		}

		if (isNonEmptyString(colorValue)) {
			return colorValue;
		}
	}
}
