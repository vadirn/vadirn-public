import { pathBuilder } from '@workspace/routing/path';

type Paths = {
	ds: {
		logo: {
			toString(): '/ds/logo';
		};
		navigation: {
			toString(): '/ds/navigation';
		};
	};
};

export const ds = pathBuilder<Paths>().ds;
