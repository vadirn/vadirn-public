import { isNonEmptyString } from '@libs/standard/string';

export const themeVariant = (
	value: string | undefined,
	isEnabled: boolean = true,
) => {
	if (isNonEmptyString(value) && isEnabled) {
		return {
			['data-theme']: value,
		};
	}

	return {};
};

export const sizeVariant = (
	value: string | undefined,
	isEnabled: boolean = true,
) => {
	if (isNonEmptyString(value) && isEnabled) {
		return {
			['data-size']: value,
		};
	}

	return {};
};
