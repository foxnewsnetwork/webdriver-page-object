export const isBlank = (a?: any) => a == null || a === '';

export const isPresent = (a?: any) => !isBlank(a);

interface Hash<T> {
  [key: string]: T
}
export function getWithDefault<T>(obj: Hash<T>, key: string, def: T): T {
  let res = def;
  if (obj != null && obj[key] != null) {
    res = obj[key];
  }
  return res;
}

interface InvokeFn<T> {
  (...args: Array<any>): T
}
export function invoke<T>(fName: string, ...args: Array<any>): InvokeFn<T> {
  return (obj: Hash<Function>) => obj[fName].apply(obj, args);
}

export function invokeWithDefault<T>(
  defn: InvokeFn<T>,
  fName: string,
  ...args: Array<any>
): InvokeFn<T> {
  return (obj: Hash<Function>) =>
    getWithDefault(obj, fName, defn).apply(obj, args);
}

export function tryInvoke<T>(
  fname: string,
  ...args: Array<any>
): InvokeFn<T | void> {
  return invokeWithDefault(() => {}, fname, ...args);
}

export const and = (a: boolean, b: boolean) => a && b;

export const or = (a: boolean, b: boolean) => a || b;

export const add = (a: number, b: number) => a + b;

export const all = (...booleans: Array<boolean>) => booleans.reduce(and, true);

export const any = (...booleans: Array<boolean>) => booleans.reduce(or, false);

export function id<T>(x: T): T {
  return x;
}

interface MapFn<A,B> {
  (a: A, key: string): B
}

export function mapVal<T, S>(hash: Hash<T>, fn: MapFn<T,S>): Hash<S> {
  const keys = Object.keys(hash);
  const output: Hash<S> = {};

  for(let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const val = hash[key];
    output[key] = fn(val, key);
  }

  return output;
}
