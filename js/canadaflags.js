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
jQuery(document).ready(function () {
        var done = false;
        var clicks = 0;
        var corrects = 0;
        var myVar = setInterval(myTimer, 10);
        // Initially grab the width and length of the browser window
        // Then change the numbers to not fill the window and then change its dimensions
        
        resizeImage();
        resizeMap();
        var pop = mapsequence.pop().code;
        $("#flag").attr("src","js/imgs/ca/" + pop + ".svg");
        //$("#textregion").text(findRegion(pop));
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
          normalizeFunction: 'polynomial',
          onRegionOver: function(event, code, region) {
          },
          onRegionClick: function(event, code, region) {
              console.log(findRegion(pop)+" "+pop);
                if(!done){
                    clicks+=1;
                    if(code == pop) {
                        corrects += 1;
                        if(mapsequence.length > 0){
                            console.log(corrects+"/"+clicks);
                            pop = mapsequence.pop().code;
                            $("#flag").attr("src","js/imgs/ca/" + pop + ".svg");
                            $("#textregion").css('background-color','#5577FF');
                            resizeImage();
                        } else {
                            //$("#flag").css("display","none");
                            $("#flag").attr("src","js/imgs/thumbs.svg");
                            $('#flag').prop('title', 'Done!');
                            clearInterval(myVar);
                            done = true;
                            $("#textregion").css('background-color','green');
                            $('#flag').css('background-color','green');
                        } 
                    } else {
                        $("#textregion").css('background-color','red');
                    }
              
              } 
              $("#attempts").text(corrects+"/"+clicks);
          },
          onRegionDeselect: function(event, code, region) {   
          },
		  onLabelShow: function(event,code,region) {
			  event.preventDefault();
		  },
          // Each time the window is resized, I change the size of the map
          onResize: function(event, width, height) {
              w = ($(window).width()) * .90
              h = ($(window).height()) * .90
              $("#vmap").width(w)
              $("#world").width(w);
              $("#world").height(h);
              $("#vmap").height(h);
              $("#info").height($(window).height()* .05)
          }
        });
        function resizeImage() {
            $("#flag").css("height","100%");
            $("#flag").css("width","auto");
        }
        function findRegion(code) {
            if(regions[code]) {
                return regions[code];
            }
            console.log(code);
            return "What?";
        }
        function resizeMap() {
            w = ($(window).width())* .85
            h = ($(window).height())* .85
            $("#world").width(w);
            $("#world").height(h);
            $("#vmap").width(w);
            $("#vmap").height(h);
            $("#textregion").height($(window).height()* .10)
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
            var c = centiseconds > 9 ? centiseconds.toString() : "0"+centiseconds.toString();
            document.getElementById("time").innerHTML = m+":"+s+":"+c;
        }
    });