import { fail } from '@sveltejs/kit';
import { db } from '$lib/server/database';
import type { ContactFormData } from '@domain/all/contact-form';

const BAD_REQUEST = 400;

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const entries = Object.fromEntries(formData.entries()) as ContactFormData;

		// Transform the form data to match our domain model
		const contactData: ContactFormData = {
			name: entries.name,
			email: entries.email,
			plan: entries.plan,
			company: entries.company,
			message: entries.message,
		};

		const result = await db.addContact(contactData);

		if (result.ok) {
			return { message: 'Message received. Thanks for reaching out!' };
		}

		return fail(BAD_REQUEST, { message: 'Something went wrong 🤔' });
	},
};
