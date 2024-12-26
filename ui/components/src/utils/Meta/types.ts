export type PrimaryMetaTags = {
	title: string;
	description?: string;
	canonical?: string;
	robots?: string;
	keywords?: string;
};

export type OpenGraphMetaTags = {
	title: string;
	type: string;
	image: string;
	url: string;
	description?: string;
};

export type TwitterMetaTags = {
	card?: 'summary' | 'summary_large_image' | 'app' | 'player';
	creator?: string;
	title?: string;
	description?: string;
	image?: string;
};

export type MetaTags = PrimaryMetaTags & {
	openGraph?: OpenGraphMetaTags;
	twitter?: TwitterMetaTags;
};
