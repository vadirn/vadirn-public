import { isNonEmptyString } from '@workspace/standard/string';

const modifierKeys = [
	['alt', 'altKey'],
	['ctrl', 'ctrlKey'],
	['meta', 'metaKey'],
	['shift', 'shiftKey'],
] as const;
const aliasedKeys = new Map([
	['control', 'ctrl'],
	['option', 'alt'],
	['cmd', 'meta'],
	['command', 'meta'],
]);

export const listenerOptions = {
	passive: true,
};

export function getPressedKeys(event: KeyboardEvent) {
	const pressedKeys = new Set<string>();

	// check modifier keys
	for (const [keyName, propertyName] of modifierKeys) {
		if (event[propertyName]) {
			pressedKeys.add(keyName);
		}
	}

	// check key, try to translate it
	const normalizedKey = event.key.toLowerCase();
	const aliasedKey = aliasedKeys.get(normalizedKey);

	pressedKeys.add(aliasedKey ?? normalizedKey);

	return [...pressedKeys].sort().join('+');
}

export function normalizeShortcut(shortcut: string) {
	const keys = shortcut.split('+');
	const normalizedKeys = new Set<string>();

	for (const key of keys) {
		const normalizedKey = key.toLowerCase();
		const aliasedKey = aliasedKeys.get(normalizedKey);

		normalizedKeys.add(aliasedKey ?? normalizedKey);
	}

	return [...normalizedKeys].sort().join('+');
}

export function getShortcutName(shortcut: string, scope?: string) {
	if (isNonEmptyString(scope)) {
		return [scope, shortcut].join(':');
	}

	return shortcut;
}

export function normalizeScopeHierarchy(scopeHierarchy: string[]) {
	if (scopeHierarchy.length === 0) return [''];

	return scopeHierarchy.reverse();
}