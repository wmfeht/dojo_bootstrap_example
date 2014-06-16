/**
 * Widget with content for the 'Contact' screen
 * @module widgets/Contact
 */
define([
    'dojo/_base/declare',
    'dijit/_WidgetBase',
    'dijit/_WidgetsInTemplateMixin',
    'dijit/_TemplatedMixin',
    'dojo/text!./contact.html'
], function (declare, _WidgetBase, _WidgetsInTemplateMixin, _TemplatedMixin, template) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,

        postCreate: function () {
            this.inherited(arguments);
        }
    });
});