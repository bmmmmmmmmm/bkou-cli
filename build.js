const { build, context } = require('esbuild');
const { join } = require('path');
const { readdirSync, existsSync } = require('fs');

const getBinEntries = () => {
  const binDir = join(__dirname, 'src', 'bin');
  const entries = [];

  entries.push(join(binDir, 'main.ts'));

  try {
    const subDirs = readdirSync(binDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    for (const dir of subDirs) {
      const toolDir = join(binDir, dir);
      if (existsSync(toolDir)) {
        const toolFiles = readdirSync(toolDir);
        toolFiles.forEach(file => {
          if (file.endsWith('.ts')) {
            entries.push(join(toolDir, file));
          }
        });
      }
    }
  } catch (err) {
    console.error('readDir failed:\n', err);
  }

  return entries;
};

// const checkShebang = async (entryPoints) => {
//   const fs = require('fs').promises;
//   const shebangedFiles = new Set();

//   for (const entry of entryPoints) {
//     try {
//       const content = await fs.readFile(entry, 'utf8');
//       if (content.startsWith('#!/usr/bin/env node')) {
//         shebangedFiles.add(entry);
//       }
//     } catch (err) {
//       console.error(`Error reading file ${entry}:\n`, err);
//     }
//   }

//   return shebangedFiles;
// };

const createBuildOptions = async () => {
  const entryPoints = getBinEntries();
  console.log('entryPoints:\n', entryPoints);
  // const shebangedFiles = await checkShebang(entryPoints);
  // const allHaveShebang = entryPoints.every(entry => shebangedFiles.has(entry));

  return {
    entryPoints,
    bundle: true,
    platform: 'node',
    target: 'node14',
    outdir: 'dist',
    format: 'cjs',
    minify: false,
    sourcemap: true,
    external: ['node:fs', 'node:path', 'node:os', 'readline'],
    // banner: {
    //   js: allHaveShebang ? '' : '#!/usr/bin/env node',
    // },
  };
};

const devBuild = async () => {
  try {
    const buildOptions = await createBuildOptions();
    const ctx = await context({
      ...buildOptions,
    });

    await ctx.watch();
    console.log('devBuild Success, Watching file changes...');
  } catch (err) {
    console.error('devBuild Failed:\n', err);
    process.exit(1);
  }
};

const prodBuild = async () => {
  try {
    const buildOptions = await createBuildOptions();
    const result = await build({
      ...buildOptions,
      minify: true,
      sourcemap: false,
    });
    console.log('prodBuild Success:\n', result);
  } catch (err) {
    console.error('prodBuild Failed:\n', err);
    process.exit(1);
  }
};

const buildMode = process.argv[2];
if (buildMode === 'dev') {
  devBuild();
} else {
  prodBuild();
}
