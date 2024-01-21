import _ from 'lodash';

export default (key, parsedFile1, parsedFile2) => {
  let str = '';
  if (parsedFile1[key] === parsedFile2[key]) {
    str = `  ${key}: ${parsedFile1[key]}\n`;
  } if (parsedFile1[key] !== parsedFile2[key]) {
    str = `- ${key}: ${parsedFile1[key]}\n + ${key}: ${parsedFile2[key]}\n`;
  } if (!_.has(parsedFile1, key)) {
    str = `+ ${key}: ${parsedFile2[key]}\n`;
  } if (!_.has(parsedFile2, key)) {
    str = `- ${key}: ${parsedFile1[key]}\n`;
  }
  return str;
};
