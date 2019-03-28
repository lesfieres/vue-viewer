// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'load home': (browser) => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.welcome')
      .assert.containsText('h1', 'Welcome to Vuetify')
  },
  'navigate to books': (browser) => {
    browser
      .click('#toolbar-books-button')
      .waitForElementVisible('#books-container', 5000)
      .assert.elementPresent('input')
  },
  'search books using game as title': (browser) => {
    browser
      .setValue('input[type=text]', 'game')
      .pause(5000)
      .getLogTypes((result) => console.log(result))
      .getLog('browser', (logEntriesArray)=> console.log(logEntriesArray))
      .assert.elementCount('#books-container > div.layout.row.wrap > div', 60)
      .end();
  }
};
