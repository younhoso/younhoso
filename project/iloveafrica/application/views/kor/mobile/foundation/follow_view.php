<div class="page_cont h_screen">
    <div class="sub_cont c_gap">
        <?php
            $cont = $result->b_content;
            $cont = str_replace("&amp;", "&", $cont);
            $cont = str_replace("&nbsp;", " ", $cont);
            $cont = str_replace("&lt;", "<", $cont);
            $cont = str_replace("&gt;", ">", $cont);
            $cont = str_replace("&quot;", "\"", $cont);
            
        
            echo $cont;
        ?>
        
    </div>
    <div class="sub_cont">
        <h5 class="tit_lg"><?php echo $result->b_title ?></h5>
    </div>
    <br><br><br>
</div>

<script>
    $(document).ready(() => {
        $(".page_cont iframe").css('max-width', 'calc(100vw - 40px)');
    })
</script>