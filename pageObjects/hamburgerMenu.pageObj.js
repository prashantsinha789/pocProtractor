const { element, browser } = require("protractor");
const Helper = require("./helper.pageObj");


var helper = new Helper();

var marginEdgeMenuPage = function() {
    this.order = element(by.css('a[href*="#/order"]'));
    this.vendorP = element(by.css('#sidebar > li:nth-child(5)'));
    this.vendorC = element(by.css('a[href*="#/vendor"]'));
    this.accounting = element(by.css('#sidebar > li:nth-child(11) > a > span:nth-child(2)'));
    this.categories = element.all(by.css('a[href*="#/productType"]')).get(1);
    this.setup = element.all(by.cssContainingText('span', 'Setup')).get(2);
    this.hamburgerSetup = element(By.xpath('//li[@ng-repeat="item in menu"]/a/Span[text()="Setup"]'));
    this.setup2 = element(by.css('.fa.fa-cog'));
    this.integrations = element(by.cssContainingText('span', 'Integrations'));
    this.vendorItems = element(by.css('a[href*="#/vendorProduct"]'));
    this.products = element.all(by.cssContainingText('span', 'Products')).get(0);
    this.productSubMenu =element(by.xpath('//a[@href="#/product"]/span[text()="Products"]'))
    this.central = element(by.cssContainingText('span', 'Central'));
    this.restUnit = element(by.css(`a[href*="#/restaurantUnit"]`));
    this.inventory = element(by.cssContainingText('span', 'Inventory'));
    this.countSheet = element(by.css('a[href="#/inventorySetup"]'));
    this.inventories = element(by.cssContainingText('span', 'Inventories'));
    this.recipes = element(by.cssContainingText('span', 'Recipes'));
    this.menuItems = element(by.css('a[href*="#/menuItem"]'));
    this.vendorMapping = element(by.cssContainingText('span', 'Vendor Mapping'));
    this.paymentMethod = element(by.cssContainingText('span', 'Payment Accounts'));
    this.export = element(by.cssContainingText('span', 'Export'));
    this.priorityReport = element(by.cssContainingText('span', 'Priority Report'));




    this.goToMenuItems = async function() {
        helper.waitElementToBeClickable(this.recipes);
        await this.recipes.click();
        helper.waitElementToBeClickable(this.menuItems);
        await this.menuItems.click();
    }

    this.goToCountSheet = async function() {
        helper.waitElementToBeClickable(this.inventory);
        await this.inventory.click();
        helper.waitElementToBeClickable(this.countSheet);
        await this.countSheet.click();
    }

    this.goToPaymentMethod = async function() {
        helper.waitElementToBeClickable(this.paymentMethod);
        await this.paymentMethod.click();
    }

    this.goToInventories = async function() {
        helper.waitElementToBeClickable(this.inventory);
        await this.inventory.click();
        helper.waitElementToBeClickable(this.inventories);
        await this.inventories.click();
    }

    this.goToVendorMapping = async function() {
        helper.waitElementToBeClickable(this.vendorMapping);
        await this.vendorMapping.click();
    }


    this.goToOrder = async function() {
        await this.order.click();
    };

    this.goToCategory = async function() {
        helper.waitForElementToBeVisible(this.accounting);
        await this.accounting.click();
        helper.waitForElementToBeVisible(this.categories);
        await this.categories.click();
    }

    this.goToExport = async function() {
        helper.waitForElementToBeVisible(this.accounting);
        await this.accounting.click();
        helper.waitForElementToBeVisible(this.export);
        await this.export.click();
    }

    this.goToVendors = async function() {
        helper.waitForElementToBeVisible(this.vendorP);
        await this.vendorP.click();
        helper.waitForElementToBeVisible(this.vendorC);
        await this.vendorC.click();
    };

    this.goToVendorItems = async function() {
        helper.waitForElementToBeVisible(this.vendorP);
        await this.vendorP.click();
        helper.waitElementToBeClickable(this.vendorItems);
        await this.vendorItems.click();

    }

    this.goToIntegrations = async function() {
        browser.driver.sleep(2000)
        helper.waitUntilReady(this.setup2);
        await this.setup2.click();
        // helper.switchToAngularPage();
        helper.waitForElementToBeVisible(this.integrations);
        await this.integrations.click();
    }

    this.goToPriorityReport = async function() {
        browser.driver.sleep(5000)
        helper.waitForElementToBeVisible(this.hamburgerSetup);
        await this.hamburgerSetup.click();
        // helper.switchToAngularPage();
        helper.waitForElementToBeVisible(this.priorityReport);
        await this.priorityReport.click();
    }

    this.collapseSetup = async function() {
        browser.driver.sleep(2000)
        helper.waitForElementToBeVisible(this.hamburgerSetup);
        await this.hamburgerSetup.click();
    }

    this.goToRestaurantUnit = async function() {
        browser.driver.sleep(2000)
        helper.waitForElementToBeVisible(this.central);
        await this.central.click();
        // helper.switchToAngularPage();
        helper.waitForElementToBeVisible(this.restUnit);
        await this.restUnit.click();
    }

    this.goToRestaurantUnitCollapse = async function() {
        browser.driver.sleep(2000)
        helper.waitForElementToBeVisible(this.central);
        await this.central.click();
    }

    this.goToAccCollapse = async function() {
        browser.driver.sleep(2000)
        helper.waitForElementToBeVisible(this.accounting);
        await this.accounting.click();
    }

    this.goToProducts = async function() {
        browser.driver.sleep(1000);
        helper.waitForElementToBeVisible(this.products);
        await this.products.click();
        helper.waitForElementToBeVisible(this.productSubMenu);
        await this.productSubMenu.click();
    }

};
module.exports = new marginEdgeMenuPage();