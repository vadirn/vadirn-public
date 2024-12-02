import { describe, expect, it } from '@tools/testing';
import {
	getPressedKeys,
	getShortcutName,
	normalizeScopeHierarchy,
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
	describe('getShortcutName', () => {
		it('returns the correct shortcut name', () => {
			expect(getShortcutName('a')).toBe('a');
			expect(getShortcutName('a', 'scope')).toBe('scope:a');
		});
	});
	describe('normalizeScopeHierarchy', () => {
		it('normalizes scope hierarchy', () => {
			expect(normalizeScopeHierarchy([])).toEqual(['']);
			expect(normalizeScopeHierarchy(['scope'])).toEqual([
				'scope',
			]);
			expect(normalizeScopeHierarchy(['scope', 'scope'])).toEqual([
				'scope',
				'scope',
			]);
			expect(
				normalizeScopeHierarchy(['scope', 'scope', 'scope']),
			).toEqual(['scope', 'scope', 'scope']);
		});
	});
});
