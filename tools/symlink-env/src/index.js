import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import { monorepo } from '@tools/monorepo';

const write = message => process.stdout.write(message);

function main() {
	const rootEnv = monorepo.resolve('.env');

	ensureRootEnv(rootEnv);

	const projects = [
		monorepo.apps('web'),
		monorepo.core('database'),
	];

	for (const project of projects) {
		const projectEnv = path.join(project, '.env');

		if (fs.existsSync(projectEnv)) {
			fs.unlinkSync(projectEnv);
		}
		fs.symlinkSync(rootEnv, projectEnv);
		write(chalk.green('✅ Created symlink at: ') + chalk.dim(projectEnv) + '\n');
	}

	write(chalk.green('\n✅ Done!'));
}

function ensureRootEnv(rootEnv) {
	if (fs.existsSync(rootEnv)) return;

	const exampleEnv = path.join(path.dirname(rootEnv), '.env.example');

	if (fs.existsSync(exampleEnv)) {
		fs.copyFileSync(exampleEnv, rootEnv);
		write(
			chalk.yellow('⚠️  Created .env from .env.example at: ')
			+ chalk.dim(rootEnv)
			+ '\n',
		);

		return;
	}

	fs.writeFileSync(rootEnv, '\n');
	write(
		chalk.yellow('⚠️  Created empty .env at: ')
		+ chalk.dim(rootEnv)
		+ '\n',
	);
}

main();
