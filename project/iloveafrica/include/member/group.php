<?
	//단체
	$user_person1 = substr($argu["person_chk"], 0, 6);
	$user_person2 = substr($argu["person_chk"], -7);
?>
<form name="registerFrm" id="registerFrm" method="post" action="./include/user_info.php">
<input type="hidden" name="m" id="m" value="<?=$argu["m"]?>">
<input type="hidden" name="s" id="s" value="<?=$argu["s"]?>">
<input type="hidden" name="mode" value="JOIN">
<input type="hidden" name="user_name" id="user_name" value="<?=$argu["user_name"]?>">
<input type="hidden" name="user_man" id="user_man" value="<?=$argu["user_man"]?>">
<input type="hidden" name="user_type" id="user_type" value="<?=$argu["user_type"]?>">
<input type="hidden" name="user_person1" id="user_person1" value="<?=$user_person1?>">
<input type="hidden" name="user_person2" id="user_person2" value="<?=$user_person2?>">
<input type="hidden" name="user_level"  id="user_level" value="7">

<h2 class="sub11_h2"><img src="img/sub11_title.png" alt="아이러브아프리카는 아프리카 대륙을 전문으로 돕는 아프리카전문국제구호개발 비정부기구(NGO, Non Governmental Organization)입니다." /></h2>
<table cellpadding="0" cellspacing="0" border="0" style="background:url(img/sub03/bg.png) repeat-y; width:773px;">
    <tr>
        <td class="sub_title">회원가입</td>
    </tr>
    <tr>
        <td class="sub_c" valign="top"><table cellpadding="0" cellspacing="0" border="0">
                <tr>
                    <td style="padding-bottom:60px;"><img src="img/sub09/tab3.png" /></td>
                </tr>
                <tr>
                    <td align="center" style="padding-bottom:60px;"><img src="img/sub09/s91111_text1.png" /></td>
                </tr>
                <tr>
                    <td><table cellpadding="0" cellspacing="0" border="0" width="732">
                            <tr>
                                <td colspan="2" style="padding-bottom:13px;"><img src="img/sub09/s9_title1.png" /></td>
                            </tr>
                            <tr>
                                <td style="width:160px; height:30px; border-bottom:1px solid #dedede; border-top:2px solid #454545; background:#f0f0f0; font-size:12px; color:#494949; font-weight:bold; text-align:center;">단체명</td>
                                <td style="width:552px; height:30px; border-bottom:1px solid #dedede; border-top:2px solid #454545; font-size:12px; color:#494949; padding-left:20px;"><?=$argu["user_name"]?></td>
                            </tr>
                            <tr>
                                <td style="width:160px; height:30px; border-bottom:1px solid #dedede; background:#f0f0f0; font-size:12px; color:#494949; font-weight:bold; text-align:center;">담당자/대표성명</td>
                                <td style="width:552px; height:30px; border-bottom:1px solid #dedede; font-size:12px; color:#494949; padding-left:20px;"><?=$argu["user_man"]?></td>
                            </tr>
                            <tr>
                                <td style="width:160px; height:30px; border-bottom:1px solid #dedede; background:#f0f0f0; font-size:12px; color:#494949; font-weight:bold; text-align:center;">주민번호/외국인번호</td>
                                <td style="width:552px; height:30px; border-bottom:1px solid #dedede; font-size:12px; color:#494949; padding-left:20px;"><?=$user_person1?>-*******</td>
                            </tr>
                            <tr>
                                <td style="width:160px; height:30px; border-bottom:1px solid #dedede; background:#f0f0f0; font-size:12px; color:#494949; font-weight:bold; text-align:center;">단체회원 아이디</td>
                                <td style="width:552px; height:30px; border-bottom:1px solid #dedede; font-size:12px; color:#494949; padding-left:20px;"><ul>
                                        <li class="fl" style="line-height:20px;">
                                            <input type="text" style="width:150px; height:18px; border:1px solid #cacaca;" name="user_id" id="user_id" class="{label:'회원아이디',required:true,memberid:true,minlength:4,uniq:'./include/existcheck.php'}"/>
                                        </li>
                                        
                                    </ul></td>
                            </tr>
                            <tr>
                                <td style="width:160px; height:30px; border-bottom:1px solid #dedede; background:#f0f0f0; font-size:12px; color:#494949; font-weight:bold; text-align:center;">비밀번호</td>
                                <td style="width:552px; height:30px; border-bottom:1px solid #dedede; font-size:11px; color:#a0a0a0; padding-left:20px;"><input type="password" style="width:150px; height:18px; border:1px solid #cacaca;" name="user_pwd" class="{label:'비밀번호',required:true}" maxlength="16"/>
                                    비밀번호는 4~16자로 입력해주세요.</td>
                            </tr>
                            <tr>
                                <td style="width:160px; height:30px; border-bottom:1px solid #dedede; background:#f0f0f0; font-size:12px; color:#494949; font-weight:bold; text-align:center;">비밀번호확인</td>
                                <td style="width:552px; height:30px; border-bottom:1px solid #dedede; font-size:11px; color:#a0a0a0; padding-left:20px;"><input type="password" style="width:150px; height:18px; border:1px solid #cacaca;" class="{label:'비밀번호확인',required:true,equal:'user_pwd'}"/>
                                    비밀번호 오타확인입니다.</td>
                            </tr>
                            <tr>
                                <td style="width:160px; height:30px; border-bottom:1px solid #dedede; background:#f0f0f0; font-size:12px; color:#494949; font-weight:bold; text-align:center;">E-mail</td>
                                <td style="width:552px; height:30px; border-bottom:1px solid #dedede; font-size:12px; color:#494949; padding-left:20px;">
									<input type="text" style="width:150px; height:18px; border:1px solid #cacaca;" name="user_email1" id="user_email1" class="{label:'E-mail',required:true}"/>
                                    @
                                    <input type="text" style="width:150px; height:18px; border:1px solid #cacaca;" name="user_email2" id="user_email2" class="{label:'E-mail',required:true}" readonly/>
                                    <select style="width:150px; height:20px; border:1px solid #cacaca;" name="user_email3" id="user_email3" onchange="selectEmail(this.value,'#user_email2');">
                                        <option value="">선택하세요</option>
 <?
			foreach($_FL_CODE[4] as $key => $value){
?>
				<option value="<?=$value?>"><?=$value?></option>
<?
			}	
