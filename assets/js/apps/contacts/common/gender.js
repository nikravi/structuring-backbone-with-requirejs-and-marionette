define(["app", "tpl!apps/contacts/common/templates/gender.tpl"],

  function(ContactManager, genderTpl){

  ContactManager.module("ContactsApp.Common.Views", function(Views, ContactManager, Backbone, Marionette, $, _){
    Views.GenderView = Marionette.ItemView.extend({
      template: genderTpl,

      initialize: function(options){

      }
    });
  });

    return ContactManager.ContactsApp.Common.Views;
});
