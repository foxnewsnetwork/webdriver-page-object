import App from '../page-objects/app';

function now() {
  return new Date();
}
const MINUTES_30 = 30 * 60 * 1000;
function randomChoice(array) {
  const index = Math.floor(array.length * Math.random());
  return array[index];
}
describe('navigation around', () => {
  const driverAPI = { browser };
  let app;
  let startTime;
  beforeEach(async () => {
    app = new App(driverAPI);
    startTime = now();
  });

  it('should crawl for 30 minutes without crashing', async () => {
    let activeWidget = app.pagehead;
    let actions = await activeWidget.availableActions();
    while (now() - startTime < MINUTES_30) {
      const action = randomChoice(actions);
      activeWidget = await action();
      actions = await activeWidget.availableActions();
    }
  });
});
