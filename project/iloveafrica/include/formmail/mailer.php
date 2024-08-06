<?

// type : text=0, html=1, text+html=2
function mailer($from_name, $from_email, $to_email, $subject, $content, $type=1, $file="") {
	$conf['charset'] = "utf-8";

	$from_name   = "=?$conf[charset]?B?" . base64_encode($from_name) . "?=";
	$subject = "=?$conf[charset]?B?" . base64_encode($subject) . "?=";

	$header  = "Return-Path: <$from_email>\n";
	$header .= "From: $from_name <$from_email>\n";
	$header .= "Reply-To: <$from_email>\n";
	$header .= "MIME-Version: 1.0\n";

	if ($file != "") {
		$boundary = uniqid("http://localhost");
		$header .= "Content-type: MULTIPART/MIXED; BOUNDARY=\"$boundary\"\n\n";
		$header .= "--$boundary\n";
	}

	if ($type) {
		$header .= "Content-Type: TEXT/HTML; charset=$conf[charset]\n";
		if ($type == 2) $content = nl2br($content);
	} else {
		$header .= "Content-Type: TEXT/PLAIN; charset=$conf[charset]\n";
		$content = stripslashes($content);
	}
	$header .= "Content-Transfer-Encoding: BASE64\n\n";
	$header .= chunk_split(base64_encode($content)) . "\n";

	for($i=1;$i<=3;$i++) {
		if($file[$i]['name'] == '') continue;
		$file_name = $file[$i]['name'];
		$header .= "\n--$boundary\n";
		$header .= "Content-Type: application/octet-stream\n";
		$header .= "Content-Transfer-Encoding: BASE64\n";
		$header .= "Content-Disposition: attachment; filename=\"$file_name\"\n";

		$header .= "\n";
		$header .= base64_encode($file[$i]['data']);
		$header .= "\n";
	}

	$header .= "--$boundary--\n\n";
	//1번.
	//@mail($to_email, $subject, "", $header);

	//서버 환경에 따라서 아래처럼 옵션값을 넣어줘야 발송이 되는 호스팅이 있습니다.
	//1번으로 발송이 안 될 경우 2번처럼 해보세요.(1번 주석처리, 2번 주석 제거)

	//2번.
	@mail($to_email, $subject, "", $header,'-f'.$from_email);
}

// 파일을 첨부함
function attach_file($file_name, $file) {
	$fp = @fopen($file, "r");
	$tmpfile = array(
		"name" => $file_name,
		"data" => @fread($fp, @filesize($file)));
	@fclose($fp);
	return $tmpfile;
}

?>