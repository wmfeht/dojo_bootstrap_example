/**
 * Xhr handler for Products
 * @module xhr/productHandler
 */
define([
    './_HandlerBase',
    'dojo/_base/declare',
    'dojo/request/xhr'
], function (_HandlerBase, declare, xhr) {
    var path = '../Product/';

    var ProductHandler = declare([_HandlerBase], {
        /**
         * List all products
         * @returns {promise}
         */
        list: function () {
            return xhr.get(path, this._getOptions({}));
        },
        /**
         * Create a new product
         * @param product
         * @returns {promise}
         */
        create: function (product) {
            return xhr.post(path, this._getOptions({ data: this._toJson(product) }));
        },
        /**
         * Read a single product
         * @param id
         * @returns {promise}
         */
        read: function (id) {
            return xhr.get(path + id, this._getOptions({}));
        },
        /**
         * Update an existing product
         * @param product
         * @returns {promise}
         */
        update: function (product) {
            var id = product.id;
            return xhr.put(path + id, this._getOptions({ data: this._toJson(product)}));
        },
        /**
         * Delete a product
         * @param id
         * @returns {promise}
         */
        del: function (id) {
            return xhr.del(path + id, this._getOptions({}));
        }
    });

    return new ProductHandler();
});