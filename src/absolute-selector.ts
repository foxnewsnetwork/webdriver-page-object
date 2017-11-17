import { Widget } from './page-object';
import { append } from './string';

export default function absoluteSelector({ parentScope, scope }: Widget): string {
  return append(parentScope, scope);
}
