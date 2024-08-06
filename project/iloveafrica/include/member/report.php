<?php
	include $_SERVER["DOCUMENT_ROOT"]."/common/common.php";

	// 사용자 정보 받기
	$_user_info = $obj_User->get_user_view($user_info['user_no']);
?>
 
<html>
<head>
<meta http-equiv='content-type' content='text/html; charset=utf-8'>
<title>아이러브아프리카 기부금 영수증 인터넷 출력</title>
<style> 
body, td, b {
        font-family: dotum, dotumche, gulim, gulimche, serif;
        font-size: 12px;
        font-style: normal;
        font-weight: 5500;
        line-height: 20px;
        letter-spacing: 1px;
        color: #000000;
		border-left-color:black;
		border-right-color:black;
		border-top-color:black;
		border-bottom-color:black;
    }
.style1 {font-size: large}
</style>
<script style="text/javasccript">
<!--
	function Installed()
	{
		try
		{
			return (new ActiveXObject('IEPageSetupX.IEPageSetup'));
		}
		catch (e)
		{
			return false;
		}
	}

	function PrintTest()
	{
		if (!Installed()){
			alert("컨트롤이 설치되지 않았습니다. 정상적으로 인쇄되지 않을 수 있습니다.");
		}else{
			/// 프린트 설정 및 프린트 하기
			IEPageSetupX.header = "";		// 머리글 설정
			IEPageSetupX.footer = "";		// 바닥글 설정
			IEPageSetupX.leftMargin = 20;		// 왼쪽 여백(단위: mm)
			IEPageSetupX.rightMargin = 20;		//오른쪽 여백(단위: mm)
			IEPageSetupX.topMargin = 25;		// 위쪽 여백(단위: mm)
			IEPageSetupX.bottomMargin = 15;		// 아래쪽 여백(단위: mm)
			IEPageSetupX.PrintBackground = true;		// 배경색 및 이미지 인쇄
			IEPageSetupX.ShrinkToFit = true;		// 크기에 맞게 축소(IE8 이상만 지원)
			IEPageSetupX.Orientation = 1;		// 인쇄 방향 설정 - (0:가로 / 1:세로)
			IEPageSetupX.PaperSize = 'A4';		// 인쇄 용지 설정

			IEPageSetupX.Print(true);		// 인쇄하기( true : 인쇄 대화상자 표시)
		}
	}

	window.onload=function(){
		PrintTest();
	}

//-->
</script>
<SCRIPT type="text/JavaScript" for="IEPageSetupX" event="OnError(ErrCode, ErrMsg)">
	alert('에러 코드: ' + ErrCode + "\n에러 메시지: " + ErrMsg);
</SCRIPT>
</head>
<body bgcolor="#FFFFFF" text="0" link="0" vlink="0" alink="0" leftmargin="3" topmargin="28" marginwidth="0" marginheight="0">
<OBJECT id="IEPageSetupX" classid="clsid:41C5BC45-1BE8-42C5-AD9F-495D6C8D7586" codebase="/cab/IEPageSetupX.cab#version=1,4,0,3" width="0" height="0">	
	<param name="copyright" value="http://isulnara.com">
	<div style="position:absolute;width:320px;z-index:1;top:20%;left:200px">
		<div style="position:relative;width:320px;border:solid 1px #99B3A0;background:#D8D7C4;overflow:hidden;padding:10px;"><FONT style='font-family: "굴림", "Verdana"; font-size: 9pt; font-style: normal;'>
		인쇄 여백제어 컨트롤이 설치되지 않았습니다.<BR><a href="/cab/IEPageSetupX.exe"><font color=red>이곳</font></a>을 클릭하여 수동으로 설치하시기 바랍니다.</FONT>
		</div>
	</div>
