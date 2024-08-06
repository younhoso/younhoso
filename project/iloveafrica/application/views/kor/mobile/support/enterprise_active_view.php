<?php include APPPATH."views/$nation/mobile/support/sub_tab.php"; ?>

<div class="sub_cont_c">
    <div class="tab_d3">
        <ul id="t3">
            <li><a href="/index.php/support/enterprise_intro">후원소개</a></li>
            <li><a href="/index.php/support/enterprise_intro#ta2">후원방법</a></li>
            <li class='on'><a href="#ta3">활동보기</a></li>
        </ul>
    </div>
    <div class="m_ila_board">
        <div class="view_tit"><?php echo $result->am_title; ?></div>
        <div class="view_cont">
            <?/*
            <div class="mov_wrap">
                <?php echo $result->am_move; ?>
            </div>
            */?>
            <?php echo $result->am_move; ?>
            <?php echo $result->am_content; ?>
            
        </div>
        <div class="view_page">
            <div class="lst_link"><strong>&middot; 이전글</strong><span class="bar">|</span><?php
                $item = $pre_content;
                if( $item != null ) {
                    ?><a href="<?php echo $viewpath; ?>&idx=<?php echo $item["IDX"]?>"><?php echo $item["TITLE"]?></a><?php 
                } else { 
                    ?>이전글이 없습니다<?php 
                }
            ?></div>
            <div class="lst_link"><strong>&middot; 다음글</strong><span class="bar">|</span><?php
                $item = $next_content;
                if( $item != null ) {
                    ?><a href="<?php echo $viewpath; ?>&idx=<?php echo $item["IDX"]?>"><?php echo $item["TITLE"]?></a><?php 
                } else { 
                    ?>다음글이 없습니다<?php 
                }
            ?></div>
        </div>
        <div class="view_btn">
            <a href="<?php echo $listpath; ?>&page=<?php echo $listPage ?>">목록으로 &gt;</a>
        </div>
    </div>
    
</div>