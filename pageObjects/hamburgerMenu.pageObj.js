const { element } = require("protractor");

var marginEdgeMenuPage = function() {
    this.order = element(by.css('a[href*="#/order"]'));
    this.vendorP = element.all(by.cssContainingText('a', 'Vendors')).get(0);
    this.vendorC = element.all(by.cssContainingText('a', 'Vendors')).get(1)



    this.goToOrder = async function() {
        await this.order.click();
    }

    this.goToVendors = async function() {
        await this.vendorP.click();
        await this.vendorC.click();

    }


};
module.exports = new marginEdgeMenuPage();