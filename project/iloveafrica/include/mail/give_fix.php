<?

$_mail_body="
<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\">
<tr>
<td>
<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\">
<tr>
<td style=\"height:48px; padding-top:35px; padding-right:30px; padding-bottom:20px;\"><a href=\"<?=_BASIC_HOME_URL?>\" target=\"_blank\"><img src=\"{{IMG_URL}}/web_logo.png\" border=\"0\"></a></td>
<td style=\"height:48px; padding-top:35px; padding-bottom:20px;\" valign=\"bottom\"><a href=\"{{HOME_URL}}/sub01.php\" target=\"_blank\"><img src=\"{{IMG_URL}}/web_gnb1.png\" border=\"0\"></a></td>
<td style=\"height:48px; padding-top:35px; padding-bottom:20px;\" valign=\"bottom\"><a href=\"{{HOME_URL}}/sub02.php\" target=\"_blank\"><img src=\"{{IMG_URL}}/web_gnb2.png\" border=\"0\"></a></td>
<td style=\"height:48px; padding-top:35px; padding-bottom:20px;\" valign=\"bottom\"><a href=\"{{HOME_URL}}/sub03.php\" target=\"_blank\"><img src=\"{{IMG_URL}}/web_gnb3.png\" border=\"0\"></a></td>
<td style=\"height:48px; padding-top:35px; padding-bottom:20px;\" valign=\"bottom\"><a href=\"{{HOME_URL}}/sub04.php\" target=\"_blank\"><img src=\"{{IMG_URL}}/web_gnb4.png\" border=\"0\"></a></td>
<td style=\"height:48px; padding-top:35px; padding-bottom:20px;\" valign=\"bottom\"><a href=\"{{HOME_URL}}/sub05.php\" target=\"_blank\"><img src=\"{{IMG_URL}}/web_gnb5.png\" border=\"0\"></a></td>
<td style=\"height:48px; padding-top:35px; padding-bottom:20px;\" valign=\"bottom\"><a href=\"{{HOME_URL}}/sub06.php\" target=\"_blank\"><img src=\"{{IMG_URL}}/web_gnb6.png\" border=\"0\"></a></td>
</tr>
</table>
</td>
</tr>
<tr>
<td style=\"border:1px solid #c4c4c4; width:537px;\">
    <table cellpadding=\"0\" cellspacing=\"0\" border=\"0\">
    <tr>
    <td>
        <table cellpadding=\"0\" cellspacing=\"0\" border=\"0\">
        <tr>
        <td style=\"color:#494949; font-size:15px; font-weight:bold; padding:50px 20px 20px 20px;\">정기후원등록 안내</td>
        </tr>
        <tr>
        <td style=\"padding:20px 40px 10px 40px; border-top:2px solid #454545; color:#494949; font-size:12px;\">정기후원을 등록해 주셔서 감사합니다.<br /><br />
정기후원은 매월 신청하신 날짜에 출금/승인되며,<br />
<strong>마이페이지</strong>에서 <strong>금액 변경 및 추가신청</strong>을 하실 수가 있습니다.</td>
        </tr>
        <tr>
        <td style=\"padding:0 40px;\">
        
        <table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"background:#f0f0f0;\">
        <tr>
        <td style=\"width:137px; border-right:1px solid #dedede; color:#494949; font-size:12px; font-weight:bold; padding-left:20px;\">아이디</td>
        <td style=\"width:280px; color:#676767; font-size:11px; padding:10px 0 10px 20px;\">{{USER_ID}}</td>
        </tr>
        <tr>
        <td style=\"width:137px; border-right:1px solid #dedede; color:#494949; font-size:12px; font-weight:bold; padding-left:20px;\">후원분야</td>
        <td style=\"width:280px; color:#676767; font-size:11px; padding:10px 0 10px 20px;\">{{GOOD_NAME}}</td>
        </tr>
        <tr>
        <td style=\"width:137px; border-right:1px solid #dedede; color:#494949; font-size:12px; font-weight:bold; padding-left:20px;\">후원자명</td>
        <td style=\"width:280px; color:#676767; font-size:11px; padding:10px 0 10px 20px;\">{{GIVE_NAME}}</td>
        </tr>
        <tr>
        <td style=\"width:137px; border-right:1px solid #dedede; color:#494949; font-size:12px; font-weight:bold; padding-left:20px;\">후원금액</td>
        <td style=\"width:280px; color:#676767; font-size:11px; padding:10px 0 10px 20px;\">{{GOOD_MONEY}}</td>
        </tr>
        <tr>
        <td style=\"width:137px; border-right:1px solid #dedede; color:#494949; font-size:12px; font-weight:bold; padding-left:20px;\">결제정보</td>
        <td style=\"width:280px; color:#676767; font-size:11px; padding:10px 0 10px 20px;\">{{PAY_INFO}}</td>
        </tr>
        </table>
        </td>
        </tr>
        </table>
    </td>
    </tr>
    <tr>
    <td style=\"height:24px; padding:40px 0;\" align=\"center\"><a href=\"{{HOME_URL}}/sub03.php\" target=\"_blank\"><img src=\"{{IMG_URL}}/web_bt1.png\" border=\"0\"></a>&nbsp;&nbsp;<a href=\"{{HOME_URL}}/sub10_02_03_01_01.php\" target=\"_blank\"><img src=\"{{IMG_URL}}/web_bt2.png\" border=\"0\"></a></td>
    </tr>
    <tr>
    <td style=\"color:#494949; font-size:13px; height:20px; padding-left:40px;\">* 본 메일은 발신전용 매일이므로 궁금하신 점은 고객센터로 문의 주세요.</td>
    </tr>
    <tr>
    <td style=\"color:#494949; font-size:13px; height:20px; padding-bottom:30px; padding-left:40px;\">* 앞으로 메일 수신을 원하지 않으시면, <a href=\"#\" style=\"color:#494949; font-size:13px; font-weight:bold;\">여기(수신거부)</a>를 클릭해 주세요.</td>
    </tr>
    <tr>
    <td><img src=\"{{IMG_URL}}/web_footer.png\"></td>
    </tr>
    </table>
</td>
</tr>
</table>";

$_mail_body=str_replace("{{HOME_URL}}",_BASIC_HOME_URL,$_mail_body);
$_mail_body=str_replace("{{IMG_URL}}",_MAIL_IMG_URL,$_mail_body);

$_mail_title = "[I LOVE AFRICA] {{USER_NAME}} 님! 정기후원을 등록해 주셔서 감사합니다.";

/****************************

{{USER_ID}} : 회원 아이디
{{USER_NAME}} : 회원명
{{GOOD_MONEY}} : 후원금액
{{PAY_INFO}} : 결제정보

****************************/

//echo $_mail_body;
?>