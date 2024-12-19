export function style(selector: string, style: string): string;
export function style(
	selector: string,
	style: Record<string, string | string[]>
): string;
export function style(
	selector: string,
	style: string | Record<string, string | string[]>,
): string {
	if (typeof style === 'string') {
		return concatLines(
			`${selector} {`,
			indent(style.trim()),
			'}\n',
		);
	}

	return concatLines(
		`${selector} {`,
		...Object.keys(style).reduce(
			(lines, key) => {
				if (Array.isArray(style[key])) {
					return [
						...lines,
						...style[key]!.map(value => indentLine(property(key, value))),
					];
				}

				return [...lines, indentLine(property(key, style[key]!))];
			},
			[] as string[],
		),
		`}\n`,
	);
}

export function property(key: string, value: string) {
	return `${key.split(/(?=[A-Z])/).join('-').toLowerCase()}: ${value};`;
}

export function indent(str: string, level: number = 1) {
	return str.split('\n').map(line => indentLine(line, level)).join('\n');
}

export function indentLine(line: string, level: number = 1) {
	return '\t'.repeat(level) + line;
}

export function where(selector: string) {
	return `:where(${selector})`;
}

export function mediaQuery(query: string) {
	return `@media (${query})`;
}

export function mediaQueryDark() {
	return mediaQuery('prefers-color-scheme: dark');
}

export function concat(...args: string[]) {
	return args.join('');
}

export function concatLines(...args: string[]) {
	return args.join('\n');
}

export function px(value: number) {
	if (value === 0) return '0';

	return `${value}px`;
}

export function cssVar(value: string) {
	if (value.startsWith('--')) {
		return `var(${value})`;
	}

	return value;
}

export function rem(px: number, base: number = 16) {
	if (px === 0) return '0';

	return `${px / base}rem`;
}
