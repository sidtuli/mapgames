jQuery(document).ready(function () {
    
        // Initially grab the width and length of the browser window
        // Then change the numbers to not fill the window and then change its dimensions
        w = ($(document).width())* .90
        h = ($(document).height())* .90
        $("#vmap").width(w);
        $("#vmap").height(h);
        var pop = mapsequence.pop().code;
        
        //console.log(pop)
        $("#textregion").text(findRegion(pop));
        // Here is all the code that deals with the vector map functionality 
        jQuery('#vmap').vectorMap({
          map: 'world_en',
          backgroundColor: '#5577FF',
          borderColor: '#000000',
          borderWidth: 1,
          color: '#ffffff',
          hoverOpacity: 0.7,
          selectedColor: '#000000',
          enableZoom: true,
          showTooltip: true,
          scaleColors: ['#FF0000', '#FFFF00'],
          //values: ,
          normalizeFunction: 'polynomial',
          onRegionOver: function(event, code, region) {
          },
          onRegionClick: function(event, code, region) {
              console.log(code);
              if(code == pop) {
                  $("#textregion").css('color','green');
                  pop = mapsequence.pop().code;
                  console.log(pop);
                  setTimeout(function(){},1000);
                  $("#textregion").text(findRegion(pop));
                  $("#textregion").css('color','white');
              } else {
                  $("#textregion").css('color','red');
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
            //console.log(regions.length);
            for(i = 0; i < regions.length; i++) {
                //console.log(regions[i].Code);
                if(regions[i].Code.toLowerCase() == code){
                    return regions[i].Country;
                }
            }
            return "What?";
        }
    });