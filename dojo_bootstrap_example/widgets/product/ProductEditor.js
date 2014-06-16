/**
 * Editor/display for a single Product
 * @module widgets/product/ProductEditor
 */
define([
    'dojo/currency',
    'dojo/Evented',
    'dojo/_base/declare',
    'dijit/_WidgetBase',
    'dijit/_WidgetsInTemplateMixin',
    'dijit/_TemplatedMixin',
    'dijit/form/ValidationTextBox',
    'dijit/form/Textarea',
    'dijit/form/CurrencyTextBox',
    'put-selector/put',
    'models/Product',
    'dojo/text!./productEditor.html'
], function (
    currency,
    Evented,
    declare,
    _WidgetBase,
    _WidgetsInTemplateMixin,
    _TemplatedMixin,
    ValidationTextBox,
    TextArea,
    CurrencyTextBox,
    put,
    Product,
    template
) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Evented], {
        templateString: template,

        constructor: function (data) {
            if (data === null || data === undefined) {
                data = new Product();
            }
            this.data = data;
        },

        data: null,

        postCreate: function () {
            this.inherited(arguments);
            var self = this;
            self.nameNode.innerHTML = self.data.get('name');
            self.descriptionNode.innerHTML = self.data.get('description');
            self.priceNode.innerHTML = '$' + currency.format(self.data.get('price'));
            self.data.watch('name', function (name, oldValue, value) {
                self.nameNode.innerHTML = value;
            });
            self.data.watch('description', function (name, oldValue, value) {
                self.descriptionNode.innerHTML = value;
            });
            self.data.watch('price', function (name, oldValue, value) {
                self.priceNode.innerHTML = '$' + currency.format(value);
            });
            self.pushData();
            if (self.data.get('id') < 0) {
                put(this.domNode, '.edit');
            }
        },

        startup: function () {
            this.pushData();
        },

        /**
         * Push data from model to UI
         */
        pushData: function () {
            var self = this;
            self.nameEditor.set('value', self.data.name);
            self.descriptionEditor.set('value', self.data.description);
            self.priceEditor.set('value', '$' + currency.format(self.data.price));
        },

        /**
         * Pull data from editors to model
         */
        pullData: function () {
            var self = this;
            self.data.set('name', self.nameEditor.get('value'));
            self.data.set('description', self.descriptionEditor.get('value'));
            self.data.set('price', self.priceEditor.get('value'));
        },

        /**
         * Event handler for edit button click
         * @param {Event} evt
         * @private
         */
        _onEdit: function (evt) {
            this.pushData();
            put(this.domNode, '.edit');
            evt.preventDefault();
        },

        /**
         * Event handler for cancel button click
         * @param {Event} evt
         * @private
         */
        _onCancel: function (evt) {
            var self = this;
            put(self.domNode, '!edit');
            if (self.data.get('id') < 0) {
                self.emit('deleted');
            }
            evt.preventDefault();
        },

        /**
         * Event handler for save button click
         * @param {Event} evt
         * @private
         */
        _onSave: function (evt) {
            this.pullData();
            this.data.persist();
            put(this.domNode, '!edit');
            evt.preventDefault();
        },

        /**
         * Event handler for delete button click
         * @param {Event} evt
         * @private
         */
        _onDelete: function (evt) {
            var self = this;
            this.data.del().then(function () {
                self.emit('deleted');
            });
            evt.preventDefault();
        }
    });
});