<?php $ruri = $_SERVER["REQUEST_URI"]; ?>
<div class="board_nav">
    <ul>
        <li <?php if(strpos($ruri, "media")) { ?>class="on"<?php } ?>><a href="/index.php/<?= $nationlink ?>news/media">ILA보도자료</a></li>
        <li <?php if(strpos($ruri, "iluvafrica")) { ?>class="on"<?php } ?>><a href="/index.php/<?= $nationlink ?>news/iluvafrica">이창옥의 아이러브아프리카</a></li>
    </ul>
</div>