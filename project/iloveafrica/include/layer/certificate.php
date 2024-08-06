<?
	if($_GET["chk"] == "1"){
		$txt = "팬클럽";
	}
	else if($_GET["chk"] == "2"){
		$txt = "동호회";
	}
	else if($_GET["chk"] == "3"){
		$txt = "";
	}

?>
<img src="img/web_img.png" />
<!--
<table cellpadding="0" cellspacing="0" border="0" style="width:500px; height:320px; background:url(img/web_img.png) no-repeat;">
    <tr>
        <td style="width:220px; height:220px; padding-top:100px; padding-left:280px; color:#676767; font-size:15px;" valign="top">홍길동 <?=$txt?> 후원자님!!<br />
            후원을 진심으로 감사합니다!</td>
    </tr>
</table>-->