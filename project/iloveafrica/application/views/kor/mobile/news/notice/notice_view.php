<div class="page_cont">
    <div class="sub_cont">
        <div class="notice_cont">
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
    </div>
</div>
