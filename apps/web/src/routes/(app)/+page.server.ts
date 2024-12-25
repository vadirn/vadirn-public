import { fail } from '@sveltejs/kit';
import type { ContactFormData } from '@domain/all/contact-form';

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const data = Object.fromEntries(formData.entries()) as ContactFormData;

		console.log(data);

		return fail(400, { message: 'Something went wrong 🤔' });

		// return { message: 'Message received. Thanks for reaching out!' };
	},
};
