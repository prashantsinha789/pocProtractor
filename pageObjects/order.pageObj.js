const { element, browser } = require("protractor");
var path = require('path');
var Helper = require('../pageObjects/helper.pageObj');
var hotkeys = require('protractor-hotkeys');


var helper = new Helper();

var marginEdgeOrderPage = function() {
    this.readyPage = element(by.css('#wrap'));
    this.uplaodFiles = element(by.css('input[type="file"]'));
    this.clickUploadBtn = element(by.model('dropOrders'));
    this.okBtn = element(by.cssContainingText('span', `OK`));
    this.selectItemFromList = element.all(by.css('.ui-grid-row.ng-scope')).get(0);
    this.endPreProcessing = element(by.css('[ng-click="endPreprocessing()"]'));
    // this.okBtnWithClass = element.all(by.cssContainingText('button', `OK`));
    this.okBtnWithClass = element(by.css('.btn.btn-primary.bootbox-accept'))
    this.bulkInitialReview = element(by.css('button[href*="#/order/bulkIR"]'));
    this.searchValue = element(by.model('filterValue'));
    this.startBulkReview = element(by.css('[ng-click="startIR()"]'));
    this.startBulkReviewOK = element(by.css('[ng-click = "howManyBulkIRModalOk()"]'));
    this.selectVendor = element(by.css('[ng-change = "selectVendor()"]'));
    this.enterVendorName = element(by.css('input[placeholder="Select a vendor..."]'));
    this.selectItemFromDD = element(by.css('.ui-select-highlight'));
    this.enterInvoice = element(by.model('order.initialReviewInvoiceNum'));
    this.clickCalAsAnalyst = element(by.model('order.initialReviewInvoiceDate'));
    this.selectDateIR = element.all(by.css('.btn.btn-default.btn-sm')).get(14);
    this.noAddress = element(by.cssContainingText('label', 'No address is provided on the invoice.'));
    this.noPhone = element(by.cssContainingText('label', 'No Phone number is provided on the invoice.'));
    this.verifiedTotal = element(by.model('order.initialReviewTotal'));
    this.handwrittenDD = element(by.model('order.initialReviewHandwrittenMarkup'));
    this.selectOptionhandWDD = element(by.cssContainingText('option', 'No'));
    this.initialReviewCompleteCheck = element(by.cssContainingText('span', 'The initial review for this order is complete.'));
    this.saveBtnForAnalyst = element.all(by.cssContainingText('span', 'Save')).get(1)






    this.uploadInvoice = async function() {
        var fileToUpload = 'specs/testimage.png';
        var absolutePath = path.resolve(fileToUpload);
        var button = element(by.css('[ngf-select]'));
        var input = element(by.css('input[type="file"]'));
        input.sendKeys(absolutePath);
    }

    this.clickOK = async function() {
        await this.okBtn.click();
    }

    this.selectItem = async function() {
        await this.selectItemFromList.click();
    }

    this.CompletePreprocessing = async function() {
        helper.waitElementToBeClickable(this.endPreProcessing);
        await this.endPreProcessing.click();
        browser.driver.sleep(3000);
        helper.waitUntilReady(this.okBtnWithClass)
        await this.okBtnWithClass.click();
        browser.driver.sleep(3000);
    }

    this.startInitialReview = async function() {
        await this.bulkInitialReview.click();
        await this.searchValue.sendKeys("Tysons");
        await this.selectItemFromList.click();
        await this.startBulkReview.click();
        browser.driver.sleep(1000);
        await this.startBulkReviewOK.click();
        browser.driver.sleep(3000);
    }

    this.handleMultipleBrowser = async function() {
        browser.getWindowHandle().then(function(parentGUID) {
            // click the link that opens in a new window
            browser.sleep(5000);
            // get the all the session ids of the opened tabs
            browser.getAllWindowHandles().then(function(allGUID) {
                console.log("Number of tabs opened: " + allGUID.length);
                // iterate through the tabs
                for (let guid of allGUID) {
                    //find the new browser tab
                    if (guid != parentGUID) {
                        // switch to the tab
                        browser.switchTo().window(guid);
                        // break the loop
                        break;
                    }
                }
                // perform here any actions needed on the new tab
                // close the new tab
                browser.close();
                // switch back to the parent tab
                browser.switchTo().window(parentGUID);
                browser.sleep(1000);
            });
        });
    }

    this.completeInitialReviewAsAnalyst = async function(vendorName, invoiceName) {
        helper.waitElementToBeClickable(this.selectVendor);
        await this.selectVendor.click();
        helper.waitUntilReady(this.enterVendorName)
        await this.enterVendorName.sendKeys(vendorName);
        helper.waitUntilReady(this.selectItemFromDD)
        await this.selectItemFromDD.click();
        await this.enterInvoice.sendKeys(invoiceName);
        await this.clickCalAsAnalyst.click();
        helper.waitUntilReady(this.selectDateIR)
        await this.selectDateIR.click();
        helper.waitUntilReady(this.noAddress)
        await this.noAddress.click();
        helper.waitUntilReady(this.noPhone)
        await this.noPhone.click();
        helper.waitUntilReady(this.verifiedTotal)
        await this.verifiedTotal.sendKeys("108");
        helper.waitElementToBeClickable(this.handwrittenDD)
        await this.handwrittenDD.click();
        helper.waitUntilReady(this.selectOptionhandWDD)
        await this.selectOptionhandWDD.click();
        helper.waitElementToBeClickable(this.initialReviewCompleteCheck)
        await this.initialReviewCompleteCheck.click();
        helper.waitElementToBeClickable(this.saveBtnForAnalyst)
        await this.saveBtnForAnalyst.click();
        browser.sleep(3000);
    }

    this.checkCreatedInvoice = async function(invoiceName) {
        await this.searchValue.clear();
        await this.searchValue.sendKeys(invoiceName);
    }
};

module.exports = new marginEdgeOrderPage();