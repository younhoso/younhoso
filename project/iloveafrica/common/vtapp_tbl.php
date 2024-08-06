<?
	$cnt = $_POST["cnt"];
?>
				<tr id="row<?=$cnt?>">
					<td>
						<table cellpadding="0" cellspacing="0" border="0" style="width:658px;">
							<tr>
								<td colspan="3" height="5"></td>
							</tr>
							<tr>
								<td colspan="3">&nbsp;&nbsp;<img src="/board/skin/basic/img/del.jpg" width="30" height="19" border="0" alt="삭제" valign="absmiddle" onclick="deleteRow(row<?=$cnt?>);" style="cursor:hand"></td>
							</tr>
							<tr>
								<td width="25" height="30" align="center"><img src="./img/m04/r.jpg"></td>
								<td width="98" height="30" class="title1">활동기관</td>
								<td width="535" height="30"><input type="text" style="width:345px;" name="vte_organ[<?=$cnt?>]"/><input type="hidden" name="vte_no[<?=$cnt?>]" value="new"></td>
							</tr>
							<tr>
								<td width="25" height="30" align="center"><img src="./img/m04/r.jpg"></td>
								<td width="98" height="30" class="title1">활동내용</td>
								<td width="535" height="30"><input type="text" style="width:345px;"  name="vte_memo[<?=$cnt?>]"/></td>
							</tr>
							<tr>
								<td width="25" height="30" align="center"><img src="./img/m04/r.jpg"></td>
								<td width="98" height="30" class="title1">활동기간</td>
								<td width="535" height="30"><table cellpadding="0" cellspacing="0" border="0" style="color:#494949;">
										<tr>
											<td><input name="vte_sdate[<?=$cnt?>]" id="vte_sdate<?=$cnt?>" type="text" size="15" class="input_date" readonly="readonly"></td>
											<td style="padding:0 10px;">~</td>
											<td><input name="vte_edate[<?=$cnt?>]" id="vte_edate<?=$cnt?>" type="text" size="15" class="input_date" readonly="readonly"></td>
										</tr>
									</table></td>
							</tr>
							<tr>
								<td colspan="3" bgcolor="#c4c4c4" height="1"></td>
							</tr>
						</table>
					</td>
				</tr>
<script>
	$(function() {
		$("#vte_sdate<?=$cnt?>").datepicker({
			buttonText: '희망기간'
		});
		$("#vte_edate<?=$cnt?>").datepicker({
			buttonText: '희망기간'
		});
	});	
</script>
