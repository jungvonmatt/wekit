import { spawnSync } from 'child_process';
import findCacheDir from 'find-cache-dir';
import { readdir } from 'fs/promises';
import tempy from 'tempy';
import { remove } from 'fs-extra';

const ensureCacheDir = async () => {
  const dir = findCacheDir({ name: 'contentful-hugo' });
  if (dir) {
    return dir;
  }

  return tempy.directory();
};

async function pull(repo: string, target: string): Promise<string> {
  spawnSync('git', ['clone', repo, target], {shell: false, stdio: 'ignore'});
  return target;
}

export const loadTemplate = async (cache?: boolean) => {
  const dir = await ensureCacheDir();
  const files = await readdir(dir);
  if (!cache || files.length === 0) {
    if (files.length > 0) {
      await remove(dir);
    }
    pull('git@github.com:jungvonmatt/contentful-hugo.git', dir);
  }

  return dir;
};
