const nightwatchConfig = {
  src_folders: ['NightWatch.tests'],
  selenium: {
    'start_process': false,
    'host': 'hub-cloud.browserstack.com',
    'port': 80,
  },

  test_settings: {
    default: {
      desiredCapabilities: {
        'browserstack.user': 'rixlai1',
        'browserstack.key': process.env.BROWSERSTACK_KEY,
        'browserstack.local': true,
        'browser': 'chrome',
      },
    },
  },
};

// Code to copy seleniumhost/port into test settings
/* eslint-disable-next-line */
for (const config in nightwatchConfig.test_settings) {
  config['selenium_host'] = nightwatchConfig.selenium.host;
  config['selenium_port'] = nightwatchConfig.selenium.port;
}

module.exports = nightwatchConfig;