?>
                                   </select></td>
                            </tr>
                            <tr>
                                <td style="width:160px; height:60px; border-bottom:1px solid #dedede; background:#f0f0f0; font-size:12px; color:#494949; font-weight:bold; text-align:center;" rowspan="2">연락처</td>
                                <td style="width:552px; height:30px; border-bottom:1px solid #dedede; font-size:12px; color:#494949; padding-left:20px;"><ul>
                                        <li class="fl" style="line-height:20px; font-size:12px; color:#494949; font-weight:bold; padding-right:5px; padding-top:1px;">연락처1</li>
                                        <li class="fl" style="line-height:20px;">
                                            <select style="width:60px; height:20px; border:1px solid #cacaca;" name="user_hp1" class="{label:'연락처1',required:true}">
				<option value="">선택</option>
<?
			foreach($_FL_CODE[5][2] as $key => $value){
?>
				<option value="<?=$value?>" ><?=$value?></option>
<?
			}	
?>
                                            </select>
                                        </li>
                                        <li class="fl" style="line-height:20px; padding:0 5px;">-</li>
                                        <li class="fl" style="line-height:20px;">
                                            <input type="text" style="width:60px; height:18px; border:1px solid #cacaca;" name="user_hp2" class="{label:'연락처1',required:true,numeric:true}"  maxlength="4"/>
                                        </li>
                                        <li class="fl" style="line-height:20px; padding:0 5px;">-</li>
                                        <li class="fl" style="line-height:20px;">
                                            <input type="text" style="width:60px; height:18px; border:1px solid #cacaca;" name="user_hp3" class="{label:'연락처1',required:true,numeric:true}" maxlength="4"/>
                                        </li>
                                    </ul></td>
                            </tr>
                            <tr>
                                <td style="width:552px; height:30px; border-bottom:1px solid #dedede; font-size:12px; color:#494949; padding-left:20px;"><ul>
                                        <li class="fl" style="line-height:20px; font-size:12px; color:#494949; font-weight:bold; padding-right:5px; padding-top:1px;">연락처2</li>
                                        <li class="fl" style="line-height:20px;">
                                            <select style="width:60px; height:20px; border:1px solid #cacaca;" name="user_tel1">
				<option value="">선택</option>
