import genDiff from '../src/index.js';

describe('genDiff', () => {
  it('test 1', () => {
    const actual = genDiff({}, {});
    expect(actual).toEqual({});
  });
});
