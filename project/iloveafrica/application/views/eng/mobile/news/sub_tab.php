<?php 
    $uri = $_SERVER["REQUEST_URI"]; 
    function subMenuCheck($u, $list) {
        $checked = false;
        for($i = 0, $len = count($list) ; $i < $len ; $i++) {
            $m = $list[$i];
            if( strpos($u, $m) ) {
                $checked = true;
                break;
            }
        }
        return $checked;
    }
?>
<div class="tab_d2">
    <ul id="t2">
        <li <?php if(subMenuCheck($uri, array("relief", "reliefview"))) { ?>class="on"<?php } ?>><a href="/index.php/<?= $nationlink ?>news/relief">구호활동보기</a></li>
        <li <?php if(subMenuCheck($uri, array("report", "campaign", "videos"))) { ?>class="on"<?php } ?>><a href="/index.php/<?= $nationlink ?>news/report">현장소식</a></li>
        <li <?php if(subMenuCheck($uri, array("media", "iluvafrica"))) { ?>class="on"<?php } ?>><a href="/index.php/<?= $nationlink ?>news/media">언론보도</a></li>
        <li <?php if(subMenuCheck($uri, array("notice"))) { ?>class="on"<?php } ?>><a href="/index.php/<?= $nationlink ?>news/notice">공지사항</a></li>
        <li <?php if(subMenuCheck($uri, array("download"))) { ?>class="on"<?php } ?>><a href="/index.php/<?= $nationlink ?>news/download">자료실</a></li>
    </ul>
</div>