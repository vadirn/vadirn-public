#!/usr/bin/env node

import { monorepo } from '@tools/monorepo';
import {
	getLatestVersion,
	getPackageDependencies,
	writeUpdatedDependencies,
} from './dependencies.js';
import { awaitYesNoInput, closeReadline } from './interaction.js';
import { findPackages } from './packages.js';

async function main() {
	const directories = [
		monorepo.apps(),
		monorepo.ui(),
		monorepo.core(),
		monorepo.domain(),
		monorepo.tools(),
		monorepo.libs(),
	];

	process.stdout.write('Looking for packages in workspace directories:\n');
	for (const folder of directories) {
		process.stdout.write(`- ${folder}\n`);
	}

	const packages = await findPackages(...directories);

	for (const pkg of packages) {
		const {
			name,
			dependencies,
			devDependencies,
		} = await getPackageDependencies(pkg);

		process.stdout.write(`Checking ${name}...\n`);

		const patch = await getUpdatePatch(dependencies ?? {});
		const devPatch = await getUpdatePatch(devDependencies ?? {});

		if (Object.keys(patch).length > 0 || Object.keys(devPatch).length > 0) {
			await writeUpdatedDependencies(pkg, {
				dependencies: patch,
				devDependencies: devPatch,
			});
		}
	}

	closeReadline();
}

async function getUpdatePatch(dependencies) {
	const patch = {};

	for (const [name, version] of Object.entries(dependencies)) {
		if (version.includes('workspace:')) continue;
		const latestVersion = await getLatestVersion(name);

		if (version === latestVersion) continue;

		const shouldUpdate = await awaitYesNoInput(
			`Update ${name} from ${version} to ${latestVersion}?`,
		);

		if (shouldUpdate) {
			patch[name] = latestVersion;
		}
	}

	return patch;
}

main();
