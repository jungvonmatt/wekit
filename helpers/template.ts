import { spawnSync, SpawnSyncReturns } from 'child_process';
import { readdir } from 'fs/promises';
import tempy from 'tempy';
import { remove } from 'fs-extra';

function pull(repo: string, target: string): SpawnSyncReturns<Buffer> {
  return spawnSync('git', ['clone', repo, target], { shell: false, stdio: 'ignore' });
}

export const loadTemplate = async () => {
  const dir = tempy.directory();
  const files = await readdir(dir);
 
  if (files.length > 0) {
    await remove(dir);
  }

  const result = pull('git@github.com:jungvonmatt/wekit.git', dir);
  if (result.status !== 0) {
    throw new Error('Error fetching repository');
  }


  return dir;
};
