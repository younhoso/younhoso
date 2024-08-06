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
                <h3>현장소식</h3>
                <div class="board_nav">
                    <?php include APPPATH."views/$nation/desk/news/report/report_tab.php"; ?>
                </div>
            </div>
            <div class="m_ila_board">
                <ul class="lst_mov">
                    <?php
                        for($i = 0, $len = count($result) ; $i < $len ; $i++) {
                            $item = $result[$i];

                            ?><li>
                                <a href="<?php echo $viewpath; ?>&page=<?php echo $page; ?>&idx=<?php echo $item["am_no"]; ?>">
                                    <span class="thmb"><img src="/pds/afmove_img/<?php echo $item["am_image"]; ?>" width="269" height="172" alt=""></span>
                                    <span class="tit"><?php echo $item["am_title"]; ?></span>
                                    <span class="desc"><?php echo $item["am_content"]?></span>
                                </a>
                            </li><?php
                        }
                    ?>
                </ul>
                
                <?php include APPPATH."views/$nation/desk/include/pagination.php"; ?>
            </div>
        </div>
    </div>
</div>