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
				<h3>언론보도</h3>
                <?php include APPPATH."views/$nation/desk/news/media/media_tab.php"; ?>
			</div>
            <div class="m_ila_board">
                <div class="view_tit"><?php echo $result->aml_title ?></div>
                <div class="view_write">
                    <div class="w"><strong>· 작성자</strong><span class="bar">|</span>iloveafrica</div>
                    <div class="w"><strong>· 작성일</strong><span class="bar">|</span><?php echo $result->regist_date ?></div>
                    <div class="w"><strong>· 조회수</strong><span class="bar">|</span><?php echo $result->aml_hit ?></div>
                </div>
                <div class="view_cont">
                    <?php
                        echo $result->aml_move;
                        echo $result->aml_content; 
                    ?>
                </div>
                <div class="view_page">
                    <div class="link"><strong>· 이전글</strong><span class="bar">|</span><?php
                        $item = $pre_content;
                        if( $item != null ) {
                            ?><a href="<?php echo $viewpath; ?>&idx=<?php echo $item["IDX"]?>"><?php echo $item["TITLE"]?></a><?php 
                        } else { 
                            ?>이전글이 없습니다<?php 
                        }
                    ?></div>
                    <div class="link"><strong>· 다음글</strong><span class="bar">|</span><?php
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
    </div>
</div>

<div>

<br />
<br />

</div>
