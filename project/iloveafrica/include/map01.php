<html>
	
	<head>
		<meta name="viewport" content="initial-scale=1.0, user-scalable=no" /> 
		<script type="text/javascript" src="http://maps.google.com/maps/api/js?v=3.1&sensor=false"></script>

		<meta http-equiv=Cache-Control content=No-Cache>
		<meta http-equiv=Pragma content=No-Cache>
		<title>NGO I love AFRICA</title>

		<script type="text/javascript"> 
			function initialize()
			{ 
				var latlng = new google.maps.LatLng(37.5265149, 126.91754149999997); 
				var startPosition = { 
					zoom: 8, 
					center: latlng, 
					mapTypeId: google.maps.MapTypeId.ROADMAP 
					}; 
				var map = new google.maps.Map(document.getElementById("map"), startPosition); 
				
				var marker = new google.maps.Marker({ 
					position: latlng,  
					map: map
				}); 
				
				map.setZoom(16);
			}
		</script>

	</head>
	<body leftmargin="0" topmargin="0" onLoad="initialize()">
		<div id="map" style="width:732px; height:100%; text-align: center; overflow-y: auto; border:0;"></div>
	</body>
</html>	