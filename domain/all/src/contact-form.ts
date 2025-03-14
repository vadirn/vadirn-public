/**
 * Contact form data as submitted by users
 */
export type ContactFormData = {
	name: string;
	plan: string;
	email: string;
	company?: string | null;
	message?: string | null;
};
