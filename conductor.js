var idU = 0;
function SendPos(lat, lag)
{
	
	var loc = {'id' :idU, 'pos1':parseFloat(lat), 'pos2': parseFloat(lag)} 
	
    $.ajax(
        {
			type:'POST',
            url: 'updatepos.php',
            data: loc,
            success: function(data){
				
				//var obj = jQuery.parseJSON(data);
				//$('#m').html(obj.name);
            }
        }
    );
	
	return false;
}

function InitMapp()
{
	DefId();
	var locations = [
      [idU.toString(), 9.8578842,-83.9134262, 4],
    ];

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: new google.maps.LatLng(9.8641233, -83.9152608),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {
		
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map,
		draggable:true
      });
	  
	  marker.addListener('click', function(){SendPos(marker.getPosition().lat(), marker.getPosition().lng());});

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }

}

function DefId(){
	//console.log("erorororoororororoo");
	idU = parseInt(prompt("Digite Id", ""));
	
}
