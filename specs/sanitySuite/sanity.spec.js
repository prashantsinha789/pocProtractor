var loginPageObj = require("../../pageObjects/login.pageObject");
var Helper = require('../../pageObjects/helper.pageObj');
var url = require('../../data_files/data_marginEdge_url');
var Creds = require('../../data_files/data_marginEdge_credentials');
var categoryPageObj = require('../../pageObjects/category.pageObject');
var menuPageObj = require('../../pageObjects/hamburgerMenu.pageObj');
var orderPageObj = require('../../pageObjects/order.pageObj');
const { order } = require("../../pageObjects/hamburgerMenu.pageObj");
const { nanoid } = require('nanoid/non-secure');
const { browser } = require("protractor");
const hamburgerMenuPageObj = require("../../pageObjects/hamburgerMenu.pageObj");
var vendorPageObj = require('../../pageObjects/vendors.pageObject');
var intacctPageObj = require('../../pageObjects/intacct.pageObj');
const vendorItemsPageObj = require("../../pageObjects/vendorItems.pageObj");
const restaurantPageObj = require("../../pageObjects/restaurant.pageObj");
const productPageObj = require("../../pageObjects/product.pageObj");
const countSheetPageObj = require("../../pageObjects/countSheet.pageObj");
const inventoryPageObject = require("../../pageObjects/inventory.pageObject");
const menuItemPageObj = require("../../pageObjects/menuItem.pageObj");
// var abc = require('../../serverFiles/imapConn')
var mail = require("../../serverFiles/mailosaur");
var gmailApis = require('../../gmail/index.js');

const random_id = nanoid()
var helper = new Helper();
var URL = new url();
var creds = new Creds();
var invoiceName="KashifTest"+Math.floor((Math.random() * 100000) + 1);

const admin = creds.adminUserName;
const pass = creds.password;
const unitAdminUser = creds.unitAdmin;
const analyst = creds.analystUserName;
const analyst2 = creds.analyst2UserName;
const leadAnalyst = creds.leadAnalystUserName;
const accountmanager = creds.accountManagerUserName;
const manager = creds.managerUserName;


