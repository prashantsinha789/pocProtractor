const { element } = require("protractor");

var marginEdgeLoginPage = function() {
    this.userName = element(by.css('#username'));
    this.passWord = element(by.css('#password'));
    this.loginButton = element(by.cssContainingText('button', `Sign In`));
    this.logoutBtn = element(by.css('.username.dropdown-toggle'));
    this.signout = element(by.css('[ng-click="logout()"]'));
    this.accept = element(by.css('.btn.btn-primary.bootbox-accept'));
    this.logo = element.all(by.css('.navbar-brand'))


    this.loginAs = async function(username, password) {
        await this.userName.sendKeys(username);
        await this.passWord.sendKeys(password);
        await this.loginButton.click();
    }

    this.openApp = async function(url) {
        await browser.get(url);
    };

    this.logout = async function() {
        await this.logoutBtn.click()
        await this.signout.click();
    }

    this.acceptTC = async function() {
        await this.accept.click();
    }
};
module.exports = new marginEdgeLoginPage();