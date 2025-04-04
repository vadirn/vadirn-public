import { access, readdir } from 'fs/promises';
import { join } from 'path';

/**
 * Looks for _/package.json files in the given directories
 */
export async function findPackages(...dirs) {
	const packages = new Set();

	for (const dir of dirs) {
		const files = await readdir(dir, { withFileTypes: true });

		await Promise.all(files.map(file => addPackages(file, packages)));
	}

	return [...packages];
}

async function addPackages(file, packages) {
	if (file.isDirectory() && file.name !== 'node_modules') {
		const packageJsonPath = join(file.parentPath, file.name, 'package.json');

		if (await fileExists(packageJsonPath)) {
			packages.add(packageJsonPath);
		}
	}

	if (file.isFile() && file.name === 'package.json') {
		const packageJsonPath = join(file.parentPath, file.name);

		if (await fileExists(packageJsonPath)) {
			packages.add(packageJsonPath);
		}
	}
}

async function fileExists(path) {
	try {
		await access(path);

		return true;
	}
	catch {
		return false;
	}
}
