<?include "../../common/common.php"?>
<?
	// 후원내역 불러오기
	$query = "
		select
			*
		from
			".TABLE_PAYMENT_INFO."
		where
			pi_no = '{$argu['pi_no']}'
		";
	$res = $_DB->query($query);
	if (DB::isError($res)) {
		close_alert("","내용을 불러오지 못했습니다.\\n[".$res->getMessage()."]");
		exit;
	}

	$row = $res->fetchRow(DB_FETCHMODE_ASSOC);

	if(is_array($row)){
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title><?=_TITLE?> 후원금 영수증 출력</title>

<script src="http://code.jquery.com/jquery-latest.js" type="text/javascript"></script>
<script type="text/javascript" src="/js/ajax.js"></script>

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

	var initBody="";

	function beforePrint(){
		initBody = document.body.innerHTML;
		document.body.innerHTML = document.getElementById('divReport').innerHTML;
	}
	function afterPrint(){
		document.body.innerHTML = initBody;
	}
	
	function pageprint(){
		window.onbeforeprint= beforePrint;
		window.onafterprint= afterPrint;
		PrintTest();
	}

	function send_mail(){
		initBody = $("#divReport").html();
		
		var params = "msg=" + initBody + "&mail_type=1";

		sendRequest("./repport_email.php", params, function(){
			if(httpRequest.readyState==4){
				if(httpRequest.status==200){

					$("#sendBg").css("display","none");
					$("#sending").css("display","block");
					$("#send").css("display","none");
					
					var rtn=httpRequest.responseText;
					
					if(rtn=="F"){
						alert('이메일이 등록되어 있지 않습니다.\n회원정보 변경 후에 이용하시기 바랍니다.');
					}else{
						if(rtn=="true"){
							if(confirm('메일이 정상적으로 발송되었습니다.\n창을 닫으시겠습니까?')){
								window.close();
							}
						}else{
							alert('메일이 정상적으로 발송되지 않았습니다.\n잠시후에 다시 이용하시기 바랍니다.');
						}
					}

					//$("#divReport").text(rtn);

					return false;
				}else{
					alert("에러코드 : "+httpRequest.status);
				}
			}else{
				$("#sendBg").css("display","block");
				$("#sending").css("display","block");
				$("#send").css("display","block");
			}
		},"POST");
	}

//-->
</script>
<SCRIPT type="text/JavaScript" for="IEPageSetupX" event="OnError(ErrCode, ErrMsg)">
	alert('에러 코드: ' + ErrCode + "\n에러 메시지: " + ErrMsg);
</SCRIPT>

<style type="text/css">
<!--
	#sendBg{
		position:absolute;
		width:100%;
		height:100%;
		left:0px;
		top:0px;
		background:#000;
		opacity:0.8;
		filter:alpha(opacity=80);
		display:none;;
		z-index:100;
	}
	#sending{
		position:absolute;
		width:100%;
		height:100%;
		left:0px;
		top:0px;
		display:none;;
		z-index:101;
	}
	#send{
		position:relative;
		width:244px;
		height:127px;
		margin:216px auto 0px;
		display:none;
		z-index:102;
	}
-->
</style>
</head>
<body style="margin:0px;padding:0px;">
<OBJECT id="IEPageSetupX" classid="clsid:41C5BC45-1BE8-42C5-AD9F-495D6C8D7586" codebase="/cab/IEPageSetupX.cab#version=1,4,0,3" width="0" height="0">	
	<param name="copyright" value="http://isulnara.com">
	<div style="position:absolute;width:320px;z-index:1;top:20%;left:200px">
		<div style="position:relative;width:320px;border:solid 1px #99B3A0;background:#D8D7C4;overflow:hidden;padding:10px;"><FONT style='font-family: "굴림", "Verdana"; font-size: 9pt; font-style: normal;'>
		인쇄 여백제어 컨트롤이 설치되지 않았습니다.<BR><a href="/cab/IEPageSetupX.exe"><font color=red>이곳</font></a>을 클릭하여 수동으로 설치하시기 바랍니다.</FONT>
		</div>
	</div>
</OBJECT>

<div id="sendBg"></div>
<div id="sending">
	<div id="send"><img src="/img/sub10/send.gif" /></div>
</div>

<div id="divReport">
<table cellpadding="0" cellspacing="0" border="0" style="background:url(<?=_BASIC_HOME_URL?>/img/sub03/bg.png) repeat-y; width:773px;">
    <!-- <tr>
        <td class="sub_title">후원금영수증</td>
    </tr> -->
    <tr>
        <td valign="top"><table cellpadding="0" cellspacing="0" border="0" style="width:732px; height:551px; background:url(<?=_BASIC_HOME_URL?>/index/img/sub10/s103211_bg.png) no-repeat;">
                <tr>
                    <td align="center" valign="top" style="height:70px; padding-top:60px; color:#484848; font-size:16px; font-weight:bold;"><?=$row['buyr_name']?><span style="padding-left:5px;"><img src="<?=_BASIC_HOME_URL?>/index/img/sub10/s103211_1.png" /></span></td>
                </tr>
                <tr>
                    <td style="padding-left:162px; color:#494949; font-size:12px; height:56px;" valign="top"><?=$row['buyr_name']?><span style="padding-left:5px;"><img src="../../img/sub10/s103211_2.png" /></span></td>
                </tr>
                <tr>
                    <td style="padding-left:162px; line-height:21px; color:#484848; font-size:12px; height:120px;" valign="top">
						- 후 원 일 : <strong>
<?
		$regdate = new DateTime($row['pi_regdate']);
		echo date_format($regdate, "Y년 n월 j일");
?>
						</strong><br />
                        - 후원종류 : <strong><?=$row['good_name']?></strong><br />
                        - 결제방법 : <strong>
<?
			if($row['pay_type']=="0"){
				echo ($row['pay_method']=="bank") ? "무통장입금" : $_PAYMENT_CODE['nmethod'][$row['pay_method']];
			}else{
				echo $_PAYMENT_CODE['fmethod'][$row['pay_method']];
			}
	
?>
						</strong><br />
                        - 후원금액 : <strong><?=number_format($row['good_mny'])?>원</strong></td>
                </tr>
                <tr>
                    <td style="padding-left:162px; height:137px;" valign="top"><img src="<?=_BASIC_HOME_URL?>/index/img/sub10/s103211_3.png" /></td>
                </tr>
                <tr>
                    <td style="padding-left:138px;" valign="top"><img src="<?=_BASIC_HOME_URL?>/index/img/sub10/s103211_4.png" /></td>
                </tr>
            </table></td>
    </tr>
</table>
</div>

<div id="reportBtn" style="width:773px;padding:20px 0px;text-align:center;">
	<img src="../../img/sub10/print.png" style="margin-right:15px;cursor:pointer;" onclick="pageprint();" />
	<img src="../../img/sub10/email.png" style="margin-right:15px;cursor:pointer;" onclick="send_mail();" />
	<img src="../../img/sub10/cancell.png" style="cursor:pointer;" onclick="window.close();"/>
</div>


</body>
</html>
<?
	}else{
		close_alert("후원금 내역을 불러올 수 없습니다.");
	}
?>