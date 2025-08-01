#!/usr/bin/env node

import { spawn } from 'child_process';
import { join } from 'path';

const mainPath = join(__dirname, '../main.js');
const args = ['rb', ...process.argv.slice(2)];
const child = spawn(process.execPath, [mainPath, ...args], {
  stdio: 'inherit',
  env: process.env
});
child.on('close', (code) => {
  process.exit(code || 0);
});
