<?php $ruri = $_SERVER["REQUEST_URI"]; ?>
<div class="tab_d3 stab">
    <ul>
        <li <?php if(strpos($ruri, "report")) { ?>class="on"<?php } ?>><a href="/index.php/news/report">사업현지영상</a></li>
        <li <?php if(strpos($ruri, "campaign")) { ?>class="on"<?php } ?>><a href="/index.php/news/campaign">사업별캠페인영상</a></li>
        <li <?php if(strpos($ruri, "videos")) { ?>class="on"<?php } ?>><a href="/index.php/news/videos">모두모아영상</a></li>
    </ul>
</div>