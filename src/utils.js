export const isBlank = a => a == null || a === '';

export const isPresent = a => !isBlank(a);

export const getWithDefault = (obj, key, def) => (obj != null && obj[key]) || def;

export const invoke = (fName, ...args) => obj => obj[fName].apply(obj, args);

export const invokeWithDefault = (defn, fName, ...args) => obj =>
  getWithDefault(obj, fName, defn).apply(obj, args);

export const tryInvoke = (fname, ...args) => invokeWithDefault(() => {}, fName, ...args);

export const and = (a, b) => a && b;

export const or = (a, b) => a || b;

export const add = (a, b) => a + b;

export const all = (...booleans) => booleans.reduce(and, true);

export const any = (...booleans) => booleans.reduce(or, false);

export const id = (x) => x;
