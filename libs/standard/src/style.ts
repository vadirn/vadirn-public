import { isRecord } from './common';
import { isNumber } from './number';
import { isNonEmptyString } from './string';

/**
 * Compose class names into a string
 */
export function classNames(
	...options: (undefined | string | number | Record<string, boolean>)[]
): string {
	return options
		.reduce((acc, option) => {
			if (isNonEmptyString(option) || isNumber(option)) {
				acc.push(option);

				return acc;
			}

			if (isRecord(option)) {
				const name = classNameFromRecord(option);

				if (isNonEmptyString(name)) {
					acc.push(name);
				}
			}

			return acc;
		}, [] as (string | number)[])
		.join(' ');
}

function classNameFromRecord(record: Record<string | number, boolean>) {
	return Object.entries(record)
		.reduce((acc, [key, value]) => {
			if (value) {
				acc.push(key);
			}

			return acc;
		}, [] as string[])
		.join(' ');
}
