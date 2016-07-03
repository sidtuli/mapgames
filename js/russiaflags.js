regions = {
                "da":"Republic of Dagestan",
                "sa":"Sakha Republic",
                "so":"Republic of North Ossetia–Alania",
                "kb":"Kabardino-Balkar Republic",
                "kc":"Karachay–Cherkess Republic",
                "st":"Stavropol Krai",
                "ks":"Krasnodar Krai",
                "ro":"Rostov Oblast",
                "kk":"Republic of Kalmykia",
                "as":"Astrakhan Oblast",
                "ad":"Republic of Adygea",
                "vl":"Volgograd Oblast",
                "vn":"Voronezh Oblast",
                "bl":"Belgorod Oblast",
                "ky":"Kursk Oblast",
                "or":"Oryol Oblast",
                "lp":"Lipetsk Oblast",
                "tl":"Tula Oblast",
                "bn":"Bryansk Oblast",
                "kj":"Kaluga Oblast",
                "sm":"Smolensk Oblast",
                "mc":"Moscow Oblast",
                "rz":"Ryazan Oblast",
                "tb":"Tambov Oblast",
                "kn":"Kaliningrad Oblast",
                "ps":"Pskov Oblast",
                "no":"Novgorod Oblast",
                "tr":"Tver Oblast",
                "vm":"Vladimir Oblast",
                "pz":"Penza Oblast",
                "sr":"Saratov Oblast",
                "mr":"Republic of Mordovia",
                "cu":"Chuvash Republic",
                "ul":"Ulyanovsk Oblast",
                "ss":"Samara Oblast",
                "ob":"Orenburg Oblast",
                "nn":"Nizhny Novgorod Oblast",
                "ml":"Mari El Republic",
                "ta":"Republic of Tatarstan",
                "iv":"Ivanovo Oblast",
                "yr":"Yaroslavl Oblast",
                "kt":"Kostroma Oblast",
                "le":"Leningrad Oblast",
                "ki":"Kirov Oblast",
                "bs":"Republic of Bashkortostan",
                "cl":"Chelyabinsk Oblast",
                "ud":"Udmurt Republic",
                "pe":"Perm Krai",
                "sv":"Sverdlovsk Oblast",
                "ku":"Kurgan Oblast",
                "ko":"Komi Republic",
                "mu":"Murmansk Oblast",
                "kl":"Republic of Karelia",
                "vo":"Vologda Oblast",
                "ar":"Arkhangelsk Oblast",
                "tu":"Tyumen Oblast",
                "ne":"Nenets Autonomous Okrug",
                "om":"Omsk Oblast",
                "ht":"Khanty–Mansi Autonomous Okrug",
                "ya":"Yamalo-Nenets Autonomous Okrug",
                "kr":"Krasnoyarsk Krai",
                "tm":"Tomsk Oblast",
                "nv":"Novosibirsk Oblast",
                "al":"Altai Krai",
                "km":"Kemerovo Oblast",
                "lt":"Altai Republic",
                "tv":"Tuva Republic",
                "hk":"Republic of Khakassia",
                "ir":"Irkutsk Oblast",
                "br":"Buryat Republic",
                "zb":"Zabaykalsky Krai",
                "am":"Amur Oblast",
                "ch":"Chukotka Autonomous Okrug",
                "ha":"Khabarovsk Krai",
                "eu":"Jewish Autonomous Oblast",
                "pr":"Primorsky Krai",
                "ma":"Magadan Oblast",
                "sh":"Sakhalin Oblast",
                "ka":"Kamchatka Krai",
                "in":"Republic of Ingushetia",
                "cc":"Chechen Republic"
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
        $("#flag").attr("src","js/imgs/ru/" + pop + ".svg");
        //$("#textregion").text(findRegion(pop));
        // Here is all the code that deals with the vector map functionality 
        jQuery('#vmap').vectorMap({
          map: 'russia_en',
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
                            $("#flag").attr("src","js/imgs/ru/" + pop + ".svg");
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