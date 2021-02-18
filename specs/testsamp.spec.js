var loginPageObj = require("../pageObjects/login.pageObject");
var Helper = require('../pageObjects/helper.pageObj');
var url = require('../data_files/data_marginEdge_url');
var Creds = require('../data_files/data_marginEdge_credentials');
var menuPageObj = require('../pageObjects/hamburgerMenu.pageObj');
var orderPageObj = require('../pageObjects/order.pageObj');
const { order } = require("../pageObjects/hamburgerMenu.pageObj");

var helper = new Helper();
var URL = new url();
var creds = new Creds();

const admin = creds.adminUserName;
const pass = creds.password;
const unitAdminUser = creds.unitAdmin;
const analyst = creds.analystUserName;


describe('Margin Edge Upload Invoice and Send it to Reconcillation', function() {
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
        orderPageObj.handleMultipleBrowser();
        //send it to initial review
        orderPageObj.completeInitialReviewAsAnalyst("Meat", "Prashant1AutoSmoke");
        //check created invoice and click
        // orderPageObj.checkCreatedInvoice("PrashantAuto03Smoke")
    });
});