export const mediaQueries = {
	'--portrait': '(orientation: portrait)',
	'--landscape': '(orientation: landscape)',
	'--lg-n-below': '(max-width: 1024px)',
};

type ExtractMediaQueryKey<T> = T extends `--${infer K}` ? K : never;
type MediaQueryKey = ExtractMediaQueryKey<keyof typeof mediaQueries>;

export const getMediaQuery = (key: MediaQueryKey) => {
	return mediaQueries[`--${key}`];
};
