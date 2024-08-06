<h2 class="sub11_h2"><img src="img/sub11_title.png" alt="아이러브아프리카는 아프리카 대륙을 전문으로 돕는 아프리카전문국제구호개발 비정부기구(NGO, Non Governmental Organization)입니다." /></h2>
<script>
function chkFrm() {
	document.order_info.target="pay";
	document.order_info.action="./kcp/re/order.php";
	document.order_info.submit();

//window.open ("./kcp/shop/order.php","test","width=800,height=800,status=0,menubar=0,toolbar=0,scrollbars=0"); 
} 
</script>

<!-- 일시 후원 결제 폼 -->
<form name="order_info" id="order_info" method="post" action="./kcp/re/order.php" method="post" target="pay" onSubmit="return chkFrm();" enctype="multipart/form-data" style="margin:0;">
<input type="hidden" name="m" value="<?=$argu["m"]?>" />
<input type="hidden" name="s" value="<?=$argu["s"]?>" />
<input type="hidden" name="give_type" value="<?=$argu['give_type']?>" />
<input type="hidden" name="good_name" value="지난후원회비" />
<input type="hidden" name="good_mny" value="<?=$argu['good_mny']?>" />
<input type="hidden" name="mode" value="INPUT" />
<input type="hidden" name="sqlIN" value="<?=$sqlIN?>" />

<input type="hidden" name="ordr_idxx" value="<?=$_ordr_idxx?>" />

<table cellpadding="0" cellspacing="0" border="0" class="sub03_table">
  <tr>
    <td class="sub_title">지난 후원회비 결제하기</td>
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
                <td style="font-size:12px; color:#494949; font-weight:bold; text-align:center; background:#f0f0f0; border-bottom:1px solid #dedede; border-top:2px solid #454545; width:90px; height:30px;">결제방법</td>
                <td style="font-size:12px; color:#676767; padding-left:20px; border-bottom:1px solid #dedede; border-top:2px solid #454545; width:621px; height:30px;">
					<ul>
<?
	foreach($_PAYMENT_CODE['nmethod'] as $key => $value){
?>
                    <li class="fl">
                      <input type="radio" name="pay_method" value="<?=$key?>" <?if($key==$argu["pay_method"]){?>checked<?}?> onclick="pay_method_form('one_form.php', '<?=$key?>', '<?=$value?>');" />
                    </li>
                    <li class="fl" style="padding:5px 15px 0 5px;"><?=$value?></li>
<?
	}
?>
                  </ul>
				</td>
              </tr>
              <tr>
                <td style="font-size:12px; color:#494949; font-weight:bold; text-align:center; background:#f0f0f0; border-bottom:1px solid #dedede; width:90px; height:30px;">후원금액</td>
                <td style="font-size:12px; color:#676767; padding-left:20px; border-bottom:1px solid #dedede; width:621px; height:30px;"><?=number_format($argu["good_mny"])?>원</td>
              </tr>
              <tr>
                <td style="font-size:12px; color:#494949; font-weight:bold; text-align:center; background:#f0f0f0; border-bottom:1px solid #dedede; width:90px; height:30px;">후원내역</td>
                <td style="font-size:12px; color:#676767; padding-left:20px; border-bottom:1px solid #dedede; width:621px; height:30px;">지난후원회비</td>
              </tr>
              <tr>
                <td style="font-size:12px; color:#494949; font-weight:bold; text-align:center; background:#f0f0f0; border-bottom:2px solid #454545; width:90px; height:120px;" id="pay_type"></td>
                <td style="font-size:12px; color:#676767; padding-left:20px; border-bottom:2px solid #454545; width:621px; height:30px;" id="pay_method"></td>
              </tr>
            </table>
            
            
            <!-- // tel3 ( 휴대전화 ) --></td>
        </tr>
        
        <tr>
          <td height="80" align="center">
		  <span style="padding-right:7px;">
			<input type="image" src="img/sub03/bt.png" style="<?if(!$_SESSION['user_id']){?>display:none;<?}?>"/>
		  </span>
		  <span style="padding-left:7px;">
			<a href="/"><img src="img/sub03/cancell.jpg" /></a>
		  </span>
		  
		  </td>
        </tr>
      </table></td>
  </tr>
</table>
</form>
<script>pay_method_form('one_form.php', '<?=$argu["pay_method"]?>', '<?=$_PAYMENT_CODE["nmethod"][$argu["pay_method"]]?>');</script>
<iframe name="pay" id="pay" width="0" height="0"></iframe>