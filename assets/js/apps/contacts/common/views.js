define(["app"
  , "tpl!apps/contacts/common/templates/form.tpl"
  , "apps/contacts/common/gender"
  , "entities/contact"
  , "backbone.syphon"
],
       function(ContactManager, formTpl, GView){

  ContactManager.module("ContactsApp.Common.Views", function(Views, ContactManager, Backbone, Marionette, $, _){
    Views.Form = Marionette.Layout.extend({
      template: formTpl,

      events: {
        "click button.js-submit": "submitClicked"
      },

      regions: {
        genderFirst: ".gender-first",
        genderSecond: ".gender-second"
      },

      onShowCalled: function() {

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

      },

      submitClicked: function(e){
        e.preventDefault();
        var data = Backbone.Syphon.serialize(this);
        this.trigger("form:submit", data);
      },

      onFormDataInvalid: function(errors){
        var $view = this.$el;

        var clearFormErrors = function(){
          var $form = $view.find("form");
          $form.find(".help-inline.error").each(function(){
            $(this).remove();
          });
          $form.find(".control-group.error").each(function(){
            $(this).removeClass("error");
          });
        }

        var markErrors = function(value, key){
          var $controlGroup = $view.find("#contact-" + key).parent();
          var $errorEl = $("<span>", { class: "help-inline error", text: value });
          $controlGroup.append($errorEl).addClass("error");
        }

        clearFormErrors();
        _.each(errors, markErrors);
      }
    });
  });

  return ContactManager.ContactsApp.Common.Views;
});
