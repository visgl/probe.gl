import fs from 'fs/promises';
import {existsSync} from 'fs';
import {defineConfig} from 'vite';

/** @see https://vitejs.dev/config/ */
export default defineConfig(async () => ({
  resolve: {alias: await getAliases(`${__dirname}/../..`)},
  server: {open: true}
}));

/** Run against local source */
const getAliases = async (frameworkRootDir) => {
  const modules = await fs.readdir(`${frameworkRootDir}/modules`);
  const aliases = {};
  for (const module of modules) {
    const packageRoot = `${frameworkRootDir}/modules/${module}`;
    if (!existsSync(`${packageRoot}/package.json`)) continue;
    const {name} = JSON.parse(await fs.readFile(`${packageRoot}/package.json`, 'utf8'));
    aliases[name] = `${packageRoot}/src`;
  }
  return aliases;
};
