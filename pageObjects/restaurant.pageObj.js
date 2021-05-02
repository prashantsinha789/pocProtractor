const { element, browser } = require("protractor");
const Helper = require("./helper.pageObj");



var helper = new Helper();

var restaurantPage = function() {
    this.newRestaurantAdd = element(by.css('button[href*="#/restaurantUnit/bulkAdd"]'));
    this.clickConcept = element(by.model('bulkAdd.concept'));
    this.enterConcept = element(by.css('input[placeholder="Enter a Concept"]'));
    this.selctOption = element(by.css('.ui-select-highlight'));
    this.clickCompany = element(by.model('bulkAdd.company'));
    this.enterCompany = element(by.css('input[placeholder="Enter a Company"]'));
    this.clickStatus = element(by.model('bulkAdd.status'));
    this.selectStatus = element(by.cssContainingText('option', 'TESTING'));
    this.restName = element(by.model('unit.name'));
    this.email = element(by.model('unit.inboxEmail'));
    this.zip = element(by.model('unit.zip'));
    this.clickPOS = element(by.model('unit.pos'));
    this.enterPOS = element.all(by.css('input[placeholder="Select a POS"]')).get(2);
    this.clickAcc = element(by.model('unit.accounting'));
    this.enterAcc = element.all(by.css('input[placeholder="Select an Accounting System"]')).get(2);
    this.clickSOL = element(by.model('unit.salesLeadSource'));
    this.enterSOL = element(by.css('input[placeholder="Select a Sales Lead"]'));
    this.userEMail = element(by.model('user.email'));
    this.userLogin = element(by.model('user.login'));
    this.userFname = element(by.model('user.firstName'));
    this.userLname = element(by.model('user.lastName'));
    this.saveBtn1 = element.all(by.cssContainingText('span', 'Save')).get(1);
    this.saveBtn2 = element.all(by.cssContainingText('span', 'Save')).get(2);
    this.subsC = element(by.model('unit.subscription'))





    this.createNewRestuarant = async function(restoName, zipStr, loginID, fname, lName) {

        helper.waitElementToBeClickable(this.newRestaurantAdd);
        browser.driver.sleep(1500)
        await this.newRestaurantAdd.click();
        helper.waitElementToBeClickable(this.clickConcept)
        await this.clickConcept.click();
        await this.enterConcept.sendKeys("Wasabi")
        await this.selctOption.click();
        helper.waitElementToBeClickable(this.clickCompany);
        await this.clickCompany.click();
        helper.waitUntilReady(this.enterCompany);
        await this.enterCompany.sendKeys("Wasabi");
        await this.selctOption.click();
        helper.waitElementToBeClickable(this.clickStatus);
        await this.clickStatus.click();
        await this.selectStatus.click();
        helper.waitUntilReady(this.restName);
        await this.restName.sendKeys(restoName);
        // helper.waitUntilReady(this.email);
        // await this.email.sendKeys(emailStr);
        helper.waitUntilReady(this.zip);
        await this.zip.sendKeys(zipStr);
        helper.waitElementToBeClickable(this.clickPOS);
        await this.clickPOS.click();
        await this.enterPOS.sendKeys("Aldelo");
        await this.selctOption.click();
        helper.waitElementToBeClickable(this.clickAcc);
        await this.clickAcc.click();
        await this.enterAcc.sendKeys("Intacct");
        await this.selctOption.click();
        helper.waitUntilReady(this.subsC);
        await this.subsC.sendKeys("2")
        helper.waitElementToBeClickable(this.clickSOL);
        await this.clickSOL.click();
        await this.enterSOL.sendKeys("Self");
        await this.selctOption.click();
        helper.waitUntilReady(this.userEMail);
        await this.userEMail.sendKeys("restaurant@gmail.com");
        browser.driver.sleep(3000);
        //helper.waitForElementToBeVisible(this.userLogin);
        //await this.userLogin.sendKeys(loginID);
        // helper.waitUntilReady(this.userFname);
        // await this.userFname.sendKeys(fname);
        // helper.waitUntilReady(this.userLname);
        // await this.userLname.sendKeys(lName);
        // browser.driver.sleep(10000);
        helper.waitElementToBeClickable(this.saveBtn1);
        await this.saveBtn1.click();
        helper.waitElementToBeClickable(this.saveBtn2);
        await this.saveBtn2.click();

    }
};

module.exports = new restaurantPage();