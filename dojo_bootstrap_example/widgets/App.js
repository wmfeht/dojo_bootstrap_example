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
            var switchContent = function (Widget, args) {
                self._clearContent().then(function () {
                    self.content = new Widget(args, put(self.contentNode, 'div'));
                    fx.fadeIn({
                        node: self.content.domNode
                    }).play();
                });
            };

            router.register('/home', function () {
                switchContent(ProductList, {});
            });
            router.register('/about', function () {
                switchContent(About, {});
            });
            router.register('/contact', function () {
                switchContent(Contact, {});
            });
        },

        startup: function () {
            router.startup('/home');
        },
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
        }
    });
});