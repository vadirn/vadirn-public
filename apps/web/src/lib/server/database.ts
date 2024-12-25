import { Database } from '@core/database';
import { env } from '$env/dynamic/private';

export const db = new Database({
	url: env.KV_REST_API_URL,
	token: env.KV_REST_API_TOKEN,
});
