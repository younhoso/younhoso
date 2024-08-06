<?

$_mail_body="
<table width=\"540\" cellpadding=\"0\" cellspacing=\"0\" style=\"margin:40px 30px;\">
	<tr>
		<td>
		<table width=\"540\" cellpadding=\"0\" cellspacing=\"0\">
			<tr>
				<td width=\"157\"><a href=\"<?=_BASIC_HOME_URL?>\" target=\"_blank\"><img src=\"{{IMG_URL}}/logo.jpg\" width=\"129\" height=\"48\" border=\"0\"></a></td>
				<td width=\"36\" valign=\"bottom\"></td>
				<td width=\"116\" valign=\"bottom\"><a href=\"{{HOME_URL}}?m=m01\" target=\"_blank\"><img src=\"{{IMG_URL}}/menu01.jpg\" width=\"116\" height=\"28\" border=\"0\"></a></td>
				<td width=\"89\" valign=\"bottom\"><a href=\"{{HOME_URL}}?m=m02\" target=\"_blank\"><img src=\"{{IMG_URL}}/menu02.jpg\" width=\"89\" height=\"28\" border=\"0\"></a></td>
				<td width=\"94\" valign=\"bottom\"><a href=\"{{HOME_URL}}?m=m03\" target=\"_blank\"><img src=\"{{IMG_URL}}/menu03.jpg\" width=\"94\" height=\"28\" border=\"0\"></a></td>
				<td width=\"76\" valign=\"bottom\"><a href=\"{{HOME_URL}}?m=m04\" target=\"_blank\"><img src=\"{{IMG_URL}}/menu04.jpg\" width=\"76\" height=\"28\" border=\"0\"></a></td>
			</tr>
		</table>
		</td>
	</tr>
	<tr>
		<td><img src=\"{{IMG_URL}}/title_fix.jpg\" width=\"540\" height=\"52\" border=\"0\"></td>
	</tr>
	<tr>
		<td background=\"{{IMG_URL}}/bg.jpg\">
		<table width=\"486\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"margin:0px auto;border-top:#454545 2px solid;\">
			<tr>
				<td style=\"background:#f0f0f0;border-bottom:#e2e2e2 1px solid;\">
				{{CONTENTS}}
				</td>
			</tr>
			<tr>
				<td><img src=\"{{IMG_URL}}/info.jpg\" width=\"486\" height=\"232\" border=\"0\"></td>
			</tr>
			<tr>
				<td height=\"55\" style=\"font-family:dotum, Verdana, Geneva, sans-serif;font-size:11px;color:#494949;line-height:17px;\">
* 본 메일은 발신전용 메일이므로 궁금하신 점은 고객센터로 문의 주세요.<br />
* 앞으로 메일 수신을 원하지 않으시면, <a href=\"{{HOME_URL}}/nomail.php?mail_addr=\" target=\"_blank\"><span style=\"font-family:dotum, Verdana, Geneva, sans-serif;font-size:13px;color:#494949;font-weight:bold;text-decoration:none;\">여기(수신거부)</span></a>를 클릭해 주세요.
				</td>
			</tr>
		</table>
		</td>
	</tr>
	<tr>
		<td><img src=\"{{IMG_URL}}/footer.jpg\" width=\"540\" height=\"97\" border=\"0\"></td>
	</tr>
</table>";

$_mail_body=str_replace("{{HOME_URL}}",_BASIC_HOME_URL,$_mail_body);
$_mail_body=str_replace("{{IMG_URL}}",_MAIL_IMG_URL,$_mail_body);

$_mail_title = "[I LOVE AFRICA] {{USER_NAME}} 님! 정기후원을 등록해 주셔서 감사합니다.";

/****************************

{{CONTENTS}} : 메일 내용

****************************/

//echo $_mail_body;
?>