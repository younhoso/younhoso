<?php
    $uri = $_SERVER["REQUEST_URI"];
?>
<div class="tab" id="subCont">
    <ul>
        <li <?php if(strpos($uri, "about")) { ?>class="active"<?php } ?>><a href="/index.php/<?= $nationlink ?>foundation/about">ILA는?</a></li>
        <li <?php if(strpos($uri, "history")) { ?>class="active"<?php } ?>><a href="/index.php/<?= $nationlink ?>foundation/history">연혁</a></li>
        <li <?php if(strpos($uri, "vision")) { ?>class="active"<?php } ?>><a href="/index.php/<?= $nationlink ?>foundation/vision">비전 · 핵심가치</a></li>
        <li <?php if(strpos($uri, "greetings") || strpos($uri, "follow")) { ?>class="active"<?php } ?>><a href="/index.php/<?= $nationlink ?>foundation/greetings">인사말</a></li>
        <li <?php if(strpos($uri, "way")) { ?>class="active"<?php } ?>><a href="/index.php/<?= $nationlink ?>foundation/way">찾아오시는 길</a></li>
    </ul>
</div>