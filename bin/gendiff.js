#!/usr/bin/env node

import { Command } from 'commander';
import _ from 'lodash';
import genDiff from '../src/index.js';
import readFile from '../src/utils.js';

const program = new Command();

program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const file1 = readFile(filepath1);
    const file2 = readFile(filepath2);

    const parsedFile1 = JSON.parse(file1);
    const parsedFile2 = JSON.parse(file2);

    const keys1 = Object.keys(parsedFile1);
    const keys2 = Object.keys(parsedFile2);

    const shareKeys = _.union(keys1, keys2).sort();

    const result = shareKeys.map((key) => genDiff(key, parsedFile1, parsedFile2)).join(' ');
    console.log(`{\n ${result}}`);
  });

program.parse(process.argv);
