import { all as _all, any as _any } from './utils';

export function liftP<A, B>(fn: (a: A) => B) {
  return async (promiseA: Promise<A>) => fn(await promiseA);
}

export function liftPn<T>(fn: (...xs: Array<any>) => T) {
  return async (...promises: Array<Promise<any>>) => {
    const results = await Promise.all(promises);
    return fn(...results);
  }
}

/**
 * Returns if Promise<true> if all the Promises given it are true
 */
export const all = liftPn(_all);
export const any = liftPn(_any);
