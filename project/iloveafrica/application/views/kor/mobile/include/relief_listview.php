<? 
    for($i = 0, $len = count($result) ; $i < $len ; $i++) {
        $item = $result[$i];
?>
    <div class="lst_card">
        <span class="thmb"><a href="<?= $viewpath ?>&idx=<?= $item["am_no"]?>"><img src="/pds/relief/<?php echo $item["am_image"]; ?>" alt="" /></a></span>
        <div class="cont">
            <?= $icon[$item["am_cate"]] ?>
            <div class="tit"><a href="<?= $viewpath ?>&idx=<?= $item["am_no"]?>"><?= $item["am_title"] ?></a></div>
            <span class="desc"><?
                $cont = $item["am_content"];
                $cont = str_replace("&nbsp;", " ", $cont);
                $cont = strip_tags(html_entity_decode($cont));
                echo $cont;
            ?></span>
            <!-- <span class="desc">
                Date : <?=$item["am_regdate"]?>&nbsp;&nbsp;|&nbsp;&nbsp;View : <?=$item["am_hit"]?>
            </span> -->
        </div>
    </div>
<?
    }
?>