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
        $("#textregion").text(findRegion(pop));
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
                  pop = mapsequence.pop().code;
                  //console.log(pop);
                  $("#textregion").text(findRegion(pop));
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