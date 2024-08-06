<?php
    $icon = array(
        "1" => "이창옥의 아이러브아프리카",
        "2" => "ILA 보도자료",
    );
    $category = $result->am_cate;
?>
<div class="page_cont">
    <div class="lst_card">
        <div class="video"><?php echo $result->aml_move; ?></div>
        <div class="cont full">
            <div class='lb mt<?=$category?>'><?=$icon[$category] ?></div>
            <div class="tit"><?= $result->aml_title ?></div>
            <div class="mt12"><? echo $result->aml_content ?></div> 
        </div>
    </div>
    <br><br>
</div>
