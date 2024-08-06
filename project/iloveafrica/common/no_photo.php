<?
	header("Content-type:image/jpeg");
	
	$w = ($_GET['w']) ? $_GET['w'] : $_POST['w'];
	$h = ($_GET['h']) ? $_GET['h'] : $_POST['h'];

	$sw = $w*0.8;
	$sh = $h*0.8;

	$file = $_SERVER['DOCUMENT_ROOT']."/img/no_photo.jpg";
	list($width, $height) = getimagesize($file);

	// 비율 및 크기 계산
	$ratio = ($width/$sw >= $height/$sh)? $width/$sw:$height/$sh;
	$dst_width  = $width/$ratio;
	$dst_height = $height/$ratio;

	if($dst_width < $w) $srcx = ceil(($w - $dst_width)/2); else $srcx = 0;
	if($dst_height < $h) $srcy = ceil(($h - $dst_height)/2); else $srcy = 0;


	$src = imagecreatefromjpeg($file);

	$im = imagecreatetruecolor($w, $h);
	
	$white = imagecolorallocate($im,255,255,255);
	$gray = imagecolorallocate($im,231,231,231);

	imagefill($im, 0, 0, $white);

	imagecopyresampled($im, $src, $srcx, $srcy, 0, 0, $dst_width, $dst_height, $width, $height);

	imageline($im, 0, 0, 0, $h, $gray);
	imageline($im, 0, 0, $w, 0, $gray);
	imageline($im, $w-1, 0, $w-1, $h-1, $gray);
	imageline($im, 0, $h-1, $w-1, $h-1, $gray);

	imagejpeg($im);
	imagedestroy($im);
?>