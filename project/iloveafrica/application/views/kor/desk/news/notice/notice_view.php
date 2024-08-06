<style>
.view_cont img {
    width:100% !important;
    height:auto !important;
}
</style>
<div id="container">
    <div class="sub_tit">
        <h1>아이러브아프리카<span>(ILA)</span><strong>・ILA소식</strong></h1>
    </div>
    <div class="sub_cont">
        <div class="h_desc">
            아이러브아프리카는 아프리카 대륙을 전문으로 돕는 <br>
            <strong>아프리카전문국제구호개발 비정부기구</strong><br>
            <strong>(NGO, Non Governmental Organization)</strong>입니다.
        </div>
        <?php include APPPATH."views/$nation/desk/news/sub_tab.php"; ?>
        <div class="sub_cont_s">
            <div class="m_left">
                <h3>공지사항</h3>
            </div>
            <div class="m_ila_board">
                <div class="view_tit"><?php echo $result->b_title ?></div>
                <div class="view_write">
                    <div class="w"><strong>· 작성자</strong><span class="bar">|</span><?php echo $result->b_name ?></div>
                    <div class="w"><strong>· 작성일</strong><span class="bar">|</span><?php echo $result->regist_date ?></div>
                    <div class="w"><strong>· 조회수</strong><span class="bar">|</span><?php echo $result->b_cnt ?></div>
                </div>
                <div class="view_cont">
                    <!--
                    <iframe width="560" height="315" src="./board_detail_files/RJ1Tfh96JAU.html" frameborder="0" allowfullscreen=""></iframe>
                    <p>아프리카 (탄자니아)를 돕기위하여 국내 스타 70여명이 한자리에 모여서 함께 부른 노래</p>
                    -->
                    <?php
                        $cont = $result->b_content;
                        $cont = str_replace("&amp;", "&", $cont);
                        $cont = str_replace("&nbsp;", " ", $cont);
                        $cont = str_replace("&lt;", "<", $cont);
                        $cont = str_replace("&gt;", ">", $cont);
                        $cont = str_replace("&quot;", "\"", $cont);
                        
                    
                        echo $cont;
                    ?>
                </div>
                <div class="view_page">
                    <div class="link"><strong>· 이전글</strong><span class="bar">|</span><?php
                        $item = $pre_content;
                        if( $item != null ) {
                            ?><a href="/index.php/news/noticedetail?idx=<?php echo $item["b_no"]?>&page=<?php echo $page ?>"><?php echo $item["b_title"]?></a><?php 
                        } else { 
                            ?>이전글이 없습니다<?php 
                        }
                    ?></div>
                    <div class="link"><strong>· 다음글</strong><span class="bar">|</span><?php
                        $item = $next_content;
                        if( $item != null ) {
                            ?><a href="/index.php/news/noticedetail?idx=<?php echo $item["b_no"]?>&page=<?php echo $page ?>"><?php echo $item["b_title"]?></a><?php 
                        } else { 
                            ?>다음글이 없습니다<?php 
                        }
                    ?></div>
                </div>
                <div class="view_btn">
                    <a href="/index.php/news/notice?page=<?php 
                        if( $result->b_notice == 1 ) {
                            echo $listPage;
                        } else {
                            echo "1";
                        }
                    ?>">목록으로 &gt;</a>
                </div>
            </div>
        </div>
    </div>
</div>

<div>

<br />
<br />

</div>
