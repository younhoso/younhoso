<div id="container">
    <div class="sub_tit">
        <h1>아이러브아프리카<span>(ILA)</span><strong>・후원하기</strong></h1>
    </div>
    <div class="sub_cont">
        <div class="h_desc">
            아이러브아프리카는 아프리카 대륙을 전문으로 돕는 <br />
            <strong>아프리카전문국제구호개발 비정부기구</strong><br />
            <strong>(NGO, NON GOVERNMENTAL ORGANIZATION)</strong>입니다.
        </div>
        <?php include APPPATH."views/$nation/desk/support/tab.php"; ?>
        <div class="sub_cont_s">
            <div class="m_left">
                <h3>기업후원</h3>
                <?php include APPPATH."views/$nation/desk/support/enterprise_tab.php"; ?>
            </div>
            <div class="m_cont">
                <div class="m_slider">
                    <div id="vmcSlider" class="vmc_slider">
                        <div><img src="/assets/images/desk/slide/sup18_01_01.jpg" width="520" height="339" alt=""></div>
                        <div><img src="/assets/images/desk/slide/sup18_01_02.jpg" width="520" height="339" alt=""></div>
                        <div><img src="/assets/images/desk/slide/sup18_01_03.jpg" width="520" height="339" alt=""></div>
                        <div><img src="/assets/images/desk/slide/sup18_01_04.jpg" width="520" height="339" alt=""></div>
                        <div><img src="/assets/images/desk/slide/sup18_01_05.jpg" width="520" height="339" alt=""></div>
                        <div><img src="/assets/images/desk/slide/sup18_01_06.jpg" width="520" height="339" alt=""></div>
                        <div><img src="/assets/images/desk/slide/sup18_01_07.jpg" width="520" height="339" alt=""></div>
                        <div><img src="/assets/images/desk/slide/sup18_01_08.jpg" width="520" height="339" alt=""></div>
                        <div><img src="/assets/images/desk/slide/sup18_01_09.jpg" width="520" height="339" alt=""></div>
                        <div><img src="/assets/images/desk/slide/sup18_01_10.jpg" width="520" height="339" alt=""></div>
                        <div><img src="/assets/images/desk/slide/sup18_01_11.jpg" width="520" height="339" alt=""></div>
                    </div>
                    <div class="m_biz">
                        <div class="desc" style="margin-top:0">
                            아이러브아프리카는 기업이<br>고정관념의 틀에서 깨어난 진정한<br>가치를 창출하는 지속가능한<br>사회공헌을 추구할 수 있도록 파트너가<br>되어 드리겠습니다.
                        </div>
                        <a style="cursor:pointer" onclick="popView('<?php echo SUPPORT_ENTERPRISE_URL; ?>');" class="link">기업후원 문의하기</a>
                    </div>
                </div>
                <div class="m_txt">
                    <br />
                    <div class="line"></div>
                    
                    <div class="thmb_area">
                        <div class="tit">후원방법</div>
                        <div class="img"><img src="/assets/images/desk/img_s4_6_9.png" alt="" /></div>
                    </div>

                    <br /><br />
                    <div class="line"></div>

                    
                    <div class="thmb_area">
                        <div class="tit" style="color:#00B436">기금후원</div>
                        <dl class="thmb_lst2">
                            <dt>정기후원</dt>
                            <dd>
                                <p>
                                    <span>후원을 원하시는 아이러브아프리카의 사업을 매월 1만 원 이상씩 정기적으로 후원하는 방식입니다.<br />후원은 CMS자동이체, 휴대폰, 신용카드, 무통장 입금 등으로 가능합니다. (※ 단, 아프리카 아동후원의 금액은 매월 3만 원입니다.)</span>
                                </p>
                            </dd>
                        </dl>
                        <dl class="thmb_lst2">
                            <dt style="background:#FFCC00">일시후원</dt>
                            <dd>
                                <p>
                                    <span>원하시는 일정 금액을 후원을 원하시는 아이러브아프리카의 사업에 일시적으로 후원하실 수 있는 방법입니다. <br />후원은 휴대폰, 신용카드, 무통장 입금 등으로 가능합니다.</span>
                                </p>
                            </dd>
                        </dl>
                    </div>
                    
                    <div class="btn_btm">
                        <a style="cursor:pointer" onclick="popView('<?php echo SUPPORT_ENTERPRISE_URL; ?>');">기업후원 문의하기</a>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
$(function() {
	$('#vmcSlider').vmcSlider({
		width: 520,
		height: 339,
		gridCol: 10,
		gridRow: 5,
		gridVertical: 20,
		gridHorizontal: 10,
		autoPlay: true,
		ascending: true,
		effects: [
			'fade', 'fadeLeft', 'fadeRight', 'fadeTop', 'fadeBottom', 'fadeTopLeft', 'fadeBottomRight',
			'blindsLeft', 'blindsRight', 'blindsTop', 'blindsBottom', 'blindsTopLeft', 'blindsBottomRight',
			'curtainLeft', 'curtainRight', 'interlaceLeft', 'interlaceRight', 'mosaic', 'bomb', 'fumes'
		],
		ie6Tidy: false,
		random: true,
		duration: 2000,
		speed: 900

	});
});
</script>