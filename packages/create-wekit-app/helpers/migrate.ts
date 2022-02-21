import { spawn } from 'child_process';
import chalk from 'chalk';

export async function runMigrations(): Promise<void> {
  return new Promise((resolve, reject) => {
    const migrate = spawn('npx', ['migrations', 'migrate', '--yes', '--no-bail']);
    const chunks = 0;
    migrate.stdout.on('data', (data) => {
      const text = data.toString();

      for (const match of text.matchAll(/Found\s*(\d+)\s*unexecuted migrations/g)) {
        const [, num] = match;
        console.log(`Found ${chalk.green(num)} unexecuted migrations`);
      }

      for (const match of text.matchAll(/Run migration\s*([^\s]+)\s*in environment\s*(\w+)/g)) {
        const [, version, environment] = match;
        console.log(
          `Run migration ${chalk.cyan(version)} in environment ${chalk.cyan(environment)}`
        );
      }
    });

    migrate.stderr.on('data', function (data) {
      console.error(chalk.red(data.toString()));
    });

    migrate.on('exit', function (code) {
      if (code) {
        reject();
      } else {
        resolve();
      }
    });
  });
}
