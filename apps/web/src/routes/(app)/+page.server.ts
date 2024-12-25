import {
	ContactRequests,
	type ContactFormData,
} from '@domain/all/contact-form';
import { fail } from '@sveltejs/kit';
import { db } from '$lib/server/database';

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const data = Object.fromEntries(formData.entries()) as ContactFormData;

		const result = await db.add(ContactRequests, data);

		if (result.ok) {
			return { message: 'Message received. Thanks for reaching out!' };
		}

		return fail(400, { message: 'Something went wrong 🤔' });
	},
};
