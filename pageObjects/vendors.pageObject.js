const { element, browser } = require("protractor");
const Helper = require("./helper.pageObj");



var helper = new Helper();

var vendorPage = function() {
    this.selectItemFromList = element.all(by.css('.ui-grid-row.ng-scope')).get(0);
    this.placeOrder = element(by.cssContainingText('span', 'Place a New Order'));
    this.addQuantity = element.all(by.model('li.quantity')).get(0);
    this.saveBtn = element(by.css('[ng-click="saveAndSend($event)"]'));
    this.saveBtnConfirm = element(by.css('[ng-click="doSaveAndSend($event)"]'));
    this.newVendorBtn = element(by.css('button[href*="#/vendor/new"]'));
    this.writeVendorName = element(by.model('vendor.name'));
    this.orderPlacingThroughME = element(by.cssContainingText('span', 'Will you be placing orders via MarginEdge?'));
    this.disableInvoices = element(by.cssContainingText('span', 'Prevent any additional invoices for this vendor from being closed in this Restaurant Unit'));
    this.internalTransfer = element(by.cssContainingText('span', 'Internal Transfer Vendor'));
    this.notes = element(by.model('vendor.invoiceNotes'));
    this.accNum = element(by.model('vendor.accountNumber'));
    this.addEmail = element(by.model('vendor.preferredOrderAddress'));
    this.saveBtnVendor = element.all(by.cssContainingText('span', 'Save')).get(2);


    //#/vendorProduct/new


    this.createOrderFromvendor = async function() {
        browser.driver.sleep(2000)
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

    this.createNewVendor = async function(vendorName, accNumber, email) {
        helper.waitElementToBeClickable(this.newVendorBtn);
        await this.newVendorBtn.click();
        helper.waitUntilReady(this.writeVendorName);
        await this.writeVendorName.sendKeys(vendorName)
        helper.waitForElementToBeVisible(this.disableInvoices);
        await this.disableInvoices.click();
        await this.internalTransfer.click();
        helper.waitUntilReady(this.notes);
        await this.notes.sendKeys("Test Automation Notes");
        helper.waitUntilReady(this.accNum);
        await this.accNum.sendKeys(accNumber);
        await this.orderPlacingThroughME.click();
        helper.waitUntilReady(this.addEmail);
        await this.addEmail.sendKeys(email);
        browser.driver.sleep(2000)
        helper.waitUntilReady(this.saveBtnVendor);
        await this.saveBtnVendor.click();
    }
};

module.exports = new vendorPage();