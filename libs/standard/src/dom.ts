const focusableSelectors = [
	'a[href]',
	'area[href]',
	'input:not([disabled])',
	'select:not([disabled])',
	'textarea:not([disabled])',
	'button:not([disabled])',
	'iframe',
	'object',
	'embed',
	'[tabindex]:not([tabindex="-1"])',
	'[contenteditable]',
];

const editableSelectors = [
	'input:not([disabled])',
	'textarea:not([disabled])',
	'[contenteditable]',
];

export function getFocusableElements(element: HTMLElement) {
	const focusableElements = element.querySelectorAll(
		focusableSelectors.join(','),
	);

	return [...focusableElements] as HTMLElement[];
}

export function isEditableElement(element: Element | null) {
	return element?.matches(editableSelectors.join(','));
}

export function isEditingText(event: KeyboardEvent) {
	return isEditableElement(document.activeElement) || event.isComposing;
}
