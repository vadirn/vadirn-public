import { describe, expect, it } from '@tools/testing';
import { toCamelCase, toKebabCase, toSnakeCase } from './string';

describe('case conversion', () => {
	const camelCaseTestCases = [
		['hello', 'hello'],
		['hello world', 'helloWorld'],
		['hello_world', 'helloWorld'],
		['hello-world', 'helloWorld'],
		['Hello World', 'helloWorld'],
		['Hello WorlD', 'helloWorlD'],
		['hello_💁‍♀️', 'hello💁‍♀️'],
		['hello 123 world', 'hello123World'],
		['hello-world+test', 'helloWorldTest'],
		['_hello_world_', 'helloWorld'],
		['a-b-c', 'aBC'],
		['1234_test', '1234Test'],
	] as const;

	it('converts to camelCase', () => {
		for (let i = 0; i < camelCaseTestCases.length; i += 1) {
			const [value, expected] = camelCaseTestCases[i]!;
			const actual = toCamelCase(value);
			const shouldThrow = actual !== expected;

			if (shouldThrow) {
				throw new Error(getErrorMessage(i, value, expected, actual));
			}
		}
		expect(true).toBe(true);
	});

	const snakeCaseTestCases = [
		['hello', 'hello'],
		['helloWorld', 'hello_world'],
		['HelloWorld', 'hello_world'],
		['hello_world', 'hello_world'],
		['Hello_World', 'hello_world'],
		['hello123World', 'hello123_world'],
		['hello-world+test', 'hello_world_test'],
		['_hello_world_', 'hello_world'],
		['aBC', 'a_b_c'],
		['1234Test', '1234_test'],
	] as const;

	it('converts to snake_case', () => {
		for (let i = 0; i < snakeCaseTestCases.length; i += 1) {
			const [value, expected] = snakeCaseTestCases[i]!;
			const actual = toSnakeCase(value);
			const shouldThrow = actual !== expected;

			if (shouldThrow) {
				throw new Error(getErrorMessage(i, value, expected, actual));
			}
		}
		expect(true).toBe(true);
	});

	const kebabCaseTestCases = [
		['hello', 'hello'],
		['helloWorld', 'hello-world'],
		['HelloWorld', 'hello-world'],
		['hello_world', 'hello-world'],
		['Hello_World', 'hello-world'],
		['hello123World', 'hello123-world'],
		['hello_world+test', 'hello-world-test'],
		['_hello_world_', 'hello-world'],
		['aBC', 'a-b-c'],
		['1234Test', '1234-test'],
	] as const;

	it('converts to kebab-case', () => {
		for (let i = 0; i < kebabCaseTestCases.length; i += 1) {
			const [value, expected] = kebabCaseTestCases[i]!;
			const actual = toKebabCase(value);
			const shouldThrow = actual !== expected;

			if (shouldThrow) {
				throw new Error(getErrorMessage(i, value, expected, actual));
			}
		}
		expect(true).toBe(true);
	});
});

function getErrorMessage(
	index: number,
	value: string,
	expected: string,
	actual: string,
) {
	return [
		'Test pair',
		`#${index + 1}`,
		`("${value}") failed:`,
		`expected "${expected}",`,
		`but got "${actual}"`,
	].join(' ');
}
