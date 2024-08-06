<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/*
|--------------------------------------------------------------------------
| File and Directory Modes
|--------------------------------------------------------------------------
|
| These prefs are used when checking and setting modes when working
| with the file system.  The defaults are fine on servers with proper
| security, but you may wish (or even need) to change the values in
| certain environments (Apache running a separate process for each
| user, PHP under CGI with Apache suEXEC, etc.).  Octal values should
| always be used to set the mode correctly.
|
*/
define('FILE_READ_MODE', 0644);
define('FILE_WRITE_MODE', 0666);
define('DIR_READ_MODE', 0755);
define('DIR_WRITE_MODE', 0777);

/*
|--------------------------------------------------------------------------
| File Stream Modes
|--------------------------------------------------------------------------
|
| These modes are used when working with fopen()/popen()
|
*/

define('FOPEN_READ',							'rb');
define('FOPEN_READ_WRITE',						'r+b');
define('FOPEN_WRITE_CREATE_DESTRUCTIVE',		'wb'); // truncates existing file data, use with care
define('FOPEN_READ_WRITE_CREATE_DESTRUCTIVE',	'w+b'); // truncates existing file data, use with care
define('FOPEN_WRITE_CREATE',					'ab');
define('FOPEN_READ_WRITE_CREATE',				'a+b');
define('FOPEN_WRITE_CREATE_STRICT',				'xb');
define('FOPEN_READ_WRITE_CREATE_STRICT',		'x+b');

// 후원 페이지 멤버코드
define("MRMWEB_KEY",                            "E+/byfTanGgtVEhsDgYi8w==");

// 정기후원
define("SUPPORT_REGULAR_URL",                   "https://mrmweb.hsit.co.kr/v2/default.aspx?Server=E%2B/byfTanGgtVEhsDgYi8w==&action=join");
define("SUPPORT_REGULAR_TARGET",                "_blank");

// 일시후원
define("SUPPORT_ONECE_URL",                     "https://mrmweb.hsit.co.kr/v2/default.aspx?Server=E%2B/byfTanGgtVEhsDgYi8w==&action=once2");
define("SUPPORT_ONECE_TARGET",                  "_blank");

// 일시후원
define("SUPPORT_ONCE",                          "");
define("SUPPORT_ONCE_TARGET",                   "_blank");

// 나의 후원정보
define("SUPPORT_MY",                            "https://mrmweb.hsit.co.kr/v2/default.aspx?Server=E%2B/byfTanGgtVEhsDgYi8w==&action=info");
define("SUPPORT_MY_TARGET",                     "_blank");

// 식수사업 후원
define("SUPPORT_WATER_URL",                     "https://mrmweb.hsit.co.kr/v2/default.aspx?Server=E+/byfTanGgtVEhsDgYi8w==&action=join&supporttype=3");
define("SUPPORT_WATER_TARGET",                  "_blank");

// 자활 후원
define("SUPPORT_SELFHELP_URL",                  "https://mrmweb.hsit.co.kr/v2/default.aspx?Server=E+/byfTanGgtVEhsDgYi8w==&action=join&supporttype=8");
define("SUPPORT_SELFHELP_TARGET",               "_blank");

// 의료후원
define("SUPPORT_MEDICAL_URL",                   "https://mrmweb.hsit.co.kr/v2/default.aspx?Server=E+/byfTanGgtVEhsDgYi8w==&action=join&supporttype=6");
define("SUPPORT_MEDICAL_TARGET",                "_blank");

// 아동후원
define("SUPPORT_CHILD_URL",                     "https://mrmweb.hsit.co.kr/v2/default.aspx?Server=E+/byfTanGgtVEhsDgYi8w==&action=join&supporttype=9");
define("SUPPORT_CHILD_TARGET",                  "_blank");

// 교육후원
define("SUPPORT_EDUCATION_URL",                 "https://mrmweb.hsit.co.kr/v2/default.aspx?Server=E+/byfTanGgtVEhsDgYi8w==&action=join&supporttype=5");
define("SUPPORT_EDUCATION_TARGET",              "_blank");

// 문화후원
define("SUPPORT_CULTURE_URL",                   "https://mrmweb.hsit.co.kr/v2/default.aspx?Server=E+/byfTanGgtVEhsDgYi8w==&action=join&supporttype=24");
define("SUPPORT_CULTURE_TARGET",                "_blank");

// 환경후원
define("SUPPORT_ENV_URL",                       "https://mrmweb.hsit.co.kr/v2/default.aspx?Server=E+/byfTanGgtVEhsDgYi8w==&action=join&supporttype=4");
define("SUPPORT_ENV_TARGET",                    "_blank");

// 기념일 기부
define("SUPPORT_SPECIAL_URL",                   "https://mrmweb.hsit.co.kr/v2/default.aspx?Server=E+/byfTanGgtVEhsDgYi8w==&action=join&supporttype=20");
define("SUPPORT_SPECIAL_TARGET",                "_blank");

// 유산기부
define("SUPPORT_LEGACY_URL",                    "https://db.blueweb.co.kr/formmail/formmail.html?dataname=iloveafrica0");
define("SUPPORT_LEGACY_TARGET",                 "_blank");

// 단체기부
define("SUPPORT_GROUP_URL",                     "https://db.blueweb.co.kr/formmail/formmail.html?dataname=iloveafrica0");
define("SUPPORT_GROUP_TARGET",                  "_blank");

// 기업후원
define("SUPPORT_ENTERPRISE_URL",                "https://db.blueweb.co.kr/formmail/formmail.html?dataname=iloveafrica0");
define("SUPPORT_ENTERPRISE_TARGET",             "_blank");

define("MAIN_BOARD_COUNT", 9);

define("MAIN_LINK_WATER", "/index.php/news/reliefview?category=1&idx=110");
define("MAIN_LINK_SELF", "/index.php/news/reliefview?category=2&idx=116");
define("MAIN_LINK_MEDICAL", "/index.php/news/reliefview?category=3&idx=107");
define("MAIN_LINK_CHILD", "/index.php/news/reliefview?category=4&idx=117");
/* End of file constants.php */
/* Location: ./application/config/constants.php */