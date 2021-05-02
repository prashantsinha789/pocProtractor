const { element, browser } = require("protractor");
const Helper = require("./helper.pageObj");



var helper = new Helper();

var countsheetPage = function() {
    this.newCountSheet = element(by.css('button[href*="#/inventorySetup/new"]'));
    this.name = element(by.model('inventorySetup.name'));
    this.handleCheckBox1 = element.all(by.css('.icheckbox_minimal-blue')).get(1);
    this.handleCheckBox2 = element.all(by.css('.icheckbox_minimal-blue')).get(2);
    this.handleCheckBox3 = element.all(by.css('.icheckbox_minimal-blue')).get(3);
    this.addProductItem = element(by.css('[ng-click="addProducts($event)"]'));
    this.clickProdDD = element(by.model('newProduct.product'));
    this.enterProd = element(by.css('input[placeholder="Enter at least 2 characters to search for a Product"]'));
    this.saveProd = element(by.css('[ng-click="addNewProduct($event)"]'));
    this.saveBtn1 = element.all(by.cssContainingText('span', 'Save')).get(1);
    this.selectItemFromDD = element(by.css('.ui-select-highlight'));



    this.createNewCountSheet = async function(countsheetname) {

        helper.waitElementToBeClickable(this.newCountSheet);
        browser.driver.sleep(1500)
        await this.newCountSheet.click();
        browser.driver.sleep(2500)
        helper.waitUntilReady(this.name);
        await this.name.sendKeys(countsheetname);

        helper.waitForElementToBeVisible(this.handleCheckBox1);
        await this.handleCheckBox1.click();
        helper.waitForElementToBeVisible(this.handleCheckBox2);
        await this.handleCheckBox2.click();
        helper.waitForElementToBeVisible(this.handleCheckBox3);
        await this.handleCheckBox3.click();

        browser.driver.sleep(1500)
        helper.waitElementToBeClickable(this.addProductItem);
        await this.addProductItem.click();

        helper.waitUntilReady(this.clickProdDD);
        await this.clickProdDD.click();
        await this.enterProd.sendKeys("Bud");
        await this.selectItemFromDD.click();

        helper.waitElementToBeClickable(this.saveProd);
        await this.saveProd.click();

        helper.waitElementToBeClickable(this.saveBtn1);
        await this.saveBtn1.click();


    }
};

module.exports = new countsheetPage();