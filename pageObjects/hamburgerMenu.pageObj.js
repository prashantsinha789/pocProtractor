const { element } = require("protractor");

var marginEdgeMenuPage = function() {
    this.order = element(by.css('a[href*="#/order"]'));



    this.goToOrder = async function() {
        await this.order.click();
    }


};
module.exports = new marginEdgeMenuPage();