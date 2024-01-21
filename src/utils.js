import fs from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const readFile = (file) => {
  const fullPath = resolve(__dirname, '..', '__fixtures__', file);
  return fs.readFileSync(fullPath, { encoding: 'utf8' });
};

export default readFile;
