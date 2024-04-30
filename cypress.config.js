const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://rarocrud-frontend-80bf38b38f1f.herokuapp.com/',
    setupNodeEvents(on, config) {
    },
  },
});
