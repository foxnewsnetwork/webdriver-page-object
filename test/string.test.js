import { contains, append, indexOf } from '../src/string';

describe('Unit | Helpers | string', () => {
  describe('append', () => {
    test('should be ok', () => {
      expect(append).toBeInstanceOf(Function);
    });
    test('should properly append strings', () => {
      const actual = append('dogs', 'bark');
      const expected = 'dogs bark';
      expect(actual).toEqual(expected);
    });
  });
  describe('indexOf', () => {
    test('should give the correct index', () => {
      const words = 'this is a string';
      expect(indexOf(words, 'is')).toEqual(2);
    });
    test('should never give me trash', () => {
      const wrong = {};
      expect(indexOf(wrong, 'no')).toEqual(-1);
    });
  });
  describe('contains', () => {
    test('should contain the right string', () => {
      expect(contains('big string', 'big')).toBeTruthy();
    });
    test('should always be sensible', () => {
      expect(contains(undefined, 'asdf')).toBeFalsy();
    });
  });
});