describe('Sanity Suite', function() {

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
     //   helper.waitElementToBeClickable(loginPageObj.logoutBtn);
        browser.driver.sleep(1000);
        loginPageObj.logout();
        helper.waitUntilReady(loginPageObj.logo.get(1))
        expect((loginPageObj.logo.get(1)).isDisplayed()).toBe(true);
    });

    // /*
    // it('handle email', function() {
    //     orderPageObj.testM();
    // });
    // it("should login with a registration code sent to an email", function() {
    //     browser.wait(helper.getLastEmail()).then(function(email) {
    //         // extract registration code from the email message
    //         var pattern = /Registration code is: (\w+)/g;
    //         var regCode = pattern.exec(email.html)[1];
    //         console.log(regCode);
    //     });
    // });
    //  
    

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
        //go to priority report
        hamburgerMenuPageObj.goToPriorityReport();
        helper.waitUntilReady(orderPageObj.readyPage);
        hamburgerMenuPageObj.collapseSetup();
        // initiate bulk initial review
        orderPageObj.startInitialReview();
        browser.driver.sleep(3000);
        orderPageObj.handleMultipleBrowser();
        //send it to initial review
        orderPageObj.completeInitialReviewAsAnalyst("Fish", invoiceName);
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
        hamburgerMenuPageObj.goToOrder();
        helper.waitUntilReady(orderPageObj.readyPage);
        //open invoice
        orderPageObj.checkCreatedInvoice(invoiceName);
        //send it in final review
        orderPageObj.completeReconcillationAsAnalyst2("Fish", invoiceName);
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
        orderPageObj.checkCreatedInvoice(invoiceName);
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
        orderPageObj.checkCreatedInvoice(invoiceName);
        // close the invoice
        orderPageObj.closeInvoiceAsAccMgr();
    });

    /*
    it('Connect to Intacct', function() {
        loginPageObj.openApp(URL.masterBranch);
        loginPageObj.loginAs(accountmanager, pass);
        helper.switchToAngularPage();
        // helper.waitUntilReady(orderPageObj.readyPage);
        //go to integrations
        hamburgerMenuPageObj.goToIntegrations();
        //connect to intacct
        intacctPageObj.connectToAccSystem();
        //make the configuration
        intacctPageObj.intacctConfig();
    });

    /*
    it('Complete the config', function() {
        intacctPageObj.intacctDDConfig();
    });
   */

    it('Logout from accMgr', function() {
        //logout from admin
        loginPageObj.openApp(URL.masterBranch);
        helper.waitUntilReady(loginPageObj.logoutBtn);
        browser.driver.sleep(1000);
        loginPageObj.logout();
    });
    

    it('Login as Admin, Create a Category', function() {
        loginPageObj.openApp(URL.masterBranch);
        loginPageObj.loginAs(admin, pass);
        helper.switchToAngularPage();
        helper.waitUntilReady(orderPageObj.readyPage);
        browser.driver.sleep(1000);
        //go to categories
        hamburgerMenuPageObj.goToCategory();
        //create category
        categoryPageObj.createCategory("ZZztestCategory", "0789")
    });

    it('Login as Admin, Add New Vendor', function() {
        loginPageObj.openApp(URL.masterBranch);
        helper.switchToAngularPage();
        helper.waitUntilReady(orderPageObj.readyPage);
        browser.driver.sleep(1000);
        //go to vendor
        hamburgerMenuPageObj.goToVendors();
        //create new vendor
        vendorPageObj.createNewVendor("AutomationVendor1", "X7891", "testV@gmail.com");
    });

    it('Login as Admin, Add New Vendor Item', function() {
        loginPageObj.openApp(URL.masterBranch);
        helper.switchToAngularPage();
        helper.waitUntilReady(orderPageObj.readyPage);
        browser.driver.sleep(1000);
        //go to vendor Itemsx
        hamburgerMenuPageObj.goToVendorItems();
        vendorItemsPageObj.createNewVendorItem("Meat", "TestAutoVI", "000VI");
    });

    it('Login as Admin, Add New Restaurant', function() {
        loginPageObj.openApp(URL.masterBranch);
        helper.switchToAngularPage();
        helper.waitUntilReady(orderPageObj.readyPage);
        browser.driver.sleep(1000);
        //go to central - restaurant unit
        hamburgerMenuPageObj.goToRestaurantUnit();
        hamburgerMenuPageObj.goToRestaurantUnitCollapse();
        //create restaurant unit
        restaurantPageObj.createNewRestuarant("RestauName"+Math.floor((Math.random() * 100000) + 1), "890802", "rtest7891", "RTest", "User")
    });

    it('Login as Admin, Add New Products', function() {
        loginPageObj.openApp(URL.masterBranch);
        helper.switchToAngularPage();
        helper.waitUntilReady(orderPageObj.readyPage);
        browser.driver.sleep(1000);
        //go to products
        hamburgerMenuPageObj.goToProducts();
        //create products
        productPageObj.createNewProduct("CoronaBeer", "Beer")
    });

    it('Login as Admin, Create Count Sheet & Add Products to it', function() {
        loginPageObj.openApp(URL.masterBranch);
        helper.switchToAngularPage();
        helper.waitUntilReady(orderPageObj.readyPage);
        browser.driver.sleep(1000);
        //go to count sheets
        hamburgerMenuPageObj.goToCountSheet();
        //create new count sheet
        countSheetPageObj.createNewCountSheet("TestCSheet")
    });

    it('Login as Admin, Go to Inventories and Enter Count', function() {
        loginPageObj.openApp(URL.masterBranch);
        helper.switchToAngularPage();
        helper.waitUntilReady(orderPageObj.readyPage);
        browser.driver.sleep(1000);
        //go to inventories
        hamburgerMenuPageObj.goToInventories();
        //enter count
        inventoryPageObject.createNewCountSheet();
    });

    it('Login as Admin, Add a new recipe as Wasabi Tyson', function() {
        loginPageObj.openApp(URL.masterBranch);
        helper.switchToAngularPage();
        helper.waitUntilReady(orderPageObj.readyPage);
        browser.driver.sleep(1000);
        //go to menu items
        hamburgerMenuPageObj.goToMenuItems();
        //create menu items
        menuItemPageObj.createNewMenuItem("TestMenu1")
    });

    it('Login as an Admin, Map Category, Export & Check Intacct', function() {
        loginPageObj.openApp(URL.masterBranch);
        helper.switchToAngularPage();
        loginPageObj.loginAs(admin, pass);
        helper.waitUntilReady(orderPageObj.readyPage);
        browser.driver.sleep(1000);
        //go to categories
        hamburgerMenuPageObj.goToCategory();
        //map category
        categoryPageObj.mapCategory();
    })

    it('Map Category', function() {
        categoryPageObj.mapCategory2();
        //go to vendor mapping
        hamburgerMenuPageObj.goToVendorMapping();
        categoryPageObj.mapVendor();
    })

    it('Map Vendor', function() {
        categoryPageObj.mapVendor2();
        //go to payment method
        hamburgerMenuPageObj.goToPaymentMethod();
        hamburgerMenuPageObj.goToAccCollapse();
    })

    it('Map Payment', function() {
        hamburgerMenuPageObj.goToAccCollapse();
        categoryPageObj.paymentMap();
        //go to export
        hamburgerMenuPageObj.goToExport();
        //export
        categoryPageObj.exportFunc();
    })

   it("should login with a registration code sent to an email",async function() {
        var InviteLink = await gmailApis.readEmailWithSubjectLine('Welcome to MarginEdge')
   });

});