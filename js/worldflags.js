regions = {
"ae":"United Arab Emirates",
"af":"Afghanistan",
"ag":"Antigua and Barbuda",
"al":"Albania",
"am":"Armenia",
"ao":"Angola",
"ar":"Argentina",
"at":"Austria",
"au":"Australia",
"az":"Azerbaijan",
"ba":"Bosnia and Herzegovina",
"bb":"Barbados",
"bd":"Bangladesh",
"be":"Belgium",
"bf":"Burkina Faso",
"bg":"Bulgaria",
"bi":"Burundi",
"bj":"Benin",
"bn":"Brunei Darussalam",
"bo":"Bolivia",
"br":"Brazil",
"bs":"Bahamas",
"bt":"Bhutan",
"bw":"Botswana",
"by":"Belarus",
"bz":"Belize",
"ca":"Canada",
"cd":"The Democratic Republic Of The Congo",
"cf":"Central African Republic",
"cg":"Republic Of The Congo",
"ch":"Switzerland",
"ci":"Cote d'Ivoire",
"cl":"Chile",
"cm":"Cameroon",
"cn":"China",
"co":"Colombia",
"cr":"Costa Rica",
"cu":"Cuba",
"cv":"Cape Verde",
"cy":"Cyprus",
"cz":"Czech Republic",
"de":"Germany",
"dj":"Djibouti",
"dk":"Denmark",
"dm":"Dominica",
"do":"Dominican Republic",
"dz":"Algeria",
"ec":"Ecuador",
"ee":"Estonia",
"eg":"Egypt",
"er":"Eritrea",
"es":"Spain",
"et":"Ethiopia",
"fi":"Finland",
"fj":"Fiji",
"fk":"Falkland Islands",
"fr":"France",
"ga":"Gabon",
"gb":"United Kingdom",
"gd":"Grenada",
"ge":"Georgia",
//"gf":"French Guiana",
"gh":"Ghana",
"gl":"Greenland",
"gm":"Gambia",
"gn":"Guinea",
"gq":"Equatorial Guinea",
"gr":"Greece",
"gt":"Guatemala",
"gw":"Guinea-Bissau",
"gy":"Guyana",
"hn":"Honduras",
"hr":"Croatia",
"ht":"Haiti",
"hu":"Hungary",
"id":"Indonesia",
"ie":"Ireland",
"il":"Israel",
"in":"India",
"iq":"Iraq",
"ir":"Iran",
"is":"Iceland",
"it":"Italy",
"jm":"Jamaica",
"jo":"Jordan",
"jp":"Japan",
"ke":"Kenya",
"kg":"Kyrgyzstan",
"kh":"Cambodia",
"km":"Comoros",
"kn":"Saint Kitts and Nevis",
"kp":"North Korea",
"kr":"South Korea",
"kw":"Kuwait",
"kz":"Kazakhstan",
"la":"Lao People's Democratic Republic",
"lb":"Lebanon",
"lc":"Saint Lucia",
"lk":"Sri Lanka",
"lr":"Liberia",
"ls":"Lesotho",
"lt":"Lithuania",
"lv":"Latvia",
"ly":"Libya",
"ma":"Morocco",
"md":"Republic of Moldova",
"mg":"Madagascar",
"mk":"Macedonia",
"ml":"Mali",
"mm":"Myanmar",
"mn":"Mongolia",
"mr":"Mauritania",
"mt":"Malta",
"mu":"Mauritius",
"mv":"Maldives",
"mw":"Malawi",
"mx":"Mexico",
"my":"Malaysia",
"mz":"Mozambique",
"na":"Namibia",
"nc":"New Caledonia",
"ne":"Niger",
"ng":"Nigeria",
"ni":"Nicaragua",
"nl":"Netherlands",
"no":"Norway",
"np":"Nepal",
"nz":"New Zealand",
"om":"Oman",
"pa":"Panama",
"pe":"Peru",
//"pf":"French Polynesia",
"pg":"Papua New Guinea",
"ph":"Philippines",
"pk":"Pakistan",
"pl":"Poland",
"pt":"Portugal",
"py":"Paraguay",
"qa":"Qatar",
//"re":"Reunion",
"ro":"Romania",
"rs":"Serbia",
"ru":"Russian Federation",
"rw":"Rwanda",
"sa":"Saudi Arabia",
"sb":"Solomon Islands",
"sc":"Seychelles",
"sd":"Sudan",
"se":"Sweden",
"si":"Slovenia",
"sk":"Slovakia",
"sl":"Sierra Leone",
"sn":"Senegal",
"so":"Somalia",
"sr":"Suriname",
"st":"Sao Tome and Principe",
"sv":"El Salvador",
"sy":"Syrian Arab Republic",
"sz":"Swaziland",
"td":"Chad",
"tg":"Togo",
"th":"Thailand",
"tj":"Tajikistan",
"tl":"Timor-Leste",
"tm":"Turkmenistan",
"tn":"Tunisia",
"tr":"Turkey",
"tt":"Trinidad and Tobago",
"tw":"Taiwan",
"tz":"United Republic Of Tanzania",
"ua":"Ukraine",
"ug":"Uganda",
"us":"United States of America",
"uy":"Uruguay",
"uz":"Uzbekistan",
"ve":"Venezuela",
"vn":"Vietnam",
"vu":"Vanuatu",
"ye":"Yemen",
"za":"South Africa",
"zm":"Zambia",
"zw":"Zimbabwe"
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
    
        // Initially grab the width and length of the browser window
        // Then change the numbers to not fill the window and then change its dimensions
        
        resizeImage();
        resizeMap();
        var pop = mapsequence.pop().code;
        $("#flag").attr("src","http://www.geonames.org/flags/x/" + pop + ".gif");
        //$("#textregion").text(findRegion(pop));
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
          normalizeFunction: 'polynomial',
          onRegionOver: function(event, code, region) {
          },
          onRegionClick: function(event, code, region) {
              console.log(findRegion(pop)+" "+pop);
              if(code == pop) {
                  if(mapsequence.length > 0){
                    pop = mapsequence.pop().code;
                    $("#flag").attr("src","http://www.geonames.org/flags/x/" + pop + ".gif");
                    $("#textregion").css('background-color','#5577FF');
                    resizeImage();
                  } else {
                      $("#flag").css("display","none");
                    $("#textregion").text("Done!");
                  }
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
    });