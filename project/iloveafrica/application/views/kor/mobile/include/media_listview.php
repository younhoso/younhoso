<? 
    $icon = array(
        "1" => "이창옥의 아이러브아프리카",
        "2" => "ILA 보도자료",
    );
    
    if( count($result) > 0 ) {
        for($i = 0, $len = count($result) ; $i < $len ; $i++) {
            $item = $result[$i];
            $cate = $item["am_cate"];
?>
    <div class="lst_card">
        <span class="thmb">
            <a href="<?php echo $viewpath; ?>&page=<?php echo $page; ?>&idx=<?php echo $item["aml_no"]; ?>" class="">
                <img src="/pds/afmovel_img/<?php echo $item["aml_image"]; ?>" alt="" />
            </a>
        </span>
        <div class="cont">
            <div class='lb mt<?=$cate?>'><?=$icon[$cate] ?></div>
            <div class="tit"><a href="<?php echo $viewpath; ?>&page=<?php echo $page; ?>&idx=<?php echo $item["aml_no"]; ?>"><?= $item["aml_title"] ?></a></div>
            <span class="desc"><?
                $cont = $item["aml_content"];
                $cont = str_replace("&nbsp;", " ", $cont);
                $cont = strip_tags(html_entity_decode($cont));
                echo $cont;
            ?></span>
            <!-- <span class="desc">
                Date : <?=$item["aml_regdate"]?>&nbsp;&nbsp;|&nbsp;&nbsp;View : <?=$item["aml_hit"]?>
            </span> -->
        </div>
    </div>
<?
        }
    } 
?>