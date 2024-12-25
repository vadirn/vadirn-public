import { fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		await new Promise(resolve => setTimeout(resolve, 3000));

		console.log(data);

		return fail(400, { message: 'Something went wrong' });

		// return { message: 'Thanks for reaching out' };
	},
};
