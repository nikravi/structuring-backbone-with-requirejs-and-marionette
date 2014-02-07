describe("Contact Entity", function() {


    var contactGenderOnly;

    beforeEach(function(done){

        require(["app"
          , "entities/contact"
        ], function(ContactManager){

          contactGenderOnly = new ContactManager.Entities.Contact({
            gender: "F"
          });

          contactAllProperties = new ContactManager.Entities.Contact({
            firstName: "Alice",
            lastName: "Wonderland",
            phoneNumber: "12345",
            gender: "M"
          });

          done();


        });

    });




    it("store gender, should store it", function() {

      contactGenderOnly.set('gender', 'M');

      expect(contactGenderOnly.get('gender')).toEqual('M');


    });


  it("save gender only would fail", function() {

    contactAllProperties.set('gender', null);

    expect(contactAllProperties.save()).toBeFalsy();

    expect(contactAllProperties.validationError).toBeDefined();
    expect(contactAllProperties.validationError.gender).toBeDefined();


  });

//  it('gender view', function(done){
//    require(['app', "apps/contacts/common/gender"], function(ContactManager, GView) {
//      var genderView = GView.GenderView({
//        model: contactGenderOnly
//      });
//
//      expect(genderView.el).toBe('span');
//      done();
//    })
//  });

//  it("jquery", function(){
//    expect($('<div>I am an example</div>')).not.toHaveText(/other/);
//  })


});