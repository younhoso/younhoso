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
                <h3>자료실</h3>
            </div>
            <div class="m_ila_board">
                <div class="tit_pub">아이러브아프리카 특별자료</div>
                
                <div id="issuu" class="issuu_wrap">
                    <iframe src="/assets/html/embed.html" id="ifrIssuu" name="ifrIssuu" frameborder="0" width="880" height="550" title="issuu.com" allowfullscreen="true"></iframe>
                </div>

                <div class="select_pub">
                    <select name="selIssuu" id="selIssuu">
                        <option value="https://e.issuu.com/embed.html?identifier=4avjsqrfx9l4&amp;embedType=script#15812229/54168489">2017 단체소개서 (국문)</option>
                        <option value="https://e.issuu.com/embed.html?identifier=u9whr5suwc4h&amp;embedType=script#15812229/58856889">2017 단체소개서 (영문)</option>
                        <option value="https://e.issuu.com/embed.html?identifier=uhk13d1wemxk&amp;embedType=script#15812229/58850315">2017 연차보고서 (국문)</option>
                        <option value="https://e.issuu.com/embed.html?identifier=zn2fc8veg9g8&amp;embedType=script#15812229/58852169">2016 연차보고서 (국문)</option>
                        <option value="https://e.issuu.com/embed.html?identifier=zjuv5fixxilb&amp;embedType=script#15812229/54643014">2016 연차보고서 (영문)</option>
                        <option value="https://e.issuu.com/embed.html?identifier=hgmxvomuvata&amp;embedType=script#15812229/34893423">2015 연차보고서 (국문)</option>
                        <option value="https://e.issuu.com/embed.html?identifier=uqus6wnnl92n&amp;embedType=script#15812229/36455072">2015 연차보고서 (영문)</option>
                        <option value="https://e.issuu.com/embed.html?identifier=fjufvlx3bive&amp;embedType=script#15812229/34893303">2014 연차보고서 (국문)</option>
                        <option value="https://e.issuu.com/embed.html?identifier=e38mvwfwybi1&amp;embedType=script#15812229/34893414">2014 연차보고서 (영문)</option>
                        <option value="https://e.issuu.com/embed.html?identifier=4lprv0pwf2j7&amp;embedType=script#15812229/41256279">2013 연차보고서 (국문)</option>
                        <option value="https://e.issuu.com/embed.html?identifier=1a71xi1qxjtf&amp;embedType=script#0/34869161">2013 연차보고서 (영문)</option>
                    </select>
                    <span class="desc">※ 좌측 메뉴를 선택하시면 해당 자료를 보실 수 있습니다.</span>
                </div>
                <br><br>
                <div class="line"></div>
                <br><br>

                <div class="tit_pub2">아이러브아프리카 CI 다운로드</div>
                <div class="ci_download">
                    <a href="http://iloveafrica.or.kr/down/logo.ai" class="b1">AI 파일 다운로드 <em class="ic">⬇</em></a>
                    <a href="http://iloveafrica.or.kr/down/logo.zip" class="b2">JPG 파일 다운로드 <em class="ic">⬇</em></a>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
$(document).ready(function(){
	$('#selIssuu').on('change',function(){
		$('#ifrIssuu').attr('src',$(this).val())
    });
    
    $('#ifrIssuu').attr('src', "https://e.issuu.com/embed.html?identifier=4avjsqrfx9l4&amp;embedType=script#15812229/54168489");
    
});
</script>