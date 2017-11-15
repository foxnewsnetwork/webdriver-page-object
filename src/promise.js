import { all as _all, any as _any } from './utils';

export function liftP(fn) {
  return async (promiseA) => fn(await promiseA);
}

export function liftPn(fn) {
  return async (...promises) => {
    const results = await Promise.all(promises);
    return fn(...results);
  }
}

/**
 * Returns if Promise<true> if all the Promises given it are true
 */
export const all = liftPn(_all);
export const any = liftPn(_any);
