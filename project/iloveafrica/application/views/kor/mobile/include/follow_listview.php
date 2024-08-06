<ul class="lst_trace">
    <?php 
        date_default_timezone_set('Asia/Seoul');
        for($i = 0, $len = count($result); $i < $len ; $i++) {
            $item = $result[$i];
    ?>
        <li>
            <div class="lst_idx">
                <span><? echo $start_no - $i; ?></span>
            </div>
            <div class="subject">
                <a href="/index.php/foundation/followview?idx=<?php echo $item["b_no"] ?>&page=<?php echo $page ?>"><?php echo $item["b_title"] ?></a>
                <!-- <span>Date <?php echo $item["regist_date"] ?> | View <?php echo $item["b_cnt"] ?></span> -->
            </div>
        </li>
    <?php
        }
    ?>  
</ul>