<?php
    $uri = $_SERVER["REQUEST_URI"];
?>
<div class="link">
    <a href="/index.php/<?= $nationlink ?>support/enterprise_intro#subCont" <?php if(strpos($uri, "intro")) { ?>class="on"<?php } ?>>사업후원 소개</a>
    <a href="/index.php/<?= $nationlink ?>support/enterprise_sponsor#subCont" <?php if(strpos($uri, "sponsor")) { ?>class="on"<?php } ?>>사업후원하기</a>
    <a href="/index.php/<?= $nationlink ?>support/enterprise_active#subCont" <?php if(strpos($uri, "active")) { ?>class="on"<?php } ?>>활동보기</a>
</div>