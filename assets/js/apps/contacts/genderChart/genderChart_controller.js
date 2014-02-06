define(["app", "apps/contacts/genderChart/genderChart_view"], function(ContactManager, View){
  ContactManager.module("ContactsApp.GenderChart", function(GenderChart, ContactManager, Backbone, Marionette, $, _){
    GenderChart.Controller = {
      displayChart: function(id){
        require(["common/views", "entities/contact"], function(CommonViews){
          var loadingView = new CommonViews.Loading({
            title: "Artificial Loading Delay",
            message: "Data loading is delayed to demonstrate using a loading view."
          });
          ContactManager.mainRegion.show(loadingView);

          var fetchingContact = ContactManager.request("contact:entities");
          $.when(fetchingContact).done(function(contacts){
            var contactView;
            if(contacts.length){
              contactView = new View.Contact({
                model: contacts
              });

            }
            else{
              contactView = new View.MissingContact();
            }

            ContactManager.mainRegion.show(contactView);
          });
        });
      }
    }
  });

  return ContactManager.ContactsApp.GenderChart.Controller;
});
