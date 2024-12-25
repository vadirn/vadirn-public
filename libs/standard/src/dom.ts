import { isNil } from './common';

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
	'input:not([disabled]):not([type="radio"]):not([type="checkbox"])',
	'textarea:not([disabled])',
	'[contenteditable]',
];

export function getFocusableElements(element: HTMLElement) {
	const focusableElements
		= element.querySelectorAll<HTMLElement>(focusableSelectors.join(','));
	const namedFocusableElements = new Map<string | symbol, HTMLElement>();

	for (const element of focusableElements) {
		const key = element.getAttribute('name') ?? Symbol();

		const existingElement = namedFocusableElements.get(key);

		if (isNil(existingElement)) {
			namedFocusableElements.set(key, element);
			continue;
		}

		// check if new element is a checked radio button
		if (element.matches('input[type="radio"]:checked')) {
			// replace existing element with new one
			namedFocusableElements.set(key, element);
		}
	}

	return sortByTabIndex(namedFocusableElements.values());
}

function sortByTabIndex(elements: Iterable<HTMLElement>) {
	// expect no elements with negative tabIndex
	const withTabIndex: HTMLElement[] = [];
	const withoutTabIndex: HTMLElement[] = [];

	for (const element of elements) {
		if (element.tabIndex > 0) {
			withTabIndex.push(element);
		}
		else {
			withoutTabIndex.push(element);
		}
	}

	return [
		...withTabIndex.sort((a, b) => b.tabIndex - a.tabIndex),
		...withoutTabIndex,
	];
}

export function isEditableElement(element: Element | null) {
	return element?.matches(editableSelectors.join(','));
}

export function isEditingText(event: KeyboardEvent) {
	return isEditableElement(document.activeElement) || event.isComposing;
}

export function preventDefault(event: Event | null | undefined) {
	event?.preventDefault();
}

export function stopPropagation(event: Event | null | undefined) {
	event?.stopPropagation();
}
