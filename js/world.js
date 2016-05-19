var codes = 
["af","al","dz","ao","ag","ar","am","au","at","az","bs","bd","bb","by","be","bz","bj","bt","bo","ba","bw","br","bn","bg","bf","bi","kh","cm","ca","cv","cf","td","cl","cn","co","cu","km","cd","cg","cr","ci","hr","cy","cz","dk","dj","dm","do","ec","eg","sv","gq","er","ee","et","fj","fi","fk","fr","ga","gl","gm","ge","de","gh","gr","gd","gf","gt","gn","gw","gy","ht","hn","hu","is","in","id","ir","iq","ie","il","it","jm","jp","jo","kz","ke","kp","kr","kw","kg","la","lv","lb","ls","lr","ly","lt","mk","mg","mw","my","mv","ml","mt","mr","mu","mx","md","mn","ma","mz","mm","na","np","nl","nz","ni","ne","nc","ng","no","om","pk","pa","pg","py","pe","ph","pl","pt","qa","ro","ru","rw","st","sa","sn","re","rs","sc","sl","so","sk","si","sb","za","es","lk","kn","lc","sd","sr","sz","se","ch","sy","tw","tj","tz","th","tl","tg","tt","tn","tr","tm","ug","ua","ae","gb","us","uy","uz","vu","ve","vn","ye","zm","zw"];
var arr = [];
// Randomize ranks for all regions and then sort them to present
for (i = 0;i < codes.length; i++) {
    rank = Math.random()*1000000;
	var objecto = {"code":codes[i],"rank":rank};
    arr.push(objecto);
}
//console.log(arr);

var codeSort = function(a,b) {
  if(a.rank == b.rank) {
      return 0;
  } else if (a.rank > b.rank) {
      return 1;
  } else {
      return -1;
  }
};

