#!/usr/bin/env node

import { monorepo } from '@tools/monorepo';
import chalk from 'chalk';
import {
	getLatestVersion,
	getPackageDependencies,
	writeUpdatedDependencies,
} from './dependencies.js';
import { awaitYesNoInput, closeReadline } from './interaction.js';
import { findPackages } from './packages.js';

const write = (...args) => process.stdout.write(...args);

async function main() {
	const cachedAnswers = {};

	const directories = [
		monorepo.root,
		monorepo.apps(),
		monorepo.ui(),
		monorepo.core(),
		monorepo.domain(),
		monorepo.tools(),
		monorepo.libs(),
	];

	write('Looking for packages in workspace directories:\n');
	for (const folder of directories) {
		write(`\t- ${chalk.green(folder)}\n`);
	}

	write('\n');

	const packages = await findPackages(...directories);

	for (const pkg of packages) {
		const {
			name,
			dependencies,
			devDependencies,
		} = await getPackageDependencies(pkg);

		write(`Checking package ${chalk.green(name)}...\n`);

		const patch = await getUpdatePatch(dependencies ?? {}, cachedAnswers);
		const devPatch = await getUpdatePatch(devDependencies ?? {}, cachedAnswers);

		const updatedDependenciesCount
			= Object.keys(patch).length + Object.keys(devPatch).length;

		if (Object.keys(patch).length > 0 || Object.keys(devPatch).length > 0) {
			await writeUpdatedDependencies(pkg, {
				dependencies: patch,
				devDependencies: devPatch,
			});
		}

		if (updatedDependenciesCount > 0) {
			write('\n');
		}
	}

	closeReadline();
}

async function getUpdatePatch(dependencies, cachedAnswers) {
	const patch = {};

	for (const [name, version] of Object.entries(dependencies)) {
		if (version.includes('workspace:')) continue;

		const cachedVersion = cachedAnswers[name];

		if (cachedVersion) {
			write(
				'\t- Auto-updating '
				+ chalk.green(name)
				+ ' from '
				+ chalk.yellow(version)
				+ ' to '
				+ chalk.green(cachedVersion)
				+ '\n',
			);
			patch[name] = cachedVersion;
			continue;
		}

		const latestVersion = await getLatestVersion(name);

		if (version === latestVersion) continue;

		const shouldUpdate = await awaitYesNoInput(
			'\t- Update '
			+ chalk.green(name)
			+ ' from '
			+ chalk.yellow(version)
			+ ' to '
			+ chalk.green(latestVersion)
			+ '?',
		);

		if (shouldUpdate) {
			cachedAnswers[name] = latestVersion;
			patch[name] = latestVersion;
		}
	}

	return patch;
}

main();