</OBJECT>
<table border="0" width="703" height="900" cellpadding="0" cellspacing="0">
	<tr height="0">
		<td width="125"></td>
		<td width="187"></td>
		<td width="135"></td>
		<td width="256"></td>
	</tr>
	<tr height="68">
		<td cellpadding="0" colspan="4" style="border-left-width:1; border-right-width:1; border-top-width:1; border-left-style:solid; border-right-style:solid; border-top-style:solid;">
			<table border="0" style="border-collapse:collapse;" align="center" cellspacing="0" width="100%">
				<tr height="10">
					<td colspan="4"></td>
				</tr>
				<tr height="40" valign="middle">
					<td width="5">&nbsp;</td>
					<td width="195">
						<table align="left" cellspacing="0" style='border-left-width:1; border-right-width:1; border-top-width:1; border-bottom-width:1; border-left-style:solid; border-right-style:solid; border-top-style:solid; border-bottom-style:solid;'>
							<tr height="30" valign="middle">
								<td width="60" align="center" style="font-size:12px;" style='border-left-width:1; border-right-width:1; border-top-width:1; border-bottom-width:1; border-left-style:solid; border-right-style:solid; border-top-style:solid; border-bottom-style:solid;'>일련번호</td>
								<td width="135" align="center" style="font-size:13px;" style='border-right-width:1; border-top-width:1; border-bottom-width:1; border-right-style:solid; border-top-style:solid; border-bottom-style:solid;'><?=$argu['pay_year']?>-R<?=sprintf("%07d",$_user_info['user_no'])?></td>
							</tr>
						</table>
					</td>
					<td width="260" align="center" style="font-size:23px; font-weight: 600; font-border:2;">기부금 영수증</td>
					<td>&nbsp;</td>
				</tr>
				<tr height="18">
					<td colspan="4"></td>
				</tr>
			</table>
		</td>
	</tr>
	<tr height="25">
		<td colspan="4" style="border-left-width:1; border-right-width:1; border-top-width:1; border-left-style:solid; border-right-style:solid; border-top-style:solid;">&nbsp;1. 기부자</td>
	</tr>
	<tr height="37">
		<td align="center" style="border-left-width:1; border-top-width:1; border-left-style:solid; border-top-style:solid;">성&nbsp;&nbsp;&nbsp;&nbsp;명</td>
		<td align="center" style="border-left-width:1; border-top-width:1; border-left-style:solid; border-top-style:solid;"><span style="line-height:130%;"><?if($_user_info['user_type']=='3'){?><?=$_user_info['user_compnay']?><?}else{?><?=$_user_info['user_name']?><?}?></span></td>
		<td align="center" style="line-height:130%;" style="border-left-width:1; border-top-width:1; border-left-style:solid; border-top-style:solid;">주민등록번호<br>(사업자등록번호)</td>
		<td align="center" style="border-left-width:1; border-right-width:1; border-top-width:1; border-left-style:solid; border-right-style:solid; border-top-style:solid;"><span style="font-size:12px;"><?if($_user_info['user_type']=='3'){?><?=$_user_info['user_person1']?>-<?=$_user_info['user_person2']?>-*****</span><?}else{?><?=$_user_info['user_person1']?>-*******<?}?></span>&nbsp;</td>
	</tr>
	<tr height="33">
		<td align="center" style="border-left-width:1; border-top-width:1; border-left-style:solid; border-top-style:solid;">주&nbsp;&nbsp;&nbsp;&nbsp;소</td>
		<td align="center" colspan="3" style="border-left-width:1; border-right-width:1; border-top-width:1; border-left-style:solid; border-right-style:solid; border-top-style:solid;"><span style="font-size:12px;line-height:130%;">&nbsp;<?=$_user_info["user_add1"]?> <?=$_user_info["user_add2"]?></span></td>
	</tr>
	<tr height="10">
		<td colspan="4" style="border-left-width:1; border-right-width:1; border-top-width:1; border-left-style:solid; border-right-style:solid; border-top-style:solid;">&nbsp;2. 기부금 단체</td>
	</tr>
	<tr height="39">
		<td align="center" style="border-left-width:1; border-top-width:1; border-left-style:solid; border-top-style:solid;">단&nbsp;체&nbsp;명</td>
		<td align="center" style="border-left-width:1; border-top-width:1; border-left-style:solid; border-top-style:solid;" style="line-height:130%;">사단법인<br>아이러브아프리카</td>
		<td align="center" style="border-left-width:1; border-top-width:1; border-left-style:solid; border-top-style:solid;" style="line-height:130%;">주민등록번호<br>(사업자등록번호)</td>
		<td align="center" style="border-left-width:1; border-right-width:1; border-top-width:1; border-left-style:solid; border-right-style:solid; border-top-style:solid;">107-82-15120</td>
	</tr>
	<tr height="29">
		<td align="center" style="border-left-width:1; border-top-width:1; border-left-style:solid; border-top-style:solid;">소&nbsp;재&nbsp;지</td>
		<td colspan="3" align="center" style="border-left-width:1; border-right-width:1; border-top-width:1; border-left-style:solid; border-right-style:solid; border-top-style:solid;">서울 영등포구 여의도동 17-20 3층</td>
	</tr>
	<tr height="29">
		<td colspan="4" style="border-left-width:1; border-right-width:1; border-top-width:1; border-left-style:solid; border-right-style:solid; border-top-style:solid;">&nbsp;3. 기부금 모집처(언론기관등)</td>
	</tr>
	<tr height="28">
		<td align="center" style="border-left-width:1; border-top-width:1; border-left-style:solid; border-top-style:solid;">단&nbsp;체&nbsp;명</td>
		<td style="border-left-width:1; border-top-width:1; border-left-style:solid; border-top-style:solid;">&nbsp;</td>
		<td align="center" style="border-left-width:1; border-top-width:1; border-left-style:solid; border-top-style:solid;">사업자등록번호</td>
		<td style="border-left-width:1; border-right-width:1; border-top-width:1; border-left-style:solid; border-right-style:solid; border-top-style:solid;">&nbsp;</td>
	</tr>
	<tr height="28">
		<td align="center" style="border-left-width:1; border-top-width:1; border-left-style:solid; border-top-style:solid;">소&nbsp;재&nbsp;지</td>
		<td colspan="3" style="border-left-width:1; border-right-width:1; border-top-width:1; border-left-style:solid; border-right-style:solid; border-top-style:solid;">&nbsp;</td>
	</tr>
		<tr height="24">
		<td colspan="4" style="border-left-width:1; border-right-width:1; border-top-width:1; border-left-style:solid; border-right-style:solid; border-top-style:solid;" valign="bottom">&nbsp;4. 기부내용</td>
	</tr>
 <?
	// 지정 기부금 내역 조회
	$argu['pay_type'] = "0";
	$argu['status'] = "1";
	$_list_one  = $Obj_payment->get_all_list($argu,$one_total,false);

	// 법정 기부금 내역 조회
	$argu['pay_type'] = "1";
	$argu['status'] = "출금성공";
	$_list_fix  = $Obj_payment->get_all_list($argu,$fix_total,false);

	$empty_loop=$fix_total-$one_total;

	if($empty_loop>0){
		$empty_loop_one = abs($empty_loop);
		$empty_loop_fix = 0;
	}else{
		$empty_loop_fix = abs($empty_loop);
		$empty_loop_one = 0;
	}