arr.sort(codeSort);
//console.log(arr);
mapsequence = arr;
regions = {
"AE":"United Arab Emirates",
"AF":"Afghanistan",
"AG":"Antigua and Barbuda",
"AL":"Albania",
"AM":"Armenia",
"AO":"Angola",
"AR":"Argentina",
"AT":"Austria",
"AU":"Australia",
"AZ":"Azerbaijan",
"BA":"Bosnia and Herzegovina",
"BB":"Barbados",
"BD":"Bangladesh",
"BE":"Belgium",
"BF":"Burkina Faso",
"BG":"Bulgaria",
"BI":"Burundi",
"BJ":"Benin",
"BN":"Brunei Darussalam",
"BO":"Bolivia",
"BR":"Brazil",
"BS":"Bahamas",
"BT":"Bhutan",
"BW":"Botswana",
"BY":"Belarus",
"BZ":"Belize",
"CA":"Canada",
"CD":"The Democratic Republic Of The Congo",
"CF":"Central African Republic",
"CG":"Republic Of The Congo",
"CH":"Switzerland",
"CI":"Cote d'Ivoire",
"CL":"Chile",
"CM":"Cameroon",
"CN":"China",
"CO":"Colombia",
"CR":"Costa Rica",
"CU":"Cuba",
"CV":"Cape Verde",
"CY":"Cyprus",
"CZ":"Czech Republic",
"DE":"Germany",
"DJ":"Djibouti",
"DK":"Denmark",
"DM":"Dominica",
"DO":"Dominican Republic",
"DZ":"Algeria",
"EC":"Ecuador",
"EE":"Estonia",
"EG":"Egypt",
"ER":"Eritrea",
"ES":"Spain",
"ET":"Ethiopia",
"FI":"Finland",
"FJ":"Fiji",
"FK":"Falkland Islands",
"FR":"France",
"GA":"Gabon",
"GB":"United Kingdom",
"GD":"Grenada",
"GE":"Georgia",
"GF":"French Guiana",
"GH":"Ghana",
"GL":"Greenland",
"GM":"Gambia",
"GN":"Guinea",
"GQ":"Equatorial Guinea",
"GR":"Greece",
"GT":"Guatemala",
"GW":"Guinea-Bissau",
"GY":"Guyana",
"HN":"Honduras",
"HR":"Croatia",
"HT":"Haiti",
"HU":"Hungary",
"ID":"Indonesia",
"IE":"Ireland",
"IL":"Israel",
"IN":"India",
"IQ":"Iraq",
"IR":"Iran",
"IS":"Iceland",
"IT":"Italy",
"JM":"Jamaica",
"JO":"Jordan",
"JP":"Japan",
"KE":"Kenya",
"KG":"Kyrgyzstan",
"KH":"Cambodia",
"KM":"Comoros",
"KN":"Saint Kitts and Nevis",
"KP":"North Korea",
"KR":"South Korea",
"KW":"Kuwait",
"KZ":"Kazakhstan",
"LA":"Lao People's Democratic Republic",
"LB":"Lebanon",
"LC":"Saint Lucia",
"LK":"Sri Lanka",
"LR":"Liberia",
"LS":"Lesotho",
"LT":"Lithuania",
"LV":"Latvia",
"LY":"Libya",
"MA":"Morocco",
"MD":"Republic of Moldova",
"MG":"Madagascar",
"MK":"Macedonia",
"ML":"Mali",
"MM":"Myanmar",
"MN":"Mongolia",
"MR":"Mauritania",
"MT":"Malta",
"MU":"Mauritius",
"MV":"Maldives",
"MW":"Malawi",
"MX":"Mexico",
"MY":"Malaysia",
"MZ":"Mozambique",
"NA":"Namibia",
"NC":"New Caledonia",
"NE":"Niger",
"NG":"Nigeria",
"NI":"Nicaragua",
"NL":"Netherlands",
"NO":"Norway",
"NP":"Nepal",
"NZ":"New Zealand",
"OM":"Oman",
"PA":"Panama",
"PE":"Peru",
"PF":"French Polynesia",
"PG":"Papua New Guinea",
"PH":"Philippines",
"PK":"Pakistan",
"PL":"Poland",
"PT":"Portugal",
"PY":"Paraguay",
"QA":"Qatar",
"RE":"Reunion",
"RO":"Romania",
"RS":"Serbia",
"RU":"Russian Federation",
"RW":"Rwanda",
"SA":"Saudi Arabia",
"SB":"Solomon Islands",
"SC":"Seychelles",
"SD":"Sudan",
"SE":"Sweden",
"SI":"Slovenia",
"SK":"Slovakia",
"SL":"Sierra Leone",
"SN":"Senegal",
"SO":"Somalia",
"SR":"Suriname",
"ST":"Sao Tome and Principe",
"SV":"El Salvador",
"SY":"Syrian Arab Republic",
"SZ":"Swaziland",
"TD":"Chad",
"TG":"Togo",
"TH":"Thailand",
"TJ":"Tajikistan",
"TL":"Timor-Leste",
"TM":"Turkmenistan",
"TN":"Tunisia",
"TR":"Turkey",
"TT":"Trinidad and Tobago",
"TW":"Taiwan",
"TZ":"United Republic Of Tanzania",
"UA":"Ukraine",
"UG":"Uganda",
"US":"United States of America",
"UY":"Uruguay",
"UZ":"Uzbekistan",
"VE":"Venezuela",
"VN":"Vietnam",
"VU":"Vanuatu",
"YE":"Yemen",
"ZA":"South Africa",
"ZM":"Zambia",
"ZW":"Zimbabwe"
}


jQuery(document).ready(function () {
    
        // Initially grab the width and length of the browser window
        // Then change the numbers to not fill the window and then change its dimensions
        w = ($(document).width())* .90
        h = ($(document).height())* .90
        $("#vmap").width(w);
        $("#vmap").height(h);
        /*for( i = 0; i < mapsequence.length; i++) {
            code = mapsequence[i].code;
            if(regions[code.toUpperCase()]) {
                
            } else {
                console.log(code);
            }
        }*/
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
              //console.log(code);
              if(code == pop) {
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
            if(regions[code.toUpperCase()]) {
                return regions[code.toUpperCase()];
            }
            console.log(code);
            return "What?";
        }
    });