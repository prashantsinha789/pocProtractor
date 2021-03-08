var loginPageObj = require("../../pageObjects/login.pageObject");
var Helper = require('../../pageObjects/helper.pageObj');
var url = require('../../data_files/data_marginEdge_url');
var Creds = require('../../data_files/data_marginEdge_credentials');
var menuPageObj = require('../../pageObjects/hamburgerMenu.pageObj');
var orderPageObj = require('../../pageObjects/order.pageObj');
const { order } = require("../../pageObjects/hamburgerMenu.pageObj");
const { nanoid } = require('nanoid/non-secure');
const { browser } = require("protractor");
const hamburgerMenuPageObj = require("../../pageObjects/hamburgerMenu.pageObj");
var vendorPageObj = require('../../pageObjects/vendors.pageObject');
// var abc = require('../../serverFiles/imapConn')

const random_id = nanoid()
var helper = new Helper();
var URL = new url();
var creds = new Creds();

const admin = creds.adminUserName;
const pass = creds.password;
const unitAdminUser = creds.unitAdmin;
const analyst = creds.analystUserName;
const analyst2 = creds.analyst2UserName;
const leadAnalyst = creds.leadAnalystUserName;
const accountmanager = creds.accountManagerUserName;
const manager = creds.managerUserName;


describe('Margin Edge Upload Invoice and Send it to Reconcillation', function() {
    it('Login as a Manager, Place and Order through Vendor', function() {
        loginPageObj.openApp(URL.masterBranch);
        loginPageObj.loginAs(manager, pass);
        helper.switchToAngularPage();
        helper.waitUntilReady(orderPageObj.readyPage);
        //go to vendors and place the order
        hamburgerMenuPageObj.goToVendors();
        helper.waitUntilReady(orderPageObj.readyPage);
        vendorPageObj.createOrderFromvendor();
    });

    it('Logout from Manager', function() {
        //logout from admin
        loginPageObj.openApp(URL.masterBranch);
        helper.waitUntilReady(loginPageObj.logoutBtn);
        browser.driver.sleep(1000);
        loginPageObj.logout();
    });

    it('Upload Invoice as Unit Admin', function() {
        loginPageObj.openApp(URL.masterBranch);
        loginPageObj.loginAs(unitAdminUser, pass);
        helper.switchToAngularPage();
        helper.waitUntilReady(orderPageObj.readyPage);
        //go to orders
        menuPageObj.goToOrder();
        helper.waitUntilReady(orderPageObj.readyPage);
        //upload invoice
        orderPageObj.uploadInvoice();
        helper.waitElementToBeClickable(orderPageObj.okBtn);
        orderPageObj.clickOK();
        helper.waitElementToBeClickable(loginPageObj.logoutBtn);
        loginPageObj.logout();
        helper.waitUntilReady(loginPageObj.logo.get(1))
        expect((loginPageObj.logo.get(1)).isDisplayed()).toBe(true);
    });

    /*
    it('handle email', function() {
        orderPageObj.testM();
    })
    it("should login with a registration code sent to an email", function() {
        browser.controlFlow().wait(helper.getLastEmail()).then(function(email) {
            // extract registration code from the email message
            var pattern = /Registration code is: (\w+)/g;
            var regCode = pattern.exec(email.html)[1];
            console.log(regCode);
        });
    });
     */

    it('Cancel Preprocessing', function() {
        loginPageObj.openApp(URL.masterBranch);
        loginPageObj.loginAs(admin, pass);
        helper.switchToAngularPage();
        helper.waitUntilReady(orderPageObj.readyPage);
        //go to orders
        menuPageObj.goToOrder();
        helper.waitUntilReady(orderPageObj.readyPage);
        //cancel preprocessing
        orderPageObj.selectItem();
        helper.waitForElementToBeVisible(orderPageObj.endPreProcessing);
        orderPageObj.CompletePreprocessing();
    });

    it('Logout from admin', function() {
        //logout from admin
        loginPageObj.openApp(URL.masterBranch);
        helper.waitUntilReady(loginPageObj.logoutBtn);
        browser.driver.sleep(1000);
        loginPageObj.logout();
    });

    it('Complete Initial Review, Send it in Reconcillation', function() {
        //login as manager
        loginPageObj.openApp(URL.masterBranch);
        loginPageObj.loginAs(analyst, pass);
        helper.switchToAngularPage();
        helper.waitUntilReady(orderPageObj.readyPage);
        //go to orders
        menuPageObj.goToOrder();
        helper.waitUntilReady(orderPageObj.readyPage);
        // initiate bulk initial review
        orderPageObj.startInitialReview();
        browser.driver.sleep(3000);
        orderPageObj.handleMultipleBrowser();
        //send it to initial review
        orderPageObj.completeInitialReviewAsAnalyst("Fish", "PrashantAuto0");
        //check created invoice and click
        orderPageObj.handleMultipleBrowser();
    });

    it('Logout from analyst', function() {
        //logout from admin
        loginPageObj.openApp(URL.masterBranch);
        helper.waitUntilReady(loginPageObj.logoutBtn);
        browser.driver.sleep(1000);
        loginPageObj.logout();
    });

    it('Complete Reconcillation as 2nd Analyst, Send it in Final Review', function() {
        loginPageObj.openApp(URL.masterBranch);
        loginPageObj.loginAs(analyst2, pass);
        helper.switchToAngularPage();
        helper.waitUntilReady(orderPageObj.readyPage);
        //go to orders
        menuPageObj.goToOrder();
        helper.waitUntilReady(orderPageObj.readyPage);
        //open invoice
        orderPageObj.checkCreatedInvoice("PrashantAuto0");
        //send it in final review
        orderPageObj.completeReconcillationAsAnalyst2("Fish", "PrashantAuto0");
        //check created invoice and click
        orderPageObj.handleMultipleBrowser();
    });

    it('Logout from analyst 2', function() {
        //logout from admin
        loginPageObj.openApp(URL.masterBranch);
        helper.waitUntilReady(loginPageObj.logoutBtn);
        browser.driver.sleep(1000);
        loginPageObj.logout();
    });

    it('Complete Final Review as Lead Analyst, Add Line Item & Send it to AM Review', function() {
        loginPageObj.openApp(URL.masterBranch);
        loginPageObj.loginAs(leadAnalyst, pass);
        helper.switchToAngularPage();
        helper.waitUntilReady(orderPageObj.readyPage);
        //go to orders
        menuPageObj.goToOrder();
        helper.waitUntilReady(orderPageObj.readyPage);
        //open invoice
        orderPageObj.checkCreatedInvoice("PrashantAuto0");
        //add line items
        orderPageObj.addLineItemLeadAnalyst();
        orderPageObj.handleMultipleBrowser();
        browser.driver.sleep(1000);
    });

    it('Logout from Lead Ananlyst', function() {
        //logout from admin
        loginPageObj.openApp(URL.masterBranch);
        helper.waitUntilReady(loginPageObj.logoutBtn);
        browser.driver.sleep(1000);
        loginPageObj.logout();
    });

    it('Close the Order as in Account Manager', function() {
        loginPageObj.openApp(URL.masterBranch);
        loginPageObj.loginAs(accountmanager, pass);
        helper.waitUntilReady(loginPageObj.logoutBtn);
        loginPageObj.logout();
        loginPageObj.openApp(URL.masterBranch);
        loginPageObj.loginAs(accountmanager, pass);
        helper.switchToAngularPage();
        helper.waitUntilReady(orderPageObj.readyPage);
        //go to orders
        menuPageObj.goToOrder();
        helper.waitUntilReady(orderPageObj.readyPage);
        //open invoice
        orderPageObj.checkCreatedInvoice("PrashantAuto0");
        // close the invoice
        orderPageObj.closeInvoiceAsAccMgr();
    });

    it('Logout from accMgr', function() {
        //logout from admin
        loginPageObj.openApp(URL.masterBranch);
        helper.waitUntilReady(loginPageObj.logoutBtn);
        browser.driver.sleep(1000);
        loginPageObj.logout();
    });
});