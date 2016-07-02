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
jQuery(document).ready(function () {
        var done = false;
        var clicks = 0;
        var corrects = 0;
        var myVar = setInterval(myTimer, 10);
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
    
        $("#textregion").text(findRegion(pop));
        // Here is all the code that deals with the vector map functionality 
        jQuery('#vmap').vectorMap({
          map: mapType,
          backgroundColor: '#5577FF',
          borderColor: '#000000',
          borderWidth: 1,
          color: '#ffffff',
          hoverOpacity: 0.7,
          selectedColor: '#000000',
          enableZoom: true,
          showTooltip: true,
          normalizeFunction: 'polynomial',
          onRegionOver: function(event, code, region) {
          },
          onRegionClick: function(event, code, region) {
              if(!(code in regions)) {
                  console.log(code +" "+region);
              }
            
            if(!done) {
                clicks += 1;
                if(code === pop) {
                    corrects += 1;
                    if(mapsequence.length > 0){
                        pop = mapsequence.pop().code;
                        $("#textregion").text(findRegion(pop));
                    } else {
                        $("#textregion").text("Done!");
                        clearInterval(myVar);
                        done = true;
                    }
                        $("#info").css('background-color','green');
                } else {
                    $("#info").css('background-color','red');
                }
                $("#attempts").text(corrects+"/"+clicks);
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
        var centiseconds = 0;
        var seconds = 0;
        var minutes = 0;
        function myTimer() {
            centiseconds += 1;
            if(centiseconds > 99) {
                centiseconds = 0;
                seconds += 1;
            }
            if (seconds > 59) {
                seconds = 0;
                minutes += 1;
            }
            var m = minutes > 9 ? minutes.toString() : "0"+minutes.toString();
            var s = seconds > 9 ? seconds.toString() : "0"+seconds.toString();
            var c = centiseconds > 9 ? centiseconds.toString() : centiseconds.toString();
            document.getElementById("time").innerHTML = m+":"+s+":"+c;
        }
    });