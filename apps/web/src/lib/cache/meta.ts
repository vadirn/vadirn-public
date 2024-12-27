import type { MetaTags } from '@ui/components/meta';
import type { DeepPartial } from '@libs/standard/type';
import { assets } from '$app/paths';

const meta = {
	title: 'Vadim Kotov',
	description: 'I\'m Vadim Kotov, '
		+ 'frontend tech lead, specializing in transforming '
		+ 'legacy codebases and crafting maintainable systems from the ground up.',
};

const baseCardUrl = assets + '/base-card.webp';

export function getMeta(overrides: DeepPartial<MetaTags> = {}): MetaTags {
	// const title = overrides.title ?? meta.title;
	// const description = overrides.description ?? meta.description;
	const { openGraph, twitter, ...baseOverrides } = overrides;

	return {
		title: meta.title,
		description: meta.description,
		...baseOverrides,
		openGraph: {
			title: meta.title,
			type: 'website',
			image: baseCardUrl,
			description: meta.description,
			site_name: 'vadirn.io',
			url: baseOverrides.canonical,
			...openGraph,
		},
		twitter: {
			title: meta.title,
			card: 'summary_large_image',
			creator: '@vadirn',
			image: baseCardUrl,
			description: meta.description,
			...twitter,
		},
	};
}
