import {
	ContactRequests,
	type ContactFormData,
} from '@domain/all/contact-form';
import { fail } from '@sveltejs/kit';
import { db } from '$lib/server/database';

const BAD_REQUEST = 400;

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const data = Object.fromEntries(formData.entries()) as ContactFormData;

		const result = await db.add(ContactRequests, data);

		if (result.ok) {
			return { message: 'Message received. Thanks for reaching out!' };
		}

		return fail(BAD_REQUEST, { message: 'Something went wrong 🤔' });
	},
};