?>
	<tr height="107" valign="top">
		<td cellpadding="0" colspan="4" style="border-left-width:1; border-right-width:1; border-left-style:solid; border-right-style:solid; " >
			<table border="0" style="border-collapse:collapse;" align="center" cellspacing="0" width="703">
				<tr height="107">
					<!--지정기부금[S]-->
					<td style="border-right-width:1; border-top-width:1; border-bottom-width:1; border-right-style:solid; border-top-style:solid; border-bottom-style:solid;" valign="top">
						<table border="0" style="border-collapse:collapse; margin-top:-1px; margin-left:-1px; margin-right:-1px; margin-bottom:0px;" align="center" cellspacing="0" width="351">
							<tr height="26">
								<td width="107" align="center" style='border-right-width:1; border-bottom-width:1; border-top-width:1; border-right-style:solid; border-bottom-style:solid; border-top-style:solid;'>유&nbsp;형</td>
								<td width="244" align="center" style='border-bottom-width:1; border-top-width:1; border-bottom-style:solid; border-top-style:solid;' colspan="2">지정기부금</td>		  
							</tr>
							<tr height="26">
								<td width="107" align="center" style='border-right-width:1; border-bottom-width:1; border-top-width:1; border-right-style:solid; border-bottom-style:solid; border-top-style:solid;'>코&nbsp;드</td>
								<td width="244" align="center" style='border-bottom-width:1; border-bottom-style:solid;' colspan="2">40</td>		  
							</tr>
							<tr height="23">
								<td width="107" align="center" style='border-right-width:1; border-bottom-width:1; border-top-width:1; border-right-style:solid; border-bottom-style:solid; border-top-style:solid;'>년&nbsp;월</td>
								<td width="122" align="center" style='border-right-width:1; border-bottom-width:1; border-top-width:1; border-right-style:solid; border-bottom-style:solid; border-top-style:solid;'>내&nbsp;용</td>
								<td width="122" align="center" style='border-bottom-width:1;border-bottom-style:solid;'>금&nbsp;액</td>		  
							</tr>
							<tr height="6">
								<td align="center" style="border-right-width:1; border-right-style:solid;"></td>
								<td align="center" style="border-right-width:1; border-right-style:solid;"></td>
								<td align="center"></td>
							</tr>
