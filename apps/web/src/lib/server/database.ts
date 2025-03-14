import { Database } from '@core/database';
import { env } from '$env/dynamic/private';

export const db = new Database(env.DATABASE_URL);
