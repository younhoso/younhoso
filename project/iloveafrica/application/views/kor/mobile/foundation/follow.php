<div class="page_cont">
    <?php include APPPATH."views/$nation/mobile/foundation/sub_tab.php"; ?>
    <div class="sub_cont">
        <div class="head"><h2>설립자 발자취</h2></div>
    </div>
    <div class="lst_head">
        <div class="tot">Total <?=$totalCount?></div>
    </div>
    <div class="sub_cont c_gap">
        <div id="follow-list">
            <input type="text" class="page_num" value="1" hidden>
            <input type="text" class="page_total" value="<?=$totalCount?>" hidden>
            <?php include APPPATH."views/$nation/mobile/include/follow_listview.php"; ?>
        </div>
        <!-- <div class="page_more">
            <button id="lst_more_btn"><?=$limit?>개 더보기</button>
        </div> -->
    </div>
</div>

<script>
$(document).ready(function(){
	$('#lst_more_btn').on('click', function(){
        const curPage = $('#follow-list .page_num').val();
        const nextPage = Number(curPage) + 1;

        $.ajax({url: `http://www.iloveafrica.or.kr/index.php/foundation/follow?page=${nextPage}`, success: function(result){
            if(result) {
                $('#follow-list').append(result);
                $('#follow-list .page_num').val(nextPage);
            }
        }});
    });
});
</script>