<?
	$mny_one_total = 0;

	if(count($_list_one)>0){
		for($i=0;$i<count($_list_one);$i++){
			$mny_one_total += $_list_one[$i]['good_mny'];
?>
							<tr valign="top" height="20">
								<td align="center" style="font-size:12px;line-height:130%; border-right-width:1; border-right-style:solid;"><?=substr($_list_one[$i]['pi_regdate'],0,10)?></td>
								<td align="center" style="font-size:12px;line-height:130%; border-right-width:1; border-right-style:solid;"><?=$_list_one[$i]['good_name']?></td>
								<td align="right" style="font-size:12px;line-height:130%; "><?=number_format($_list_one[$i]['good_mny'])?>&nbsp;</td>
							</tr>
 <?
		}
	}

	if($empty_loop_one>0){
		for($j=0;$j<$empty_loop_one;$j++){
?>
							<tr valign="top" height="20">
								<td align="center" style="font-size:12px;line-height:130%; border-right-width:1; border-right-style:solid;">&nbsp;</td>
								<td align="center" style="font-size:12px;line-height:130%; border-right-width:1; border-right-style:solid;">&nbsp;</td>
								<td align="right" style="font-size:12px;line-height:130%; ">&nbsp;</td>
							</tr>
<?
		}
	}
