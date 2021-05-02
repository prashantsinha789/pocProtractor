const { element, browser } = require("protractor");
var path = require('path');
var Helper = require('../pageObjects/helper.pageObj');
var hotkeys = require('protractor-hotkeys');
var abc = require('../serverFiles/imapConn')


var helper = new Helper();

var marginEdgeOrderPage = function() {
    this.readyPage = element(by.css('#wrap'));
    this.uplaodFiles = element(by.css('input[type="file"]'));
    this.clickUploadBtn = element(by.model('dropOrders'));
    this.okBtn = element(by.cssContainingText('span', `OK`));
    this.selectItemFromList = element.all(by.css('.ui-grid-row.ng-scope')).get(0);
    this.endPreProcessing = element(by.css('[ng-click="endPreprocessing()"]'));
    this.okBtnWithClass = element(by.css('.btn.btn-primary.bootbox-accept'))
    this.bulkInitialReview = element(by.css('button[href*="#/order/bulkIR"]'));
    this.searchValue = element(by.model('filterValue'));
    this.startBulkReview = element.all(by.css('.btn.btn-md.btn-success')).get(0);
    this.startBulkReviewOK = element(by.css('[ng-click = "howManyBulkModalOk()"]'));
    this.selectVendor = element(by.css('[ng-change = "selectVendor()"]'));
    this.enterVendorName = element(by.css('input[placeholder="Select a vendor..."]'));
    this.selectItemFromDD = element(by.css('.ui-select-highlight'));
    this.enterInvoice = element(by.model('order.initialReviewInvoiceNum'));
    this.enterInvoiceAnalyst2 = element(by.model('order.invoiceNum'));
    this.clickCalAsAnalyst = element.all(by.model('order.initialReviewInvoiceDate')).get(0);
    this.clickCalAsAnalyst2 = element(by.model('order.invoiceDate'));
    this.selectDateIR = element.all(by.css('.btn.btn-default.btn-sm')).get(14);
    this.noAddress = element(by.cssContainingText('label', 'No address is provided on the invoice.'));
    this.noPhone = element(by.cssContainingText('label', 'No Phone number is provided on the invoice.'));
    this.verifiedTotal = element(by.model('order.initialReviewTotal'));
    this.handwrittenDD = element(by.model('order.initialReviewHandwrittenMarkup'));
    this.handwrittenDDAnalyst2 = element(by.model('order.handwrittenMarkup'));
    this.selectOptionhandWDD = element(by.cssContainingText('option', 'No'));
    this.initialReviewCompleteCheck = element(by.cssContainingText('span', 'The initial review for this order is complete.'));
    this.reconcillationCheck = element(by.cssContainingText('span', 'The reconciliation for this order is complete.'));
    this.finalReviewCheck = element(by.cssContainingText('span', 'This order has been reviewed and should be reviewed by a Client Services Lead.'));
    this.amCheck = element(by.cssContainingText('span', 'This order has been reconciled and should be closed.'));
    this.saveBtnForAnalyst = element.all(by.cssContainingText('span', 'Save')).get(1);
    this.saveBtnAnalyst2 = element(by.css('[ng-click="reconcile($event)"]'));
    this.saveBtnLeadAnalyst = element(by.css('[ng-click="reconcile($event)"]'));
    this.verifyBtn = element(by.css('[ng-click="verifyOrderAndClose()"]'));
    this.addLineItem = element(by.css('[ng-click="addRow()"]'));
    this.selectNewVendorItemRadio = element(by.cssContainingText('label', 'New Vendor Item'));
    this.vendorItemVerified = element(by.cssContainingText('label', ' Vendor Item Verified '));
    this.vendorInfoVerified = element(by.cssContainingText('label', 'Vendor Information Verified'));
    this.itemCode = element(by.css('#provisionalProductCode'));
    this.enterVendorItem = element.all(by.model('newReconcileLineItem.vendorProduct.name')).get(1);
    this.clickProductDDLineItem = element.all(by.css('span[aria-label="Select a product activate"]')).get(1);
    this.enterProdName = element.all(by.css('input[placeholder="Select product (optional) - Type at least 2 characters to search"]')).get(1);
    this.addCategoryStr = element.all(by.model('newReconcileLineItem.unit.packaging')).get(1);
    this.addQuantStr = element.all(by.model('newReconcileLineItem.unit.quantity')).get(1);
    this.addUnitClick = element.all(by.model('newReconcileLineItem.unit.unit')).get(1);
    this.enterUnitName = element.all(by.css('input[placeholder="Enter a unit..."]')).get(1);
    this.addPrice = element.all(by.model('newReconcileLineItem.unit.price')).get(1);
    this.saveBtnLine = element.all(by.css('[ng-click="addNewItem($event)"]')).get(1);
    this.concernExpander = element(by.css('.far.fa-plus-square'));








    //start declaring reusable methods

    //generic method for uploading an invoices
    this.uploadInvoice = async function() {
        var fileToUpload = 'specs/sanitySuite/testimage.png';
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
        // await this.bulkInitialReview.click();
        await this.searchValue.sendKeys("Tysons");
        await this.selectItemFromList.click();
        await this.startBulkReview.click();
        browser.driver.sleep(1000);
        await this.startBulkReviewOK.click();
        browser.driver.sleep(3000);
    }
    this.testM = async function() {
        var link = abc.TwoFactorAuth();
        var linktxt = this.searchValue;
        console.log("&&&&&&&", link.length)
        linktxt.sendKeys(link)
        browser.driver.sleep(10000)
    }



    // this.handleMultipleBrowser = async function() {
    //     browser.getWindowHandle().then(function(parentGUID) {
    //         // click the link that opens in a new window
    //         browser.sleep(5000);
    //         // get the all the session ids of the opened tabs
    //         browser.getAllWindowHandles().then(function(allGUID) {
    //             console.log("Number of tabs opened: " + allGUID.length);
    //             // iterate through the tabs
    //             for (let guid of allGUID) {
    //                 //find the new browser tab
    //                 if (guid != parentGUID) {
    //                     // switch to the tab
    //                     browser.switchTo().window(guid);
    //                     // break the loop
    //                     break;
    //                 }
    //             }
    //             // perform here any actions needed on the new tab
    //             // close the new tab
    //             browser.close();
    //             // switch back to the parent tab
    //             browser.switchTo().window(parentGUID);
    //             browser.sleep(1000);
    //         });
    //     });
    // }


    this.handleMultipleBrowser = async function() {
        browser.getWindowHandle().then(function(parentGUID) {
            // click the link that opens in a new window
            browser.sleep(5000);
            // get the all the session ids of the opened tabs
            browser.getAllWindowHandles().then(function(allGUID) {
                console.log("Number of tabs opened: " + allGUID.length);
                if (allGUID.length > 1) {
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
                    browser.sleep(10000);
                }
            });
        });
    }

    this.completeInitialReviewAsAnalyst = async function(vendorName, invoiceName) {
        browser.sleep(5000)
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
        browser.driver.sleep(3000);
    }

    this.checkCreatedInvoice = async function(invoiceName) {
        await this.searchValue.clear();
        await this.searchValue.sendKeys(invoiceName);
        await this.selectItemFromList.click();
    }

    this.completeReconcillationAsAnalyst2 = async function(vendorName, invoiceName) {
        browser.sleep(4000)
        helper.waitElementToBeClickable(this.selectVendor);
        await this.selectVendor.click();
        helper.waitUntilReady(this.enterVendorName)
        await this.enterVendorName.sendKeys(vendorName);
        helper.waitUntilReady(this.selectItemFromDD)
        await this.selectItemFromDD.click();
        await this.enterInvoiceAnalyst2.sendKeys(invoiceName);
        await this.clickCalAsAnalyst2.click();
        helper.waitUntilReady(this.selectDateIR)
        await this.selectDateIR.click();
        helper.waitUntilReady(this.noAddress)
        await this.noAddress.click();
        helper.waitUntilReady(this.noPhone)
        await this.noPhone.click();
        helper.waitElementToBeClickable(this.handwrittenDDAnalyst2)
        await this.handwrittenDDAnalyst2.click();
        helper.waitUntilReady(this.selectOptionhandWDD)
        await this.selectOptionhandWDD.click();
        helper.waitElementToBeClickable(this.reconcillationCheck)
        await this.reconcillationCheck.click();
        helper.waitElementToBeClickable(this.saveBtnAnalyst2)
        await this.saveBtnAnalyst2.click();
        browser.driver.sleep(3000);
        helper.waitElementToBeClickable(this.verifyBtn)
        await this.verifyBtn.click();
        browser.driver.sleep(3000);
    }

    this.addLineItemLeadAnalyst = async function() {
        var randomId=+Math.floor((Math.random() * 100000) + 1);
        helper.waitElementToBeClickable(this.addLineItem);
        await this.addLineItem.click();
        browser.driver.sleep(1000);
        await this.selectNewVendorItemRadio.click();
        helper.waitUntilReady(this.itemCode)
        await this.itemCode.sendKeys(randomId);
        // helper.waitElementToBeClickable(this.enterVendorItem);
        await this.enterVendorItem.click();
        helper.waitUntilReady(this.enterVendorItem)
        await this.enterVendorItem.sendKeys("TestLineItem"+randomId);
        helper.waitElementToBeClickable(this.clickProductDDLineItem);
        await this.clickProductDDLineItem.click();
        helper.waitUntilReady(this.enterProdName);
        await this.enterProdName.sendKeys("Bud");
        await this.selectItemFromDD.click();
        await this.addCategoryStr.sendKeys("Test51");
        await this.addQuantStr.sendKeys("1000");
        helper.waitElementToBeClickable(this.addUnitClick);
        await this.addUnitClick.click();
        await this.enterUnitName.sendKeys("Bag");
        await this.selectItemFromDD.click();
        await this.addPrice.sendKeys("1009");
        helper.waitElementToBeClickable(this.saveBtnLine)
        await this.saveBtnLine.click();
        helper.waitElementToBeClickable(this.handwrittenDDAnalyst2)
        await this.handwrittenDDAnalyst2.click();
        helper.waitUntilReady(this.selectOptionhandWDD)
        await this.selectOptionhandWDD.click();
        helper.waitElementToBeClickable(this.finalReviewCheck)
        await this.finalReviewCheck.click();
        helper.waitElementToBeClickable(this.saveBtnLeadAnalyst);
        await this.saveBtnLeadAnalyst.click();
        browser.driver.sleep(3000);
        helper.waitElementToBeClickable(this.verifyBtn)
        await this.verifyBtn.click();
        browser.driver.sleep(3000);
    }

    this.closeInvoiceAsAccMgr = async function() {
        browser.driver.sleep(3000)
        helper.waitElementToBeClickable(this.concernExpander);
        await this.concernExpander.click();
        helper.waitElementToBeClickable(this.vendorItemVerified);
        await this.vendorItemVerified.click();
        helper.waitElementToBeClickable(this.vendorInfoVerified);
        await this.vendorInfoVerified.click();
        helper.waitElementToBeClickable(this.amCheck);
        await this.amCheck.click();
        helper.waitElementToBeClickable(this.saveBtnLeadAnalyst);
        await this.saveBtnLeadAnalyst.click();
        browser.driver.sleep(3000);
        helper.waitElementToBeClickable(this.verifyBtn)
        await this.verifyBtn.click();
        browser.driver.sleep(3000);
    }
};

module.exports = new marginEdgeOrderPage();