import App from './fixtures/app';
import { FakeDriver } from './fixtures/driver-api';

describe('Unit | PageAction', () => {
  let driver;
  beforeEach(() => {
    driver = new FakeDriver();
  });

  describe('app', () => {
    let app;
    beforeEach(() => {
      app = new App(driver);
    });
    describe('.homePage', () => {
      let home;
      beforeEach(() => {
        home = app.homePage;
      });
      test('should have the home page widget', () => {
        expect(home).toBeDefined();
      });
      test('should have the correct scope', () => {
        expect(home.scope).toEqual('.home-page');
      });
      test('should be active', () => {
        expect(home.isActive).toEqual(true);
      });
      describe('.actions', () => {
        let actions;
        beforeEach(() => {
          actions = home.actions;
        });
        describe('keys', () => {
          let keys;
          beforeEach(() => {
            keys = Object.keys(actions);
          });
          test('should have singular length', () => {
            expect(keys).toHaveLength(1);
          });
          test('should contain the clickBanner', () => {
            expect(actions.clickBanner).toBeInstanceOf(Function);
          });
        });
      });
      describe('.availableActions() async', () => {
        let actions;
        beforeEach(async () => {
          actions = await home.availableActions();
        });
        describe('keys', () => {
          let keys;
          beforeEach(() => {
            keys = Object.keys(actions);
          });
          test('should have singular length', () => {
            expect(keys).toHaveLength(1);
          });
          test('should contain the clickBanner', () => {
            expect(actions.clickBanner).toBeInstanceOf(Function);
          });
        });
        describe('.goProduct', () => {
          let product;
          beforeEach(async () => {
            product = await actions.clickBanner();
          });
          test('should be the resultant page', () => {
            expect(product).toEqual(app.productPage);
          });
          test('home should not be active', () => {
            expect(home.isActive).toBeFalsy();
          });
          test('product should be active', () => {
            expect(product.isActive).toBeTruthy();
          });
          describe('.availableActions() async', () => {
            let productActions;
            beforeEach(async () => {
              productActions = await product.availableActions();
            });
            test('should have the clickBack', () => {
              expect(productActions.clickBack).toBeInstanceOf(Function);
            });
            describe('.clickBack', () => {
              let againHomePage;
              beforeEach(async () => {
                againHomePage = await productActions.clickBack();
              });
              test('should be the home page again', () => {
                expect(againHomePage).toEqual(home);
              });
            });
          });
        });
      });
    });
    describe('.actions', () => {
      let actions;
      beforeEach(() => {
        actions = app.actions;
      });
      test('should be an object', () => {
        expect(actions).toBeDefined();
      });

      describe('keys', () => {
        let keys;
        const ACTION_NAMES = ['goHome', 'goProduct'];
        beforeEach(() => {
          keys = Object.keys(actions);
        });
        test('should have length 2', () => {
          expect(keys).toHaveLength(2);
        });
        for (const actionName of ACTION_NAMES) {
          test(`has ${actionName}`, () => {
            expect(actions[actionName]).toBeInstanceOf(Function);
          });
        }
      });
    });
  });
});
