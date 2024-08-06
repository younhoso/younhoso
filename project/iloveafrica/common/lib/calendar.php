<?
	# 날짜별 색상값
	$col_sun   = "#ff2200";
	$col_sat   = "#0000ff";
	$col_day   = "#00000";
	$col_today = "#edeec0";

	$last_line = false; # 마지막 주인가?
	
	# 넘어온 날자값 받기
	$cur_year = $_REQUEST['year']; # 년도값
	$cur_mon  = $_REQUEST['mon'];  # 월값
	$cur_day  = date("d");         # 일값	

	# 날짜값 받아오기 - 넘어온값이 없으면 오늘 날짜값 호출
	if($cur_year == "" || $cur_mon == "") {
		$cur_year = date("Y"); 
		$cur_mon  = date("m");
	}

	# 이전달 다음달 값가져오기
	$prev_mon = sprintf("%02d", $cur_mon - 1);
	
	if($prev_mon == 0) {
		$prev_mon = 12;
		$prev_year = $cur_year - 1;
	}else{
		$prev_year = $cur_year;
	}

	$next_mon = sprintf("%02d", $cur_mon + 1);
	if($next_mon > 12) {
		$next_mon = "01";
		$next_year = $cur_year + 1;
	}
	else {
		$next_year = $cur_year;
	}

	# 해당월 첫째날 요일값 가져오기: 예) 일요일-0 토요일-6
	$first_week = date("w", mktime(0, 0, 0, $cur_mon, 1, $cur_year));

	# 해당월 마지막 날짜값 가져오기  예) 28, 30, 31
	$last_day   = date("t", mktime(0, 0, 0, $cur_mon, 1, $cur_year));
?>
<p class="calenlar_date"><span onclick="moveCalendar('objID=<?=$objID?>&year=<?=$prev_year?>&mon=<?=$prev_mon?>')" title="이전달">&lt;&lt;</span> <span onclick="moveCalendar('objID=<?=$objID?>')" title="오늘 날짜"><?=$cur_year?>년 <?=$cur_mon?>월</span> <span onclick="moveCalendar('objID=<?=$objID?>&year=<?=$next_year?>&mon=<?=$next_mon?>')" title="다음달">&gt;&gt;</span></p>

<table class="calendar_table">
	<tr>
		<th>일</th><th>월</th><th>화</th><th>수</th><th>목</th><th>금</th><th>토</th>
	</tr>
<?
	# 임시 일자
	$tmp_day = 1;
	
	# 각 주별로 출력
	for($cnt_line = 1; $cnt_line <= 6; $cnt_line++) {
		echo "<tr>";
		for($cnt_week = 0; $cnt_week < 7; $cnt_week++) {
			$week_col = ($cnt_week == 0) ? $col_sun : (($cnt_week == 6) ? $col_sat : $col_day);

			# 블렝크 출력 체킹 (1. 첫주면서 첫날의 요일 이전, 2. 마지막 일자값이 지난경우)
			if(($cnt_line == 1 && $cnt_week < $first_week) || $tmp_day > $last_day) {
				$day_val = "";
				$day_cursor="";
				$day_over="";
				$day_click="";
			}else{
				$day_val = $tmp_day;
				$day_cursor="cursor:pointer";
				$tmp_day++;
				if($day_val<10){
					$strDayval="0".$day_val;
				}else{
					$strDayval=$day_val;
				}

				$returnVal=$cur_year."-".$cur_mon."-".$strDayval;
				$day_over="onmouseover=\"this.style.backgroundColor='#edeec0'\" onmouseout=\"this.style.backgroundColor=''\"";
				$day_click="onclick=\"inputCalendar('$objID','$returnVal')\"";
			}

			# 오늘 날짜 스타일 적용 폰트굵게 배경색 지정
			$style_day = ($cur_year == date("Y") && $cur_mon  == date("m") && $day_val == $cur_day) ? "font-weight:bold;background-color:$col_today" : "";
			$day_over = ($cur_year == date("Y") && $cur_mon  == date("m") && $day_val == $cur_day) ? "onmouseover=\"this.style.backgroundColor='#edeec0'\" onmouseout=\"this.style.backgroundColor='$col_today'\"" : $day_over;
			
			echo "<td style='color:$week_col;$style_day;$day_cursor' $day_over $day_click>$day_val</td>";
		}
		echo "</tr>\n";
		# 마지막 주 체킹
		if($tmp_day > $last_day) {
			break;
		}
	}

	echo "</tr>\n";
?>
</table> 