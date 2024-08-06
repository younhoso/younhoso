<?php $ruri = $_SERVER["REQUEST_URI"]; ?>
<div class="tab_d3 stab">
    <ul>
        <li <?php if(strpos($ruri, "media")) { ?>class="on"<?php } ?>><a href="/index.php/news/media">ILA보도자료</a></li>
        <li <?php if(strpos($ruri, "iluvafrica")) { ?>class="on"<?php } ?>><a href="/index.php/news/iluvafrica">이창옥의 아이러브아프리카</a></li>
    </ul>
</div>