<?
			foreach($_FL_CODE[5][2] as $key => $value){
?>
				<option value="<?=$value?>" ><?=$value?></option>
<?
			}	
?>
                                            </select>
                                        </li>
                                        <li class="fl" style="line-height:20px; padding:0 5px;">-</li>
                                        <li class="fl" style="line-height:20px;">
                                            <input type="text" style="width:60px; height:18px; border:1px solid #cacaca;" name="user_tel2"class="{label:'연락처2',numeric:true}" maxlength="4"/>
                                        </li>
                                        <li class="fl" style="line-height:20px; padding:0 5px;">-</li>
                                        <li class="fl" style="line-height:20px;">
                                            <input type="text" style="width:60px; height:18px; border:1px solid #cacaca;" name="user_tel3" class="{label:'연락처2',numeric:true}" maxlength="4"/>
                                        </li>
                                    </ul></td>
                            </tr>
							<tr>
								<td style="width:160px; height:60px; border-bottom:1px solid #dedede; background:#f0f0f0; font-size:12px; color:#494949; font-weight:bold; text-align:center; border-bottom:2px solid #454545;" rowspan="3">주소</td>
								<td style="width:552px; height:30px; font-size:12px; color:#494949; padding-left:20px;"><ul>
										<li class="fl" style="line-height:20px;">
											<input type="text" style="width:120px; height:18px; border:1px solid #cacaca;" name="user_zip" readonly onclick="zipcode('registerFrm', 'user_zip', 'user_add1','user_add2');"/>
										</li>
										<li class="fl" style="padding-left:5px; padding-top:2px;line-height:20px;"><img src="img/sub09/woo.png" onclick="zipcode('registerFrm', 'user_zip', 'user_add1','user_add2');" style="cursor:pointer"/></li>
									</ul></td>
							</tr>
							<tr>
								<td style="width:552px; height:30px; font-size:12px; color:#494949; padding-left:20px;"><input type="text" style="width:500px; height:18px; border:1px solid #cacaca;" name="user_add1" readonly/></td>
							</tr>
							<tr>
								<td style="width:552px; height:30px; border-bottom:1px solid #dedede; font-size:12px; color:#494949; padding-left:20px; border-bottom:2px solid #454545;"><input type="text" style="width:500px; height:18px; border:1px solid #cacaca;" name="user_add2" /></td>
							</tr>
                        </table></td>
                </tr>
                <tr>
                    <td><table cellpadding="0" cellspacing="0" border="0" width="732">
                            <tr>
                                <td colspan="2" style="padding-bottom:13px; padding-top:30px;"><img src="img/sub09/s9_title2.png" /></td>
                            </tr>
                            <tr>
                                <td style="width:160px; height:60px; border-bottom:1px solid #dedede; border-top:2px solid #454545; background:#f0f0f0; font-size:12px; color:#494949; font-weight:bold; text-align:center;" rowspan="2">후원희망부문</td>
                                <td style="width:552px; height:30px; border-top:2px solid #454545; font-size:11px; color:#676767; padding-left:20px;"><ul>
                                        <li class="fl" style="line-height:20px;">
                                            <input type="checkbox" name="company_hope[]" value="1"/>
                                        </li>
                                        <li class="fl" style="line-height:20px; padding:0 15px 0 5px;">아동후원</li>
                                        <li class="fl" style="line-height:20px;">
                                            <input type="checkbox" name="company_hope[]"  value="2"/>
                                        </li>
                                        <li class="fl" style="line-height:20px; padding:0 15px 0 5px;">특별분야사업후원</li>
                                        <li class="fl" style="line-height:20px;">
                                            <input type="checkbox" name="company_hope[]"  value="3"/>
                                        </li>
                                        <li class="fl" style="line-height:20px; padding:0 15px 0 5px;">함께걸어요♥사업후원</li>
                                    </ul></td>
                            </tr>
                            <tr>
                                <td style="width:552px; height:30px; border-bottom:1px solid #dedede; font-size:11px; color:#676767; padding-left:20px;"><ul>
                                        <li class="fl" style="line-height:20px;">
                                            <input type="checkbox" name="company_hope[]"  value="4"/>
                                        </li>
                                        <li class="fl" style="line-height:20px; padding:0 15px 0 5px;">특별♥후원</li>
                                        <li class="fl" style="line-height:20px;">
                                            <input type="checkbox" name="company_hope[]"  value="5"/>
                                        </li>
                                        <li class="fl" style="line-height:20px; padding:0 15px 0 5px;">사회공헌기업협력후원</li>
                                    </ul></td>
                            </tr>
                            <tr>
                                <td style="width:160px; height:30px; border-bottom:1px solid #dedede; background:#f0f0f0; font-size:12px; color:#494949; font-weight:bold; text-align:center;">추천인</td>
                                <td style="width:552px; height:30px; border-bottom:1px solid #dedede; font-size:11px; color:#a0a0a0; padding-left:20px;"><input type="text" style="width:150px; height:18px; border:1px solid #cacaca;" name="vote_id"/>
                                    소개해주신 분의 아이디를 적어주세요.</td>
                            </tr>
                            <tr>
                                <td style="width:160px; height:30px; border-bottom:1px solid #dedede; background:#f0f0f0; font-size:12px; color:#494949; font-weight:bold; text-align:center;">회원 수</td>
                                <td style="width:552px; height:30px; border-bottom:1px solid #dedede; font-size:11px; color:#676767; padding-left:20px;"><ul>
		<?
			foreach($_CODE[6] as $key => $value){
		?>
										<li class="fl" style="line-height:20px;">
                                            <input type="radio" name="company_many" value="<?=$key?>"/>
                                        </li>
                                        <li class="fl" style="line-height:20px; padding:0 15px 0 5px;"><?=$value?></li>
		<?}?>

                                    </ul></td>
                            </tr>
                            <tr>
                                <td style="width:160px; height:80px; border-bottom:2px solid #454545; background:#f0f0f0; font-size:12px; color:#494949; font-weight:bold; text-align:center;" rowspan="2">러브레터 &amp; 웹진</td>
                                <td style="width:552px; height:30px; border-bottom:1px solid #dedede; font-size:12px; color:#676767; padding-left:20px;"><ul>
                                        <li class="fl" style="line-height:20px;">
                                            <input type="radio" name="user_emaillist" value="Y" checked/>
                                        </li>
                                        <li class="fl" style="padding:0 15px 0 5px;line-height:20px;">받습니다.</li>
                                        <li class="fl" style="line-height:20px;">
                                            <input type="radio" name="user_emaillist" value="N"/>
                                        </li>
                                        <li class="fl" style="padding-left:5px;line-height:20px;">받지 않습니다.</li>
                                    </ul></td>
                            </tr>
                            <tr>
                                <td style="line-height:20px; width:532px; height:50px; border-bottom:2px solid #454545; font-size:12px; color:#494949; padding-left:20px; padding-right:20px;">감동이 담긴 이야기와 따뜻한 이웃의 이야기, 스와힐리어(동부 아프리카 교통어) 강좌, 아프리카 소식을 보내 드립니다.</td>
                            </tr>
                        </table></td>
                </tr>
                <tr>
                    <td align="center" style="padding:30px 0;"><span style="padding-right:7px;"><input type="image" src="img/sub09/s94211_bt1.png" /></span><span style="padding-left:7px;"><a href="/"><img src="img/sub09/s94211_bt2.png" /></a></span></td>
                </tr>
            </table></td>
    </tr>
</table>
</form>
</div>
