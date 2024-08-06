<?

/*--------------------------------------------------------
$_DEBUG = 1 이면 디버깅 메세지 출력
디버깅 메세지 출력시 사내 아이피 접속일 경우에만 출력
디버깅 변수의 형에 상관없이 출력 가능
----------------------------------------------------------*/
function debug($str){
	global $_DEBUG;
	//if( ereg("(211\.241\.183\.22)|(211\.241\.183\.22)",$_SERVER['REMOTE_ADDR']) && $_DEBUG == 1 ){
	if( $_DEBUG == 1 ){
		echo "<font color='red'>\n";
		echo "<xmp>\n";
		print_r($str);
		echo "\n</xmp>\n";
		echo "</font>";
		return true;
	}
	return false;
}

/*----------------------------------------
pageing function & mysql limit function
-----------------------------------------*/
function page_index($total,$p=1,$link="",$rownum=20,$scale=10,$prev_section_img = "" ,$next_section_img = "" ,$prev_img = "" ,$next_img = "", $first_img = "", $last_img = "", $outside_using="N")
{

	//페이지가 없으면 첫페이지
    if(empty($p)) $p = 1;
    $orig_page  = $p;

	//$total이 없으면 1
	if(empty($total) or $total <= 0){
		$total = 1;
	}

	$link = str_replace("&&","&",$link);
	if(substr($link,0,1) == "&") $link = substr($link,1);

	//filename 없으면 자기자신
	$filename=$_SERVER['PHP_SELF'];

	$total_page = @ceil( $total / $rownum ) ;
    $total_zone = ceil($total_page/$scale); // 총 블럭 수
    $zone = ceil($p/$scale); //현재 블럭

    $first_page = ($zone -1) * $scale;
    $last_page = $zone * $scale;

    if($total_zone <= $zone) {
        $last_page = $total_page;
    }

	//img 처리
	if(empty($prev_section_img)) $prev_section_img ="";//"◀";
	else $prev_section_img = " <img src='$prev_section_img' align='absmiddle' border='0' alt='이전블럭'/> ";

	if(empty($next_section_img)) $next_section_img ="";//"▶";
	else $next_section_img = " <img src='$next_section_img' align='absmiddle' border='0' alt='다음블럭'/> ";

	if(empty($prev_img)) $prev_img ="◀";
	else $prev_img = " <img src='$prev_img' align='absmiddle' border='0' alt='이전'/> ";

	if(empty($next_img)) $next_img ="▶";
	else $next_img = " <img src='$next_img' align='absmiddle' border='0' alt='다음'/> ";

	if(empty($first_img)) $first_img = "1";
	else $first_img = " <img src='{$first_img}' align='absmiddle' border='0'> ";

	if(empty($last_img)) $last_img = "<span class='dblink'>".$total_page."</span>";
	else $last_img = " <img src='{$last_img}' align='absmiddle' border='0'> ";

	# 처음 페이지 링크
	if ($orig_page > 1) {
		$f_first_page = "<a href='{$filename}?p=1&{$link}' style='text-decoration:none' class='dblink'>{$first_img}</a>";
	} else {
		$f_first_page = "<span class='dbtop9'>".$first_img."</span>";
	}

	# 마지막 페이지 링크
	if ($orig_page < $total_page) {
		$l_last_page = "<a href='{$filename}?p={$total_page}&{$link}' style='text-decoration:none' class='dblink'>{$last_img}</a>";
	} else {
		$l_last_page = "<span class='dbtop9'>".$last_img."</span>";
	}


	//이전페이지 링크
	if($orig_page > 1){
		$p = $orig_page - 1 ;
		$pre_page ="<a href='$filename?p=$p&$link' style='text-decoration: none'>$prev_img</a>";
	}else{
		$pre_page = $prev_img ;
	}

	//다음 페이지 링크
	if($orig_page < $total_page){
		$p = $orig_page + 1 ;
		$next_page ="<a href='$filename?p=$p&$link' style='text-decoration: none'>$next_img</a>";
	}else{
		$next_page = $next_img;
	}
/*
    //이전블록에 대한 링크
    if($zone > 1){
        $p = $first_page;
        $p_zone = "<a href='$filename?p=$p&$link' style='text-decoration: none'>$prev_section_img</a>";
    }else{
        $p_zone =$prev_section_img;
	};

    //다음블록에 대한 링크
    if($zone < $total_zone){
        $p = $last_page + 1;
        $n_zone ="<a href='$filename?p=$p&$link'  style='text-decoration: none'>$next_section_img</a>";
    }else{
        $n_zone =$next_section_img;
	}
*/
    //각페이지로 이동 링크
    for($page_link = $first_page+1 ; $page_link <= $last_page; $page_link++){
        if($orig_page == $page_link){
            $this_page .= "&nbsp;<font color='#d31414' style='font-weight:bold;color:#e64956'>$page_link</font>&nbsp;";
        }else{
            $this_page .="&nbsp;<a href='$filename?p=$page_link&$link' style='color:#6c6c6c'>$page_link</a>&nbsp;";
        }
        if($page_link < $last_page) $this_page .= "<span style='color:#6c6c6c'>I</span>";
    }

	if ($outside_using == "N") {
		$f_first_page = "";
		$l_last_page = "";
	}
	else {
		$f_first_page = $f_first_page . " <span style='color:#6c6c6c'>...</span> ";
		$l_last_page = " <span style='color:#6c6c6c'>...</span> " . $l_last_page;
	}

    $page_index = $f_first_page . $p_zone." ".$pre_page."&nbsp;".$this_page."&nbsp;".$next_page." ".$n_zone . $l_last_page;
    return $page_index;
}

