/*Event.observe(window, 'load', function() {

	Event.observe( 'btnSubmit', 'click', purchaseCD);
	
	connectToServer();
});*/

//window.addEventListener('load', InitMap, false);
var markerArray = new Array();
var map;
function InitMap()
{
	
	var locations = [
      ['0', 9.8641233,-83.9142952, 1],
      ['1', 9.8642898,-83.9152608, 5],
      ['2', 9.8578842,-83.9134262, 3],
      ['3', 9.8598503,-83.9170096, 2],
      ['4', 9.8605691,-83.915057, 1]
    ];

    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: new google.maps.LatLng(9.8578842,-83.9134262),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {
		
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map,
		id:i
      });

	//marker.metadata = {id : i};
      google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
	  markerArray.push(marker);
    }

}

function moveMarker(id, lat, lng)
{
	for (var a = 0; a < markerArray.length;a++)
	{
		console.log(markerArray[a].get('id'));
	if (markerArray[a].get('id') == parseInt(id))
	{
		console.log(markerArray[a].get('id'));
		
		markerArray[a].setPosition(new google.maps.LatLng(parseFloat(lat),parseFloat(lng)));
		
		
	}
	}
}


/**
 * AJAX long-polling
 *
 * 1. sends a request to the server (without a timestamp parameter)
 * 2. waits for an answer from server.php (which can take forever)
 * 3. if server.php responds (whenever), put data_from_file into #response
 * 4. and call the function again
 *
 * @param timestamp
 */
 
var timestamp = null;
function getContent()
{
	//console.log(timestamp);
    var queryString = {'timestamp' : timestamp};
	//console.log("esto podría funcionar");
    $.ajax(
        {
            type: 'GET',
            //url: 'LongPolling.php',
			url: "LongPolling.php?timestamp="+timestamp,
			async: true,
			cache: false,
            //data: queryString,
            success: function(data){
                // put result data into "obj"
                var obj = jQuery.parseJSON(data);
                // put the data_from_file into #response
				console.log(obj);
				moveMarker(obj.id, obj.lat, obj.lng);
                $('#response').html(obj.lat);
                // call the function again, this time with the timestamp we just got from server.php
                //getContent(timestamp);
				timestamp =obj["timestamp"];
				setTimeout("getContent()",1000);
            },
			error: function(data){
				setTimeout("getContent()",1000);
			}
        }
    );
	console.log("esto podría funcionar");
}

// initialize jQuery
$(function() {
    getContent();
});




