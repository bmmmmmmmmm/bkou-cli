#!/usr/bin/env node

import { countWords } from "../../pkg/countWords"

const cw = () => {
  if (process.argv.slice(2).join(' ')) {
    countWords(process.argv.slice(2).join(' '))
    return
  }
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  console.log('输入多行文本，以 "__LEE__" 结束：');
  let inputLines = [];
  rl.on('line', (line) => {
    if (line.trim() === '__LEE__') {
      rl.close();
    } else {
      inputLines.push(line);
    }
  });
  rl.on('close', () => {
    countWords(inputLines.join(' '))
  });
}

cw()
