regions = {
    "yt":"Yukon",
    "nt":"Northwest Territories",
    "nu":"Nunavut",
    "bc":"British Colombia",
    "ab":"Alberta",
    "sk":"Saskatchewan",
    "mb":"Manitoba",
    "on":"Ontario",
    "qc":"Québec",
    "nb":"New Brunswick",
    "ns":"Nova Scotia",
    "nl":"Newfoundland and Labrador",
    "pe":"Prince Edward Island"
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
          map: 'canada_en',
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
              console.log(code+" "+region);
              //console.log(code);
              if(code === pop) {
                  if(mapsequence.length > 0){
                    pop = mapsequence.pop().code;
                    $("#textregion").text(findRegion(pop));
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