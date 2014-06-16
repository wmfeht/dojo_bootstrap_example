/**
 * Widget for switching current content within the application
 * @module widgets/App
 */
define([
    'dojo/_base/fx',
    'dojo/Deferred',
    'dojo/router',
    'dojo/_base/declare',
    'dijit/_WidgetBase',
    'dijit/_WidgetsInTemplateMixin',
    'dijit/_TemplatedMixin',
    'put-selector/put',
    'widgets/About',
    'widgets/Contact',
    'widgets/product/ProductList',
    'dojo/text!./app.html'
], function (
    fx,
    Deferred,
    router,
    declare,
    _WidgetBase,
    _WidgetsInTemplateMixin,
    _TemplatedMixin,
    put,
    About,
    Contact,
    ProductList,
    template
) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,

        postCreate: function () {
            this.inherited(arguments);
            var self = this;

            router.register('/home', function () {
                self._switchContent(ProductList, {});
            });
            router.register('/about', function () {
                self._switchContent(About, {});
            });
            router.register('/contact', function () {
                self._switchContent(Contact, {});
            });
        },

        startup: function () {
            router.startup('/home');
        },

        /**
         * Performs a fade out animation on the currently displayed content.
         * @returns {Deferred} Resolved when animation is complete
         * @private
         */
        _clearContent: function ()  {
            var self = this;
            var result = new Deferred();
            if (this.content) {
                fx.fadeOut({
                    node: self.content.domNode,
                    onEnd: function () {
                        self.content.destroy();
                        result.resolve();
                    }
                }).play();

            } else {
                result.resolve();
            }
            return result;
        },

        /**
         * Switch content to a new widget
         * @param {function} Widget class to switch to
         * @param {object} args Keyword args to pass to widget
         * @private
         */
        _switchContent: function (Widget, args) {
            var self = this;
            self._clearContent().then(function () {
                self.content = new Widget(args, put(self.contentNode, 'div'));
                fx.fadeIn({
                    node: self.content.domNode
                }).play();
            });
        }
    });
});