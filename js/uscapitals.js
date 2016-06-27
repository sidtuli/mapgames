regions = {
    "wa":"Washington",
    "or":"Oregon",
    "ca":"California",
    "ak":"Alaska",
    "id":"Idaho",
    "mt":"Montana",
    "nv":"Nevada",
    "wy":"Wyoming",
    "co":"Colorado",
    "nm":"New Mexico",
    "az":"Arizona",
    "ut":"Utah",
    "tx":"Texas",
    "ok":"Oklahoma",
    "ks":"Kansas",
    "ne":"Nebraska",
    "sd":"South Dakota",
    "nd":"North Dakota",
    "wi":"Wisconsin",
    "mn":"Minnesota",
    "ia":"Iowa",
    "mo":"Missouri",
    "ar":"Arkansas",
    "la":"Louisiana",
    "mi":"Michigan",
    "il":"Illinois",
    "tn":"Tenessee",
    "ms":"Mississippi",
    "al":"Alabama",
    "ga":"Georgia",
    "ky":"Kentucky",
    "in":"Indiana",
    "oh":"Ohio",
    "fl":"Florida",
    "sc":"South Carolina",
    "nc":"North Carolina",
    "va":"Virginia",
    "wv":"West Virginia",
    "dc":"District of Columbia",
    "md":"Maryland",
    "de":"Delaware",
    "pa":"Pennsylvania",
    "nj":"New Jersey",
    "ny":"New York",
    "ct":"Connecticut",
    "ri":"Rhode Island",
    "ma":"Massachusetts",
    "vt":"Vermont",
    "nh":"New Hampshire",
    "me":"Maine",
    "hi":"Hawaii"
}
capitals ={
    "Alabama":"Montgomery",
    "Alaska":"Juneau",
    "Arizona":"Phoenix",
    "Arkansas":"Little Rock",
    "California":"Sacramento",
    "Colorado":"Denver",
    "Connecticut":"Hartford",
    "Delaware":"Dover",
    "District of Columbia":"Washington",
    "Florida":"Tallahassee",
    "Georgia":"Georgia",
    "Hawaii":"Honolulu",
    "Idaho":"Boise",
    "Illinois":"Springfield",
    "Indiana":"Indianapolis",
    "Iowa":"Des Moines",
    "Kansas":"Topeka",
    "Kentucky":"Frankfort",
    "Louisiana":"Baton Rouge",
    "Maine":"Augusta",
    "Maryland":"Annapolis",
    "Massachusetts":"Boston",
    "Michigan":"Lansing",
    "Minnesota":"Saint Paul",
    "Mississippi":"Jackson",
    "Missouri":"Jefferson City",
    "Montana":"Helena",
    "Nebraska":"Lincoln",
    "Nevada":"Carson City",
    "New Hampshire":"Concord",
    "New Jersey":"Trenton",
    "New Mexico":"Santa",
    "New York":"Albany",
    "North Carolina":"Raleigh",
    "North Dakota":"Bismark",
    "Ohio":"Columbus",
    "Oklahoma":"Oklahoma City",
    "Oregon":"Salem",
    "Pennsylvania":"Harrisburg",
    "Rhode Island":"Providence",
    "South Carolina":"Columbia",
    "South Dakota":"Pierre",
    "Tennessee":"Nashville",
    "Texas":"Austin",
    "Utah":"Salt Lake City",
    "Vermont":"Montpelier",
    "Virginia":"Richmond",
    "Washington":"Washington",
    "West Virginia":"Charleston",
    "Wisconsin":"Madison",
    "Wyoming":"Cheyenne"
}
var mapsequence = [];
// Randomize ranks for all regions and then sort them to present
for (var key in regions) {
    rank = Math.random()*1000000;
	var objecto = {"code":key,"rank":rank};
    mapsequence.push(objecto);
}
var codeSort = function(a,b) {
  if(a.rank == b.rank) {
      return 0;
  } else if (a.rank > b.rank) {
      return 1;
  } else {
      return -1;
  }
};

mapsequence.sort(codeSort);
//console.log(arr);

jQuery(document).ready(function () {
    
        // Initially grab the width and length of the browser window
        // Then change the numbers to not fill the window and then change its dimensions
        w = ($(document).width())* .90
        h = ($(document).height())* .90
        $("#vmap").width(w);
        $("#vmap").height(h);
        for( i = 0; i < mapsequence.length; i++) {
            code = mapsequence[i].code;
            if(regions[code]) {
                
            } else {
                console.log(code);
            }
        }
        var pop = mapsequence.pop().code;
        
        //console.log(pop)
        $("#textregion").text(capitals[findRegion(pop)]);
        // Here is all the code that deals with the vector map functionality 
        jQuery('#vmap').vectorMap({
          map: 'usa_en',
          backgroundColor: '#5577FF',
          borderColor: '#000000',
          borderWidth: 1,
          color: '#ffffff',
          hoverOpacity: 0.7,
          selectedColor: '#000000',
          enableZoom: true,
          showTooltip: true,
          scaleColors: ['#FF0000', '#FFFF00'],
          normalizeFunction: 'polynomial',
          onRegionOver: function(event, code, region) {
          },
          onRegionClick: function(event, code, region) {
              var c = regions[code];
              if(c === region){
                  console.log(c+regions[code]+code);
              }
              
              //console.log(code);
              if(code === pop) {
                  if(mapsequence.length > 0){
                    pop = mapsequence.pop().code;
                    $("#textregion").text(capitals[findRegion(pop)]);
                  } else {
                    $("#textregion").text("Done!");
                  }
                  $("#textregion").css('background-color','green');
              } else {
                  $("#textregion").css('background-color','red');
              }
          },
          onRegionDeselect: function(event, code, region) {   
          },
		  onLabelShow: function(event,code,region) {
			  event.preventDefault();
		  },
          // Each time the window is resized, I change the size of the map
          onResize: function(event, width, height) {
              w = ($(document).width()) * .90
              h = ($(document).height()) * .90
              $("#vmap").width(w)
              $("#vmap").height(h)
          }
        });
        function findRegion(code) {
            //console.log(code + code.toUpperCase() + regions[code.toUpperCase()]);
            //console.log(regions.length);
            if(regions[code]) {
                return regions[code];
            }
            console.log(code);
            return "What?";
        }
    });