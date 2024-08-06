<div id="container">
    <div class="sub_tit">
        <h1>아이러브아프리카(ILA)<strong>・후원하기</strong></h1>
    </div>
    <div class="sub_cont">
        <div class="h_desc">
            아이러브아프리카는 아프리카 대륙을 전문으로 돕는 <br />
            <strong>아프리카전문국제구호개발 비정부기구</strong><br />
            <strong>(NGO, Non Governmental Organization)</strong>입니다.
        </div>
        <?php include APPPATH."views/$nation/desk/support/tab.php"; ?>
        <div class="sub_cont_s">
            <div class="m_left">
                <h3>기업후원</h3>
                <?php include APPPATH."views/$nation/desk/support/enterprise_tab.php"; ?>
            </div>
            <div class="m_cont">
                <div class="m_txt">
                        
                    <div class="sub_cont_s">
                        <div class="m_ila_board">
                            <ul class="lst_mov">
                                <?php
                                    for($i = 0, $len = count($result) ; $i < $len ; $i++) {
                                        $item = $result[$i];

                                        ?><li>
                                            <a href="<?php echo $viewpath; ?>&page=<?php echo $page; ?>&idx=<?php echo $item["am_no"]; ?>">
                                                <span class="thmb"><img src="/pds/afmove_img/<?php echo $item["am_image"]; ?>" width="269" height="172" alt=""></span>
                                                <span class="tit"><?php echo $item["am_title"]; ?></span>
                                                <span class="desc"><?
                                                    $cont = $item["am_content"];
                                                    echo strip_tags($cont);
                                                ?></span>
                                            </a>
                                        </li><?php
                                    }
                                ?>
                            </ul>
                            
                            <?php include APPPATH."views/$nation/desk/include/pagination.php"; ?>

                            <div class="line"></div>

                            <div class="m_together">
                                <div class="tit">
                                    <strong>GOING <em>TOGETHER</em></strong>
                                </div>
            
                                <ul class="together_lst">
                                    <li><div class="thmb"><img src="/assets/images/desk/img_together3.png" alt="" /></div><div class="tx">제네시스비비큐</div></li>
                                    <li><div class="thmb"><img src="/assets/images/desk/img_together8.png" alt="" /></div><div class="tx">NH농협금융</div></li>
                                    <li><div class="thmb"><img src="/assets/images/desk/img_together7.png" alt="" /></div><div class="tx">대신증권</div></li>
                                    <li><div class="thmb"><img src="/assets/images/desk/img_together5.png" alt="" /></div><div class="tx">한국수출입은행</div></li>
                                    <li><div class="thmb"><img src="/assets/images/desk/img_together11.png" alt="" /></div><div class="tx">한국예탁결제원</div></li>
                                    <li><div class="thmb"><img src="/assets/images/desk/img_together21.png" alt="" /></div><div class="tx">환경부</div></li>
                                </ul>
                            </div>

                            <div class="btn_btm">
                            <a style="cursor:pointer" onclick="popView('<?php echo SUPPORT_ENTERPRISE_URL; ?>');">기업후원 문의하기</a>
                            </div>
                        </div>
                    </div>
                
                </div>
            </div>
        </div>
    </div>
</div>