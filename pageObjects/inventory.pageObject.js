const { element, browser } = require("protractor");
const Helper = require("./helper.pageObj");



var helper = new Helper();

var inventoryPage = function() {

    this.enterCountDD = element(by.css('[ng-hide="viewingSpecificInventoryDate"]'));
    this.clickcreatedCountsheet = element.all(by.cssContainingText('a', 'Full Inventory')).get(0);
    this.date = element(by.model('inventory.inventoryDate'));
    this.selectDate = element.all(by.css('.uib-day.text-center.ng-scope')).get(9);
    this.count = element.all(by.model('i.quantity')).get(0);
    this.saveAndExit = element(by.cssContainingText('span', 'Save & Exit'))


    this.createNewCountSheet = async function() {

        helper.waitElementToBeClickable(this.enterCountDD);
        browser.driver.sleep(1500)
        await this.enterCountDD.click();
        browser.driver.sleep(2500)
        helper.waitUntilReady(this.clickcreatedCountsheet);
        await this.clickcreatedCountsheet.click();
        helper.waitElementToBeClickable(this.date);
        await this.date.click();
        helper.waitUntilReady(this.selectDate);
        await this.selectDate.click();
        await this.count.sendKeys("3");
        helper.waitElementToBeClickable(this.saveAndExit);
        await this.saveAndExit.click();
    }
};

module.exports = new inventoryPage();