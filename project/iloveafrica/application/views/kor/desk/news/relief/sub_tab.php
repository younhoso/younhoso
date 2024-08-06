<?php
    switch($category) {
        case "1":
            $tab_title = "식수개발개선";
            break;
        case "2":
            $tab_title = "자활기술개발";
            break;
        case "3":
            $tab_title = "의료보건개선";
            break;
        case "4":
            $tab_title = "아동복지개선";
            break;
        case "5":
            $tab_title = "교육개발개선";
            break;
        case "6":
            $tab_title = "문화체육교류";
            break;
        case "7":
            $tab_title = "환경개발개선";
            break;
        default:
            $tab_title = "전체보기";
            break;
}
?>
<div class="m_left">
    <h3><?=$tab_title?></h3>
</div>