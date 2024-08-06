<script type="text/javascript" src="js/jquery.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js" type="text/javascript"></script>
<script type="text/javascript" src="js/jquery.easing.1.3.js"></script>
<script src="/js/booklet/jquery.booklet.1.3.1.min.js" type="text/javascript"></script>
<link href="/js/booklet/jquery.booklet.1.3.1.css" type="text/css" rel="stylesheet" media="screen, projection, tv" />
<div id="mybook">
	<div> 
		<img src="/img/sub01/pages1.png" class="cp" width="100%" height="100%" />
	</div>
	<div> 
		<img src="/img/sub01/pages2.png" class="cp" width="100%" height="100%" />
	</div>
	<div> 
		<img src="/img/sub01/pages3.png" class="cp" width="100%" height="100%" />
	</div>
	<div> 
		<img src="/img/sub01/pages4.png" class="cp" width="100%" height="100%" />
	</div>
	<div> 
		<img src="/img/sub01/pages5.png" class="cp" width="100%" height="100%" />
	</div>
	<div> 
		<img src="/img/sub01/pages6.png" class="cp" width="100%" height="100%" />
	</div>
	<div> 
		<img src="/img/sub01/pages7.png" class="cp" width="100%" height="100%" />
	</div>
	<div> 
		<img src="/img/sub01/pages8.png" class="cp" width="100%" height="100%" />
	</div>
	<div> 
		<img src="/img/sub01/pages9.png" class="cp" width="100%" height="100%" />
	</div>
	<div> 
		<img src="/img/sub01/pages10.png" class="cp" width="100%" height="100%" />
	</div>
	<div> 
		<img src="/img/sub01/pages11.png" class="cp" width="100%" height="100%" />
	</div>
	<div> 
		<img src="/img/sub01/pages12.png" class="cp" width="100%" height="100%" />
	</div>
	<div> 
		<img src="/img/sub01/pages13.png" class="cp" width="100%" height="100%" />
	</div>
	<div> 
		<img src="/img/sub01/pages14.png" class="cp" width="100%" height="100%" />
	</div>
	<div> 
		<img src="/img/sub01/pages15.png" class="cp" width="100%" height="100%" />
	</div>
	<div> 
		<img src="/img/sub01/pages16.png" class="cp" width="100%" height="100%" />
	</div>
</div>
<script>
$(function() {
	//single book
	$('#mybook').booklet({
		width:    1024,
		height:   750,
		speed:    2000,
		pagePadding:10, 
		hoverWidth:100,
		manual: false,
		arrows: true,
		keyboard: true
	});
	
});
</script>