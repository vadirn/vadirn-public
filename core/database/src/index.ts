import { drizzle } from 'drizzle-orm/neon-http';
import { resultOf } from '@libs/result';
import { contacts } from './schema/contacts';
import type { ContactFormData } from '@domain/all/contact-form';

export class Database {
	private db;

	constructor(databaseUrl: string) {
		this.db = drizzle(databaseUrl);
	}

	addContact = async (contact: ContactFormData) => {
		const result = await resultOf(
			this.db.insert(contacts)
				.values(contact)
				.returning(),
		);

		return result;
	};
}
