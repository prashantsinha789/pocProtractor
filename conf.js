var HtmlReporter = require('protractor-beautiful-reporter');
// An example configuration file.
exports.config = {
    directConnect: true,

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'chrome',
        // 'chromeOptions': {
        //     'args': ['--headless', '--no-sandbox', '--disable-dev-shm-usage', '--disable-browser-side-navigation', '--disable-setuid-sandbox', '--disable-gpu', '--ignore-certificate-errors', '--ignore-ssl-errors', '--disable-infobars=true'],
        // }
    },

    // Framework to use. Jasmine is recommended.
    framework: 'jasmine',

    // Spec patterns are relative to the current working directory when
    // protractor is called.
    specs: ['specs/*spec.js'],

    // Options to be passed to Jasmine.
    jasmineNodeOpts: {
        defaultTimeoutInterval: 300000
    },

    onPrepare: function() {
        // Add a screenshot reporter and store screenshots to `/tmp/screenshots`:
        jasmine.getEnv().addReporter(new HtmlReporter({
            baseDirectory: 'reports',
            takeScreenShotsForSkippedSpecs: true,
            takeScreenShotsOnlyForFailedSpecs: true
        }).getJasmine2Reporter());
    }





};