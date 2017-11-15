import attribute from './attribute';
import { contains } from './helpers/string';

export default async function hasClass(widget, className, selector = '') {
  const classNames = await attribute(widget, 'class', selector);
  return contains(classNames, className);
}
