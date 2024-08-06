<?php
include "mailer.php";

$mode = $_REQUEST['mode'];
$division = $_REQUEST['division'];
$name = $_REQUEST['name'];
$name2 = $_REQUEST['name2'];
$tel1 = $_REQUEST['tel1'];
$tel2 = $_REQUEST['tel2'];
$tel3 = $_REQUEST['tel3'];
$tel = $tel1."-".$tel2."-".$tel3;
$hp1 = $_REQUEST['hp1'];
$hp2 = $_REQUEST['hp2'];
$hp3 = $_REQUEST['hp3'];
$hp = $hp1."-".$hp2."-".$hp3;
$email = $_REQUEST['email'];
$email2 = $_REQUEST['email2'];
$areaname = $_REQUEST['areaname'];
$questype = $_REQUEST['questype'];
$content = $_REQUEST['content'];
$etctext = $_REQUEST['etctext'];
$ip = $_SERVER['REMOTE_ADDR'];

$subject = "[폼메일] $name($areaname, $hp)";
$body = "";

$body .= "구분 : $division<br>";
$body .= "담당자 이름 : $name<br>";
$body .= "단체명 : $name2<br>";
$body .= "연락처 : $tel<br>";
$body .= "이메일 : $email<br>";
$body .= "이메일2 : $email2<br>";
$body .= "후원 항목 : $questype<br>";
$body .= "문의 내용 : $content<br>";
$body .= "기타 : $etctext<br>";

//$admin_email = "받을 메일주소 입력";
$admin_email = "info@iloveafrica.or.kr";
//$bcc = "보조 이메일 주소";

if($mode == "send") {
	//파일첨부 시작
	for($i=1;$i<=3;$i++) {
		$file[$i] = $_FILES['userfile'.$i]['name'];
		$target[$i] = "/tmp/".$file;

		if (move_uploaded_file($_FILES['userfile'.$i]['tmp_name'], $target[$i])) {
			chmod("$target[$i]", 0777);
		}
		
		$attach[$i] = attach_file($file[$i], $target[$i]);
		//업로드 파일을 삭제한다.
		@unlink($target[$i]);
	}
	//파일첨부 끝

	mailer($name, $email, $admin_email, $subject, $body, $type=1, $attach);
	echo "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">";
	echo("<script>alert('문의 사항이 발송되었습니다.');</script>");
	echo("<script>location.href='form.php';</script>");
}

