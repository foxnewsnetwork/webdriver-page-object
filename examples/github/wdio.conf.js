export default {
  specs: ['./specs/*.js'],
  exclude: [],
  maxInstances: 1, // it depends on the plan of the cloud servvice
  sync: true,
  logLevel: 'error',
  coloredLogs: true,
  baseUrl: 'https://github.com/foxnewsnetwork/webdriver-page-object',
  waitforTimeout: 20000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 30000
  }
};
