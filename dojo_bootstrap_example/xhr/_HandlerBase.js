define([
    'dojo/_base/declare',
    'dojo/_base/lang'
], function (declare, lang) {
    var defaultOptions = {
        handleAs: 'json',
        timeout: 180,
        headers: {
            'Content-Type': 'application/json',
            'Accept' : 'application/json'
        }
    };
    return declare(null, {
        _getOptions: function (opts) {
            return lang.mixin({}, defaultOptions, opts || {});
        },
        _toJson: function (obj) {
            return JSON.stringify(obj);
        }
    });
});