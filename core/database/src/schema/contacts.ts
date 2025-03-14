import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const contacts = pgTable('contacts', {
	id: uuid('id').primaryKey().defaultRandom(),
	plan: text('plan').notNull(),
	name: text('name').notNull(),
	email: text('email').notNull(),
	company: text('company'),
	message: text('message'),
	createdAt: timestamp('created_at').defaultNow().notNull(),
});
