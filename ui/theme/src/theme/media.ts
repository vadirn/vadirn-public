import { getMediaQueryVar } from '../variables/media';

export const media = {
	'portrait': getMediaQueryVar('portrait'),
	'landscape': getMediaQueryVar('landscape'),
	'lt-tablet': getMediaQueryVar('lt-tablet'),
	'gt-tablet': getMediaQueryVar('gt-tablet'),
};
