#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const program = new Command();

const readFile = (filePath) => {
  const currentDirecory = process.cwd();
  const fullPath = path.resolve(currentDirecory, filePath);
  return fs.readFileSync(fullPath, { encoding: 'utf8' });
};

program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const file1 = readFile(filepath1);
    const file2 = readFile(filepath2);

    const parseFile1 = JSON.parse(file1);
    const parseFile2 = JSON.parse(file2);

    const keys1 = Object.keys(parseFile1);
    const keys2 = Object.keys(parseFile2);

    const shareKeys = _.union(keys1, keys2).sort();

    const genDiff = (key) => {
      let string = '';
      if (parseFile1[key] === parseFile2[key]) {
        string = `  ${key}: ${parseFile1[key]}\n`;
      } if (parseFile1[key] !== parseFile2[key]) {
        string = `- ${key}: ${parseFile1[key]}\n + ${key}: ${parseFile2[key]}\n`;
      } if (!_.has(parseFile1, key)) {
        string = `+ ${key}: ${parseFile2[key]}\n`;
      } if (!_.has(parseFile2, key)) {
        string = `- ${key}: ${parseFile1[key]}\n`;
      }
      return string;
    };

    const result = shareKeys.map((key) => genDiff(key)).join(' ');
    console.log(`{\n ${result}}`);
  });

program.parse(process.argv);
