const tests = {
  'Test local': (browser) => {
    return browser
        .url('http://localhost:3000/CoreHello/CoreHello.html')
        .waitForElementVisible('body', 1000)
        .assert.containsText('h1',
            'Team 3\'s Excessively Simplistic Core Component!')
        .end();
  },
};

module.exports = tests;
