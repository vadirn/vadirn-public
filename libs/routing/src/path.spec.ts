import { describe, expect, it } from '@workspace/testing';
import { pathBuilder } from './path';

describe('path builder', () => {
	it('allows typesafe path building', () => {
		type Paths = {
			blog: {
				toString(): string;
				posts: {
					toString(): string;
					(id: number): {
						toString(): string;
						comments: {
							toString(): string;
							(id: string): {
								toString(): string;
							};
						};
					};
				};
			};
		};
		const paths = pathBuilder<Paths>();

		expect(paths.blog.posts(123).comments('456 789').toString()).toBe(
			'/blog/posts/123/comments/456-789',
		);
	});
});
