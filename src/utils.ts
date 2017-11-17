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
