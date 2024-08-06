<?php
    $uri = $_SERVER["REQUEST_URI"];
?>
<div style="position:relative">
<div id="subCont" style="position:absolute;top:-180px;"></div>
</div>
<div class="tab">
    <ul>
        <li <?php if(strpos($uri, "regular")) { ?>class="active"<?php } ?>><a href="/index.php/<?= $nationlink ?>support/regular">정기후원</a></li>
        <li <?php if(strpos($uri, "onece")) {?>class="active"<?php } ?>><a href="/index.php/<?= $nationlink ?>support/onece">일시후원</a></li>
        <li <?php if(strpos($uri, "special")) {?>class="active"<?php } ?>><a href="/index.php/<?= $nationlink ?>support/special">기념일기부</a></li>
        <li <?php if(strpos($uri, "legacy")) {?>class="active"<?php } ?>><a href="/index.php/<?= $nationlink ?>support/legacy">유산기부</a></li>
        <li <?php if(strpos($uri, "group")) {?>class="active"<?php } ?>><a href="/index.php/<?= $nationlink ?>support/group">단체기부</a></li>
        <li <?php if(strpos($uri, "enterprise")) {?>class="active"<?php } ?>><a href="/index.php/<?= $nationlink ?>support/enterprise_intro">기관&기업후원</a></li>
    </ul>
</div>