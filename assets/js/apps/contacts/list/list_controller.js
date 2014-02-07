define(["app"
  , "apps/contacts/list/list_view"
  , "apps/contacts/common/gender"
], function(ContactManager, View, GView){


  ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _){
    List.Controller = {
      listContacts: function(criterion){
        require(["common/views", "entities/contact"], function(CommonViews){
          var loadingView = new CommonViews.Loading();
          ContactManager.mainRegion.show(loadingView);


          var fetchingContacts = ContactManager.request("contact:entities");

          var contactsListLayout = new View.Layout();
          var contactsListPanel = new View.Panel();

          require(["entities/common"], function(FilteredCollection){
            $.when(fetchingContacts).done(function(contacts){
              var filteredContacts = ContactManager.Entities.FilteredCollection({
                collection: contacts,
                filterFunction: function(filterCriterion){
                  var criterion = filterCriterion.toLowerCase();
                  return function(contact){
                    if(contact.get('firstName').toLowerCase().indexOf(criterion) !== -1
                      || contact.get('lastName').toLowerCase().indexOf(criterion) !== -1
                      || contact.get('phoneNumber').toLowerCase().indexOf(criterion) !== -1){
                        return contact;
                    }
                  };
                }
              });

              if(criterion){
                filteredContacts.filter(criterion);
                contactsListPanel.once("show", function(){
                  contactsListPanel.triggerMethod("set:filter:criterion", criterion);
                });
              }

              var contactsListView = new View.Contacts({
                collection: filteredContacts
              });


              //create the function once, and use it multiple times. Good memory usage.
              function rebuildIconView(contactItemView){
                var itemGender = new GView.GenderView({
                  model: contactItemView.model
                });
                contactItemView.gender.show(itemGender);
              }

              //used when first time added the row on the page
              contactsListView.on('after:item:added', function(contactItemView){

                rebuildIconView(contactItemView);

                //used when editing the contact from the list page.
                contactItemView.on('item:rendered', rebuildIconView);

              });

              contactsListPanel.on("contacts:filter", function(filterCriterion){
                filteredContacts.filter(filterCriterion);
                ContactManager.trigger("contacts:filter", filterCriterion);
              });

              contactsListLayout.on("show", function(){
                contactsListLayout.panelRegion.show(contactsListPanel);
                contactsListLayout.contactsRegion.show(contactsListView);
              });

              contactsListPanel.on("itemView:contacts:genderChart", function(){
                ContactManager.trigger("contacts:genderChart");
              });

              contactsListPanel.on("contact:new", function(){

                require(["apps/contacts/new/new_view"], function(NewView){
                  var newContact = ContactManager.request("contact:entity:new");

                  var view = new NewView.Contact({
                    model: newContact
                  });

                  view.on("form:submit", function(data){
                    if(contacts.length > 0){
                      var highestId = contacts.max(function(c){ return c.id; }).get("id");
                      data.id = highestId + 1;
                    }
                    else{
                      data.id = 1;
                    }
                    if(newContact.save(data)){
                      contacts.add(newContact);
                      view.trigger("dialog:close");
                      var newContactView = contactsListView.children.findByModel(newContact);
                      // check whether the new contact view is displayed (it could be
                      // invisible due to the current filter criterion)
                      if(newContactView){
                        newContactView.flash("success");
                      }
                    }
                    else{
                      view.triggerMethod("form:data:invalid", newContact.validationError);
                    }
                  });

                  ContactManager.dialogRegion.show(view);
                });
              });

              contactsListView.on("itemview:contact:show", function(childView, model){
                ContactManager.trigger("contact:show", model.get("id"));
              });

              contactsListView.on("itemview:contact:edit", function(childView, model){
                require(["apps/contacts/edit/edit_view"], function(EditView){
                  var view = new EditView.Contact({
                    model: model
                  });


                  view.on("form:submit", function(data){
                    if(model.save(data)){
                      //trigger contact item view render. We listen for this event, to rebuild the gender icon
                      childView.render();
                      view.trigger("dialog:close");
                      childView.flash("success");
                    }
                    else{
                      view.triggerMethod("form:data:invalid", model.validationError);
                    }
                  });

                  ContactManager.dialogRegion.show(view);
                });
              });

              contactsListView.on("itemview:contact:delete", function(childView, model){
                model.destroy();
              });

              ContactManager.mainRegion.show(contactsListLayout);
            });
          });
        });
      }
    }
  });

  return ContactManager.ContactsApp.List.Controller;
});
