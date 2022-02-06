import { spawn } from 'child_process';

export const binCheck = (name: string, args: string[] = []): Promise<false | string> =>
  new Promise((resolve) => {
    let result = '';
    const check = spawn(name, args, { timeout: 10000 });
    check.stdout.on('data', (data) => {
      result = `${data}`;
    });

    check.on('exit', (code) => {
      if (!code) {
        resolve(result);
      } else {
        resolve(false);
      }
    });
  });
