<div id="header">
    <div class="header_top">
        <div class="header_top_in">
            <h1 class="logo_header"><a href="/"><img src="/assets/images/desk/logo_header.png" alt="NGO I LOVE AFRICA"></a></h1>
            <div class="link" style="right:0px;">
                <a href="<?php echo SUPPORT_REGULAR_URL; ?>" target="<?php echo SUPPORT_REGULAR_TARGET; ?>">후원 및 회원가입</a>
                <span class="bar">|</span>
                <a href="<? echo SUPPORT_MY; ?>" target="<? echo SUPPORT_MY_TARGET; ?>">나의 후원정보</a>
            </div>
            <?/*
            <div class="global">
                <a href="/index.php/eng">ENGLISH</a>
            </div>
            */?>
        </div>
    </div>
    <div class="header_gnb">
        <div class="header_gnb_in">
            <ul class="nav" id="nav">
                <li class="t1">
                    <a href="/index.php/<?= $nationlink ?>foundation/about" class="d1"><span class="s">최초의 아프리카 전문 NGO</span>아이러브아프리카</a>
                    <ul class="nav_sub">
                    <li><a href="/index.php/<?= $nationlink ?>foundation/about">ILA는?</a></li>
                        <li><a href="/index.php/<?= $nationlink ?>foundation/history">연혁 비전</a></li>
                        <li><a href="/index.php/<?= $nationlink ?>foundation/vision">핵심가치</a></li>
                        <li><a href="/index.php/<?= $nationlink ?>foundation/greetings">인사말</a></li>
                        <li><a href="/index.php/<?= $nationlink ?>foundation/way">찾아오시는 길</a></li>
                    </ul>
                </li>
                <li class="t2">
                    <a href="/index.php/<?= $nationlink ?>business" class="d1">사업소개</a>
                    <ul class="nav_sub">
                        <li><a href="/index.php/<?= $nationlink ?>business/water">식수개발개선</a></li>
                        <li><a href="/index.php/<?= $nationlink ?>business/selfhelp">자활기술개발</a></li>
                        <li><a href="/index.php/<?= $nationlink ?>business/medical">의료보건개선</a></li>
                        <li><a href="/index.php/<?= $nationlink ?>business/child">아동복지개선</a></li>
                        <li><a href="/index.php/<?= $nationlink ?>business/education">교육개발개선</a></li>
                        <li><a href="/index.php/<?= $nationlink ?>business/culture">문화체육교류</a></li>
                        <li><a href="/index.php/<?= $nationlink ?>business/environment">환경개발개선</a></li>
                    </ul>
                </li>
                <li class="t3">
                    <a href="/index.php/<?= $nationlink ?>news/report" class="d1">ILA소식</a>
                    <ul class="nav_sub">
                        <li><a href="/index.php/<?= $nationlink ?>news/report">현장소식</a></li>
                        <li><a href="/index.php/<?= $nationlink ?>news/media">언론보도</a></li>
                        <li><a href="/index.php/<?= $nationlink ?>news/notice">공지사항</a></li>
                        <li><a href="/index.php/<?= $nationlink ?>news/download">특별자료실</a></li>
                    </ul>
                </li>
                <li class="t4">
                    <a href="/index.php/news/relief" class="d1">구호활동보기</a>
                    <ul class="nav_sub">
                        <li><a href="/index.php/news/relief">전체보기</a></li>
                        <li><a href="/index.php/news/relief?category=1">식수개발개선</a></li>
                        <li><a href="/index.php/news/relief?category=2">자활기술개발</a></li>
                        <li><a href="/index.php/news/relief?category=3">의료보건개선</a></li>
                        <li><a href="/index.php/news/relief?category=4">아동복지개선</a></li>
                        <li><a href="/index.php/news/relief?category=5">교육개발개선</a></li>
                        <li><a href="/index.php/news/relief?category=6">문화체육교류</a></li>
                        <li><a href="/index.php/news/relief?category=7">환경개발개선</a></li>
                    </ul>
                </li>
                <li class="t5">
                    <a href="/index.php/<?= $nationlink ?>support/regular" class="d1">후원하기</a>
                    <ul class="nav_sub">
                        <li><a href="/index.php/<?= $nationlink ?>support/regular">정기후원</a></li>
                        <li><a href="/index.php/<?= $nationlink ?>support/onece">일시후원</a></li>
                        <li><a href="/index.php/<?= $nationlink ?>support/special">기념일기부</a></li>
                        <li><a href="/index.php/<?= $nationlink ?>support/legacy">유산기부</a></li>
                        <li><a href="/index.php/<?= $nationlink ?>support/group">단체기부</a></li>
                        <li><a href="/index.php/<?= $nationlink ?>support/enterprise_intro">기관&기업후원</a></li>
                    </ul>
                </li>
            </ul>
            
            <div class="sns_area">
                <?php include APPPATH."views/$nation/desk/common/v2/_default_social.php"; ?>
            </div>

            <div class="sponsor_area">
                <a href="<? echo SUPPORT_REGULAR_URL; ?>" target="<? echo SUPPORT_REGULAR_TARGET; ?>" class="btn_regular">정기후원</a>
                <a href="<? echo SUPPORT_ONECE_URL; ?>" target="<? echo SUPPORT_ONECE_TARGET; ?>" class="btn_temporary">일시후원</a>
            </div>
        </div>
    </div>
</div>