<? 
    $icon = array(
        "2" => "두루두루 모두 모아 영상",
        "3" => "아프리카 사업 현지 영상",
        "4" => "사업별 캠페인 영상",
    );

    for($i = 0, $len = count($result) ; $i < $len ; $i++) {
        $item = $result[$i];
        $cate = $item["am_cate"];
?>
    <div class="lst_card">
        <span class="thmb">
            <a href="<?php echo $viewpath; ?>&page=<?php echo $page; ?>&idx=<?php echo $item["am_no"]; ?>" class="">
                <img src="/pds/afmove_img/<?php echo $item["am_image"]; ?>" alt="" />
            </a>
        </span>
        <div class="cont">
            <div class='lb rt<?=$cate?>'><?=$icon[$cate] ?></div>
            <div class="tit"><a href="<?php echo $viewpath; ?>&page=<?php echo $page; ?>&idx=<?php echo $item["am_no"]; ?>"><?= $item["am_title"] ?></a></div>
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
