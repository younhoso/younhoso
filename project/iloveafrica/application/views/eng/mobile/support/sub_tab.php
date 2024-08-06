<?php $uri = $_SERVER["REQUEST_URI"]; ?>
<div class="tab_d2">
    <ul id="t2">
        <li <?php if(strpos($uri, "regular")) { ?>class="on"<?php } ?>><a href="/index.php/<?= $nationlink ?>support/regular">정기후원</a></li>
        <li <?php if(strpos($uri, "onece")) {?>class="on"<?php } ?>><a href="/index.php/<?= $nationlink ?>support/onece">일시후원</a></li>
        <li <?php if(strpos($uri, "special")) {?>class="on"<?php } ?>><a href="/index.php/<?= $nationlink ?>support/special">기념일기부</a></li>
        <li <?php if(strpos($uri, "legacy")) {?>class="on"<?php } ?>><a href="/index.php/<?= $nationlink ?>support/legacy">유산기부</a></li>
        <li <?php if(strpos($uri, "group")) {?>class="on"<?php } ?>><a href="/index.php/<?= $nationlink ?>support/group">단체기부</a></li>
        <li <?php if(strpos($uri, "enterprise")) {?>class="on"<?php } ?>><a href="/index.php/<?= $nationlink ?>support/enterprise_intro">기업후원</a></li>
    </ul>
</div>