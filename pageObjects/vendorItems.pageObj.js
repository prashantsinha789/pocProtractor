const { element, browser } = require("protractor");
const Helper = require("./helper.pageObj");



var helper = new Helper();

var vendorPage = function() {
    this.newVendorItmBtn = element(by.css('button[href*="#/vendorProduct/new"]'));
    this.clickVendor = element(by.css('div[placeholder="Enter a vendor..."]'));
    this.enterVendorName = element(by.css('input[placeholder="Enter a vendor..."]'));
    this.selctOption = element(by.css('.ui-select-highlight'));
    this.vendorItemName = element(by.model('vendorProduct.name'));
    this.vendorItemCode = element(by.model('vendorProduct.productCode'));
    this.clickVendor2 = element(by.css('div[placeholder="Select product - Type at least 2 characters to search"]'));
    this.writeVendor = element(by.css('input[placeholder="Select product - Type at least 2 characters to search"]'));
    this.addPackagingBtn = element(by.css('[ng-click="addRow()"]'));
    this.clickProduct = element(by.model('vendorProduct.product'));
    this.handleRow = element.all(by.css('.ui-grid-cell-contents.ng-binding.ng-scope')).get(0);
    this.handleRow1 = element.all(by.css('.ui-grid-cell-contents.ng-binding.ng-scope')).get(1);
    this.handleRow2 = element.all(by.css('.ui-grid-cell-contents.ng-binding.ng-scope')).get(3);
    this.handlePackagingRow = element(by.model(`row.entity['packaging']`));
    this.handleQuantityRow = element(by.model(`row.entity['quantity']`));
    this.handlePriceRow = element(by.model(`row.entity['price']`));
    this.rowSelected = element(by.model(`row.isSelected`));
    this.saveBtnVendor = element.all(by.cssContainingText('span', 'Save')).get(1);



    this.createNewVendorItem = async function(vendorName, vendorItemNameStr, vendorItemCodeStr) {
        helper.waitElementToBeClickable(this.newVendorItmBtn);
        await this.newVendorItmBtn.click();
        helper.waitElementToBeClickable(this.clickVendor)
        await this.clickVendor.click();
        helper.waitUntilReady(this.enterVendorName);
        await this.enterVendorName.sendKeys(vendorName);
        helper.waitElementToBeClickable(this.selctOption);
        await this.selctOption.click();
        helper.waitUntilReady(this.vendorItemName);
        await this.vendorItemName.sendKeys(vendorItemNameStr);
        helper.waitUntilReady(this.vendorItemCode);
        await this.vendorItemCode.sendKeys(vendorItemCodeStr);
        helper.waitElementToBeClickable(this.clickProduct);
        await this.clickProduct.click();
        helper.waitUntilReady(this.writeVendor);
        await this.writeVendor.sendKeys("Bud");
        helper.waitElementToBeClickable(this.selctOption);
        await this.selctOption.click();
        helper.waitElementToBeClickable(this.addPackagingBtn);
        await this.addPackagingBtn.click();
        //row 1
        helper.waitElementToBeClickable(this.handleRow);
        await this.handleRow.click();
        await this.handlePackagingRow.sendKeys("Test");
        //row2
        helper.waitElementToBeClickable(this.handleRow1);
        await this.handleRow1.click();
        await this.handleQuantityRow.sendKeys("99");
        //row3
        helper.waitElementToBeClickable(this.handleRow2);
        await this.handleRow2.click();
        await this.handlePriceRow.sendKeys("199");
        helper.waitUntilReady(this.rowSelected);
        await this.rowSelected.click();
        helper.waitUntilReady(this.saveBtnVendor);
        await this.saveBtnVendor.click();

    }
};

module.exports = new vendorPage();