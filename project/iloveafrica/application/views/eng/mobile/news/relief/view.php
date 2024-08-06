<?php include APPPATH."views/$nation/mobile/news/sub_tab.php"; ?>
<?php include APPPATH."views/$nation/mobile/news/relief/sub_tab.php"; ?>
<div class="sub_cont_c">
    <div class="sub_title">구호활동보기</div>
    <div class="m_ila_board">
        <div class="view_tit"><?php echo $result->am_title; ?></div>
        <div class="view_cont">
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