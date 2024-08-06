<h2 class="sub11_h2"><img src="img/sub11_title.png" alt="아이러브아프리카는 아프리카 대륙을 전문으로 돕는 아프리카전문국제구호개발 비정부기구(NGO, Non Governmental Organization)입니다." /></h2>

<!-- 정기 후원 결제 폼 -->
<form name="fixedFrm" id="fixedFrm"  method="post" enctype="multipart/form-data" style="margin:0;">
<?
$argu = array_merge($argu, array("mode" => "ACTION"));

foreach($argu as $key => $value){
?>
<input type="hidden" name="<?=$key?>" value="<?=$value?>">
<?}?>
<!-- <input type="hidden" name="tab_chk" value="1" /> -->


<table cellpadding="0" cellspacing="0" border="0" class="sub03_table">
  <tr>
    <td class="sub_title">정기후원</td>
  </tr>
  <tr>
    <td class="sub_c" style="padding-bottom:30px;" valign="top"><table cellpadding="0" cellspacing="0" border="0" style="width:731px;">
        <tr>
          <td style="padding-bottom:13px;"><img src="img/sub03/title1.png" />
</td>
        </tr>
        <tr>
          <td><table cellpadding="0" cellspacing="0" border="0" class="tel1">
              <tr>
                <td style="font-size:12px; color:#494949; font-weight:bold; text-align:center; background:#f0f0f0; border-bottom:1px solid #dedede; border-top:2px solid #454545; width:90px; height:30px;">납입방법</td>
                <td style="font-size:12px; color:#676767; padding-left:20px; border-bottom:1px solid #dedede; border-top:2px solid #454545; width:621px; height:30px;">
					<?=$_PAYMENT_CODE["fmethod"][$argu['pay_method']]?>
				</td>
              </tr>
              <tr>
                <td style="font-size:12px; color:#494949; font-weight:bold; text-align:center; background:#f0f0f0; border-bottom:1px solid #dedede; width:90px; height:30px;">후원금액</td>
                <td style="font-size:12px; color:#676767; padding-left:20px; border-bottom:1px solid #dedede; width:621px; height:30px;"><?=number_format($argu["good_mny"])?>원</td>
              </tr>
              <tr>
                <td style="font-size:12px; color:#494949; font-weight:bold; text-align:center; background:#f0f0f0; border-bottom:1px solid #dedede; width:90px; height:30px;">후원내역</td>
                <td style="font-size:12px; color:#676767; padding-left:20px; border-bottom:1px solid #dedede; width:621px; height:30px;"><?=$argu['good_name']?></td>
              </tr>
              <tr>
                <td style="font-size:12px; color:#494949; font-weight:bold; text-align:center; background:#f0f0f0; border-bottom:1px solid #dedede; width:90px; height:30px;line-height:10px;border-b:2px solid #454545;" colspan="2"><p>신청하신 후원은 결제수단에 따라 출금 또는 결제일이 다릅니다. 신청이 완료된 후 메일을 발송해 드리오니 확인하시기 바랍니다.</p></td>
              </tr>
            </table>
            
            
            <!-- // tel3 ( 휴대전화 ) --></td>
        </tr>
        <tr>
          <td height="80" align="center">
		  <span style="padding-right:7px;">
			<input type="image" src="img/sub03/s32221_11.png" style="<?if(!$_SESSION['user_id']){?>display:none;<?}?>"/>
		  </span>
		  <span style="padding-left:7px;">
			<a href="support.php?mode=CANCEL"><img src="img/sub03/cancell.jpg" /></a>
		  </span>
		  
		  </td>
        </tr>
      </table></td>
  </tr>
</table>
</form>
<script>pay_method_form('fix_form.php', '<?=$argu["pay_method"]?>', '<?=$_PAYMENT_CODE["fmethod"][$argu["pay_method"]]?>');</script>