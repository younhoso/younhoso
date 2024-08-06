<div class="page_cont">
    <?php include APPPATH."views/$nation/mobile/news/relief/sub_tab.php"; ?>
    <div class="sub_cont">
        <div class="head"><h2><?=$title?></h2></div>
    </div>
    <div class="lst_head border-none">
        <p>Total <?=$totalCount?></p>
    </div>
    <div id="relief-list">
        <input type="text" class="page_num" value="1" hidden>
        <input type="text" class="page_total" value="<?=$totalPage?>" hidden>
        <? 
            if( count($result) > 0 ) {
                include APPPATH."views/$nation/mobile/include/relief_listview.php";
            } else {
        ?>
            <div style="text-align:center;min-height:180px;padding-top:150px;">
                등록 된 구호활동이 없습니다
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
    <div class="insta_gallery">
        <h5 class="tit">ILA'S INSTAGRAM</h5>
        <div class="slide_cont">
            <ul class="insta_slider">
                <li><img src="/assets/images/mobile/instagram/insta_1.jpg" alt=""></li>
                <li><img src="/assets/images/mobile/instagram/insta_2.jpg" alt=""></li>
                <li><img src="/assets/images/mobile/instagram/insta_3.jpg" alt=""></li>
                <li><img src="/assets/images/mobile/instagram/insta_4.jpg" alt=""></li>
                <li><img src="/assets/images/mobile/instagram/insta_5.jpg" alt=""></li>
                <li><img src="/assets/images/mobile/instagram/insta_6.jpg" alt=""></li>
                <li><img src="/assets/images/mobile/instagram/insta_7.jpg" alt=""></li>
                <li><img src="/assets/images/mobile/instagram/insta_8.jpg" alt=""></li>
                <li><img src="/assets/images/mobile/instagram/insta_9.jpg" alt=""></li>
                <li><img src="/assets/images/mobile/instagram/insta_10.jpg" alt=""></li>
            </ul>
        </div>
    </div>
    <br><br><br>
</div>

<script>
$(document).ready(function(){
	$('.insta_slider').bxSlider({
        auto: false, 
        autoHover: false,
        controls: false,
        touchEnabled: true,
        pager: false,
        shrinkItems: true,
        slideWidth: 300,
        slideMargin: 0,
        minSlides: 1.6,
        maxSlides: 1.6,
	});

    $('#lst_more_btn').on('click', function(){
        const curPage = $('#relief-list .page_num').val();
        const totalPage = Number($('#relief-list .page_total').val());
        const nextPage = Number(curPage) + 1;

        if(totalPage <= nextPage) {
            $(this).hide();
        }

        $.ajax({url: `<?=$listpath?>&page=${nextPage}`, success: function(result){
            if(result) {
                $('#relief-list').append(result);
                $('#relief-list .page_num').val(nextPage);
            }
        }});
    });
});
</script>