<!-- 비밀번호 찾기 성공시 확인창 -->
<div >
    <table cellpadding="0" cellspacing="0" border="0" style="width:396px; height:246px; border:2px solid #3eaf0e; background:#ffffff;">
        <tr>
            <td height="50" style="padding-bottom:38px;"><span style="padding-top:32px; padding-left:23px; display:block; float:left;"><img src="img/sub05/pop_pw_title.png" /></span><span style="float:right; padding-bottom:2px; display:block;"><img src="img/sub09/pop_close.png" class="cp" onclick="layer_pop_close();"/></span></td>
        </tr>
        <tr>
            <td style="padding:0 23px 13px 23px;"><img src="img/sub09/id_ok_text.png" /></td>
        </tr>
        <tr>
            <td style="padding:0 23px;"><table cellpadding="0" cellspacing="0" border="0" width="348px;">
                    <tr>
                        <td height="60" align="center" style="border-bottom:1px solid #c0c0c0; border-top:1px solid #c0c0c0; background:#fafafa; text-align:center; color:#808080; font-size:11px;"><span style="color:#5a5a5a; font-size:11px; font-weight:bold;"><?=iconv("EUC-KR","UTF-8",$_GET["name"])?></span>님의 등록된 이메일 <span style="font-size:11px; color:#5a5a5a; font-weight:bold;"><?=substr($_GET["email"],0,3)?>"****@******</span>임시비밀번호를 발송하였습니다. <br> 로그인후 비밀번호를 변경해 주세요!</td>
                    </tr>
                </table></td>
        </tr>
        <tr>
            <td align="center" style="padding:25px 0 51px 0;"><img src="img/sub09/pop_bt2.png" onclick="layer_pop_close();" class="cp"/></td>
        </tr>
    </table>
</div>

