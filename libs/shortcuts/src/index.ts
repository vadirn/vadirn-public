import {
	getPressedKeys,
	normalizeShortcut,
} from './utils';

export function shortcuts(
	shortcuts: Record<string, (event: KeyboardEvent) => unknown>,
	options: { preventDefault?: boolean; stopPropagation?: boolean } = {},
) {
	const { preventDefault = true, stopPropagation = false } = options;
	const callbacks = new Map<string, (event: KeyboardEvent) => unknown>();

	for (const [shortcut, callback] of Object.entries(shortcuts)) {
		const normalizedShortcut = normalizeShortcut(shortcut);

		callbacks.set(normalizedShortcut, callback);
	}

	return (event: KeyboardEvent) => {
		const pressedKeys = getPressedKeys(event);

		const callback = callbacks.get(pressedKeys);

		if (callback) {
			if (preventDefault) event.preventDefault();
			if (stopPropagation) event.stopPropagation();
			callback(event);
		}
	};
}