if (phpversion () < "5"){ // define PHP5 functions if server uses PHP4
	function str_split($text, $split = 1){
		if (!is_string($text)) return false;
		if (!is_numeric($split) && $split < 1) return false;
		$len = strlen($text);
		$array = array();
		$s = 0;
		$e=$split;
		while ($s <$len){
			$e=($e <$len)?$e:$len;
			$array[] = substr($text, $s,$e);
			$s = $s+$e;
		}
		return $array;
	}
}

/*------------------------------------------------------
한글 문자열 자르기 , 유니 코드 포함
$isUni = true 이면 유니코드문자열 처리
-------------------------------------------------------*/
##TODO : 유니코드를 자동으로 인식할수 없을까?
function ksubstr___($str, $limitLen,$suffix="...",$isUni = true)
{
    $strLen = strlen( $str );

	//제한 문자길이 보다 작다면 그대로 리턴
    if ( $limitLen > $strLen ){
		return $str;
	}
	$str = substr( $str, 0, $limitLen );

	$kChar = 0;
	for( $i = $limitLen -1 ; $i >= 0 ;$i-- ){
		$lastChar = ord($str[$i]);
		if($lastChar < 127){
			break; //정상적인 영문자,숫자라면..stop
		} else{
			$kChar++; //한글이나 특수 문작
		}

    }//for

	//한문자  길이
	($isUni) ? $divide = 3 : $divide = 2 ;

	//문자가 깨지지않게 맞추기
	if($rest = $kChar % $divide > 0){
    	$str  = substr($str,0,$limitLen - $rest);
	}

    return $str.$suffix;
}


function ksubstr($str, $len, $checkmb=false, $tail='...') {
    /**
     * UTF-8 Format
     * 0xxxxxxx = ASCII, 110xxxxx 10xxxxxx or 1110xxxx 10xxxxxx 10xxxxxx
     * latin, greek, cyrillic, coptic, armenian, hebrew, arab characters consist of 2bytes
     * BMP(Basic Mulitilingual Plane) including Hangul, Japanese consist of 3bytes
     **/
    preg_match_all('/[\xE0-\xFF][\x80-\xFF]{2}|./', $str, $match); // target for BMP

    $m = $match[0];
    $slen = strlen($str); // length of source string
    $tlen = strlen($tail); // length of tail string
    $mlen = count($m); // length of matched characters

    if ($slen <= $len) return $str;
    if (!$checkmb && $mlen <= $len) return $str;

    $ret = array();
    $count = 0;
    for ($i=0; $i < $len; $i++) {
        $count += ($checkmb && strlen($m[$i]) > 1)?2:1;
        if ($count + $tlen > $len) break;
        $ret[] = $m[$i];
    }

    return join('', $ret).$tail;
}

