import { parse } from 'svelte/compiler';
import { walk } from 'estree-walker';

/**
 * Helper function to extract class names from attribute value nodes.
 * This function handles:
 * - Text nodes: to split static class strings
 * - MustacheTag nodes: for dynamic expressions
 */
function extractClassNamesFromValue(valueNodes) {
	const names = [];

	valueNodes.forEach((node) => {
		// For static values: class="foo bar"
		if (node.type === 'Text') {
			node.data
				.split(/\s+/)
				.filter(name => name.trim().length > 0)
				.forEach(name => names.push(name));
		}
		// For dynamic expressions: class={...}
		else if (node.type === 'MustacheTag') {
			const { expression } = node;

			// If dynamic expression is an array literal
			if (expression.type === 'ArrayExpression') {
				expression.elements.forEach((elem) => {
					if (elem.type === 'Literal' && typeof elem.value === 'string') {
						names.push(elem.value);
					}
					else if (elem.type === 'ObjectExpression') {
						// For object expressions, extract each key as a potential class name
						elem.properties.forEach((prop) => {
							if (prop.key.type === 'Identifier') {
								names.push(prop.key.name);
							}
							else if (prop.key.type === 'Literal') {
								names.push(prop.key.value);
							}
						});
					}
				});
			}
			// Handle a simple literal expression
			else if (
				expression.type === 'Literal'
				&& typeof expression.value === 'string'
			) {
				names.push(expression.value);
			}
			// You can extend further logic for more complex expressions if needed.
		}
	});

	return names;
}

/**
 * Extracts class names from Svelte component code
 * @param {string} code - The Svelte component code
 * @returns {string[]} Array of unique class names
 */
export function svelteExtractor(code) {
	// Array to collect extracted classes
	const classes = [];

	// Parse the Svelte code into an AST
	const ast = parse(code);

	// Use the walk helper to traverse the AST
	walk(ast, {
		enter(node) {
			// Process elements or inline components
			if (node.type === 'Element' || node.type === 'InlineComponent') {
				// Walk over attributes inside the element
				if (node.attributes && node.attributes.length > 0) {
					node.attributes.forEach((att) => {
						// Handle class directives like: class:name
						if (att.type === 'Class' && att.name) {
							classes.push(att.name);
						}
						// Handle standard attributes: class or className
						else if (
							att.type === 'Attribute'
							&& (att.name === 'class' || att.name === 'className')
						) {
							classes.push(...extractClassNamesFromValue(att.value));
						}
					});
				}
			}
		},
	});

	// Return unique class names
	return [...new Set(classes)];
}
