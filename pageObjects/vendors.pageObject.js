const { element, browser } = require("protractor");
const Helper = require("./helper.pageObj");



var helper = new Helper();

var vendorPage = function() {
    this.selectItemFromList = element.all(by.css('.ui-grid-row.ng-scope')).get(0);
    this.placeOrder = element(by.cssContainingText('span', 'Place a New Order'));
    this.addQuantity = element.all(by.model('li.quantity')).get(0);
    this.saveBtn = element(by.css('[ng-click="saveAndSend($event)"]'));
    this.saveBtnConfirm = element(by.css('[ng-click="doSaveAndSend($event)"]'));



    this.createOrderFromvendor = async function() {
        await this.selectItemFromList.click();
        helper.waitElementToBeClickable(this.placeOrder);
        await this.placeOrder.click();
        browser.driver.sleep(2000);
        helper.waitUntilReady(this.addQuantity);
        await this.addQuantity.sendKeys("3");
        helper.waitElementToBeClickable(this.saveBtn);
        await this.saveBtn.click();
        helper.waitElementToBeClickable(this.saveBtnConfirm);
        await this.saveBtnConfirm.click();
    }
};

module.exports = new vendorPage();