?>
							<tr height="0">
								<td align="center" style="border-right-width:1; border-right-style:solid;"></td>
								<td align="center" style="border-right-width:1; border-right-style:solid;"></td>
								<td align="center"></td>
							</tr>
							<tr height="26" valign="center">
								<td align="center" style='border-top-width:1; border-right-width:1; border-right-style:solid; border-top-style:solid;'>합&nbsp;계</td>
								<td align="right" style="font-size:12px;line-height:130%; border-top-width:1; border-top-style:solid;" colspan="2"><?=number_format($mny_one_total)?>&nbsp;</td>
							</tr>
						</table>
					</td>
					<!--지정기부금[E]-->
					<!--특례기부금[S]-->
					<!-- <td style="border-right-width:1; border-top-width:1; border-bottom-width:1; border-right-style:solid; border-top-style:solid; border-bottom-style:solid;">
						<table border="0" style="border-collapse:collapse; margin-top:-1px; margin-left:-1px; margin-right:-1px; margin-bottom:0px;" align="center" cellspacing="0" width="234">
							<tr height="26">
								<td width="70" align="center" style='border-right-width:1; border-bottom-width:1; border-top-width:1; border-right-style:solid; border-bottom-style:solid; border-top-style:solid;'>유&nbsp;형</td>
								<td width="164" align="center" style='border-bottom-width:1; border-top-width:1; border-bottom-style:solid; border-top-style:solid;' colspan="2">특례기부금</td>		  
							</tr>
							<tr height="26">
								<td width="70" align="center" style='border-right-width:1; border-bottom-width:1; border-top-width:1; border-right-style:solid; border-bottom-style:solid; border-top-style:solid;'>코&nbsp;드</td>
								<td width="164" align="center" style='border-bottom-width:1; border-bottom-style:solid;' colspan="2">30</td>		  
							</tr>
							<tr height="23">
								<td width="70" align="center" style='border-right-width:1; border-bottom-width:1; border-top-width:1; border-right-style:solid; border-bottom-style:solid; border-top-style:solid;'>년&nbsp;월</td>
								<td width="82" align="center" style='border-right-width:1; border-bottom-width:1; border-top-width:1; border-right-style:solid; border-bottom-style:solid; border-top-style:solid;'>내&nbsp;용</td>
								<td width="82" align="center" style='border-bottom-width:1;border-bottom-style:solid;'>금&nbsp;액</td>		  
							</tr>
							<tr height="6">
								<td align="center" style="border-right-width:1; border-right-style:solid;"></td>
								<td align="center" style="border-right-width:1; border-right-style:solid;"></td>
								<td align="center"></td>
							</tr>
 
							<tr height="0">
								<td align="center" style="border-right-width:1; border-right-style:solid;"></td>
								<td align="center" style="border-right-width:1; border-right-style:solid;"></td>
								<td align="center"></td>
							</tr>
							<tr height="26" valign="center">
								<td align="center" style='border-top-width:1; border-right-width:1; border-right-style:solid; border-top-style:solid;'>합&nbsp;계</td>
								<td align="right" style="font-size:12px;line-height:130%; border-top-width:1; border-top-style:solid;" colspan="2">0&nbsp;</td>
							</tr>
						</table>
					</td> -->
					<!--특례기부금[E]-->
					<!--법정기부금[S]-->
					<td style="border-right-width:1; border-top-width:1; border-bottom-width:1; border-right-style:solid; border-top-style:solid; border-bottom-style:solid;" valign="top">
						<table border="0" style="border-collapse:collapse; margin-top:-1px; margin-left:-1px; margin-right:-1px; margin-bottom:0px;" align="center" cellspacing="0" width="351">
							<tr height="26">
								<td width="107" align="center" style='border-right-width:1; border-bottom-width:1; border-top-width:1; border-right-style:solid; border-bottom-style:solid; border-top-style:solid;'>유&nbsp;형</td>
								<td width="244" align="center" style='border-bottom-width:1; border-top-width:1; border-bottom-style:solid; border-top-style:solid;' colspan="2">법정기부금</td>		  
							</tr>
							<tr height="26">
								<td width="107" align="center" style='border-right-width:1; border-bottom-width:1; border-top-width:1; border-right-style:solid; border-bottom-style:solid; border-top-style:solid;'>코&nbsp;드</td>
								<td width="244" align="center" style='border-bottom-width:1; border-bottom-style:solid;' colspan="2">10</td>		  
							</tr>
							<tr height="23">
								<td width="107" align="center" style='border-right-width:1; border-bottom-width:1; border-top-width:1; border-right-style:solid; border-bottom-style:solid; border-top-style:solid;'>년&nbsp;월</td>
								<td width="122" align="center" style='border-right-width:1; border-bottom-width:1; border-top-width:1; border-right-style:solid; border-bottom-style:solid; border-top-style:solid;'>내&nbsp;용</td>
								<td width="122" align="center" style='border-bottom-width:1;border-bottom-style:solid;'>금&nbsp;액</td>		  
							</tr>
							<tr height="6">
								<td align="center" style="border-right-width:1; border-right-style:solid;"></td>
								<td align="center" style="border-right-width:1; border-right-style:solid;"></td>
								<td align="center"></td>
							</tr>
