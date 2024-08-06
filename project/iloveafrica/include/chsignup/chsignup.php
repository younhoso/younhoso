<?php
session_start();
require_once('chsignup.class.php');
$im = new chsignup;
$im->set_font($_SERVER[DOCUMENT_ROOT].'/include/chsignup/adler.ttf');
$_SESSION['text'] = $im->create_image();
?>
