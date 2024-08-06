<div id="container">
    <div class="sub_tit">
        <h1>아이러브아프리카(ILA)<strong>・ILA소식</strong></h1>
    </div>
    <div class="sub_cont">
        <div class="h_desc">
            아이러브아프리카는 아프리카 대륙을 전문으로 돕는 <br>
            <strong>아프리카전문국제구호개발 비정부기구</strong><br>
            <strong>(NGO, Non Governmental Organization)</strong>입니다.
        </div>
        <?php include APPPATH."views/$nation/desk/news/sub_tab.php"; ?>
        <div class="sub_cont_s">
            <div class="m_left">
                <h3>공지사항</h3>
            </div>
            <div class="m_ila_board">
                <ul class="lst_notice">
                    <li class="th">
                        <span class="th_num">번호</span>
                        <span class="th_subject">제목</span>
                        <span class="th_writer">작성자</span>
                        <span class="th_date">작성일자</span>
                        <span class="th_inq">조회수</span>
                    </li>
                    <?php 
                        $no = $start_no;
                        for($i = 0, $len = count($result); $i < $len ; $i++) {
                            $item = $result[$i];
                    ?>
                    <li>
                        <span class="td_num"><?php
                            if( $item["b_notice"] == "1" ) {
                                echo "공지";
                            } else {
                                echo $no;
                                $no--;
                            }
                        ?></span>
                        <span class="td_subject"><a href="/index.php/news/noticedetail?idx=<?php echo $item["b_no"] ?>&page=<?php echo $page ?>"><?php echo $item["b_title"] ?></a></span>
                        <span class="td_writer"><?php echo $item["b_name"] ?></span>
                        <span class="td_date"><?php echo $item["regist_date"] ?></span>
                        <span class="td_inq"><?php echo $item["b_cnt"] ?></span>
                    </li>
                    <?php 
                        }
                    ?>
                </ul>
                
                <?php include APPPATH."views/$nation/desk/include/pagination.php"; ?>
            </div>
        </div>
    </div>
</div>