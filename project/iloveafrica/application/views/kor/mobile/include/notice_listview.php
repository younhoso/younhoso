<? 
    if( count($result) > 0 ) {
        for($i = 0, $len = count($result) ; $i < $len ; $i++) {
            $item = $result[$i];
?>
    <div class="lst_linecard">
        <div class="cont">
            <div class="tit">
                <a href="<?php echo $viewpath; ?>&page=<?php echo $page; ?>&idx=<?php echo $item["b_no"]; ?>"><?= $item["b_title"] ?></a>
            </div>
            <span class="desc"><?
                $cont = $item["b_content"];
                $cont = strip_tags(html_entity_decode($cont));
                $cont = str_replace("&nbsp;", " ", $cont);
                echo $cont;
            ?></span>
            <!-- <span class="desc">
                Date : <?=$item["regist_date"]?>&nbsp;&nbsp;|&nbsp;&nbsp;View : <?=$item["b_cnt"]?>
            </span> -->
        </div>
    </div>
<?
        }
    } 
?>