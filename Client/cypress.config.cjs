
const { injectQuasarDevServerConfig } = require('@quasar/quasar-app-extension-testing-e2e-cypress/cct-dev-server');
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  fixturesFolder: 'test/cypress/fixtures',
  screenshotsFolder: 'test/cypress/screenshots',
  videosFolder: 'test/cypress/videos',
  video: true,
  e2e: {
    // setupNodeEvents(on, config) {},
    baseUrl: 'http://localhost:9000/#',
    supportFile: 'test/cypress/support/e2e.js',
    specPattern: 'test/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
  },
  component: {
    // setupNodeEvents(on, config) {},
    supportFile: 'test/cypress/support/component.js',
    specPattern: 'src/**/*.cy.{js,jsx,ts,tsx}',
    indexHtmlFile: 'test/cypress/support/component-index.html',
    devServer: injectQuasarDevServerConfig(),
  },
});
