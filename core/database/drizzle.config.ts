import { isNonEmptyString } from '@libs/standard/string';
import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';

if (!isNonEmptyString(process.env.DATABASE_URL)) {
	throw new Error('DATABASE_URL is not set');
}

export default defineConfig({
	schema: './src/schema/*',
	out: './drizzle',
	dialect: 'postgresql',
	dbCredentials: {
		url: process.env.DATABASE_URL,
	},
});
