/**
 * Widget displays a list of Products
 * @module widgets/product/ProductList
 */
define([
    'dojo/on',
    'dojo/_base/declare',
    'dojo/store/Memory',
    'dojo/store/Observable',
    'dijit/_WidgetBase',
    'dijit/_WidgetsInTemplateMixin',
    'dijit/_TemplatedMixin',
    'dojox/fx/scroll',
    'dgrid/OnDemandGrid',
    'models/Product',
    'widgets/product/ProductEditor',
    'xhr/productHandler',
    'dojo/text!./productList.html'
], function (
    on,
    declare,
    Memory,
    Observable,
    _WidgetBase,
    _WidgetsInTemplateMixin,
    _TemplatedMixin,
    scroll,
    OnDemandGrid,
    Product,
    ProductEditor,
    productHandler,
    template
) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,

        postCreate: function () {
            this.inherited(arguments);
            var self = this;
            self.store = new Observable(new Memory({ data: [] }));
            self.grid = new OnDemandGrid({
                showHeader: false,
                store: self.store,
                columns: {
                    id: {
                        renderCell: function (object, value, node) {
                            var editor = new ProductEditor({
                                data: object
                            }, node);
                            on(editor, 'deleted', function () {
                                self.store.remove(object.id);
                            });
                            editor.startup();
                            return editor.domNode;
                        }
                    }
                }
            }, self.gridNode);

            productHandler.list().then(function (data) {
                console.log(data);
                data.forEach(function (item) {
                    self.store.put(new Product(item));
                });
            }, function (err) {
                console.error(err);
            });
        },

        startup: function () {
            this.grid.startup();
        },

        /**
         * Event handler for new button click
         * @param {Event} evt
         * @private
         */
        _onNew: function (evt) {
            var newObj = new Product({
                id: Math.random() * -1000,
                name: '',
                description: '',
                price: 0
            });
            this.store.put(newObj);
            var row = this.grid.row(newObj.get('id'));
            evt.preventDefault();
            scroll({ node: row.element, win: window}).play();
        }
    });
});