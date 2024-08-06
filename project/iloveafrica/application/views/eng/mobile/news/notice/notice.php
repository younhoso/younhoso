
<?php include APPPATH."views/$nation/mobile/news/sub_tab.php"; ?>
<div class="sub_cont_c">
    <div class="sub_title">공지사항</div>
    <div class="m_ila_board">
        <ul class="lst_notice" id="lstNotice">
            <?php 
                for($i = 0, $len = count($result); $i < $len ; $i++) {
                    $item = $result[$i];

                    $date = $item["regist_date"];

                    $cdate = new DateTime();
                    $idate = new DateTime($date);

                    $days = round(($cdate->format('U') - $idate->format('U')) / (60*60*24));

                    $cont = $item["b_content"];
                    $cont = str_replace("&amp;", "&", $cont);
                    $cont = str_replace("&nbsp;", " ", $cont);
                    $cont = str_replace("&lt;", "<", $cont);
                    $cont = str_replace("&gt;", ">", $cont);
                    $cont = str_replace("&quot;", "\"", $cont);

                    ?><li <?php if( $i == 0 ) { ?>class="open"<?php } ?>>
                        <span class="td_subject"><a href="javascript:void(<?php echo $i; ?>)"><?php if( $days < 7 ) { ?><span class="ic_new">&nbsp;</span><?php } ?><?php echo $item["b_title"]; ?></a></span>
                        <span class="td_date"><?php echo $item["regist_date"] ?></span>
                        <span class="arr">&nbsp;</span>
                    </li>
                    <li class="lst_cont">
                    <?php
                        if( strpos($cont, "youtube") ) { 
                        ?><div class="m_ila_board">
                            <div class="view_cont">
                                <div class="mov_wrap">
                                    <?php echo $cont; ?>           
                                </div>
                            </div>
                        </div><?php 
                        } else {
                            echo $cont;
                        }
                    ?>
                    </li><?php
                }
            ?>  
        </ul>
        
        <!-- <?php include APPPATH."views/$nation/mobile/include/pagination.php"; ?> -->
    </div>
    
</div>
<script>
$(document).ready(function(){
	$('#lstNotice').on('click','> li:not(.lst_cont)',function(){
		$('#lstNotice > li').removeClass('open');
		$(this).addClass('open');
		$('body,html').animate({ scrollTop: $(this).offset().top - 50 }, 200);

	}).on('click','> li.open',function(){
		$(this).removeClass('open');
		$('body,html').animate({ scrollTop: $('#lstNotice').offset().top - 110 }, 200);
	});
});
</script>
