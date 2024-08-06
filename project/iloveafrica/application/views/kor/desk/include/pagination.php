<div class="pagenate">
<?php
    $tu = $_SERVER["REQUEST_URI"];
    $tup = explode("?", $tu);
    //$pageUrl = $tup[0];
    $pageUrl = $listpath;

    // 처음으로
    if( $startPage != 1 ) {
        ?><a href="<?php echo $pageUrl; ?>" class="prev2"><span class="blind">처음으로</span></a><?php
    } else {
        ?><a class="prev2"><span class="blind">처음으로</span></a><?php
    }


    // 이전페이지
    if( $startPage > 1 ) {
        ?><a href="<?php echo $pageUrl; ?>&page=<?php echo ($startPage - 1); ?>" class="prev"><span class="blind">이전</span></a><?php
    } else {
        ?><a class="prev"><span class="blind">이전</span></a><?php
    }

    if( $totalPage > 0 ) {
        for($i = $startPage ; $i <= $endPage ; $i++) {
            if( $i == $page ) {
                ?><strong title="현재 페이지"><?php echo $i; ?></strong><?php
            } else {
                ?><a href="<?php echo $pageUrl."&page=".$i ?>"><?php echo $i; ?></a><?php
            }
        }
    } else {
        ?><strong title="현재 페이지">1</strong><?php
    }

    // 다음페이지
    if( ($endPage + 1) < $totalPage ) {
        ?><a href="<?php echo $pageUrl."&page=".($endPage + 1) ?>" class="next"><span class="blind">다음</span></a><?php
    } else {
        ?><a class="next"><span class="blind">다음</span></a><?php
    }
        
    // 끝으로
    if( $endPage != $totalPage ) {
        ?><a href="<?php echo $pageUrl."&page=".$totalPage ?>" class="next2"><span class="blind">끝으로</span></a><?php
    } else {
        ?><a class="next2"><span class="blind">끝으로</span></a><?php
    }
?>
</div>