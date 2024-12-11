import { transform } from 'lightningcss';
import crypto from 'crypto';

/**
 * @returns {import('svelte/compiler').PreprocessorGroup}
 */
export function svelteLocal() {
	const localClassNames = {};

	/** @type import('svelte/compiler').Preprocessor */
	const style = ({ filename, content }) => {
		const uid = getHash(filename);
		// find ":local" selectors, replace them with global and add those to localClassNames
		const { code, map } = transform({
			filename,
			code: Buffer.from(content),
			visitor: {
				Selector(selector) {
					const selectors = Array.isArray(selector) ? selector : [selector];
					const returnValue = [];

					for (const selectorComponent of selectors) {
						if (isLocalPseudoSelector(selectorComponent)) {
							if (selectorComponent.arguments.length === 2) {
								returnValue.push({
									...selectorComponent,
									arguments: renameArguments(selectorComponent.arguments, uid)
								});
								continue;
							}
							console.dir(selectorComponent, { depth: null });
						}
						returnValue.push(selectorComponent);
					}
					return returnValue;
				}
				// Rule(rule) {
				// 	if (rule.selector.type === 'PseudoClass' && rule.selector.name === 'local') {
				// 		const innerSelector = rule.selector.selector;
				// 		if (innerSelector.type === 'ClassSelector') {
				// 			const className = `${innerSelector.name}_${uid}`;
				// 			localClassNames[innerSelector.name] = className;
				// 			return {
				// 				...rule,
				// 				selector: {
				// 					type: 'PseudoClass',
				// 					name: 'global',
				// 					selector: {
				// 						type: 'ClassSelector',
				// 						name: className
				// 					}
				// 				}
				// 			};
				// 		}
				// 	}
				// 	return rule;
				// }
			}
		});

		return {
			code,
			map
		};
	};

	return {
		name: 'svelte-local',
		// markup?: MarkupPreprocessor;
		style,
		// script?: Preprocessor;
	}
}

/**
 * @param {import('lightningcss').SelectorComponent} selector
 */
function isValidLocalSelector(selector) {
	if (!(selector.type === 'pseudo-class' && selector.kind === 'custom-function' && selector.name === 'local')) return false;

	const [arg1, arg2] = selector.arguments;

	if (arg1.type !== 'token' || arg2.type !== 'token') return false;

	return arg1.value.type === 'delim' && arg2.value.type === 'ident';
}

function renameArguments(arguments, uid) {
	if (arguments.length !== 2) return arguments;

	if (arguments[0].value.value === '.' && arguments[1].value.type === 'ident') {
		return [
			arguments[0],
			{
				type: 'token',
				value: {
					type: 'ident',
					value: `${arguments[1].value.value}_${uid}`
				}
			}
		]
	}

	return arguments
}

function getHash(input) {
	return crypto.createHash('sha256').update(input).digest('hex').slice(0, 6);
}

const style = svelteLocal().style;

style({ filename: 'test.svelte', content: ':local(.foo), .baz { color: red; } :local(.bar .turbo + div) { color: blue; } :global(.baz) { color: green; } div :local(.foo) { color: yellow; }' });