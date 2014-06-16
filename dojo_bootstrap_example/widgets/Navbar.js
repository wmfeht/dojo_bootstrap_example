/**
 * Navbar widget
 * @module widgets/Navbar
 */
define([
    'dojo/router',
    'dojo/_base/declare',
    'dijit/_WidgetBase',
    'dijit/_WidgetsInTemplateMixin',
    'dijit/_TemplatedMixin',
    'put-selector/put',
    'dojo/text!./navbar.html'
], function (router, declare, _WidgetBase, _WidgetsInTemplateMixin, _TemplatedMixin, put, template) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,

        postCreate: function () {
            this.inherited(arguments);
            var self = this;
            self.links = {
                home: self.homeLink,
                about: self.aboutLink,
                contact: self.contactLink
            };

            // Set currently active navbar link when hash changes
            router.register('/:path/*', function (evt) {
                var path = evt.params.path;
                for (var prop in self.links) {
                    if (self.links.hasOwnProperty(prop)) {
                        if (path === prop) {
                            put(self.links[prop], '.active');
                        } else {
                            put(self.links[prop], '!active');
                        }
                    }
                }
            });
        }
    });
});