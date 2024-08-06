
<div class="page_cont">
    <?php include APPPATH."views/$nation/mobile/news/sub_tab.php"; ?>
    <div class="sub_cont">
        <div class="head"><h2>언론보도</h2></div>
    </div>
    <?php include APPPATH."views/$nation/mobile/news/media/media_tab.php"; ?>
    <div id="media-list">
        <input type="text" class="page_num" value="1" hidden>
        <input type="text" class="page_total" value="<?=$totalPage?>" hidden>
        <? 
            if( count($result) > 0 ) {
                include APPPATH."views/$nation/mobile/include/media_listview.php";
            } else {
        ?>
            <div style="text-align:center;min-height:180px;padding-top:150px;">
                등록 된 언론보도가 없습니다.
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
        const curPage = $('#media-list .page_num').val();
        const totalPage = Number($('#media-list .page_total').val());
        const nextPage = Number(curPage) + 1;

        if(totalPage <= nextPage) {
            $(this).hide();
        }

        $.ajax({url: `<?=$listpath?>&page=${nextPage}`, success: function(result){
            if(result) {
                $('#media-list').append(result);
                $('#media-list .page_num').val(nextPage);
            }
        }});
    });
});
</script>
