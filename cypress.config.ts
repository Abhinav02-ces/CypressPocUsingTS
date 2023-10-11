import { defineConfig } from 'cypress';
import _ from 'lodash';
import * as fs from 'fs';

export default defineConfig({
  defaultCommandTimeout: 8000,
  includeShadowDom: true,
  chromeWebSecurity: false,
  animationDistanceThreshold: 50,
  screenshotOnRunFailure: true,
  videoCompression: false,
  reporter: 'cypress-multi-reporters',
  viewportWidth: 1280,
  viewportHeight: 720,
  reporterOptions: {
    reporterEnabled: 'mochawesome',
    mochawesomeReporterOptions: {
      reportDir: 'cypress/reports/mocha',
      quite: true, 
      overwrite: false,
      html: true,
      json: true,
    },
  },
  video: true,
  retries: {
    runMode: 1,
    openMode: 0,
  },
  e2e: {
    baseUrl: 'https://demoqa.com/',
    setupNodeEvents(on, config) {
      on('after:spec', (spec, results) => {
        if (results && results.video) {
          // Do we have failures for any retry attempts?
          const failures = _.some(results.tests, (test) => {
            return _.some(test.attempts, { state: 'failed' });
          });
          if (!failures) {
            // delete the video if the spec passed and no tests retried
            fs.unlinkSync(results.video);
          }
        }
      });
    },
    specPattern: 'cypress/e2e/testScripts',
  },
});
