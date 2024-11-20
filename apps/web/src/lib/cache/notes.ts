import { toKebabCase } from '@workspace/standard/string';
import { get } from 'svelte/store';
import { app } from '$lib/paths/app';
import { page } from '$app/stores';

export const draftNotes = [
	'Core?',
];

export const notes = [
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
	'Conventional Commits and Reasons for Code Change',
];

const notesMap = new Map(
	notes.map(title => [toKebabCase(title), title]),
);

export function getNoteTitle(slug: string) {
	return notesMap.get(slug);
}

export function note(title: string) {
	return app.notes(title).toString();
}

export function getCurrentNoteTitle() {
	const slug = get(page).url.pathname.split('/').pop();

	return notesMap.get(slug);
}
