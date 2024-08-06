<?
	include "../common/common.php";

	if($argu["tab_chk"] == "1"){
?>
<table cellpadding="0" cellspacing="0" border="0" class="sub03_table" id="tab301">
    <tr>
        <td class="sub_title">팬클럽후원</td>
    </tr>
    <tr>
        <td class="sub_c" valign="top" id="tab1">
			<table cellpadding="0" cellspacing="0" border="0" style="width:731px;">
                <tr>
                    <td class="p_b_32"><img src="img/sub03/pan1_o.png" onclick="f_tab(1);" class="cp" /><img src="img/sub03/pan2.png" onclick="f_tab(2);" class="cp" /><img src="img/sub03/pan3.png" onclick="f_tab(3);" class="cp" /></td>
                </tr>
                <tr>
                    <td class="p_b_28"><img src="img/sub03/s32221_1.png" /></td>
                </tr>
                <tr>
                    <td style="padding-bottom:30px; height:32px; border-bottom:1px solid #e5e5e5;"><div class="fl"><img src="img/sub03/s32221_2.png" /></div>
                        <div class="fr"><img src="img/sub03/s32221_3.png" onclick="f_tab(2);" class="cp"/></div></td>
                </tr>
                <tr>
                    <td style="padding-top:30px; padding-bottom:60px;"><div class="fl"><img src="img/sub03/s32221_4.png" />
                            <p class="sub03_p">1. 내가 사랑하는 스타를 지정 해 주세요.<br />
                                2. 후원금을 선정 해 주세요.<br />
                                3. 후원하게 된 계기와 사연을 작성 해 주세요.<br />
                                4. 10만 원 이상 후원 해 주신 스타의 팬 / 팬클럽에는 <span style="color:#ff3232; font-size:13px; font-weight:bold;">※후원 증서</span>를 발송 해 드리며<br />
                                기획사가 있는 스타의 경우 (필요 시), 아이러브아프리카에서 기획사로 별도 연락을<br />
                                해 드립니다.</p>
                        </div>
                        <div style="float:right; text-align:center; width:176px;"><img src="img/sub03/s32221_5.png" /><br />
                            <br />
                            <img src="img/sub03/s32221_6.png" onclick="javascript:layer_pop_view('certificate.php?chk=1','530')" class="cp"/></div></td>
                </tr>
                <tr>
                    <td style="padding-bottom:13px;"><img src="img/sub03/s32221_7.png" /></td>
                </tr>
                <tr>
                    <td style="padding-bottom:57px;"><div class="fl"><img src="img/sub03/s32221_8.png" style="float:left;" />
                            <ul style="float:left; padding-left:30px;">
                                <li class="sub03_li3"><a href="#" class="link02">긴급구호사업 후원</a></li>
                                <li class="sub03_li3"><a href="#" class="link02">길거리고아사업 후원</a></li>
                                <li class="sub03_li3"><a href="#" class="link02">이동진료사업 후원</a></li>
                                <li class="sub03_li3"><a href="#" class="link02">산타크로스사업 후원</a></li>
                                <li class="sub03_li3"><a href="#" class="link02">에이즈계몽교육사업 후원</a></li>
                            </ul>
                        </div>
                        <div style="float:left; border-left:1px solid #e5e5e5; padding-left:20px; margin-left:20px;"><img src="img/sub03/s32221_9.png" style="float:left;" />
                            <ul style="float:left; padding-left:30px;">
                                <li class="sub03_li3"><a href="#" class="link02">꿈망교육사업 후원</a></li>
                                <li class="sub03_li3"><a href="#" class="link02">식수개발사업 후원</a></li>
                                <li class="sub03_li3"><a href="#" class="link02">의료보건복지사업 후원</a></li>
                                <li class="sub03_li3"><a href="#" class="link02">소득증대사업 후원</a></li>
                            </ul>
                        </div></td>
                </tr>
                <tr>
                    <td style="background:#f0f0f0; width:731px; height:98px;"><div style="float:left; padding-left:20px;"><img src="img/sub03/s32221_10.png" /></div>
                        <div style="float:right; padding-top:15px; padding-right:20px;"><img src="img/sub03/s32221_11.png" onclick="f_tab(2);" class="cp"/></div></td>
                </tr>
            </table>
		</td>
    </tr>
</table>
<?
	}
	else if($argu["tab_chk"] == "2"){
?>

<script type="text/javascript" src="/js/jquery.ESvalidator.js"></script>
<table cellpadding="0" cellspacing="0" border="0" class="sub03_table" id="tab302" >
    <tr>
        <td class="sub_title">팬클럽후원 신청하기</td>
    </tr>
    <tr>
        <td class="sub_c" valign="top" id="tab2">
<form name="fFrm" method="post" action="sub03_02_02_02_01_ok.php">
<input type="hidden" name="mode" value="INSERT_ACTION">
<input type="hidden" name="f_type" value="1">
			<table cellpadding="0" cellspacing="0" border="0" style="width:731px;">
                <tr>
                    <td class="p_b_32"><img src="img/sub03/pan1.png" onclick="f_tab(1);" class="cp" /><img src="img/sub03/pan2_o.png" onclick="f_tab(2);" class="cp" /><img src="img/sub03/pan3.png" onclick="f_tab(3);" class="cp" /></td>
                </tr>
                <tr>
                    <td class="p_b_28"><img src="img/sub03/s32221_1.png" /></td>
                </tr>
                <tr>
                    <td class="p_b_30"><img src="img/sub03/s32221_12.png" /></td>
                </tr>
                <tr>
                    <td><table cellpadding="0" cellspacing="0" border="0">
                            <tr>
                                <td width="138" height="30" style="font-size:12px; font-weight:bold; color:#494949; border-bottom:1px solid #dedede; border-top:2px solid #454545; text-align:center; background:#f0f0f0;">스타 이름</td>
                                <td width="594" height="30" style="border-bottom:1px solid #dedede; border-top:2px solid #454545;"><input type="text" style="width:150px; height:18px; border:1px solid #cacaca;" name="f_star" class="{label:'스타 이름',required:true}"/></td>
                            </tr>
                            <tr>
                                <td width="138" height="30" class="s32221_td1">팬클럽 이름</td>
                                <td width="594" height="30" class="s32221_td2"><input type="text" style="width:150px; height:18px; border:1px solid #cacaca;" name="f_name" class="{label:'팬클럽 이름',required:true}" value="<?=$user_info["user_name"]?>"/></td>
                            </tr>
                            <tr>
                                <td width="138" height="30" class="s32221_td1">담당자 이름</td>
                                <td width="594" height="30" class="s32221_td2"><input type="text" style="width:150px; height:18px; border:1px solid #cacaca;" name="f_man" class="{label:'담당자 이름',required:true}"/></td>
                            </tr>
                            <tr>
                                <td width="138" height="30" class="s32221_td1">후원금액</td>
                                <td width="594" height="30" class="s32221_td2"><input type="text" style="width:150px; height:18px; border:1px solid #cacaca;" name="f_price" class="{label:'담당자 이름',required:true}"/></td>
                            </tr>
                            <tr>
                                <td width="138" height="30" class="s32221_td1">연락처</td>
                                <td width="594" height="30" class="s32221_td2">
									<ul>
										<li class="fl" style="line-height:20px;">
											<select style="width:60px; height:20px; border:1px solid #cacaca;" name="f_tel1" class="{label:'연락처1',required:true}">
												<option value="">선택</option>
												<?
		foreach($_FL_CODE[5][2] as $key => $value){
?>
												<option value="<?=$value?>" >
												<?=$value?>
												</option>
												<?
		}	
?>
											</select>
										</li>
										<li class="fl" style="line-height:20px; padding:0 5px;">-</li>
										<li class="fl" style="line-height:20px;">
											<input type="text" style="width:60px; height:18px; border:1px solid #cacaca;" name="f_tel2"class="{label:'연락처1',required:true}"  maxlength="4"/>
										</li>
										<li class="fl" style="line-height:20px; padding:0 5px;">-</li>
										<li class="fl" style="line-height:20px;">
											<input type="text" style="width:60px; height:18px; border:1px solid #cacaca;" name="f_tel3" class="{label:'연락처1',required:true}" maxlength="4"/>
										</li>
									</ul>
								</td>
                            </tr>
                            <tr>
                                <td width="138" height="30" class="s32221_td1">E-mail</td>
                                <td width="594" height="30" class="s32221_td2">
										<input type="text" style="width:150px; height:18px; border:1px solid #cacaca;" name="f_email1" id="f_email1" class="{label:'E-mail',required:true}"/>
                                        @
                                        <input type="text" style="width:150px; height:18px; border:1px solid #cacaca;" name="f_email2" id="f_email2" class="{label:'E-mail',required:true}" readonly/>
                                        <select style="width:150px; height:20px; border:1px solid #cacaca;" name="f_email3" id="f_email3" onchange="selectEmail(this.value,'#f_email2');">
                                            <option value="">선택하세요</option>
                                            <?
			foreach($_FL_CODE[4] as $key => $value){
?>
                                            <option value="<?=$value?>">
                                            <?=$value?>
                                            </option>
                                            <?
			}	
?>
                                        </select>
								</td>
                            </tr>
                            <tr>
                                <td width="138" height="60" class="s32221_td1">후원하게 된 사연</td>
                                <td width="594" height="60" class="s32221_td2"><textarea type="textarea" name="f_content" id="f_content" style="width:100%;height:150px;" class="{label:'후원하게 된 사연',required:true}"></textarea></td>
                            </tr>
                            <tr>
                                <td width="138" height="60" style="font-size:12px; font-weight:bold; color:#494949; border-bottom:2px solid #454545; text-align:center; background:#f0f0f0;">문의사항</td>
                                <td width="594" height="60" style="border-bottom:2px solid #454545;"><textarea name="f_memo" id="f_memo" style="width:594px;height:150px;"></textarea></td>
                            </tr>
                        </table></td>
                </tr>
                <tr>
                    <td class="p_b_30c"><span style="padding-right:7px;"><input type="image" src="img/sub03/s32221_13.png" /></span><span style="padding-left:7px;"><a href="/"><img src="img/sub03/s32221_14.png" /></a></span></td>
                </tr>
            </table>
</form>			
		</td>
    </tr>
</table>
<script>

var oEditors = [];
nhn.husky.EZCreator.createInIFrame({
	oAppRef: oEditors,
	elPlaceHolder: "f_content",
	sSkinURI: "/SE2/SmartEditor2Skin.html",	
	htParams : {bUseToolbar : true,
		fOnBeforeUnload : function(){
			//alert("아싸!");	
		}
	}, //boolean
	fOnAppLoad : function(){
		//예제 코드
		//oEditors.getById["ir1"].exec("PASTE_HTML", ["로딩이 완료된 후에 본문에 삽입되는 text입니다."]);
	},
	fCreator: "createSEditor2"
});

</script>
<?
	}
	else if($argu["tab_chk"] == "3"){
?>

<table cellpadding="0" cellspacing="0" border="0" class="sub03_table" id="tab303" >
    <tr>
        <td class="sub_title">팬클럽후원 후기</td>
    </tr>
    <tr>
        <td class="sub_c" valign="top">
		<table cellpadding="0" cellspacing="0" border="0" style="width:731px;">
                <tr>
                    <td class="p_b_32"><img src="img/sub03/pan1.png" onclick="f_tab(1);" class="cp" /><img src="img/sub03/pan2.png" onclick="f_tab(2);" class="cp" /><img src="img/sub03/pan3_o.png" onclick="f_tab(3);" class="cp" /></td>
                </tr>
                <tr>
                    <td class="p_b_28"><img src="img/sub03/s32221_15.png" /></td>
                </tr>
                <tr>
                    <td><ul>
<?
	$argu["f_type"] = "1";
	$_list = $Obj_fsupport -> get_fs_list($argu,$total);

	if(count($_list) > 0){
		for($i=0;$i<count($_list);$i++){
			preg_match("/<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>/i",txtParse($_list[$i]['f_content'],2),$imgSRC);
			$thumbImage=$imgSRC[1];

			if(strlen($thumbImage)<3){
				$thumbImage="/common/no_photo.php?w=203&h=152";
			}
?>
                            <li class="sub03_li"><img src="<?=$thumbImage?>" class="img_b" width="170" height="123"/><br />
                                <br />
                                <?=ksubstr($_list[$i]["f_name"],10)?><br />
                                <br />
                                <img src="img/sub03/s32221_17.png" onclick="javascript:layer_pop_view('fview.php?f_no=<?=$_list[$i]["f_no"]?>','391')" class="cp"/><br />
                                <br />
                            </li>
<?
		}
	}	
?>
                        </ul></td>
                </tr>
                <tr>
                    <td style="text-align:center">
<?=page_index($total,$argu['p'],preg_replace(array("/^p=(\d+)/","/&p=(\d+)/","/&p=/i","/&amp;p=(\d+)/","/&amp;p=/i"),"",$_SERVER["QUERY_STRING"]),$Obj_fsupport->_LIST_NUM,$scale=10,$BOARD_FIRST_IMG,$BOARD_LAST_IMG,$BOARD_PREV_IMG,$BOARD_NEXT_IMG);?>
					</td>
                </tr>
            </table></td>
    </tr>
</table>


<?
	}	
?>