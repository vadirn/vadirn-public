import { resultOf } from '@libs/result';
import { kv } from '@vercel/kv';

export function add(
	key: string,
	value: Record<string, string | number | boolean>,
) {
	console.log('add', key, value);

	return resultOf(kv.lpush(key, value));
}
