import { append } from './string';

export default function absoluteSelector({ parentScope, scope }) {
  return append(parentScope, scope);
}
