var Helper = function() {
    this.EC = protractor.ExpectedConditions;

    this.waitForElementToBeVisible = function(elm) {
        browser.wait(this.EC.visibilityOf(elm), 15000);
    };

    this.waitUntilReady = function(elm) {
        return browser.wait(function() {
            return elm.isPresent();
        }, 10000).then(function() {
            return browser.wait(function() {
                return elm.isDisplayed();
            }, 10000);
        });
    };

    this.switchToNonAngularPage = function() {
        browser.waitForAngularEnabled(false);
    };

    this.switchToAngularPage = function() {
        browser.waitForAngularEnabled(true);
    };

    this.waitElementToBeClickable = function(elm) {
        browser.wait(this.EC.elementToBeClickable(elm), 15000);
    };

    // this.getLastEmail = function() {
    //     var deferred = protractor.promise.defer();
    //     console.log("Waiting for an email...");

    //     const globalAny = global;

    //     globalAny.mailListener.on('mail', function(mail, seqno, attributes) {
    //         console.log(`Received: ${mail.subject}`);
    //         deferred.fulfill(mail);
    //     });
    //     return deferred.promise;

    //     // mailListener.on("mail", function(mail) {
    //     //     deferred.fulfill(mail);
    //     // });
    //     // return deferred.promise;
    // };


}
module.exports = Helper;