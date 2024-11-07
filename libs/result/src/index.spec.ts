import { describe, expect, it } from '@workspace/testing';
import { error, ok, resultOf, unwrap, unwrapOr, wrap } from '.';

describe('result of', () => {
	it('async function', async () => {
		let result = await resultOf(() => Promise.resolve('hello'));

		expect(result.ok).toBe(true);
		expect(result.value).toBe('hello');

		result = await resultOf(
			() => Promise.reject(new Error('💥')),
		);
		expect(result.ok).toBe(false);
		expect(result.error).toBeInstanceOf(Error);
	});

	it('promise', async () => {
		let result = await resultOf(Promise.resolve('hello'));

		expect(result.ok).toBe(true);
		expect(result.value).toBe('hello');

		result = await resultOf(
			Promise.reject(new Error('💥')),
		);
		expect(result.ok).toBe(false);
		expect(result.error).toBeInstanceOf(Error);
	});
});

describe('wrap', () => {
	it('a function into a result instead of doing try-catch', () => {
		const result = wrap(() => 'hello');

		expect(result.ok).toBe(true);
		expect(result.value).toBe('hello');
	});
	it('async function into a result', async () => {
		let result = wrap(async () => 'hello');

		expect(result.ok).toBe(true);
		expect(result.value).toBeInstanceOf(Promise);

		// however, result.value might be a promise, that is going to be rejected
		result = wrap(async () => Promise.reject(new Error('💥')));

		// and still be ok
		expect(result.ok).toBe(true);

		if (result.ok) {
			const finalResult = await resultOf(result.value);

			expect(finalResult.ok).toBe(false);
			expect(finalResult.error).toBeInstanceOf(Error);
		}
	});
});

describe('unwrap', () => {
	it('a result', () => {
		const result = ok('hello');

		expect(unwrap(result)).toBe('hello');
	});
	it('throws an error', () => {
		const result = error(new Error('💥'));

		expect(() => unwrap(result)).toThrowError('💥');
	});
	it('a result with fallback', () => {
		const errorResultWithNoValue = error(new Error('💥'));
		const errorResultWithValue = error(new Error('💥'), 'value');

		expect(unwrapOr(errorResultWithNoValue, 'fallback')).toBe('fallback');
		expect(unwrapOr(errorResultWithValue, 'fallback')).toBe('value');
	});
});
