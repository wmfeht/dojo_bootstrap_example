/**
 * A base class for xhr handlers
 * @module xhr/_HandlerBase
 */
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

    /**
     * @constructor
     */
    return declare(null, {
        /**
         * Gets xhr request options
         * @param {object} opts Optional parameter with custom options is mixed in to the default request arguments
         * @returns {Object}
         * @protected
         */
        _getOptions: function (opts) {
            return lang.mixin({}, defaultOptions, opts || {});
        },
        /**
         * Utility method to convert an object to JSON
         * @param obj
         * @returns {string}
         * @protected
         */
        _toJson: function (obj) {
            return JSON.stringify(obj);
        }
    });
});