<?
	include "../../common/common.php";

	$_row = $Obj_ainfo->get_ainfo_view($argu);

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>NGO I love AFRICA</title>
<meta name="robots" content="NGO I love AFRICA" />
<meta name="subject" content="NGO I love AFRICA" />
<meta name="author" content="ziieum comunications publisher serin" />
<meta name="keywords" content="NGO I love AFRICA" />
<meta name="description" content="NGO I love AFRICA에 오신것을 환영합니다.본 페이지는 XHTML-1.0-Transitional DTD를 준수하고, 웹 콘텐츠(의) 접근성(을 높이기 위한 제작) 지침 1.0 W3C 권고안을 최대한 준수 제작하였습니다." />
<meta name="copyright" content="copyrights NGO I love AFRICA" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<!--[if lt IE 9]>
<script src="http://ie7-js.googlecode.com/svn/version/2.1(beta4)/IE9.js"></script>
<![endif]-->
<link type="text/css" href="/css/layer.css" rel="stylesheet" />
<link type="text/css" href="/css/style.css" rel="stylesheet" />
<link type="text/css" href="/css/sub01.css" rel="stylesheet" />
<script type="text/javascript" src="/js/jquery.js"></script>
<script>
function tab_change_info(j,no){
	$.ajax({
		type:'post',
		url:'./country_info_tab.php',
		async:false,
		data:{
			'tab_chk':j,
			'ai_no':no
		},
		error:function(data,error) {
			alert(error);
		},
		success:function(data){
			$("#info").html(data);

	}});
}

$(function(){
	tab_change_info(1,"<?=$_row['ai_no']?>");
});
</script>
</head>
<body >
<table cellpadding="0" cellspacing="0" border="0" style="margin:0px;">
<tr>
<td style=" background:#ffffff;" id="info">

    
</td>
</tr>
</table>
</body>
</html>