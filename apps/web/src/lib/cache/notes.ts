import { app } from '$lib/paths/app';

export const note = (title: string) => app.notes(title).toString();

export const notes = [
	'Core?',
	'Challenges of Server Data Representation on the Client: Collections',
	'Typesafe API Routes: Methods, Expected Responses, and More',
	'Achieving Typesafe Routes Through Proxy Objects',
	'Result Type for Better Error Handling',
	'Challenges of Server Data Representation on the Client: Models',
	'Untangling Dependencies with a Layered Monorepo',
	'Layers of Isolation',
	'The First Step to a Better Developer Experience',
	'State Machines for the Rest of Us',
	'Awesome Pull Requests',
	'Conventional Commits and Reasons to Change Code',
];
