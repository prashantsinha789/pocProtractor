const { element, browser } = require("protractor");
const Helper = require("./helper.pageObj");



var helper = new Helper();

var productPage = function() {
    browser.driver.sleep(1500)
    this.newProduct = element(by.css('button[href*="#/product/new"]'));
    this.productName = element(by.model('product.name'));
    this.selectCategory = element.all(by.css('div[ng-change="productTypeChange(c)"]')).get(0);
    this.enterCategory = element(by.css('input[placeholder="Select a Category..."]'));
    this.selctOption = element(by.css('.ui-select-highlight'));
    this.prodUnit = element(by.model('product.reportByUnit.unit'));
    this.selectUnit = element(by.cssContainingText('option', 'Crate'));
    this.price = element.all(by.model('product.reportByUnit.price')).get(1);
    this.saveBtn1 = element.all(by.cssContainingText('span', 'Save')).get(1);



    this.createNewProduct = async function(prodNam, categ) {
        helper.waitElementToBeClickable(this.newProduct);
        browser.driver.sleep(1500)
        await this.newProduct.click();
        helper.waitUntilReady(this.productName);
        await this.productName.sendKeys(prodNam);
        helper.waitElementToBeClickable(this.selectCategory);
        await this.selectCategory.click();
        browser.driver.sleep(1500)
        await this.enterCategory.sendKeys(categ);
        await this.selctOption.click();
        helper.waitElementToBeClickable(this.prodUnit);
        await this.prodUnit.click();
        await this.selectUnit.click();
        helper.waitUntilReady(this.price);
        await this.price.sendKeys("899");
        helper.waitElementToBeClickable(this.saveBtn1);
        await this.saveBtn1.click();
    }
};

module.exports = new productPage();