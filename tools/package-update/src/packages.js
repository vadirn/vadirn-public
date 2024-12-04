import { access, readdir } from 'fs/promises';
import { join } from 'path';

/**
 * Looks for _/package.json files in the given directories
 */
export async function findPackages(...dirs) {
	const packages = [];

	for (const dir of dirs) {
		const files = await readdir(dir, { withFileTypes: true });

		for (const file of files) {
			if (file.isDirectory() && file.name !== 'node_modules') {
				const packageJsonPath = join(
					file.parentPath,
					file.name,
					'package.json',
				);

				if (await fileExists(packageJsonPath)) {
					packages.push(packageJsonPath);
				}
			}
		}
	}

	return packages;
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