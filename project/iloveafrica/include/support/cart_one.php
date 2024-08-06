<form name="cartFrm" method="post" action="support.php">
<input type="hidden" name="tab_chk" value="2">
<input type="hidden" name="mode" value="ORDER">
<table cellpadding="0" cellspacing="0" border="0" class="sub03_table" id="tab202" >
  <tr>
    <td class="sub_title">계좌번호안내</td>
  </tr>
  <tr>
    <td class="sub_c" valign="top"><table cellpadding="0" cellspacing="0" border="0" style="width:731px;">
        <tr>
          <td class="p_b_28"><img src="img/sub03/s32511_1.png" /></td>
        </tr>
       <!-- <tr>
          <td class="p_b_32"><img src="img/sub03/da1.png" onclick="tab_change(1,'<?=$argu["si_no"]?>');" style="cursor:pointer"  /><img src="img/sub03/da2_o.png" onclick="tab_change(2,'<?=$argu["si_no"]?>');" style="cursor:pointer" /></td>
        </tr> -->
       <!--  <tr>
          <td class="p_b_13"><div class="fl"><img src="img/sub03/s32511_2.png" /></div>
            <div class="fr" style="color:#df0006; font-size:11px;">* 체크박스를 복수 선택하여 후원하기가 가능합니다.</div></td>
        </tr>
        <tr>
          <td class="p_b_60">
			<table cellpadding="0" cellspacing="0" border="0">
              <tr>
				<td colspan="2" style="border-bottom:1px solid #dedede; border-top:2px solid #454545;"></td>
			  </tr>
<?
if(!$argu["si_no"]){
	$_cate_list_m_cart = $Obj_shop->get_category_all_m_cart($ctotal);
	if(is_array($_cate_list_m_cart)){
		foreach($_cate_list_m_cart as $_cmkey_cart => $_cmvalue_cart){
?>
              <tr>
                <td style="width:248px; height:30px; border-bottom:1px solid #dedede; font-size:12px; color:#494949; font-weight:bold; text-align:center; background:#f0f0f0;">
					<?=$_cmvalue_cart["scm_title"]?>
				</td>
				<td style="width:483px; border-bottom:1px solid #dedede;" >
					<table width="100%" cellpadding="0" cellspacing="0" >
<?
		
			$argu["sc_no"] = $_cmvalue_cart["sc_no"];
			$argu["scm_no"] = $_cmvalue_cart["scm_no"];
			$_item_list_cart = $Obj_shop -> get_item_all($argu,$total);
			if(is_array($_item_list_cart)){
				foreach($_item_list_cart as $_itemkey_cart => $_itemvalue_cart){
?>
						<tr>
							<td style="width:30px; height:27px; padding-bottom:3px; text-align:center;"><input type="checkbox" name="item_chk" id="item_chk<?=$_itemvalue_cart["si_no"]?>" value="<?=$_itemvalue_cart["si_no"]?>" onclick="spon_price(<?=$_itemvalue_cart["si_no"]?>)"  class="{label:'후원항목',groupcheck:true}"/></td>
							<td style="width:453px; height:30px; font-size:12px; color:#494949;"><?=$_itemvalue_cart["si_name"]?></td>
						</tr>
<?
				}
			}
?>
					</table>
				</td>
              </tr>
<?
		}
	}	
}
else{
			$_item_info = $Obj_shop->get_item_view($argu['si_no']);
?>
              <tr>
                <td style="width:248px; height:30px; border-bottom:1px solid #dedede; font-size:12px; color:#494949; font-weight:bold; text-align:center; background:#f0f0f0;">
					<?=$_item_info["scm_title"]?>
				</td>
				<td style="width:483px; border-bottom:1px solid #dedede;" >
					<table width="100%" cellpadding="0" cellspacing="0" >
						<tr>
							<td style="width:30px; height:27px; padding-bottom:3px; text-align:center;"><input type="checkbox" name="item_chk" id="item_chk<?=$_item_info["si_no"]?>" value="<?=$_item_info["si_no"]?>" onclick="spon_price(<?=$_item_info["si_no"]?>)" class="{label:'후원항목',groupcheck:true}"/></td>
							<td style="width:453px; height:30px; font-size:12px; color:#494949;"><?=$_item_info["si_name"]?></td>
						</tr>
					</table>
				</td>
              </tr>
<?
}
?>
              <tr>
				<td colspan="2" style="border-bottom:1px solid #dedede; border-top:2px solid #454545;"></td>
			  </tr>
            </table></td>
        </tr>
        <tr>
          <td class="p_b_13"><img src="img/sub03/s32511_4.png" /></td>
        </tr>
        <tr>
          <td class="p_b_30">
			<table cellpadding="0" cellspacing="0" border="0">
              <tr>
				<td colspan="2" style="width:731px; border-bottom:1px solid #dedede; border-top:2px solid #454545;"></td>
			  </tr>
			</table>
			<table cellpadding="0" cellspacing="0" border="0" id="price">
            </table>
			<table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="width:248px; height:30px; font-size:12px; color:#494949; font-weight:bold; background:#f0f0f0; text-align:center;">합계</td>
                <td style="width:483px; height:30px; font-size:12px; color:#494949; font-weight:bold; background:#f0f0f0; text-align:center;">총 <span id="total_price">0</span>원</td>
              </tr>
              <tr>
				<td colspan="2" style="border-bottom:1px solid #dedede; border-top:2px solid #454545;"></td>
			  </tr>
			</table>
			</td>
        </tr>
		 <tr>
          <td style="text-align:center; height:40px; font-size:12px; color:red; font-weight:bold;">회원가입 및 로그인 후 신청해 주시기 바립니다.</td>
        </tr> -->
        <table cellpadding="10" cellspacing="0" border="1">
<tr>
<td style="width:348px; height:50px; padding:5px; border-color:#CCC; border-right-style:dotted; border-bottom-style:dotted; font-size:14px;"><center><B>하나은행 357-910008-93405</B></center></td>
<td style="width:348px; height:50px; padding:5px; border-color:#CCC; border-left-style:dotted; border-bottom-style:dotted; font-size:14px;"><center><B>신한은행 140-009-197323</B></center></td></tr>
<tr>
<td style="width:348px; height:50px; padding:5px; border-color:#CCC; border-right-style:dotted; border-top-style:dotted; font-size:14px;"><center><B>농협 351-0325-0051-33</B></center></td>
<td style="width:348px; height:50px; padding:5px; border-color:#CCC; border-left-style:dotted; border-top-style:dotted; font-size:14px;"><center><B>국민은행 816-901-04-172086</B></center></td>
</tr></table>
<br />
<table cellpadding="0" cellspacing="0" border="1">
<tr>
<td bgcolor="#F0F0F0" style="width:700px; padding:10px; line-height:35px; height:90px; font-size:13px; border-bottom:2px solid #454545;border-top:2px solid #454545; border-right:0px; border-left:0px;"><center><b>예금주 : 사단법인 아이러브아프리카</b></center><font size:"12px;"><center>계좌입금 후 <font color="#FF0000">후원활동 및 기부금영수증 관련 사항</font>을 최선을 다해 안내드리겠습니다<br />(후원개발팀 : 02-780-6053)</center></td>
</tr>
</table> <br /><br />

		<center><table cellpadding="0" cellspacing="0" border="0">
		<tr>
		 <td><a href='https://mrmweb.hsit.co.kr/default.aspx?Server=E+/byfTanGgtVEhsDgYi8w==&action=once2' target=_blank><img src="img/s32511_3.png" /></a></td>
		 </tr>
      </table></center>
</table>
<form>