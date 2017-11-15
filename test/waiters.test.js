import { waitUntil, waitMS } from '../src/waiters';

const t = async (x, n = 16) => {
  await waitMS(n, x);
  return x;
};

describe('Util | Waiters', () => {
  describe('waitUntil', () => {
    test('should wait until the desired time', async () => {
      let ap;
      t('eat dog', 333).then(x => (ap = x));
      expect(ap).not.toBeDefined();
      await waitUntil(async () => ap === 'eat dog');
      expect(ap).toEqual('eat dog');
    });
  });
});
