import { pathBuilder } from '@libs/routing/path';

type Paths = {
	docs: {
		logo: {
			toString(): '/docs/logo';
		};
		navigation: {
			toString(): '/docs/navigation';
		};
	};
};

export const docs = pathBuilder<Paths>().docs;
