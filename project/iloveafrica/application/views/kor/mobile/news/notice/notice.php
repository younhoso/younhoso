<div class="page_cont">
    <?php include APPPATH."views/$nation/mobile/news/sub_tab.php"; ?>
    <div class="sub_cont">
        <div class="head"><h2>공지사항</h2></div>
    </div>
    <div class="lst_head">
        <p>Total <?=$totalCount?></p>
    </div>
    <div id="notice-list" class="sub_cont pt12">
        <input type="text" class="page_num" value="1" hidden>
        <input type="text" class="page_total" value="<?=$totalPage?>" hidden>
        <? 
            if( count($result) > 0 ) {
                include APPPATH."views/$nation/mobile/include/notice_listview.php";
            } else {
        ?>
            <div style="text-align:center;min-height:180px;padding-top:150px;">
                등록 된 공지사항이 없습니다.
            </div>
        <?
            }
        ?>

        
    </div>
    <? if($totalPage > $page){ ?>
        <div class="page_more">
            <button id="lst_more_btn">더보기</button>
        </div>
    <? } ?>
</div>

<script>
$(document).ready(function(){
    $('#lst_more_btn').on('click', function(){
        const curPage = $('#notice-list .page_num').val();
        const totalPage = Number($('#notice-list .page_total').val());
        const nextPage = Number(curPage) + 1;

        if(totalPage <= nextPage) {
            $(this).hide();
        }

        $.ajax({url: `<?=$listpath?>&page=${nextPage}`, success: function(result){
            if(result) {
                $('#notice-list').append(result);
                $('#notice-list .page_num').val(nextPage);
            }
        }});
    });
});
</script>