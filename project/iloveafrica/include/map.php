<?
	include "../common/common.php";

	$_row = $Obj_ainfo->get_ainfo_view($argu);
	$LatLng = str_replace("(","",str_replace(")","",$_row["ai_latlng"]));
?>
<html>
	
	<head>
		<meta name="viewport" content="initial-scale=1.0, user-scalable=no" /> 
		<script type="text/javascript" src="http://maps.google.com/maps/api/js?v=3.1&sensor=false"></script>

		<meta http-equiv=Cache-Control content=No-Cache>
		<meta http-equiv=Pragma content=No-Cache>
		<title>DASH-UP blog test</title>

		<script type="text/javascript"> 
			function initialize()
			{ 
				var latlng = new google.maps.LatLng(<?=$LatLng?>); 
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
				
				map.setZoom(6);
			}
		</script>

	</head>
<?
	if($LatLng == ""){
?>
	<body leftmargin="0" topmargin="0" >
		<div id="map" style="width:559px; height:100%; text-align: center; overflow-y: auto; border: 0px; background:#eaeaea;">
			등록된 지도가 없습니다.
		</div>
	</body>
<?
	}
	else{
?>
	<body leftmargin="0" topmargin="0" onload="initialize()">
		<div id="map" style="width:559px; height:100%; text-align: center; overflow-y: auto; border: 0px">
			google map
		</div>
	</body>
<?
	}	
?>
</html>	