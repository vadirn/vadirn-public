export type ContactFormData = {
	plan: string;
	name: string;
	email: string;
	company?: string;
	message?: string;
}

export const ContactRequests = 'contact-requests';