import { Database } from '@core/database';
import { KV_REST_API_TOKEN, KV_REST_API_URL } from '$env/static/private';

export const db = new Database({
	url: KV_REST_API_URL,
	token: KV_REST_API_TOKEN,
});
