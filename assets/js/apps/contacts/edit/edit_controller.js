define(["app"
  , "apps/contacts/edit/edit_view"
  , "apps/contacts/common/genderChooser"

], function(ContactManager, View, GCView){

  ContactManager.module("ContactsApp.Edit", function(Edit, ContactManager, Backbone, Marionette, $, _){
    Edit.Controller = {
      editContact: function(id){
        require(["common/views", "entities/contact"], function(CommonViews){
          var loadingView = new CommonViews.Loading({
            title: "Artificial Loading Delay",
            message: "Data loading is delayed to demonstrate using a loading view."
          });
          ContactManager.mainRegion.show(loadingView);

          var fetchingContact = ContactManager.request("contact:entity", id);
          $.when(fetchingContact).done(function(contact){
            var view;
            if(contact !== undefined){
              view = new View.Contact({
                model: contact,
                generateTitle: true
              });

              view.on('render', function(){
                var genderChooserView = new GCView.GenderChooserView({
                  model: contact
                });
                view.genderChooser.show(genderChooserView);
              })


              view.on("form:submit", function(data){
                if(contact.save(data)){
                  ContactManager.trigger("contact:show", contact.get('id'));
                }
                else{
                  view.triggerMethod("form:data:invalid", contact.validationError);
                }
              });
            }
            else{
              view = new ContactManager.ContactsApp.Show.MissingContact();
            }

            ContactManager.mainRegion.show(view);
          });
        });
      }
    };
  });

  return ContactManager.ContactsApp.Edit.Controller;
});
