<?php $uri = $_SERVER["REQUEST_URI"]; ?>
<div class="tab">
    <ul>
        <li <?php if(strpos($uri, "water")) { ?>class="active"<?php } ?>><a href="/index.php/<?= $nationlink ?>business/water">식수개발개선</a></li>
        <li <?php if(strpos($uri, "selfhelp")) { ?>class="active"<?php } ?>><a href="/index.php/<?= $nationlink ?>business/selfhelp">자활기술개발</a></li>
        <li <?php if(strpos($uri, "medical")) { ?>class="active"<?php } ?>><a href="/index.php/<?= $nationlink ?>business/medical">의료보건개선</a></li>
        <li <?php if(strpos($uri, "child")) { ?>class="active"<?php } ?>><a href="/index.php/<?= $nationlink ?>business/child">아동복지개선</a></li>
        <li <?php if(strpos($uri, "education")) { ?>class="active"<?php } ?>><a href="/index.php/<?= $nationlink ?>business/education">교육개발개선</a></li>
        <li <?php if(strpos($uri, "culture")) { ?>class="active"<?php } ?>><a href="/index.php/<?= $nationlink ?>business/culture">문화체육교류</a></li>
        <li <?php if(strpos($uri, "environment")) { ?>class="active"<?php } ?>><a href="/index.php/<?= $nationlink ?>business/environment">환경개발개선</a></li>
    </ul>
</div>