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
        browser.manage().window().maximize();

      /*  var MailListener = require("mail-listener2");

        // here goes your email connection configuration
        var mailListener = new MailListener({
            username: "marginedgetest20@gmail.com",
            password: "Test@12345",
            host: "imap.gmail.com",
            port: 993, // imap port 
            tls: true,
            tlsOptions: { rejectUnauthorized: false },
            mailbox: "INBOX", // mailbox to monitor 
            searchFilter: ["UNSEEN", "FLAGGED"], // the search filter being used after an IDLE notification has been retrieved 
            markSeen: false, // all fetched email willbe marked as seen and not fetched next time 
            fetchUnreadOnStart: true, // use it only if you want to get all unread email on lib start. Default is `false`, 
            mailParserOptions: { streamAttachments: true }, // options to be passed to mailParser lib. 
            attachments: true, // download attachments as they are encountered to the project directory 
            attachmentOptions: { directory: "attachments/" } // specify a download directory for attachments 
        });

        mailListener.start();

        mailListener.on("server:connected", function() {
            console.log("Mail listener initialized");
        });

        // mailListener.on("mail", function(mail, seqno, attributes) {
        //     // do something with mail object including attachments
        //     console.log("emailParsed", mail);
        //     // mail processing code goes here
        // });

        // mailListener.start();

        // mailListener.on("server:connected", function() {
        //     console.log("Mail listener initialized");
        // });

        // // mailListener.on("mail", function(mail, seqno, attributes) {
        // //     // do something with mail object including attachments
        // //     console.log("emailParsed", mail);
        // //     // mail processing code goes here
        // // });

        // mailListener.on("server:disconnected", function() {
        //     console.log("imapDisconnected");
        // });

        // mailListener.on("error", function(err) {
        //     console.log('MailListener error: ' + err);
        //     reject(err);
        // });

        // global.mailListener = mailListener;

        */


        // Add a screenshot reporter and store screenshots to `/tmp/screenshots`:
        jasmine.getEnv().addReporter(new HtmlReporter({
            baseDirectory: 'reports',
            takeScreenShotsForSkippedSpecs: true,
            takeScreenShotsOnlyForFailedSpecs: true
        }).getJasmine2Reporter());
    },

    onCleanUp: function() {
       // mailListener.stop();
    },





};