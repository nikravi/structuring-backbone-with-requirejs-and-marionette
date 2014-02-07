define(["app"
  , "tpl!apps/contacts/common/templates/genderChooser.tpl"
  , "apps/contacts/common/gender"
  , "entities/contact"

],

  function(ContactManager, genderTpl, GView){

  ContactManager.module("ContactsApp.Common.Views", function(Views, ContactManager, Backbone, Marionette, $, _){

    Views.GenderChooserView = Marionette.Layout.extend({
      template: genderTpl

      , regions: {
        genderFirst: ".gender-first",
        genderSecond: ".gender-second"
      }

      , onShowCalled: function() {


        var manGenderView = new GView.GenderView({
            model: new ContactManager.Entities.Contact({
              gender: "M"
            })
          })
          , womanGenderView = new GView.GenderView({
            model: new ContactManager.Entities.Contact({
              gender: "F"
            })
          })
          ;

        this.genderFirst.show(manGenderView);
        this.genderSecond.show(womanGenderView);

      }
    });
  });

    return ContactManager.ContactsApp.Common.Views;
});