function strcut_utf8($str, $len, $checkmb=false, $tail='...') {
    /**
     * UTF-8 Format
     * 0xxxxxxx = ASCII, 110xxxxx 10xxxxxx or 1110xxxx 10xxxxxx 10xxxxxx
     * latin, greek, cyrillic, coptic, armenian, hebrew, arab characters consist of 2bytes
     * BMP(Basic Mulitilingual Plane) including Hangul, Japanese consist of 3bytes
     **/
    preg_match_all('/[\xE0-\xFF][\x80-\xFF]{2}|./', $str, $match); // target for BMP

    $m = $match[0];
    $slen = strlen($str); // length of source string
    $tlen = strlen($tail); // length of tail string
    $mlen = count($m); // length of matched characters

    if ($slen <= $len) return $str;
    if (!$checkmb && $mlen <= $len) return $str;

    $ret = array();
    $count = 0;
    for ($i=0; $i < $len; $i++) {
        $count += ($checkmb && strlen($m[$i]) > 1)?2:1;
        if ($count + $tlen > $len) break;
        $ret[] = $m[$i];
    }

    return join('', $ret).$tail;
}

	/*****
	 * 파일 다운로드
	 * $fullpath : 물리적 파일이름까지 포함한 전체 경로
	 * $filename : 다운로드시 저장될 파일 이름
	 *****/
	function download($fullpath, $filename){
		$HTTP_USER_AGENT = $_SERVER["HTTP_USER_AGENT"];
		//global $HTTP_USER_AGENT;
		$filename = urlencode($filename);
		if(eregi("(MSIE 5.0|MSIE 5.1|MSIE 5.5|MSIE 6.0|MSIE 7.0|MSIE 8.0|MSIE 9.0)", $HTTP_USER_AGENT)){
			if(strstr($HTTP_USER_AGENT, "MSIE 5.5")){
				header("Content-Type: doesn/matter");
				header("Content-disposition: filename=\"$filename\"");
				header("Content-Transfer-Encoding: binary");
				header("Pragma: no-cache");
				header("Expires: 0");
			}

			if(strstr($HTTP_USER_AGENT, "MSIE 5.0")){
				Header("Content-type: file/unknown");
				header("Content-Disposition: attachment; filename=\"$filename\"");
				Header("Content-Description: PHP3 Generated Data");
				header("Pragma: no-cache");
				header("Expires: 0");
			}

			if(strstr($HTTP_USER_AGENT, "MSIE 5.1")){
				Header("Content-type: file/unknown");
				header("Content-Disposition: attachment; filename=\"$filename\"");
				Header("Content-Description: PHP3 Generated Data");
				header("Pragma: no-cache");
				header("Expires: 0");
			}

			if(strstr($HTTP_USER_AGENT, "MSIE")){
				Header("Content-type: application/x-msdownload");
				Header("Content-Length: ".(string)(filesize("$fullpath")));
				Header("Content-Disposition: attachment; filename=\"$filename\"");
				Header("Content-Transfer-Encoding: binary");
				Header("Pragma: no-cache");
				Header("Expires: 0");
			}
		}else{
			$filename = urldecode($filename);
			Header("Content-type: file/unknown");
			Header("Content-Length: ".(string)(filesize("$fullpath")));
			Header("Content-Disposition: attachment; filename=\"$filename\"");
			Header("Content-Description: PHP3 Generated Data");
			Header("Pragma: no-cache");
			Header("Expires: 0");
		}

		if (is_file("$fullpath")){
			$fp = fopen("$fullpath", "rb");

			if (!fpassthru($fp)){
				fclose($fp);
			}
			exit;

		}else{
			go_url("", "해당 파일이나 경로가 존재하지 않습니다.");
			exit;
		}
		exit;
	}


	/*****
	 * 배열의 모든값들에 대해 \문자를 제거한다.
	 * by sqlplus
	 *****/
	function StripAllSlashes (&$ArrayGET, $Value){
		if (is_array ($ArrayGET)) array_walk ($ArrayGET, "StripAllSlashes");
		else $ArrayGET = stripslashes ($ArrayGET);
	}

	/*****
	 * 배열의 모든 요소들을 trim 한다
	 * by sqlplus
	 *****/
	function trimvalues (&$ArrayGET, $Value){
	   if (is_array ($ArrayGET)) array_walk ($ArrayGET, "trimvalues");
	   else $ArrayGET = trim ($ArrayGET);
	}

	/*****
	 * 배열에서 값이 null인것은 제거 시켜준다.
	 *****/
	function delete_null_array($var){
		return ($var !== null && trim($var) != "");
	}

	/*****
	* 배열에서 값이 null인것은 제거 시켜준다.
	*****/

	function remove_null_array($var){
		$newArray = array();
		$nKey=0;
		
		if(is_array($var)){
			foreach($var as $key => $value){
				if($value !== null && trim($value) != ""){
					$newArray[$nKey] = $value;
					$nKey++;
				}
			}
		}else{
			$newArray = $var;
		}
		
		return $newArray;
	}

	/*****
	 * 배열의 모든 요소의 특수 문자를 HTML 엔터티로 변환합니다.
	 * by sqlplus
	 *****/
	function htmlspecialcharsAll (&$Array, $Value){
	   if (is_array ($Array)) array_walk ($Array, "htmlspecialcharsAll");
	   else $Array = htmlspecialchars ($Array,ENT_QUOTES);
	}

	function go_url($url = "",$msg = "",$target = "") {
		$str = _DOCTYPE."
			<html xmlns='http://www.w3.org/1999/xhtml' xml:lang='ko' lang='ko'>
			<head>
			<meta http-equiv='Content-Type' content='text/html; charset="._CHARSET."' />
			<meta http-equiv='imagetoolbar' content='no' />
			<title>"._TITLE."</title>
			</head>
			<body>
		";
		if(trim($msg)!=""){// message가 있을경우
			$str .= "
			<script type='text/javascript'>
			<!--
				alert(\"$msg\");
			//-->
			</script>
			";
		}
		if(trim($url)!=""){// url 이 있을경우
			if($target){ // 프레임구조에서 타겟이 정해져 있을경우
				$str .= "<script type='text/javascript'>".$target.".location.replace('".$url."')</script>";
			}else{
				$str .= "<script type='text/javascript'>location.replace('".$url."')</script>";
				//$str .= "<meta http-equiv='Refresh' content='0; URL={$url}'>";
			}
		}else{
			$str .= "
			<script type='text/javascript'>
			<!--
				history.go(-1);
			//-->
			</script>
			";
		}
		$str .= "
			</body>
			</html>
		";
		define("_ALERT", "1");
		define("_MSG", $str);
		exit;
	}

	function go_confirm($msg = "",$url = "",$cancel_url = ""){
		$str = _DOCTYPE."
			<html xmlns='http://www.w3.org/1999/xhtml' xml:lang='ko' lang='ko'>
			<head>
			<meta http-equiv='Content-Type' content='text/html; charset="._CHARSET."' />
			<meta http-equiv='imagetoolbar' content='no' />
			<title>"._TITLE."</title>
			</head>
			<body>
		";

		if(trim($cancel_url)!=""){
			$cancel_url = "else{location.replace('".$cancel_url."');}";
		}

		if(trim($msg)!=""){// message가 있을경우
			$str .= "
			<script type='text/javascript'>
			<!--
			if(confirm(\"$msg\")){
				location.replace('".$url."');
			}$cancel_url;
			//-->
			</script>
			";
		}
		$str .= "
			</body>
			</html>
		";
		define("_ALERT", "1");
		define("_MSG", $str);
		exit;
	}

	function close_alert($msg,$url = ""){
		$str = _DOCTYPE."
			<html xmlns='http://www.w3.org/1999/xhtml' xml:lang='ko' lang='ko'>
			<head>
			<meta http-equiv='Content-Type' content='text/html; charset="._CHARSET."' />
			<meta http-equiv='imagetoolbar' content='no' />
			<title>"._TITLE."</title>
			</head>
			<body>
			<script type='text/javascript'>
			<!--
				alert(\"$msg\");
		";
		if(trim($url)!=""){// url 가 있을경우
			$str .= "
				opener.location.replace('".$url."');
			";
		}
		$str .= "
				self.close();
			//-->
			</script>
			</body>
			</html>
		";
		define("_ALERT", "1");
		define("_MSG", $str);
		exit;
	}

	// by sqlplus
	function thumbnail($file, $save_filename, $save_path, $max_width, $max_height,$watermark_file = ""){

		$x0=10 ; $y0=30 ;

		list($img_width, $img_height, $type, $attr) = getimagesize($file);
		/* type
		1 = GIF,   2 = JPG,  3 = PNG,                     4 = SWF,
		5 = PSD,   6 = BMP,  7 = TIFF(intel byte order),  8 = TIFF(motorola byte order),
		9 = JPC,  10 = JP2, 11 = JPX,                    12 = JB2,
		13 = SWC, 14 = IFF, 15 = WBMP,                   16 = XBM
		*/
		if($type == 1){
			$src_img = ImageCreateFromGif($file);
		}elseif($type == 2){
			$src_img = ImageCreateFromJPEG($file);
		}elseif($type == 3){
			$src_img = ImageCreateFromPNG($file);
		}else{
			return 0;
		}

		# 비율 수정
		$ratio = ($img_width/$max_width >= $img_height/$max_height)? $img_width/$max_width:$img_height/$max_height;
		$dst_width  = $img_width/$ratio;
		$dst_height = $img_height/$ratio;

		if($dst_width < $max_width) $srcx = ceil(($max_width - $dst_width)/2); else $srcx = 0;
		if($dst_height < $max_height) $srcy = ceil(($max_height - $dst_height)/2); else $srcy = 0;

		if($type == 1){
			$dst_img = imagecreate($max_width, $max_height);
		}else{
			$dst_img = imagecreatetruecolor($max_width, $max_height);
		}

		$bgc = ImageColorAllocate($dst_img, 255, 255, 255);
		ImageFilledRectangle($dst_img, 0, 0, $max_width, $max_height, $bgc);
		ImageCopyResampled($dst_img, $src_img, $srcx, $srcy, 0, 0, $dst_width, $dst_height, ImageSX($src_img),ImageSY($src_img));

		if($type == 1){
			ImageInterlace($dst_img);
			ImageGif($dst_img, $save_path."/".$save_filename);
		}elseif($type == 2){
			ImageInterlace($dst_img);
			ImageJPEG($dst_img, $save_path."/".$save_filename);
		}elseif($type == 3){
			ImagePNG($dst_img, $save_path."/".$save_filename);
		}
		chmod($save_path."/".$save_filename,0777);
		ImageDestroy($dst_img);
		ImageDestroy($src_img);

	}


	# 처리시간 처리를 위해 추가
	function microtime_float()
	{
	   list($usec, $sec) = explode(" ", microtime());
	   return ((float)$usec + (float)$sec);
	}

	function calendar($year,$month){
		$last_day = 31-((($month-(($month<8)? 1:0))%2)+(($month==2)?((!($year%((!($year%100))? 400 :4)))? 1:2):0));

		for($w = 0;$w < 6;$w++){
			for($d=0;$d<7;$d++){
				$day = ($w==0)? ( (date("w", strtotime($year.'-'.$month.'-1')) <= $d)? $day + 1:0 ):( $day + 1 );
				$calendar[$w][chr(65+$d)] = ($day > $last_day)? 0:$day;
			}
			if($day >= $last_day) break;
		}
		return $calendar;
	}

	function check_day($year,$month,$day){
		return strtotime(date('Y-m-d')) - strtotime($year.'-'.$month.'-'.$day);
	}

	/*****
	 * 첨부파일 업로드
	 * $tag : U upload, D delete
	 *****/
	function upload($path,$OBJ_FILES,$filename,$tag = "U"){
		$arr_path = split("/",$path);
		if($tag == "U"){ // 파일 업로드일 경우
			// 확장자 체크
			if(preg_match('/\\.(php|htm|html|asp|jsp|js|com|bat)$/i', strtolower($OBJ_FILES['name']))){ // 확장자 금지항목 체크
  				go_url("","금지된 확장자의 파일 업로드를 시도하셨습니다.");
			}

			// 저장할 디렉토리가 존재하지 않으면 생성한다.
			for($i=1;$i<count($arr_path);$i++){
				$tmp = implode("/",array_slice($arr_path,0,$i+1));
				if(!file_exists($tmp)){
					mkdir($tmp,0777);
					chmod($tmp,0777);
				}
			}

			// 파일을 저장한다.
			if(file_exists($tmp."/".$filename)) unlink($tmp."/".$filename);
			move_uploaded_file($OBJ_FILES['tmp_name'],$tmp."/".$filename);
			chmod($tmp."/".$filename,0777);

		}else if($tag == "D"){ // 파일 삭제일 경우
			$tmp = implode("/",$arr_path);
			if(file_exists($tmp."/".$filename)) unlink($tmp."/".$filename);
		}
		return true;
	}


	/*****
	 * 첨부파일 업로드
	 * $tag : U upload, M modify, D delete
	 *****/
	function upload_($path,$OBJ_FILES,$filename,$tag = "U",&$M){
		$arr_path = split("/",$path);
		if($tag == "U" || $tag == "M"){ // 파일 업로드일 경우
			if($OBJ_FILES !== null && $OBJ_FILES[error] == 0 && $OBJ_FILES[size] > 0 ){// 첨부파일이 있을경우
				// 확장자 체크
				if(preg_match('/\\.(php|htm|html|asp|jsp|js|com|bat)$/i', strtolower($OBJ_FILES['name']))){ // 확장자 금지항목 체크
	  				go_url("","금지된 확장자의 파일 업로드를 시도하셨습니다.");
	  				exit;
				}

				// 저장할 디렉토리가 존재하지 않으면 생성한다.
				for($i=1;$i<count($arr_path);$i++){
					$tmp = implode("/",array_slice($arr_path,0,$i+1));
					if(!file_exists($tmp)){
						mkdir($tmp,0777);
						chmod($tmp,0777);
					}
				}

				// 파일을 저장한다.
				if(file_exists($tmp."/".$filename)) unlink($tmp."/".$filename);
				move_uploaded_file($OBJ_FILES['tmp_name'],$tmp."/".$filename);
				chmod($tmp."/".$filename,0777);
				$M = "T";
				return $OBJ_FILES['name'];
			}else if($tag == "M"){
				$M = "F";
			}
		}else if($tag == "D"){ // 파일 삭제일 경우
			$tmp = implode("/",$arr_path);
			if(file_exists($tmp."/".$filename)) unlink($tmp."/".$filename);
		}
		//return true;
	}

	function open_yn($str){
		return ($str == "Y")? "예":"아니요";
	}

	// 세션변수 생성
	function set_session($session_name, $value)
	{
	    //session_register($session_name);
	    // PHP 버전별 차이를 없애기 위한 방법
	    $$session_name = $_SESSION["$session_name"] = $value;
	}


	// 세션변수값 얻음
	function get_session($session_name)
	{
	    return $_SESSION[$session_name];
	}

	// 쿠키변수 생성
	function set_cookie($cookie_name, $value, $expire)
	{
		setcookie(md5($cookie_name), base64_encode($value), time() + $expire, '/');
	}

	// 쿠키변수값 얻음
	function get_cookie($cookie_name)
	{
		return base64_decode($_COOKIE[md5($cookie_name)]);
	}

	// mysql 의 ifnull 과 같은 기능을 사용하기 위해 추가함
	if (!function_exists('ifnull')) {
		function ifnull($a,$b){
			// null 값과 공백
			return (trim($a)=="")? $b:$a;
		}
	}

	function file_post_contents($url,$headers=false) {
	    $url = parse_url($url);

	    if (!isset($url['port'])) {
	      if ($url['scheme'] == 'http') { $url['port']=80; }
	      elseif ($url['scheme'] == 'https') { $url['port']=443; }
	    }
	    $url['query']=isset($url['query'])?$url['query']:'';

	    $url['protocol']=$url['scheme'].'://';
	    $eol="\r\n";

	    $headers =  "POST ".$url['protocol'].$url['host'].$url['path']." HTTP/1.0".$eol.
	                "Host: ".$url['host'].$eol.
	                "Referer: ".$url['protocol'].$url['host'].$url['path'].$eol.
	                "Content-Type: application/x-www-form-urlencoded".$eol.
	                "Content-Length: ".strlen($url['query']).$eol.
	                $eol.$url['query'];
	    $fp = fsockopen($url['host'], $url['port'], $errno, $errstr, 30);
	    if($fp) {
	      fputs($fp, $headers);
	      $result = '';
	      while(!feof($fp)) { $result .= fgets($fp, 128); }
	      fclose($fp);
	      //if (!$headers) {
	        //removes headers
	        $pattern="/^.*\r\n\r\n/s";
	        $result=preg_replace($pattern,'',$result);
	      //}
	      return $result;
	    }
	}

	// 날짜, 조회수의 경우 높은 순서대로 보여져야 하므로 $flag 를 추가
	// $flag : asc 낮은 순서 , desc 높은 순서
	// 제목별로 컬럼 정렬하는 QUERY STRING
	function subject_sort_link($col, $query_string='', $flag='asc')
	{
	    global $argu;

	    $q1 = "sst=$col";
	    if ($flag == 'asc')
	    {
	        $q2 = 'sod=asc';
	        if ($argu['sst'] == $col)
	        {
	            if ($argu['sod'] == 'asc')
	            {
	                $q2 = 'sod=desc';
	            }
	        }
	    }
	    else
	    {
	        $q2 = 'sod=desc';
	        if ($argu['sst'] == $col)
	        {
	            if ($argu['sod'] == 'desc')
	            {
	                $q2 = 'sod=asc';
	            }
	        }
	    }

	    return "<a href='$_SERVER[PHP_SELF]?$query_string&$q1&$q2&s_case={$argu['s_case']}&s_string=".urlencode($argu['s_string'])."&p={$argu['p']}'>";
	}

	function get_input_code($type,$code,$name,$value="",$class="text_03",$script=""){
		global $_CODE;
		$items = $_CODE[$code];
		$str = "";
		switch($type){
			case "select":
				$str .= "<select name='{$name}' class='{$class}' {$script}>\n";
				$str .= "<option value=''>선 택</option>\n";
				foreach( $items as $key => $val ){
					$selected = ($key==$value)? " selected":"";
					$str .= "<option value='{$key}'{$selected}>{$val}</option>\n";
				}
				$str .= "</select>\n";
				break;
			case "select2":
				$str .= "<select name='{$name}' class='{$class}' {$script}>\n";
				foreach( $items as $key => $val ){
					$selected = ($key==$value)? " selected='selected'":"";
					$str .= "<option value='{$key}'{$selected}>{$val}</option>\n";
				}
				$str .= "</select>\n";
				break;
			case "radio":
				foreach( $items as $key => $val ){
					$checked = ($key==$value)? " checked":"";
					$str .= "<input type='radio' name='{$name}' value='{$key}'{$checked} {$script}/> {$val} \n";
				}
				break;
			case "radio2":
				$checked = (!$value)? " checked":"";
				$str .= "<input type='radio' name='{$name}' value=''{$checked} {$script}/> 전체 ";
				foreach( $items as $key => $val ){
					$checked = ($key==$value)? " checked":"";
					$str .= "<input type='radio' name='{$name}' value='{$key}'{$checked} {$script}/> {$val} ";
				}
				break;
			case "checkbox":
				foreach( $items as $key => $val ){
					//$checked = ($key==$value)? " checked":"";
					$checked = strstr((string) $value, (string) $key)? " checked":"";
					$str .= "<span style='white-space:nowrap;'><input type='checkbox' name='{$name}[]' value='{$key}'{$checked} {$script}/>{$val} </span>\n";
				}
				break;
		}
		return $str;
	}

	function get_view_code($type,$code,$name,$value="",$class="text04"){
		global $_CODE;
		$items = $_CODE[$code];
		$str = "";
		switch($type){
			case "select":
				$str .= "<select name='{$name}' class='{$class}'>\n";
				$str .= "<option value=''>선 택</option>\n";
				foreach( $items as $key => $val ){
					$selected = ($key==$value)? " selected":"";
					$str .= "<option value='{$key}'{$selected}>{$val}</option>\n";
				}
				$str .= "</select>\n";
				break;
			case "radio":
				foreach( $items as $key => $val ){
					if(strstr((string) $value, (string) $key))
						$str .= "<input type='radio' name='{$name}' value='{$key}' $checked/> {$val} \n";
				}
				break;
			case "checkbox":
				foreach( $items as $key => $val ){
					if(strstr((string) $value, (string) $key))
						$str .= "<span style='white-space:nowrap;font-weight:bold;'><input type='checkbox' name='{$name}[]' value='{$key}' checked disabled/>{$val} </span> ";
				}
				break;
		}
		return $str;
	}

	function get_userName($user_id){
		global $_DB;
		if(!$user_id) return;
		return $_DB->getOne("select user_name from user where user_id = ? ",$user_id);
	}

	function get_userTel($user_id){
		global $_DB;
		if(!$user_id) return;
		return $_DB->getOne("select user_tel from user where user_id = ? ",$user_id);
	}

	function get_userHp($user_id){
		global $_DB;
		if(!$user_id) return;
		return $_DB->getOne("select user_hp from user where user_id = ? ",$user_id);
	}


	function get_agencyName($a_id){
		global $_DB;
		if(!$a_id) return "본사";
		return $_DB->getOne("select a_company from agency where a_id = ? ",$a_id);
	}

	function get_imgsize($file,$max_width,$max_height=0){
		if( $file != '' && file_exists($file) ) {
			list($img_width, $img_height, $type, $attr) = @getimagesize($file);
			
			if($type == 1 || $type == 2 || $type == 3){
				# 비율 수정
				if($max_height>0){
					$ratio = ($img_width/$max_width >= $img_height/$max_height) ? $img_width/$max_width:$img_height/$max_height;
					
					if( $ratio <= 1) $ratio = 1;
					$dst_width  = round($img_width/$ratio);
					$dst_height = round($img_height/$ratio);
					
					return " width='$dst_width' height='$dst_height' ";
				}else{
					$ratio = $img_width/$max_width;
					
					if( $ratio <= 1) $ratio = 1;
					$dst_width  = round($img_width/$ratio);
					$dst_height = round($img_height/$ratio);
					
					return " width='$dst_width' height='$dst_height' ";
				}
			}else{
				return;
			}
	    }else{
	        return;
	    }
	}

	class SelectHanCategory
	{
		/*
		ㄱ : &#12593
		ㄴ : &#12596
		ㄷ : &#12599
		ㄹ : &#12601
		ㅁ : &#12609
		ㅂ : &#12610
		ㅅ : &#12613
		ㅇ : &#12615
		ㅈ : &#12616
		ㅊ : &#12618
		ㅋ : &#12619
		ㅌ : &#12620
		ㅍ : &#12621
		ㅎ : &#12622
		*/
		// 가..나..다..의 16진수값들
		var $hexcode = array("0088" => "A", "b0a1" => "ㄱ", "b3aa" => "ㄴ","b4d9" => "ㄷ", "b6f3" => "ㄹ","b8b6" => "ㅁ",
			"b9d9" => "ㅂ","bbe7" => "ㅅ", "bec6" => "ㅇ","c0da" => "ㅈ", "c2f7" => "ㅊ",
			"c4ab" => "ㅋ", "c5b8" => "ㅌ", "c6c4" => "ㅍ","c7cf" => "ㅎ", "c8ff" => "");
		var $hexarray, $hexcount;

		function SelectHanCategory() {
			$this->hexcount = count($this->hexcode);
			for($i=0; $i < $this->hexcount ; $i++) {
				$this->hexarray[] = key($this->hexcode);
				next($this->hexcode);
			}
		}

		function IsHangul($ch) {
			$ch = ord($ch);
			if($ch >= 0xa1 && $ch <= 0xfe) return true;
			return false;
		}

		function Check($str) {
			if($this->IsHangul(substr($str, 0, 1))) {
				$current_hexcode = bin2hex(substr($str, 0, 2));
				for ($i=0,$j=1;$i<$this->hexcount;$i++,$j++) {
					if ($current_hexcode>=$this->hexarray[$i] && $current_hexcode<$this->hexarray[$j]) {
						break;
					}
				}
				return array($j,$this->hexcode[$this->hexarray[$i]]);
			}else{
				return array( strtoupper(substr($str, 0, 1)) , strtoupper(substr($str, 0, 1)) );
			}
			//} return array(-1);
		}
	}
	//$category = new SelectHanCategory();
	//$return = $category->Check("a파하하하.. 안녕하세요.");
	//echo "해당 카테고리 : $return[1] , DB에 저장한 값 : $return[0]";
	
	
	
	// 메시지발송 SendMesg(보내는 사람 연락처, 메시지, 전송완료알림창 ( 1:띄움, 0:안띄움 ), 받는 사람 연락처)
	function SendMesg($hpSender, $hpMesg, $endAlert, $hpReceiver=_SMS_HP) {
		$userid = _SMS_ID;			// 문자나라 아이디
		$passwd = _SMS_PW;			// 문자나라 비밀번호
		$adminPhone = _SMS_HP;       // 비상시 메시지를 받으실 관리자 핸드폰번호
		
		/*  UTF-8 글자셋 일 경우 */
		$hpMesg = iconv("UTF-8", "EUC-KR", $hpMesg);
		
		$hpMesg = urlencode($hpMesg);
		
		$url = "/MSG/send/web_admin_send.htm?userid=".$userid."&passwd=".$passwd."&sender=".$hpSender."&receiver=".$hpReceiver."&encode=1&end_alert=".$endAlert."&message=".$hpMesg;
		
		$fp = fsockopen("211.233.20.184", 80, $errno, $errstr, 10);
		
		if(!$fp) echo "$errno : $errstr";
		
		fwrite($fp, "GET $url HTTP/1.0\r\nHost: 211.233.20.184\r\n\r\n");
		$flag = 0;
		
		while(!feof($fp)){
			$row = fgets($fp, 1024);
			
			if($flag) $out .= $row;
			
			if($row=="\r\n") $flag = 1;
		}
		
		fclose($fp);
		
		return iconv("EUC-KR", "UTF-8", $out);
	}
	
	function get_banner($pos,$cat){
		global $_DB;
		if(!$pos) return;
		if(!$cat) return;

		$query = "
			select
				*
			from
				banner
			where
				b_pos = ?
				and b_cat = ?
			limit 1
		";
		$_row = $_DB->getRow($query,array($pos,$cat),DB_FETCHMODE_ASSOC);

		if (DB::isError($_row)) {
			//print_r($row);
			die($_row->getMessage());
		}

		if(file_exists(_PDS."banner/{$_row['b_no']}") && $_row['b_file']){
			$str = "";
			if($_row['b_link']) $str .= "<a href='{$_row['b_link']}'>";
			$str .= "<img src='/common/download.php?fullpath=banner/{$_row['b_no']}' width='{$_row['b_width']}' height='{$_row['b_height']}' onerror=\"this.style.display='none'\" style='display:block;border:0;'>";
			if($_row['b_link']) $str .= "</a>";

			return $str;
		}else{
			return;
		}
	}

	function get_nav($c_id){
		global $_DB,$_basic,$_PRODUCT_TYPE;
		$str = "";
		$separator = " > ";
		$len = strlen($c_id);
		if($len){
			$str .= $_PRODUCT_TYPE[$c_id[0]];
			for( $i = 1 ; $i <= floor( ( $len - 1 ) / 3 ) ; $i++ ){
				$res = $c_name = $_DB->getOne(" select c_name from category where c_id = ? ",substr($c_id,0,1+(3*($i))));
				if (DB::isError($res)) {
					//debug($res);
					die($res->getMessage());
				}
				$str .= $separator;
				$str .= $c_name;
			}
		}
		return $str;
	}

	function get_goods_swfnum($c_id){
		global $_PRODUCT_TYPE;
		if($_PRODUCT_TYPE[$c_id[0]]){
			switch($c_id[0]){
				case "A":return  1;break;
				case "B":return  2;break;
				case "C":return  3;break;
				case "D":return  4;break;
				case "E":return  5;break;
				case "F":return  6;break;
				case "G":return  7;break;
				case "H":return  8;break;
				case "I":return  9;break;
			}
		}else return "";
	}

	function get_category_list($c_type){
		global $_DB;

		$query = "
			select
				*
			from
				category c
			where
				c_num1 > 0
				and c_type = '{$c_type}'
			order by
				c_id asc
		";
		$res = $_list =& $_DB->getAll($query, array(), DB_FETCHMODE_ASSOC);
		if (DB::isError($res)) {
			debug($query);
			die($res->getMessage());
		}

		return $_list;
	}

	function ext_get($value){
		return strtolower(array_pop(explode('.',$value)));
	}


	function replace_icon($str){
		for( $fs = 1 ; $fs <= 19 ; $fs++ ){
			$str = str_replace('{'.$fs.'}',"<img src='/img/sub4/img".(sprintf("%02d",$fs+1)).".jpg' width='27' height='16' border='0' align='absmiddle'.>",$str);
		}
		return $str;
	}

	function removeTags($text){ 
		$text = preg_replace("/(\<script)(.*?)(script>)/si", "dada", "$text"); 
		$text = strip_tags($text); 
		$text = str_replace("<!--", "&lt;!--", $text); 
		$text = preg_replace("/(\<)(.*?)(--\>)/mi", "".nl2br("\\2")."", $text); 
		
		return $text; 
	}

	function txtParse($txt, $type){
		if($type==1){
			$txt=htmlspecialchars($txt,ENT_QUOTES,'UTF-8');
		}else{
			$txt=html_entity_decode($txt,ENT_QUOTES,'UTF-8');
		}

		return $txt;
	}

	function parseASCII($type, $str){
		if($type==1){
			$str=str_replace(chr(32), "&nbsp;", $str);
			$str=str_replace("\r\n", "<br />", $str);
		}else{
			$str=str_replace("&nbsp;", chr(32), $str);
			$str=str_replace("<br />", "\r\n", $str);
		}

		return $str;
	}

	//랜덤 대문자 생성
	function MakeRandCaps($inLength){
		//mt_srand( MakeSeed() );
		$newstring="";

		if($inLength>0){
			while(strlen($newstring)<$inLength){
				switch(mt_rand(1,2)){
					case 1: $newstring.=chr(mt_rand(49,57)); break; // 0-9
					case 2: $newstring.=chr(mt_rand(65,90)); break; // A-Z
				}
			}
		}

		return $newstring;
	}

	//랜덤 텍스트 생성
	function MakeRandString($inLength){
		//mt_srand( MakeSeed() );
		$newstring="";

		if($inLength>0){
			while(strlen($newstring)<$inLength){
				switch(mt_rand(1,2)){
					case 1: $newstring.=chr(mt_rand(49,57)); break; // 0-9
					case 2: $newstring.=chr(mt_rand(97,122)); break; // a-z
				}
			}
		}

		return $newstring;
	}

	//랜덤 숫자 생성
	function MakeRandInt($inLength){
		$intCnt=0;
		$newstring="";

		if($inLength>0){
			while($intCnt<$inLength){
				$newstring.=chr(mt_rand(49,57)); // 0-9
				$intCnt++;
			}
		}

		return $newstring;
	}

	//업로드된 모든 파일 삭제 함수
	function RemoveDirectory($directory){
		$dirPath=opendir($directory);
		while(($readfile=readdir($dirPath))){
			if(is_file($directory . "/" . $readfile)){
				unlink($directory . "/" . $readfile);
			}else if(is_dir($directory . "/" . $readfile) && ($readfile != ".") && ($readfile != "..")){
				RemoveDirectory($directory . "/" . $readfile);
			}
		}
		closedir($dirPath);
		rmdir($directory);
	}

	
	function zm_upload($fname, $path, $del_file=false, $tmp_file=null){

		$_filename=$_FILES[$fname]["name"];

		$_tmpfile=$_FILES[$fname]["tmp_name"];
	
		if($del_file==1){
			@unlink($path.$tmp_file);
			$_upload="";

		}



		if($_filename){

			if(file_exists($path.$tmp_file) && $tmp_file){

				@unlink($path.$tmp_file);
			}
			
			$ArrFile=explode(".",$_filename);

			$_ext=end($ArrFile);
			$_upload=time()."_".zm_RandString(8, array(1)).".".$_ext;
			
			while(file_exists($path.$_upload)){
				$_upload=time()."_".zm_RandString(8, array(1)).".".$_ext;
			}
			
			if(!move_uploaded_file($_tmpfile, $path.$_upload)){
				echo "<script>alert('파일 업로드 오류입니다.');history.back();</script>";
			}
		}else{
			$_upload=($del_file==1) ? "" : $tmp_file;
		}
		
		return $_upload;
	}
	
	//랜덤 텍스트 생성
	// (array) $arrNum = 1:숫자 2:소문자 3:대문자
	
	function zm_RandString($inLength, $arrNum){
		$newstring="";
			if($inLength>0){
				while(strlen($newstring)<$inLength){

					$rnd_key=array_rand($arrNum,1);
					$type=$arrNum[$rnd_key];
					
					switch($type){
						case 1:
							$newstring.=chr(mt_rand(49,57)); break; // 0-9
						case 2:
							$newstring.=chr(mt_rand(97,122)); break;	// a-z
						case 3:
							$newstring.=chr(mt_rand(65,90)); break; // A-Z
					}
				}
			}
		return $newstring;
	}


	function cut_name($str){
		$str1=iconv_substr($str,0,1,"UTF-8");
		$str2=iconv_substr($str,2,1,"UTF-8");
		$str = $str1."*".$str2;
		
		return $str;
	}
	
	function cut_gugan($str){
		$str1=iconv_substr($str,0,2,"UTF-8");
		$str = $str1;
		
		return $str;
	}
	
	//문자열 자르기
	function zm_cutString($str, $len, $more){
		$str=html_entity_decode($str,ENT_QUOTES,'UTF-8');
		$count = iconv_strlen($str,"UTF-8");
		$len*=2;
		
		if($len >= $count){
			$str=$str;
		}else{
			$str=iconv_substr($str,0,$len,"UTF-8").$more;
		}
		
		return $str;
	}
	
	/// 휴대폰 번호 자르기
	function split_hp($str){
		$new_str=array();
		$new_str[0]=substr($str, 0, 3);
		$new_str[1]=substr($str, 3, -4);
		$new_str[2]=substr($str, -4);
		
		return $new_str;
	}
	
	/// 카드 번호 자르기
	function split_card($str){
		$new_str=array();
		$new_str[0]=substr($str, 0, 4);
		$new_str[1]=substr($str, 4, 4);
		$new_str[2]=substr($str, 8, 4);
		$new_str[3]=substr($str, -4);
		
		return $new_str;
	}
	
	// 코드별 은행/카드사 불러오기
	function get_payment_name($type, $code){
		global $_DB;
		
		$query = "
			select
				pc_name
			from
				payment_conf
			where
				pc_type='{$type}'
			and
				pc_code='{$code}'
		";
		
		$res = $pc_name = $_DB->getOne($query);
		
		if (DB::isError($res)) {
			$pc_name="";
		}
		
		return $pc_name;
	}

?>