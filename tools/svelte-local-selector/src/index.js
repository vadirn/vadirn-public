import MagicString from 'magic-string';
import { parse } from 'svelte/compiler';

/**
 * @returns {import('svelte/compiler').PreprocessorGroup}
 */
export function svelteLocalSelector() {
	return {
		name: 'svelte-local-selector',
		markup: markupPreprocessor(),
	};
}

function markupPreprocessor() {
	/** @type {import('svelte/compiler').Preprocessor} */
	return ({ content, filename }) => {
		const localClassNames = {};
		const ast = parse(content);
		const css = ast.css;
		const js = ast.instance;
		const style = stylePreprocessor(localClassNames);
		const script = scriptPreprocessor(localClassNames);

		const s = new MagicString(content);

		if (css) {
			const updatedStyles = style(css.content.styles);

			if (Object.keys(localClassNames).length > 0) {
				s.update(css.content.start, css.content.end, updatedStyles);

				const { start, end } = js.content;

				s.update(start, end, script(content.slice(start, end)));
			}
		}

		const map = s.generateMap({ file: filename });

		return {
			code: s.toString(),
			map,
		};
	};
}

const localPseudoClassSelectorRegex = /:local\(\.([\w-]+)\)/g;

function stylePreprocessor(localClassNames) {
	/** @type {(content: string) => string} */
	return (content) => {
		const id = hash(content);

		return content.replaceAll(localPseudoClassSelectorRegex, (_, className) => {
			const nextValue = `${className}-${id}`;

			localClassNames[className] = nextValue;

			return `:global(.${nextValue})`;
		});
	};
}

function scriptPreprocessor(localClassNames) {
	/** @type {(content: string) => string} */
	return (content) => {
		if (Object.keys(localClassNames).length > 0) {
			return content + functionTemplate(localClassNames);
		}

		return content;
	};
}

function functionTemplate(localClassNames = {}) {
	return `
function __styles() {
	return ${JSON.stringify(localClassNames)};
}
`;
}

/**
 * @param {string} str
 * @returns {string}
 */
function hash(str) {
	str = str.replace(/\r/g, '');
	let hash = 5381;
	let i = str.length;

	while (i--) hash = ((hash << 5) - hash) ^ str.charCodeAt(i);

	return (hash >>> 0).toString(36);
}
