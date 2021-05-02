const { element, browser } = require("protractor");
const Helper = require("./helper.pageObj");



var helper = new Helper();

var categoryPage = function() {
    this.addCategory = element(by.css('[ng-click="addRow()"]'));
    this.saveBtn = element(by.css('[ng-click="saveSync()"]'));
    this.selectRow = element.all(by.css('.ui-grid-cell-contents.ng-binding.ng-scope')).get(0);
    this.selectRow2 = element.all(by.css('.ui-grid-cell-contents.ng-binding.ng-scope')).get(1);
    this.selectRow3 = element.all(by.css('.ui-grid-cell-contents.ng-binding.ng-scope')).get(2);
    this.selectRow4 = element.all(by.css('.ui-grid-cell-contents.ng-binding.ng-scope')).get(3);
    this.selectRow6 = element.all(by.css('.ui-grid-cell-contents.ng-binding.ng-scope')).get(6);
    this.addCategoryname = element(by.model(`row.entity['name']`));
    this.accCode = element(by.model(`row.entity['accountingCode']`));
    this.selectRowCheck = element.all(by.model(`row.isSelected`)).get(0)
    this.selectOptionhandWDD = element(by.cssContainingText('option', 'Food'));
    this.okBtn = element(by.css('.btn.btn-primary.bootbox-accept'));
    this.searchCategory = element(by.model('filterValue'));
    this.enterAccCode = element(by.css('input[placeholder="Choose..."]'));
    this.selectItemFromDD = element(by.css('.ui-select-choices-row-inner'));
    this.fredFishMap = element.all(by.css('.ui-grid-cell-contents.ng-binding.ng-scope')).get(9);
    this.fredFishMap2 = element(by.css('div[placeholder="Choose..."]'));
    this.rowSelected = element.all(by.model('row.isSelected')).get(0);
    this.sendBtn = element(by.css('button[ng-click="enqueue()"]'));


    this.createCategory = async function(categoryName, code) {
        helper.waitElementToBeClickable(this.addCategory);
        await this.addCategory.click();
        helper.waitElementToBeClickable(this.selectRow);
        await this.selectRow.click();
        // browser.actions().doubleClick(this.selectRow).perform();
        helper.waitUntilReady(this.addCategoryname);
        await this.addCategoryname.sendKeys(categoryName);
        //2nd row
        browser.driver.sleep(1000);
        await this.selectRow2.click();
        await this.selectOptionhandWDD.click();
        //3rd row
        browser.driver.sleep(1000);
        await this.selectRow3.click();
        await this.accCode.sendKeys(code);
        //save
        await this.selectRowCheck.click();
        await this.saveBtn.click();
        await this.okBtn.click();
    }

    this.mapCategory = async function() {
        helper.waitUntilReady(this.searchCategory);
        browser.driver.sleep(3000);
        await this.searchCategory.sendKeys("liquor");
    }

    this.mapCategory2 = async function() {
        browser.driver.sleep(3000);

        // helper.waitElementToBeClickable(this.selectRow6);
        // await this.selectRow6.click();
        // browser.driver.sleep(3000);
        // helper.waitElementToBeClickable(this.selectRow6);
        // browser.driver.sleep(2000);
        // await this.selectRow6.click();

        browser.driver.sleep(2000);
        await this.enterAccCode.sendKeys("1500");
        browser.driver.sleep(2000);
        await this.selectItemFromDD.click();
        helper.waitElementToBeClickable(this.saveBtn);
        await this.saveBtn.click();
        helper.waitElementToBeClickable(this.okBtn);
        await this.okBtn.click();
    }

    this.mapVendor = async function() {
        helper.waitElementToBeClickable(this.fredFishMap);
        await this.fredFishMap.click();
        browser.driver.sleep(2000);
    }

    this.mapVendor2 = async function() {
        helper.waitForElementToBeVisible(this.fredFishMap2);
        browser.driver.sleep(2000);
        await this.fredFishMap2.click();
        browser.driver.sleep(2000);
        await this.enterAccCode.sendKeys("Express");
        browser.driver.sleep(2000);
        await this.selectItemFromDD.click();
        helper.waitElementToBeClickable(this.saveBtn);
        await this.saveBtn.click();
        helper.waitElementToBeClickable(this.okBtn);
        await this.okBtn.click();
    }

    this.paymentMap = async function() {
        helper.waitElementToBeClickable(this.selectRow2);
        await this.selectRow2.click();
        helper.waitForElementToBeVisible(this.fredFishMap2);
        browser.driver.sleep(2000);
        await this.fredFishMap2.click();
        browser.driver.sleep(2000);
        await this.enterAccCode.sendKeys("Suntrust");
        browser.driver.sleep(2000);
        await this.selectItemFromDD.click();
        helper.waitElementToBeClickable(this.saveBtn);
        await this.saveBtn.click();
        helper.waitElementToBeClickable(this.okBtn);
        await this.okBtn.click();
    }

    this.exportFunc = async function() {
        helper.waitUntilReady(this.searchCategory);
        await this.searchCategory.sendKeys("Fish");
        helper.waitElementToBeClickable(this.rowSelected);
        await this.rowSelected.click();
        helper.waitElementToBeClickable(this.sendBtn);
        await this.sendBtn.click();
    }
};

module.exports = new categoryPage();