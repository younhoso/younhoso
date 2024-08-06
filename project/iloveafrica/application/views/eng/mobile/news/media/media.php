
<?php include APPPATH."views/$nation/mobile/news/sub_tab.php"; ?>
<?php include APPPATH."views/$nation/mobile/news/media/media_tab.php"; ?>
<div class="sub_cont_c">
	<div class="sub_title">언론보도</div>
	<div class="m_ila_board">
		<ul class="lst_mov">
		<?php
            for($i = 0, $len = count($result) ; $i < $len ; $i++) {
                $item = $result[$i];

                ?><li>
                    <a href="<?php echo $viewpath; ?>&page=<?php echo $page; ?>&idx=<?php echo $item["aml_no"]; ?>">
                        <span class="thmb"><img width="333px" height="188px" src="/pds/afmovel_img/<?php echo $item["aml_image"]; ?>" alt="" /></span>
                        <span class="tit"><?php echo $item["aml_title"]; ?></span>
                        <?/*<span class="desc"><?php echo $item["aml_content"]?></span>*/?>
                    </a>
                </li><?php
            }
        ?>
		</ul>
		
		<div class="pagenate">
		<?php
            include APPPATH."views/$nation/mobile/include/pagination.php";
        ?>
	</div>
	
</div>
