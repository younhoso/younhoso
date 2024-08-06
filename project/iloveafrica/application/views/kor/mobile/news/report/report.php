
<div class="page_cont">
    <?php include APPPATH."views/$nation/mobile/news/sub_tab.php"; ?>
    <div class="sub_cont">
        <div class="head"><h2>현장소식</h2></div>
    </div>
    <?php include APPPATH."views/$nation/mobile/news/report/report_tab.php"; ?>
    <div id="report-list">
        <input type="text" class="page_num" value="1" hidden>
        <input type="text" class="page_total" value="<?=$totalPage?>" hidden>
        <? 
            if( count($result) > 0 ) {
                include APPPATH."views/$nation/mobile/include/report_listview.php";
            } else {
        ?>
            <div style="text-align:center;min-height:180px;padding-top:150px;">
                등록 된 현장소식이 없습니다.
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
        const curPage = $('#report-list .page_num').val();
        const totalPage = Number($('#report-list .page_total').val());
        const nextPage = Number(curPage) + 1;

        if(totalPage <= nextPage) {
            $(this).hide();
        }

        $.ajax({url: `<?=$listpath?>&page=${nextPage}`, success: function(result){
            if(result) {
                $('#report-list').append(result);
                $('#report-list .page_num').val(nextPage);
            }
        }});
    });
});
</script>
