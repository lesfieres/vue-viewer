module.exports = {
  'load home': browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.js-user-menu')
      .assert.containsText('.js-user-menu button:nth-child(1)', 'LOGIN')
      .assert.containsText('.js-user-menu button:nth-child(2)', 'REGISTER');
  },
  'navigate to register user': browser => {
    browser
      .click('.js-user-menu button:nth-child(2)')
      .waitForElementVisible('.register-container', 5000)
      .assert.elementPresent('.register-container input');
  },
  'register the user': browser => {
    browser
      .waitForElementVisible('.register-container input', 5000)
      .setValue('.register-container input[type=text]', 'test')
      .setValue('.register-container input[type=password]', 'test')
      .click('.register-container button')
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
