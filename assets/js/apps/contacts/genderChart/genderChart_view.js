
define(["app",
  "tpl!apps/contacts/genderChart/templates/missing.tpl",
  "tpl!apps/contacts/genderChart/templates/view.tpl"],
  function(ContactManager, missingTpl, viewTpl){
    ContactManager.module("ContactsApp.GenderChart.View", function(View, ContactManager, Backbone, Marionette, $, _){
      View.MissingContact = Marionette.ItemView.extend({
        template: missingTpl
      });

      View.Contact = Marionette.ItemView.extend({
        template: viewTpl
      });
    });

    return ContactManager.ContactsApp.GenderChart.View;
  });
