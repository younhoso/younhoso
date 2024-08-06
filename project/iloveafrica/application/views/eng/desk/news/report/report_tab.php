<?php $ruri = $_SERVER["REQUEST_URI"]; ?>
<ul>
    <li <?php if(strpos($ruri, "report")) { ?>class="on"<?php } ?>><a href="/index.php/<?= $nationlink ?>news/report">아프리카사업현지영상</a></li>
    <li <?php if(strpos($ruri, "campaign")) { ?>class="on"<?php } ?>><a href="/index.php/<?= $nationlink ?>news/campaign">사업별캠페인영상</a></li>
    <li <?php if(strpos($ruri, "videos")) { ?>class="on"<?php } ?>><a href="/index.php/<?= $nationlink ?>news/videos">두루두루모두모아영상</a></li>
</ul>