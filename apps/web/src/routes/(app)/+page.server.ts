export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		await new Promise(resolve => setTimeout(resolve, 3000));

		console.log(data);

		return { success: true };
	},
};
