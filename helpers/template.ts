import { spawnSync, SpawnSyncReturns } from 'child_process';
import findCacheDir from 'find-cache-dir';
import { readdir } from 'fs/promises';
import tempy from 'tempy';
import { remove } from 'fs-extra';

const ensureCacheDir = async () => {
  const dir = findCacheDir({ name: 'wekit' });
  if (dir) {
    return dir;
  }

  return tempy.directory();
};

function pull(repo: string, target: string): SpawnSyncReturns<Buffer> {
  return spawnSync('git', ['clone', repo, target], { shell: false, stdio: 'ignore' });
}

export const loadTemplate = async () => {
  const dir = await ensureCacheDir();
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
