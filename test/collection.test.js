import collection from '../src/collection';
import { Widget } from '../src/page-object';
import component from '../src/component';
import absoluteSelector from '../src/absolute-selector';

class Page extends Widget {
  static get scope() {
    return '.home-page';
  }

  get rows() {
    return collection(
      this,
      '.rows',
      class extends Widget {
        get columns() {
          return collection(
            this,
            '.columns',
            class extends Widget {
              get tile() {
                return component(
                  this,
                  class extends Widget {
                    static get scope() {
                      return '.tile';
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  }
}
describe('Unit | Helpers | collection', () => {
  let page;

  beforeEach(() => {
    page = new Page({}, {});
  });

  test('should be ok', () => {
    expect(page).toBeDefined();
  });
  describe('@rows', () => {
    let rows;
    beforeEach(() => {
      rows = page.rows;
    });
    test('should be there', () => {
      expect(rows).toBeDefined();
      expect(rows.count).toBeInstanceOf(Function);
      expect(rows.at).toBeInstanceOf(Function);
    });
    test('should have the correct row children links', () => {
      expect(rows.childrenSelector).toEqual('.home-page .rows');
    })
    describe('@columns', () => {
      let columns;
      beforeEach(() => {
        columns = rows.at(0).columns;
      });
      test('should be there', () => {
        expect(columns).toBeDefined();
        expect(columns.count).toBeInstanceOf(Function);
        expect(columns.at).toBeInstanceOf(Function);
      });
      test('should have the correct column children links', () => {
        expect(columns.childrenSelector).toEqual('.home-page .rows:nth-child(1) .columns');
      });
      describe('@tile', () => {
        let tile;
        beforeEach(() => {
          tile = columns.at(0).tile;
        });
        test('should be ok', () => {
          expect(tile).toBeDefined();
        });
        test('should have the correct scope', () => {
          const expected = '.home-page .rows:nth-child(1) .columns:nth-child(1) .tile';
          const actual = absoluteSelector(tile);
          expect(expected).toEqual(actual);
        });
      });
    });
  });
});
