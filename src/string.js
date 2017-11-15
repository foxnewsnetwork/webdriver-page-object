import t from 'transducers-js';
import { invokeWithDefault, invoke, isPresent } from './utils';

const {
  filter,
  into,
  comp,
  map,
  transduce
} = t;

const _appendRe = (sentence, word) => [sentence, word].filter(isPresent).join(' ');
const _appendXf = comp(filter(isPresent), map(invoke('trim')));
/**
 * Joins `isPresent` words together with strings
 * For example, if you do:
 *
 *
 * append('the', 'quick', 'brown', 'fox')
 * // 'the quick brown fox'
 *
 * append('the', 'quick', null, '', 'brown', 'fox')
 * // 'the quick brown fox'
 *
 * @param {Array<string>} words
 */
export const append = (...words) => transduce(_appendXf, _appendRe, '', words);

/**
 * Exactly the same as String#indexOf
 * except with null checks built in
 *
 * @param {*} words
 * @param {*} word
 */
export const indexOf = (words, word) =>
  invokeWithDefault(() => -1, 'indexOf', word)(words);

export const contains = (words, word) => indexOf(words, word) >= 0;