<?
	$mny_fix_total = 0;

	if(count($_list_fix)>0){
		for($i=0;$i<count($_list_fix);$i++){
			$mny_fix_total += $_list_fix[$i]['good_mny'];
?>
							<tr valign="top" height="20">
								<td align="center" style="font-size:12px;line-height:130%; border-right-width:1; border-right-style:solid;"><?=substr($_list_fix[$i]['pi_regdate'],0,10)?></td>
								<td align="center" style="font-size:12px;line-height:130%; border-right-width:1; border-right-style:solid;"><?=$_list_fix[$i]['good_name']?></td>
								<td align="right" style="font-size:12px;line-height:130%; "><?=number_format($_list_fix[$i]['good_mny'])?>&nbsp;</td>
							</tr>
 <?
		}
	}

	if($empty_loop_fix>0){
		for($j=0;$j<$empty_loop_fix;$j++){
?>
							<tr valign="top" height="20">
								<td align="center" style="font-size:12px;line-height:130%; border-right-width:1; border-right-style:solid;">&nbsp;</td>
								<td align="center" style="font-size:12px;line-height:130%; border-right-width:1; border-right-style:solid;">&nbsp;</td>
								<td align="right" style="font-size:12px;line-height:130%; ">&nbsp;</td>
							</tr>
<?
		}
	}
