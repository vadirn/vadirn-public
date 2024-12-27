import type { DeepPartial } from '@libs/standard/type';
import type { MetaTags } from '@ui/components/meta';
import { assets } from '$app/paths';

const meta = {
	title: 'Vadim Kotov',
	description: 'I\'m Vadim Kotov, '
		+ 'frontend tech lead, specializing in transforming '
		+ 'legacy codebases and crafting maintainable systems from the ground up.',
};

const baseCardUrl = assets + '/base-card.webp';

export const notesCardUrl = assets + '/notes-card.webp';

export function getMeta<T extends DeepPartial<MetaTags>>(
	overrides: T = {} as T,
) {
	return {
		...overrides,
		openGraph: {
			title: overrides.title,
			description: overrides.description,
			url: overrides.canonical,
			...overrides.openGraph,
		},
		twitter: {
			title: overrides.title,
			description: overrides.description,
			...overrides.twitter,
		},
	};
}

export function getRootMeta(overrides: DeepPartial<MetaTags> = {}): MetaTags {
	return getMeta({
		title: meta.title,
		description: meta.description,
		...overrides,
		openGraph: {
			type: 'website',
			image: baseCardUrl,
			site_name: 'vadirn.io',
			...overrides.openGraph,
		},
		twitter: {
			card: 'summary_large_image',
			creator: '@vadirn',
			image: baseCardUrl,
			...overrides.twitter,
		},
	});
}
