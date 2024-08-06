<div id="container">
    <div class="sub_tit">
        <h1>아이러브아프리카<span>(ILA)</span><strong>・구호활동보기</strong></h1>
    </div>
    <div class="sub_cont">
        <div class="h_desc">
            아이러브아프리카는 아프리카 대륙을 전문으로 돕는 <br />
            <strong>아프리카전문국제구호개발 비정부기구</strong><br />
            <strong>(NGO, NON GOVERNMENTAL ORGANIZATION)</strong>입니다.
        </div>
        <?php include APPPATH."views/$nation/desk/news/sub_tab.php"; ?>
        <div class="sub_cont_s">
            <?php include APPPATH."views/$nation/desk/news/relief/sub_tab.php"; ?>
            <div class="m_ila_board">
                <ul class="lst_relief">
                    <? 
                        if( count($result) > 0 ) {
                            for($i = 0, $len = count($result) ; $i < $len ; $i++) {
                                $item = $result[$i];

                                ?><li>
                                    <a href="<?= $viewpath ?>&idx=<?= $item["am_no"]?>">
                                    <span class="thmb"><img src="/pds/relief/<?php echo $item["am_image"]; ?>" width="273" height="176" alt="" /></span>
                                    <div class="cont">
                                        <?= $icon[$item["am_cate"]] ?>
                                        <div class="tit"><?= $item["am_title"] ?></div>
                                        <span class="desc"><?
                                            $cont = $item["am_content"];

                                            /*
                                            $cont = str_replace("<p>", "", $cont);
                                            $cont = str_replace("</p>", "", $cont);
                                            $cont = str_replace("<br>", "", $cont);
                                            $cont = preg_replace("/<img[^>]+\>/i", "", $cont);
                                            */
                                            
                                            $cont = strip_tags($cont);
                                            echo $cont;
                                        ?></span>
                                    </div>
                                    </a>
                                </li><?
                            }
                        } else {
                            ?><li style="text-align:center;min-height:180px;padding-top:150px;">
                                등록 된 구호활동이 없습니다
                            </li><?
                        }
                    ?>

                </ul>
                
                <?php include APPPATH."views/$nation/desk/include/pagination.php"; ?>
            </div>
        </div>
    </div>
</div>