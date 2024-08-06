<?
##### 데이터베이스 연결설정 인자 (서버명, 사용자명, 비밀번호, 작업대상 데이터베이스명)
$hostName = "121.78.144.227";
$userName = "newafrica";
$userPassword = "newafrica3942";
$dbName = "newafrica";

##### 데이터베이스에 연결한다.
$connect = @mysql_connect($hostName,$userName,$userPassword);
##### 작업대상 데이터베이스를 선택한다.
$db = mysql_select_db($dbName);
mysql_query("set names utf8", $connect);
?>
