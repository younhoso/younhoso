<div class="page_cont">
    <div class="lst_card">
        <span class="thmb"><img src="/pds/relief/<?php echo $result->am_image; ?>" alt="" /></span>
        <div class="cont full">
            <?= $icon[$result->am_cate] ?>
            <div class="tit"><?= $result->am_title ?></div>
            <br>
            <?php echo $result->am_content; ?>
        </div>
    </div>
</div>