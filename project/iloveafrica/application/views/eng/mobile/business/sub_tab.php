<?php $uri = $_SERVER["REQUEST_URI"]; ?>
<div class="tab_d2">
    <ul id="t2">
        <li <?php if(strpos($uri, "water")) { ?>class="on"<?php } ?>><a href="/index.php/business/water">식수개발개선</a></li>
        <li <?php if(strpos($uri, "selfhelp")) { ?>class="on"<?php } ?>><a href="/index.php/business/selfhelp">자활기술개발</a></li>
        <li <?php if(strpos($uri, "medical")) { ?>class="on"<?php } ?>><a href="/index.php/business/medical">의료보건개선</a></li>
        <li <?php if(strpos($uri, "child")) { ?>class="on"<?php } ?>><a href="/index.php/business/child">아동복지개선</a></li>
        <li <?php if(strpos($uri, "education")) { ?>class="on"<?php } ?>><a href="/index.php/business/education">교육개발개선</a></li>
        <li <?php if(strpos($uri, "culture")) { ?>class="on"<?php } ?>><a href="/index.php/business/culture">문화체육교류</a></li>
        <li <?php if(strpos($uri, "environment")) { ?>class="on"<?php } ?>><a href="/index.php/business/environment">환경개발개선</a></li>
    </ul>
</div>