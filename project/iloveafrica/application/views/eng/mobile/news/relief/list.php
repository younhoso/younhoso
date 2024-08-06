<?php include APPPATH."views/$nation/mobile/news/sub_tab.php"; ?>
<?php include APPPATH."views/$nation/mobile/news/relief/sub_tab.php"; ?>
<div class="sub_cont_c">
    <div class="m_ila_board">
        <ul class="lst_relief">
        <? 
            if( count($result) > 0 ) {
                for($i = 0, $len = count($result) ; $i < $len ; $i++) {
                    $item = $result[$i];

                    ?><li>
                        <span class="thmb"><a href="<?= $viewpath ?>&idx=<?= $item["am_no"]?>"><img src="/pds/relief/<?php echo $item["am_image"]; ?>" alt="" /></a></span>
                        <div class="cont">
                            <?= $icon[$item["am_cate"]] ?>
                            <div class="tit"><a href="<?= $viewpath ?>&idx=<?= $item["am_no"]?>"><?= $item["am_title"] ?></a></div>
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
                    </li><?
                }
            } else {
                ?><li style="text-align:center;min-height:180px;padding-top:150px;">
                    등록 된 구호활동이 없습니다
                </li><?
            }
        ?>
        </ul>

        <div class="pagenate">
            <?php  include APPPATH."views/$nation/mobile/include/pagination.php"; ?>
        </div>
    </div>


</div>