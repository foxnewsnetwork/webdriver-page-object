import {
  filter,
  into,
  comp,
  map,
  transduce
} from 'transducers-js';
import { invokeWithDefault, invoke, isPresent } from './utils';

const _appendRe = (sentence: string, word: string) => [sentence, word].filter(isPresent).join(' ');
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
export const append = (...words: Array<string>) => transduce(_appendXf, _appendRe, '', words);

/**
 * Exactly the same as String#indexOf
 * except with null checks built in
 *
 * @param {*} words
 * @param {*} word
 */
export const indexOf = (words: string, word: string) =>
  invokeWithDefault(() => -1, 'indexOf', word)(words);

export const contains = (words: string, word: string) => indexOf(words, word) >= 0;
