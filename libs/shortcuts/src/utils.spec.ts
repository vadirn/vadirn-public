import { describe, expect, it } from '@tools/testing';
import {
	getPressedKeys,
	normalizeShortcut,
} from './utils';

describe('shortcut utils', () => {
	describe('getPressedKeys', () => {
		it('returns the correct keys', () => {
			const event = new KeyboardEvent('keydown', {
				key: 'a',
				ctrlKey: true,
				shiftKey: true,
				altKey: true,
				metaKey: true,
			});

			expect(getPressedKeys(event)).toBe('a+alt+ctrl+meta+shift');
		});
	});
	describe('normalizeShortcut', () => {
		it('normalizes shortcut', () => {
			expect(normalizeShortcut('a')).toBe('a');
			expect(normalizeShortcut('A')).toBe('a');
			expect(normalizeShortcut('Shift+A')).toBe('a+shift');
			expect(normalizeShortcut('Shift+Alt+A')).toBe('a+alt+shift');
			expect(normalizeShortcut('Control+Alt+A')).toBe('a+alt+ctrl');
			expect(normalizeShortcut('Meta+Alt+A')).toBe('a+alt+meta');
		});
	});
});
