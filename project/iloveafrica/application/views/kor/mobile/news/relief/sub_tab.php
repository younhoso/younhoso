<?php 
    $title = "전체보기";
    switch($category) {
        case "1":
            $title = "식수개발개선";
            break;
        case "2":
            $title = "자활기술개발";
            break;
        case "3":
            $title = "의료보건개선";
            break;
        case "4":
            $title = "아동복지개선";
            break;
        case "5":
            $title = "교육개발개선";
            break;
        case "6":
            $title = "문화체육교류";
            break;
        case "7":
            $title = "환경개발개선";
            break;
        default:
            break;
    }
?>
<div class="tab_d2">
    <ul id="t2">
        <li class="<?= $category == '' ? 'on' : '' ?>"><a href="/index.php/<?= $nationlink ?>news/relief">전체보기</a></li>
        <li class="<?= $category == '1' ? 'on' : '' ?>"><a href="/index.php/<?= $nationlink ?>news/relief?category=1">식수개발개선</a></li>
        <li class="<?= $category == '2' ? 'on' : '' ?>"><a href="/index.php/<?= $nationlink ?>news/relief?category=2">자활기술개발</a></li>
        <li class="<?= $category == '3' ? 'on' : '' ?>"><a href="/index.php/<?= $nationlink ?>news/relief?category=3">의료보건개선</a></li>
        <li class="<?= $category == '4' ? 'on' : '' ?>"><a href="/index.php/<?= $nationlink ?>news/relief?category=4">아동복지개선</a></li>
        <li class="<?= $category == '5' ? 'on' : '' ?>"><a href="/index.php/<?= $nationlink ?>news/relief?category=5">교육개발개선</a></li>
        <li class="<?= $category == '6' ? 'on' : '' ?>"><a href="/index.php/<?= $nationlink ?>news/relief?category=6">문화체육교류</a></li>
        <li class="<?= $category == '7' ? 'on' : '' ?>"><a href="/index.php/<?= $nationlink ?>news/relief?category=7">환경개발개선</a></li>
    </ul>
</div>
