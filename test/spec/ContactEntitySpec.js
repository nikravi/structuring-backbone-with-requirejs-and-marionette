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



});