?>
 
							<tr height="0">
								<td align="center" style="border-right-width:1; border-right-style:solid;"></td>
								<td align="center" style="border-right-width:1; border-right-style:solid;"></td>
								<td align="center"></td>
							</tr>
							<tr height="26" valign="center">
								<td align="center" style='border-top-width:1; border-right-width:1; border-right-style:solid; border-top-style:solid;'>합&nbsp;계</td>
								<td align="right" style="font-size:12px;line-height:130%; border-top-width:1; border-top-style:solid;" colspan="2"><?=number_format($mny_fix_total)?>&nbsp;</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</td>
	</tr>
	<tr height="80">
		<td cellpadding="0" colspan="4" style="border-left-width:1; border-right-width:1; border-top-width:1; border-left-style:solid; border-right-style:solid; border-top-style:solid;">
			<table border="0" style="border-collapse:collapse;" align="center" cellspacing="0" width="100%">
				<tr height="33">
					<td colspan="4">&nbsp;&nbsp;&nbsp;&nbsp;「소득세법」 제 34조, 조세특례제한법 제73조, 제76조 및 제88조의 4에 따른 기부금을 위와 같이 기부하였음을 증명하여 주시기 바랍니다.</td>
				</tr>
				<tr height="22">
					<td colspan="4" align="right">년&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;월&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;일&nbsp;&nbsp;&nbsp;&nbsp;</td>
				</tr>
				<tr height="25">
					<td colspan="4" align="right">신청인&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(서명 또는 인)&nbsp;&nbsp;&nbsp;</td>
				</tr>
			</table>
		<td>
	</tr>
	<tr height="111">
		<td cellpadding="0" colspan="4" style="border-left-width:1; border-right-width:1; border-top-width:1; border-left-style:solid; border-right-style:solid; border-top-style:solid;">
			<table border="0" style="border-collapse:collapse;" align="center" cellspacing="0" width="100%" style="background-repeat:no-repeat;background-position:right bottom;" >
			<!--background="background:url('/img/sub10/seal.jpg') no-repeat;"-->
				<tr height="42">
					<td colspan="4" align="center">위와 같이 기부금을 기부하였음을 증명합니다.</td>
				</tr>
				<tr height="33">
					<td colspan="2">&nbsp;</td>
					<td colspan="2" align="right"><?=date("Y")?>년&nbsp;&nbsp;&nbsp;&nbsp;<?=date("n")?>월&nbsp;&nbsp;&nbsp;&nbsp;<?=date("j")?>일&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
				</tr>
				<tr height="36">
					<td colspan="4" align="right">기부금 수령인&nbsp;&nbsp;아이러브아프리카 대표&nbsp;&nbsp;이&nbsp;&nbsp;창&nbsp;&nbsp;옥&nbsp;&nbsp;&nbsp;</td><td><img src='/img/sub10/seal.jpg '></td>
				</tr>
			</table>
		<td>
	</tr>
	<tr>
		<td cellpadding="0" colspan="4" valign="top" style="border-left-width:1; border-right-width:1; border-top-width:1; border-bottom-width:1; border-left-style:solid; border-right-style:solid; border-top-style:solid; border-bottom-style:solid;">
			<table border="0" style="border-collapse:collapse;" align="center" valign="top" cellspacing="0" width="100%">
				<tr height="3">
					<td colspan="2"></td>
				</tr>
				<tr>
					<td valign="top" style="font-size:10px;font-weight:100;line-height:110%;"  colspan="2">* 작성방법</td>
				</tr>
				<tr>
					<td valign="top" style="font-size:10px;font-weight:100;line-height:110%;" colspan="2">1. "3. 기부금 모집처(언론기관 등)"는 방송사, 신문사, 통신회사 등 기부금을 대신 접수하여 기부금 단체에 전달하는 기관을 <br>&nbsp;&nbsp;&nbsp;&nbsp;말합니다.</td>
				</tr>
				<tr>
					<td valign="top" style="font-size:10px;font-weight:100;line-height:110%;" colspan="2">2. "4. 기부내용"란에 적은 유형·코드는 다음과 같습니다.
				</tr>    
				<tr>
					<td width="490" valign="top" style="font-size:10px;font-weight:100;line-height:110%;">&nbsp;&nbsp;가.「소득세법」제34조 제2항에 따른 기부<br>&nbsp;&nbsp;나.「조세특례제한법」 제76조에 따른 기부금<br>&nbsp;&nbsp;다.「조세특례제한법」제73조 제1항 제1호에 따른 기부금<br>&nbsp;&nbsp;라.「조세특례제한법」제73조 제1항(제1호 및 제 15호 제외)에 따른 기부금<br>&nbsp;&nbsp;마.「조세특례제한법」제73조 제1항 제15에 따른 공익법인신탁기부금<br>&nbsp;&nbsp;바.「소득세법」제34조 제1항(종교단체 기부금 제외)에 따른 기부금<br>&nbsp;&nbsp;사.「소득세법」제34조 제1항에 따른 기부금 중 종교단체기부금<br>&nbsp;&nbsp;아.「조세특례제한법」제88조의 4에 따른 기부금<br>&nbsp;&nbsp;기타 기부금(필요경비 및 소득금액에 포함되지 아니하는 기부금)</td>
					<td valign="top" style="font-size:10px;font-weight:100;line-height:110%;">: 법정기부금, 코드 10<br>: 조특법 76, 코드 20<br>: 진흥기금출연, 코드 21<br>: 조특법 73, 코드 30<br>: 조특법 73, 코드 31<br>: 지정기부금, 코드 40<br>: 종교단체기부금, 코드 41<br>: 우리사주조합기부금, 코드 42<br>: 기타 기부금, 코드 50</td>
				</tr>    
			</table>
		<td>
	</tr>
</table>
</body>
</html>


<?

	### unset
	unset($_DB);
	unset($_TPL);
?>