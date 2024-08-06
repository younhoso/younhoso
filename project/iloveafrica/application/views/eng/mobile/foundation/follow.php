
<?php include APPPATH."views/$nation/mobile/foundation/sub_tab.php"; ?>
<div class="sub_cont_c">
        
    <div class="m_ila_board">
        <ul class="lst_notice" id="lstNotice">
            <?php 
                date_default_timezone_set('Asia/Seoul');
                for($i = 0, $len = count($result); $i < $len ; $i++) {
                    $item = $result[$i];
                    $date = $item["regist_date"];

                    $cdate = new DateTime();
                    $idate = new DateTime($date);

                    $days = round(($cdate->format('U') - $idate->format('U')) / (60*60*24));
                    ?><li <?php if( $i == 0 ) { ?>class="open"<?php } ?>>
                        <span class="td_subject"><a href="javascript:void(<?php echo $i; ?>)"><?php if($days < 7) { ?><span class="ic_new">&nbsp;</span><?php } ?><?php echo $item["b_title"]; ?></a></span>
                        <span class="td_date"><?php echo $date; ?></span>
                        <span class="arr">&nbsp;</span>
                    </li>
                    <li class="lst_cont">
                        <?php 
                            $cont = $item["b_content"];
                            $cont = str_replace("&amp;", "&", $cont);
                            $cont = str_replace("&nbsp;", " ", $cont);
                            $cont = str_replace("&lt;", "<", $cont);
                            $cont = str_replace("&gt;", ">", $cont);
                            $cont = str_replace("&quot;", "\"", $cont);
                            
                            echo $cont;
                        ?>
                    </li><?php
                }
            ?>  
        </ul>
        
        <?php include APPPATH."views/mobile/include/pagination.php"; ?>
    </div>


	<br />
	<div class="bg_line"></div>
	<br /><br />
	<div class="link">
		<a href="http://blog.naver.com/iloveafrica2" target="_blank">이창옥 블로그</a>
		<a href="/index.php/foundation/greetings">인사말</a>
	</div>
	<br />
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