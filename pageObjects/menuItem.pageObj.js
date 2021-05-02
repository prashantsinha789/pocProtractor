const { element, browser } = require("protractor");
const Helper = require("./helper.pageObj");



var helper = new Helper();

var menuItemPage = function() {

    this.addNewMenu = element(by.css('[ng-click="newRecipe()"]'));
    this.recipeName = element(by.model('recipe.name'));
    this.recipeType = element(by.model('recipe.type'));
    this.chooseFirstOption = element.all(by.css('.ui-select-choices-row-inner')).get(0);
    this.quantity = element(by.model('c.quantity'));
    this.unit = element(by.model('c.unit'));
    this.saveBtn = element.all(by.cssContainingText('span', 'Save')).get(1)


    this.createNewMenuItem = async function(recipeNam) {

        helper.waitElementToBeClickable(this.addNewMenu);
        await this.addNewMenu.click();
        browser.driver.sleep(1500);
        helper.waitUntilReady(this.recipeName);
        await this.recipeName.sendKeys(recipeNam);
        helper.waitElementToBeClickable(this.recipeType);
        await this.recipeType.click();
        await this.chooseFirstOption.click();
        helper.waitUntilReady(this.quantity);
        await this.quantity.sendKeys("400");
        helper.waitElementToBeClickable(this.unit);
        await this.unit.click();
        await this.chooseFirstOption.click();
        helper.waitElementToBeClickable(this.saveBtn);
        await this.saveBtn.click();
    }
};

module.exports = new menuItemPage();