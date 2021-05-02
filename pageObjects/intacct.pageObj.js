const { element, browser } = require("protractor");
const Helper = require("./helper.pageObj");



var helper = new Helper();

var intacctPage = function() {
    this.accountingSystem = element(by.model('mockForm.accountingIntegrationToAdd'));
    this.writeAcc = element(by.css('input[placeholder="Select an Accounting System..."]'));
    this.selectDD = element(by.css('.ui-select-choices-row-inner'));
    this.connectToAcc = element(by.css('[ng-click="connectAccounting()"]'));
    this.connectToIntacct = element(by.css('[ng-click="connect($event)"]'));
    this.companyID = element(by.css('#companyId'));
    this.userID = element(by.css('#userId'));
    this.intacctUserPassword = element(by.css('#password'));
    this.salesEntryJ = element(by.css('#salesEntryJournal'));
    this.salesTitleJ = element(by.css('#salesEntryJournalTitle'))
    this.saveBtn = element.all(by.cssContainingText('span', 'Save')).get(1);
    this.okBtn = element(by.css('.btn.btn-primary.bootbox-accept'));
    this.locationForInvoices = element(by.css(`select[name="invoiceLocationRefId"]`));
    this.departMentForInvoices = element(by.model(`config['INTACCT'].invoiceDepartmentRefId`));
    this.selectLocation = element.all(by.cssContainingText('option', 'Texas #10')).get(1);
    this.selectDept = element(by.cssContainingText('option', 'Sales'));


    this.connectToAccSystem = async function() {
        helper.waitElementToBeClickable(this.accountingSystem);
        await this.accountingSystem.click();
        await this.writeAcc.sendKeys("Int");
        await this.selectDD.click();
        helper.waitElementToBeClickable(this.connectToAcc);
        await this.connectToAcc.click();
        browser.driver.sleep(1000)
        helper.waitElementToBeClickable(this.connectToIntacct);
        await this.connectToIntacct.click();
    }

    this.intacctConfig = async function() {
        helper.waitUntilReady(this.companyID);
        await this.companyID.sendKeys("MarginEdgeMPP-DEV");
        await this.userID.sendKeys("Guest");
        await this.intacctUserPassword.sendKeys("M@rginEdge1!");
        await this.salesEntryJ.sendKeys("GJ");
        await this.salesTitleJ.sendKeys("GJ");
        helper.waitElementToBeClickable(this.saveBtn);
        await this.saveBtn.click();
        helper.waitElementToBeClickable(this.okBtn);
        await this.okBtn.click();
        browser.driver.sleep(2000);
    }

    this.intacctDDConfig = async function() {
        browser.navigate().refresh();
        browser.driver.sleep(5000);
        helper.waitElementToBeClickable(this.locationForInvoices);
        await this.locationForInvoices.click();
        helper.waitElementToBeClickable(this.selectLocation);
        await this.selectLocation.click();
        browser.driver.sleep(2000);
        helper.waitElementToBeClickable(this.departMentForInvoices);
        await this.departMentForInvoices.click();
        await this.selectDept.click();
        browser.driver.sleep(2000);
        helper.waitElementToBeClickable(this.saveBtn);
        await this.saveBtn.click();
        helper.waitElementToBeClickable(this.okBtn);
        await this.okBtn.click();
        browser.driver.sleep(2000);
    }
};

module.exports = new intacctPage();