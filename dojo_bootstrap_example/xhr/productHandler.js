define([
    './_HandlerBase',
    'dojo/_base/declare',
    'dojo/request/xhr'
], function (_HandlerBase, declare, xhr) {
    var path = '../Product/';

    var ProductHandler = declare([_HandlerBase], {
        list: function () {
            return xhr.get(path, this._getOptions({}));
        },
        create: function (product) {
            return xhr.post(path, this._getOptions({ data: this._toJson(product) }));
        },
        read: function (id) {
            return xhr.get(path + id, this._getOptions({}));
        },
        update: function (product) {
            var id = product.id;
            return xhr.put(path + id, this._getOptions({ data: this._toJson(product)}));
        },
        del: function (id) {
            return xhr.del(path + id, this._getOptions({}));
        }
    });

    return new ProductHandler();
});