?>
<!--
# PHP 개발자 #
이  름: 조재상
이메일: oralol@naver.com
블로그: http://oralol.blog.me
-->
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<title>문의 하기</title>
<link rel="stylesheet" href="style.css" type="text/css">
<style type="text/css">
  .line{border-bottom:1px solid #CCCCCC;}
</style>

</head>
<body>

<table width="732">
<tr>
<td valign="top">

<table width="732" border="0" cellpadding="0" cellspacing="0" bgcolor="white">
<form name="f1" method="post" enctype='multipart/form-data'>
<input type="hidden" name="mode" value="send">
<tr> 
<td class="line" width="100" height="50" align="left" bgcolor="#EEEEEE" >　구분 <font color='red'>*</font> </td>
<td class="line" colspan="3">　<input type="radio" name="division" value="기업"> 기업 
<input type="radio" name="division" value="단체"> 단체  
</td>
</tr>

<tr> 
<td class="line" width="100" height="46" align="left" bgcolor="#EEEEEE">　단체명 <font color='red'>*</font></td>
<td class="line" width="267">　<input name="name2" type="text" style="width:180px" maxlength="100">
<td class="line" width="100" height="46" align="left" bgcolor="#EEEEEE">　담당자 이름 <font color='red'>*</font></td>
<td class="line" width="265">　<input name="name" type="text" style="width:180px" maxlength="100">
</tr>

<tr> 
<td class="line" width="100" height="50" align="left" bgcolor="#EEEEEE">　연락처 <font color='red'>*</font></td>
<td class="line" width="267">　<input name="tel1" type="text" size="5" maxlength="3"> -
<input name="tel2" type="text" size="7" maxlength="7"> -
<input name="tel3" type="text" size="7" maxlength="7"></td>
<td class="line" height="50"  align="left" bgcolor="#EEEEEE">　이메일<font color='red'>*</font></td>
<td class="line" colspan="3">　<input name="email" type="text" style="width:80px" maxlength="100"> @ <input name="email2" type="text" style="width:110px" maxlength="100"></td>
</tr>


<tr> 
<td class="line" height="90" align="left" bgcolor="#EEEEEE">　후원 항목 <font color='red'>*</font> </td>
<td class="line" colspan="3">　<input type="radio" name="questype" value="재봉틀 후원"> 재봉틀 후원　
<input type="radio" name="questype" value="노트북 후원"> 노트북 후원　
<input type="radio" name="questype" value="지가 퇴치 캠페인"> 지가 퇴치 캠페인　
<input type="radio" name="questype" value="축구단 후원"> 축구단 후원　
<input type="radio" name="questype" value="저수지 후원"> 
저수지 후원 <br><br>
　<input type="radio" name="questype" value="물품 후원"> 물품 후원　
<input type="radio" name="questype" value="자원봉사"> 자원봉사　
<input type="radio" name="questype" value="기타"> 기타 <input name="etctext" type="text" style="width:180px" maxlength="100"> 
</td>
</tr>

<tr> 
<td class="line" height="110" align="left" bgcolor="#EEEEEE">　파일 첨부 </td>
<td class="line" colspan="3">　<input type="file" name="userfile1" value="파일첨부1"><br><br>
　<input type="file" name="userfile2" value="파일첨부2">
</td>
</tr>

<tr> 
<td class="line" align="left" bgcolor="#EEEEEE">　문의 내용 <font color='red'>*</font></td>
<td class="line" colspan="3"><textarea name="content" cols="70" rows="12" style="width:100%;"></textarea></td>
</tr>
</table>
<p align="center">
<input type="button" value=" 전송 " onClick="form_Check();" style="cursor:hand;">&nbsp;&nbsp;&nbsp;
<input type="button" value=" 취소 " onClick="reset();" style="cursor:hand;">
</p>
</td>
</tr>
</table>

</form>
</body>
</html>

<script>
function form_Check(){
		if(f1.division[0].checked == false && f1.division[1].checked == false){
		alert("구분을 선택해주십시오.");
		f1.division.focus();
		return;
	}
	if(f1.name.value == ''){
		alert("이름을 입력해주십시오.");
		f1.name.focus();
		return;
	}
	if(f1.name2.value == ''){
		alert("단체명을 입력해주십시오.");
		f1.name2.focus();
		return;
	}
	if(f1.tel1.value == ''){
		alert("연락처를 입력해주십시오.");
		f1.tel1.focus();
		return;
	}
	if(f1.tel2.value == ''){
		alert("연락처를 입력해주십시오.");
		f1.tel2.focus();
		return;
	}
	if(f1.tel3.value == ''){
		alert("연락처를 입력해주십시오.");
		f1.tel3.focus();
		return;
	}
	if(f1.email.value == ''){
		alert("이메일주소를 입력해주십시오.");
		f1.email.focus();
		return;
	}
	if(f1.email2.value == ''){
		alert("이메일주소를 입력해주십시오.");
		f1.email2.focus();
		return;
	}	
	if(f1.questype[0].checked == false && f1.questype[1].checked == false && f1.questype[2].checked == false && f1.questype[3].checked == false && f1.questype[4].checked == false && f1.questype[5].checked == false && f1.questype[6].checked == false&& f1.questype[7].checked == false  && f1.questype[8].checked == false){
		alert("후원 항목을 선택해주십시오.");
		f1.questype[0].focus();
		return;
	}
	if(f1.content.value == ''){
		alert("문의 내용을 입력해주십시오.");
		f1.content.focus();
		return;
	}	
	if(!confirm('문의 내용을 전송하겠습니까?')) return;
	f1.submit();
}

</script>