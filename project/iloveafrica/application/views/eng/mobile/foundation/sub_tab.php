<?php $uri = $_SERVER["REQUEST_URI"]; ?>
<div class="tab_d2">
    <ul id="t2">
        <li <?php if(strpos($uri, "about")) { ?>class="on"<?php } ?>><a href="/index.php/foundation/about">ILA는?</a></li>
        <li <?php if(strpos($uri, "history")) { ?>class="on"<?php } ?>><a href="/index.php/foundation/history">연혁</a></li>
        <li <?php if(strpos($uri, "vision")) { ?>class="on"<?php } ?>><a href="/index.php/foundation/vision">비전 · 핵심가치</a></li>
        <li <?php if(strpos($uri, "greetings") || strpos($uri, "follow")) { ?>class="on"<?php } ?>><a href="/index.php/foundation/greetings">인사말</a></li>
        <li <?php if(strpos($uri, "way")) { ?>class="on"<?php } ?>><a href="/index.php/foundation/way">찾아오시는 길</a></li>
    </ul>
</div>