var regions = {
    "ve":"Venezuela",
    "co":"Colombia",
    "br":"Brazil",
    "gy":"Guyana",
    "sr":"Suriname",
    "gf":"French Guiana",
    "ec":"Ecuador",
    "cl":"Chile",
    "ar":"Argentina",
    "fk":"Falkland Islands",
    "uy":"Uruguay",
    "py":"Paraguay",
    "bo":"Bolivia",
    "pe":"Peru"
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
jQuery(document).ready(function () {
        var done = false;
        var clicks = 0;
        var corrects = 0;
        var myVar = setInterval(myTimer, 1);
        // Initially grab the width and length of the browser window
        // Then change the numbers to not fill the window and then change its dimensions
        w = ($(document).width())* .90
        h = ($(document).height())* .90
        $("#vmap").width(w);
        $("#vmap").height(h);
        var pop = mapsequence.pop().code;
        
        $("#textregion").text(findRegion(pop));
        // Here is all the code that deals with the vector map functionality 
        jQuery('#vmap').vectorMap({
          map: 'south-america_en',
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
              if(!done){
                clicks += 1;
                if(code == pop) {
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
                    //console.log(code + " "+region)
                    $("#info").css('background-color','red');
                }
                $("#attempts").text(corrects +"/"+clicks);
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
            if(regions[code]) {
                return regions[code];
            }
            console.log(code);
            return "What?";
        }
        var milliseconds = 0;
        var seconds = 0;
        var minutes = 0;
        function myTimer(){
            milliseconds += 1;
            if(milliseconds > 999){
                milliseconds = 0;
                seconds += 1;
            }
            if(seconds > 59){
                seconds = 0;
                minutes += 1;
            }
            var m = minutes > 9 ? minutes.toString() : "0"+minutes;
            var s = seconds > 9 ? seconds.toString() : "0"+seconds;
            var mi = milliseconds > 9 ? milliseconds.toString() : "0"+milliseconds;
            mi = milliseconds > 99 ? milliseconds.toString() : "0"+mi;
            document.getElementById("time").innerHTML = m+":"+s+":"+mi;
        }
    
});