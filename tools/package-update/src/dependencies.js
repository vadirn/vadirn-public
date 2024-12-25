import { readFile, writeFile } from 'fs/promises';

export async function getPackageDependencies(path) {
	const txt = await readFile(path, { encoding: 'utf-8' });
	const json = JSON.parse(txt);

	return {
		name: json.name,
		...(json.dependencies && { dependencies: json.dependencies }),
		...(json.devDependencies && { devDependencies: json.devDependencies }),
	};
}

export async function writeUpdatedDependencies(path, dependencies) {
	const txt = await readFile(path, { encoding: 'utf-8' });
	const json = JSON.parse(txt);

	if (json.dependencies && dependencies.dependencies) {
		json.dependencies = Object.assign(
			json.dependencies,
			dependencies.dependencies,
		);
	}
	if (json.devDependencies && dependencies.devDependencies) {
		json.devDependencies = Object.assign(
			json.devDependencies,
			dependencies.devDependencies,
		);
	}

	await writeFile(path, JSON.stringify(json, null, '\t'));
}

export async function getLatestVersion(name) {
	const data = await fetch(`https://registry.npmjs.org/${name}`);
	const json = await data.json();

	return json['dist-tags'].latest;
}
