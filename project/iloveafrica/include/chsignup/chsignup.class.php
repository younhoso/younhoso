<?php
/*
if (!extension_loaded("gd")) {
    $ext = "gd.so";
    if (!dl($ext)) {
echo '<p>Please make sure you have copied gd.so PHP extension file to your PHP extention subdirectory</p>';
     die(); 
    }
}
*/

class chsignup
{
    var $font;
    var $text;

    function chsignup()
    {
        $this->set_font('');
        srand((double)microtime()*1000000^getmypid());
    }

    function set_font($font)
    {
        if (file_exists($font)) {
            $old_font = $this->font;
            $this->font = $font;

            if (!empty($old_font))
                return $old_font;
            return true;
        }
        else
            return false;
    }

    function get_font()
    {
        return $this->font;
    }

    function create_image($width=121, $height=31)
    {
        header("Content-type:image/png");

        $im = imagecreate($width,$height);
        $white = imagecolorallocate($im,255,255,255);
        $black = imagecolorallocate($im,0,0,0);

        $num = 0;

        for ($i=$num; $i<=$width; $i += 10)
            imageline($im,$i,0,$i,$height,$black);

        for ($i=$num; $i<=$height+10; $i+=10)
            imageline($im,0,$i,$width,$i,$black);
 	
        $string = substr(strtolower(md5(uniqid(rand(),1))),0,5);
        $string = str_replace('0','a',$string);

        imagettftext($im, 20, 0, 22, 27, $black, $this->get_font(), $string);
        imagepng($im);
        imagedestroy($im);

        return $this->text = $string;
    }
}
