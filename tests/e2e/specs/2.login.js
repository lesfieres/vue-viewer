module.exports = {
  'load home': browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible('#app', 5000)
      .waitForElementVisible('.js-user-menu', 5000)
      .assert.containsText('.js-user-menu button:nth-child(1)', 'LOGIN')
      .assert.containsText('.js-user-menu button:nth-child(2)', 'REGISTER');
  },
  'show login form': browser => {
    browser
      .click('.js-user-menu button:nth-child(1)')
      .waitForElementVisible('.js-user-menu input', 5000)
      // button:nth-child(3) is not the third button, is the first button, but the third element,
      // which should match a button
      .assert.containsText('.js-user-menu button:nth-child(3)', 'LOGIN')
      .assert.containsText('.js-user-menu button:nth-child(4)', 'CANCEL');
  },
  'cancel login form and show it again': browser => {
    browser
      .click('.js-user-menu button:nth-child(4)')
      .pause(200)
      .click('.js-user-menu button:nth-child(1)')
      .waitForElementVisible('.js-user-menu input', 5000);
  },
  'do login': browser => {
    browser
      .setValue('.js-user-menu input[type=text]', 'test')
      .setValue('.js-user-menu input[type=password]', 'test')
      .click('.js-user-menu button:nth-child(3)')
      .waitForElementVisible('.js-user-menu span', 5000)
      .assert.containsText('.js-user-menu span', 'Welcome test, ')
      .assert.elementPresent('.js-user-menu a')
      .assert.containsText('.js-user-menu a', 'Logout');
  },
  logout: browser => {
    browser
      .click('.js-user-menu a')
      .pause(500)
      .assert.containsText('.js-user-menu button:nth-child(1)', 'LOGIN')
      .assert.containsText('.js-user-menu button:nth-child(2)', 'REGISTER')
      .end();
  },
};
