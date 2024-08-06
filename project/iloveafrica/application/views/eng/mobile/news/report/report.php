
<?php include APPPATH."views/$nation/mobile/news/sub_tab.php"; ?>
<?php include APPPATH."views/$nation/mobile/news/report/report_tab.php"; ?>
<div class="sub_cont_c">
    <div class="sub_title">현장소식</div>
    <div class="m_ila_board">
        <ul class="lst_mov">
        <?php
            for($i = 0, $len = count($result) ; $i < $len ; $i++) {
                $item = $result[$i];

                ?><li>
                    <a href="<?php echo $viewpath; ?>&page=<?php echo $page; ?>&idx=<?php echo $item["am_no"]; ?>">
                        <span class="thmb"><img width="333px" height="188px" src="/pds/afmove_img/<?php echo $item["am_image"]; ?>" alt="" /></span>
                        <span class="tit"><?php echo $item["am_title"]; ?></span>
                        <span class="desc"><?php echo $item["am_content"]?></span>
                    </a>
                </li><?php
            }
        ?>
        </ul>
        
        <?php include APPPATH."views/$nation/mobile/include/pagination.php"; ?>
    </div>
    
</div>
