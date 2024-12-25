import { pathBuilder } from '@libs/routing/path';

type Paths = {
	notes: {
		toString(): '/notes';
		(title: string): {
			toString(): `/notes/${string}`;
		};
	};
	about: {
		toString(): string;
	};
};

export const app = pathBuilder<Paths>();
