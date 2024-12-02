import { describe, expect, it } from '@tools/testing';
import { attempt, error, ok, resilient, resultOf, unwrap, unwrapOr } from '.';

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

describe('attempt', () => {
	it('a function into a result instead of doing try-catch', () => {
		const result = attempt(() => 'hello');

		expect(result.ok).toBe(true);
		expect(result.value).toBe('hello');
	});
	it('async function into a result', async () => {
		let result = attempt(async () => 'hello');

		expect(result.ok).toBe(true);
		expect(result.value).toBeInstanceOf(Promise);

		// however, result.value might be a promise, that is going to be rejected
		result = attempt(async () => Promise.reject(new Error('💥')));

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

describe('resilient', () => {
	it('return a function that retries until it succeeds or fails',
		async () => {
			let attemptNo = 0;
			const fn = () => {
				attemptNo += 1;

				return Promise.reject(new Error('💥'));
			};
			const resilientFn = resilient(fn, {
				sleep: () => Promise.resolve(),
			});
			const result = await resilientFn();

			expect(result.ok).toBe(false);
			expect(attemptNo).toBe(3);
		});
	it('accepts bail option', async () => {
		let attemptNo = 0;
		const fn = () => {
			attemptNo += 1;
			if (attemptNo >= 3) return Promise.resolve('success');

			return Promise.reject(new Error(`${attemptNo}`));
		};
		const resilientFn = resilient(fn, {
			sleep: () => Promise.resolve(),
			bail: async error => error.message === '2',
		});
		const result = await resilientFn();

		expect(result.ok).toBe(false);
		expect(result.error?.message).toBe('2');
	});
});
