define(["app"
  , "apps/contacts/genderChart/genderChart_view"
  , 'd3'
  ], function(ContactManager, View, d3){

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

              ContactManager.mainRegion.show(contactView);

              var genders = contacts.models.map(function(contact) {
                  return contact.get('gender');
              });


              var menCount = _.where(genders, 'M').length
                , womenCount = contacts.length - menCount;


              var genderCount= [{
                  name: 'Men'
                  , count: menCount
                  , color: '#3456a3'
                }, {
                  name: 'Women'
                  , count: womenCount
                  , color: '#f18876'
                }];

              var width = 460,
                height = 300,
                radius = Math.min(width, height) / 2;


              var pie = d3.layout.pie()
                .sort(d3.ascending)
                .value(function (d) {
                  return d.count;
                });

              var arc = d3.svg.arc()
                .innerRadius(radius - 100)
                .outerRadius(radius - 50);

              var svg = d3.select("#svg_chart")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                //move to center
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

              // the chart
              var path = svg.selectAll("path")
                .data( pie(genderCount) )
                .enter().append("path")
                .attr("fill", function(d, i) { return genderCount[i].color; })
                .attr("d", arc);

              // add legend
              var legend = svg.append("g")
                .attr("class", "legend")
                .attr('transform', "translate(" + (-width / 2) + "," + (-height / 2 + 50) + ")");


              legend.selectAll('rect')
                .data(genderCount)
                .enter()
                .append("rect")
                .attr("x", width - 65)
                .attr("y", function(d, i){ return i *  20;})
                .attr("width", 10)
                .attr("height", 10)
                .style("fill", function(d, i) {
                  return genderCount[i].color;
                })

              legend.selectAll('text')
                .data(genderCount)
                .enter()
                .append("text")
                .attr("x", width - 52)
                .attr("y", function(d, i){ return i *  20 + 9;})
                .text(function(d) {
                  return d.name;
                });



            }
            else{
              contactView = new View.MissingContact();

              ContactManager.mainRegion.show(contactView);
            }


          });
        });
      }
    }
  });

  return ContactManager.ContactsApp.GenderChart.Controller;
});
