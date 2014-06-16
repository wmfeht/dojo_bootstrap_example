/**
 * Data model for a Product
 * @module models/Product
 */
define([
    'dojo/_base/declare',
    'dojo/Deferred',
    'dojo/Stateful',
    'xhr/productHandler'
], function (declare, Deferred, Stateful, productHandler) {
    return declare([Stateful], {
        /**
         * @param {Object} data
         */
        constructor: function (data) {
            this.id = data.id;
            this.name = data.name;
            this.description = data.description;
            this.price = data.price;
        },

        id: null,
        name: null,
        description: null,
        price: null,

        /**
         * Persist data via xhr
         */
        persist: function () {
            var self = this;
            var data = {
                name: self.name,
                description: self.description,
                price: self.price
            };
            if (self.id > 0) {
                data.id = self.id;
            }
            var promise = self.id > 0 ? productHandler.update(data) : productHandler.create(data);
            promise.then(function (response) {
                self.set('id', response.id);
                self.set('name', response.name);
                self.set('description', response.description);
                self.set('price', response.price);
            });
        },

        /**
         * Delete product
         * @returns {Deferred}
         */
        del: function () {
            var self = this;
            if (self.id > 0) {
                return productHandler.del(self.get('id'));
            } else {
                var promise = new Deferred();
                promise.resolve();
                return promise;
            }
        }
    });
});