<?
	include "../common/common.php";

	if($argu["mode"]=="search"){

		$query="select * from zipcode where dong like '%".$argu["dong"]."%' order by no asc";

		$res = $list =& $_DB->getAll($query, array(), DB_FETCHMODE_ASSOC);

		if (DB::isError($res)) {
			//echo $query;
			die($res->getMessage());
		}
	}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title><?=_TITLE?></title>
<link href="/css/style.css" rel="stylesheet" type="text/css" />
<script src="/js/ajax.js" type="text/javascript"></script>
<script type="text/javascript" src="/js/jquery.js"></script>
<script type="text/javascript">
				
// 우편번호 입력하기
function zipcodeInput(objname, objpost, objaddr, postno, addr, objaddrdetail){
	var f=opener.document.getElementById(objname);

	f[objpost].value=postno;
	f[objaddr].value=addr;
	f[objaddrdetail].focus();

	window.close();
}
</script>
<?
#####팝업 Resize #########################
if($argu["mode"] == 'search'){?>

	<SCRIPT LANGUAGE='JavaScript'>
	<!--
	window.resizeTo(500,480)
	//-->
	</SCRIPT>
	
<?}else{?>
	<SCRIPT LANGUAGE='JavaScript'>
	<!--
	window.resizeTo(500,292);
	window.onload=function(){
		document.getElementById('zipcodeFrm').dong.focus();
	}
	//-->
	</SCRIPT>
	
<?}?>
</head>

<body>

<table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
	<form method="post" name="zipcodeFrm" id="zipcodeFrm" action="<?=$_SERVER["PHP_SELF"]?>" onsubmit="return zipcodeSearch();">
	<input type="hidden" name="mode" value="search">
	<input type="hidden" name="objname" value="<?=$argu["objname"]?>">
	<input type="hidden" name="objpost" value="<?=$argu["objpost"]?>">
	<input type="hidden" name="objaddr" value="<?=$argu["objaddr"]?>">
	<input type="hidden" name="objaddrdetail" value="<?=$argu["objaddrdetail"]?>">
	<tr>
		<td height="44" valign="bottom"><img src="/img/zipcode/post_title.gif"></td>
	</tr>
	<tr>
		<td height="10"></td>
	</tr>
	<tr>
		<td valign="top">
		<table width="440" border="0" align="center" cellpadding="0" cellspacing="0" background="/img/zipcode/img_2_2.gif">
			<tr>
				<td><img src="/img/zipcode/img_2.gif" /></td>
			</tr>
			<tr>
				<td height="45" align="center">검색 하고자 하는 주소의 동(읍/면/리)를 입력하여 주세요.<br>
				(예) 석촌동, 문래동, 개포12동. 삼성의료원..</td>
			</tr>
			<tr>
				<td height="30" align="center"><input name="dong" type="text" style="width:50%;height:15px;border: 1px solid #cfd7dc;line-height: 13px;ime-mode:active;">&nbsp;&nbsp;<input type="image" src="/img/zipcode/bt_20.gif" style="width:43px;height:22px;border:none;vertical-align:middle;"></td>
			</tr>
<?if($argu["mode"]=="search"){?>
			<tr>
				<td height="30" align="center" class="price">해당하는 주소를 선택하시면 자동입력됩니다.</td>
			</tr>
			<tr>
				<td height="1" background="/img/zipcode/line_2.gif"></td>
			</tr>
<?
		if(count($list)>0){
			for($i=0;$i<count($list);$i++){
				//$postnum=explode("-",$list[$i][code]);
				$user_addr=$list[$i][sido]." ".$list[$i][gugun]." ".$list[$i][dong]." ".$list[$i][bunji];
				$input_addr=$list[$i][sido]." ".$list[$i][gugun]." ".$list[$i][dong];//." ".$list[$i][bunji];
?>
			<tr>
				<td height="20" style='font-size:9pt; line-height:150%;padding-left:35px;'><a href="javascript:void(0);" onclick="zipcodeInput('<?=$argu["objname"]?>', '<?=$argu["objpost"]?>', '<?=$argu["objaddr"]?>', '<?=$list[$i]["code"]?>', '<?=$input_addr?>', '<?=$argu["objaddrdetail"]?>')"> [<?=$list[$i][code]?>] <?=$user_addr?></a></td>
			</tr>
			<tr>
				<td height="1" background="/img/zipcode/line_2.gif"></td>
			</tr>
<?
			}
		}else{
?>
			<tr>
				<td height="30" align="center" class="price">검색된 주소가 존재하지 않습니다.</td>
			</tr>
<?	}?>
			<tr>
				<td height="10"></td>
			</tr>
<?
	}else{
?>
			<tr>
				<td height="30" align="center" class="price">우편번호를 검색하여 주세요.</td>
			</tr>
<?}?>
			<tr>
				<td><img src="/img/zipcode/img_2_1.gif" /></td>
			</tr>
		</table>
		</td>
	</tr>
	<tr>
		<td height="10"></td>
	</tr>
	<tr>
		<td align="right" bgcolor="#dddddd"><img src="/img/zipcode/bt_11.gif" border="0" onClick="self.close()" style="cursor:hand"></td>
	</tr>
	</form>
</table>
</body>
</html>
<?
	### disconnect
	$_DB->disconnect();

	### unset
	unset($_DB);
?>