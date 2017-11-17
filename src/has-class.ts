import { Widget } from './page-object';
import attribute from './attribute';
import { contains } from './string';

export default async function hasClass(
  widget: Widget,
  className: string,
  selector: string = ''
) {
  const classNames = await attribute(widget, 'class', selector);
  return contains(classNames, className);
}
