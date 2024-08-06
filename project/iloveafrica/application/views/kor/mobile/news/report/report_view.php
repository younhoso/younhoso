<?php
    $icon = array(
        "2" => "두루두루 모두 모아 영상",
        "3" => "아프리카 사업 현지 영상",
        "4" => "사업별 캠페인 영상",
    );
    $category = $result->am_cate;
?>
<div class="page_cont">
    <div class="lst_card">
        <div class="video"><?php echo $result->am_move; ?></div>
        <div class="cont full">
            <div class='lb rt<?=$category?>'><?=$icon[$category] ?></div>
            <div class="tit"><?= $result->am_title ?></div>
            <div class="mt12">
                <p><? echo strip_tags($result->am_content); ?></p>
            </div> 
        </div>
    </div>
    <br><br>
</div>
