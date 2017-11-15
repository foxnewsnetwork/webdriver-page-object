import { any, all } from '../src/promise';

const r = x => Promise.resolve(x);

describe('Util | Promise', () => {
  describe('any', () => {
    test('should true when any is true', async () => {
      const x = await any(r(true), r(false), r(false));
      expect(x).toBeTruthy();
    });
    test('should be false when they are all false', async () => {
      const x = await any(r(false), r(false), r(false));
      expect(x).toBeFalsy();
    });
  });
  describe('all', () => {
    test('should false when one of them is false', async () => {
      const x = await all(r(true), r(false), r(false));
      expect(x).toBeFalsy();
    });
    test('should be true when all are true', async () => {
      const x = await all(r(true), r(true), r(true));
      expect(x).toBeTruthy();
    });
  });
});
