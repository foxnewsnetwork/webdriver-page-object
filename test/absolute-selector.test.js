import absoluteSelector from '../src/absolute-selector';
import { Widget } from '../src/page-object';
import component from '../src/component';

class Page extends Widget {
  static get scope() {
    return '.grand-parent';
  }

  get myWidget() {
    return component(
      this,
      class extends Widget {
        static get scope() {
          return '.my-widget';
        }

        get childWidget() {
          return component(
            this,
            class extends Widget {
              static get scope() {
                return '.child-widget';
              }
            }
          );
        }
      }
    );
  }
}
describe('Unit | Helpers | absoluteSelector', () => {
  let page;

  beforeEach(() => {
    page = new Page({});
  });

  test('should have the expected scope', () => {
    expect(page.scope).toEqual('.grand-parent');
  });
  describe('@page', () => {
    test('should be correct', () => {
      expect(absoluteSelector(page)).toEqual('.grand-parent');
    });
    describe('@myWidget', () => {
      let myWidget;
      beforeEach(() => {
        myWidget = page.myWidget;
      });
      test('should be correct', () => {
        expect(absoluteSelector(myWidget)).toEqual('.grand-parent .my-widget');
      });
      describe('@childWidget', () => {
        let childWidget;
        beforeEach(() => {
          childWidget = myWidget.childWidget;
        });
        test('should be correct', () => {
          expect(absoluteSelector(childWidget)).toEqual('.grand-parent .my-widget .child-widget');
        });
      });
    });
  });
});
