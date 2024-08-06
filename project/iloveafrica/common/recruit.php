<?
	include "./common.php";
	
	$_row = $data = $Obj_recruit->get_recruit_view($argu['r_no']);
	$_row_info = $data_info = $Obj_recruit->get_recruit_info_view($argu['r_no']);
	$_row_info_detail =  $data_info_detail = $Obj_recruit->get_recruit_detail_info($argu['ri_no']);
?>
			<table cellpadding="0" cellspacing="0" border="0" style="color:#494949;">
				<tr>
					<td style="padding-left:10px; width:100px; height:30px;">제목</td>
					<td><?=$_row['subject']?></td>
				</tr>
				<tr>
					<td style="padding-left:10px; width:100px; height:30px;">모집부문</td>
					<td><select  name="ri_no" class="{label:'모집부문',required:true}" onchange="recruit_app_tbl(this.value)">
							<option value="">선택하세요.</option>
				<?	for($i=0;$i<count($_row_info);$i++){?>
				<option value="<?=$_row_info[$i]["ri_no"]?>" <?if($argu['ri_no']==$_row_info[$i]["ri_no"]){?> selected<?}?>><?=$_row_info[$i]['team']?></option>
				<?}?>
						</select></td>
				</tr>
				<tr>
					<td style="padding-left:10px; width:100px; height:30px;">접수기간</td>
					<td><?=date("Y년 n월 j일",strtotime($_row['appdate']))?></td>
				</tr>
				<tr>
					<td style="padding-left:10px; width:100px; height:30px;">구분</td>
					<td><?=$_CODE_RECRUIT[$_row_info_detail['devide']]?></td>
				</tr>
				<tr>
					<td style="padding-left:10px; width:100px; height:30px;">연봉</td>
					<td><?=parseAsCII(2,$_row_info_detail['pay'])?></td>
				</tr>
				<tr>
					<td style="padding-left:10px; width:100px; height:30px;">자격조건</td>
					<td><?=$_row_info_detail['tech']?></td>
				</tr>
				<tr>
					<td style="padding-left:10px; width:100px; height:30px;">고용형태</td>
					<td><?=$_row['type']?></td>
				</tr>
				<tr>
					<td style="padding-left:10px; width:100px; height:30px;">성명</td>
					<td><table cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td width="110"><input type="text" style="width:100px;" name="name" class="{label:'성명',required:true}" value="<?=$argu['name']?>"></td>
								<td width="100">연락처</td>
								<td><input type="text" style="width:100px;" name="tel" class="{label:'연락처',required:true}" value="<?=$argu['tel']?>"></td>
							</tr>
						</table></td>
				</tr>
				<tr>
					<td style="padding-left:10px; width:100px; height:30px;">이메일</td>
					<td><table cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td width="110"><input type="text" style="width:100px;" name="email" class="{label:'이메일',required:true}" alue="<?=$argu['email']?>"></td>
								<td width="100">거주지역</td>
								<td><input type="text" style="width:100px;"  name="local" class="{label:'거주지역',required:true}" value="<?=$argu['local']?>"></td>
							</tr>
						</table></td>
				</tr>
				<tr>
					<td style="padding-left:10px; width:100px; height:30px;">사진</td>
					<td><table cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td width="100%"><input type="file"  name="pic" style="width:100%px;" class="{label:'사진',required:true}"></td>
							</tr>
						</table></td>
				</tr>
				<tr>
					<td style="padding-left:10px; width:100px; height:30px;">입사지원서</td>
					<td><table cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td width="100%"><input type="file" style="width:100%" name="app_doc"  class="{label:'입사지원서',required:true}"></td>
							</tr>
						</table></td>
				</tr>
			</table>
