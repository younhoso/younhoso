(() => {
  const isDesktop = window.innerWidth > 1080;

  // 성공 템플릿 PC
  const successTemplatePc = ({year, month}) => {
    return `
      <div class="swiper-slide">
        <p>${month} <span>${year}</span></p>
      </div>
    `;
  };

  // 성공 템플릿 MO
  const successTemplateMo = ({year, month, thumb, link}) => {
    return `
      <div class="swiper-slide" data-year=${year} data-month=${month}>
        <img class="thumb" src=${thumb} alt="thumb" />
        <a href=${link}></a>
      </div>
    `;
  };

  // 실패 템플릿
  const errorTemplate = (errorThrown) => { 
    return`
      <div class="error">
        <h2>통신 실패!</h2>
        <p>에러 메시지: ${errorThrown}</p>
      </div>
    `;
  };

  const fetchData = async (path) => {
    $.ajax({
      url: path, // 서버의 엔드포인트를 지정합니다.
      method: 'GET',
      dataType: 'json',
      async: false, // 동기식으로 통신함.
      success: function(response) {
        // 통신 성공 시 템플릿을 만들어 추가합니다.
        const templateHtmlPc = response.map((datas) => {
          return successTemplatePc(datas)
        }).join('');
        const templateHtmlMo = response.map((datas) => {
          return successTemplateMo(datas)
        }).join('');

        $('.history_pc .swiper-wrapper').html(templateHtmlPc);
        $('.history_mo .swiper-wrapper').html(templateHtmlMo);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        // 통신 실패 시 템플릿을 만들어 추가합니다.
        const errorHTML = errorTemplate(errorThrown);
        $('.history_pc .swiper-wrapper').html(errorHTML)
        $('.history_mo .swiper-wrapper').html(errorHTML);
      }
    });
  };

  //첫 로드될때 실행
  fetchData("https://younhoso.github.io/younhoso/blogExample/infinite_rolling/data/history.json");

  /** HISTORY 모바일 영역 */
  new Swiper(".history-swiper.mo", {
    slidesPerView: 1.4,
    centeredSlides: true,
    spaceBetween: 0,
    loop: true,
    initialSlide: 0,
    allowTouchMove: true,
    on: {
      slideChange: function (swiper) {
        $(".active-title").children("img").css("display", "none");

        //하얀글자로 바뀔 때 애니메이션 (only 모바일)
        $(".history-swiper-pagination .swiper-pagination-bullet-active").addClass("animation");
      },
    },
    pagination: {
      el: ".history-swiper-pagination",
      clickable: true,
      type: "custom",
      clickable: isDesktop ? true : false,
      renderCustom: function (swiper, current, total) {
        let text = "<div class='bullet-container'>";
        for (let i = 1; i <= total; i++) {
          const year = $('.history .history-swiper.mo .swiper-slide').eq(i+1).data('year');
          const month = $('.history .history-swiper.mo .swiper-slide').eq(i+1).data('month');
          if (current === i) {
            text += `<div class='swiper-pagination-bullet swiper-pagination-bullet-active' style='order:${-1};'>
              <p class="year">${year}</p>
              <p class="month">${month}</p>
              </div>`;
          } else {
            text += `<div class='swiper-pagination-bullet' style='order:${i - current > 0 ? i - current : i + current};'>
              <p class="year">${year}</p>
              <p class="month">${month}</p>
              </div>`;
          }
        }
        text += "</div>";
        return text;
      },
    },
  });
  /** HISTORY 모바일 영역 끝*/

   // 히스토리 이미지 Pagination
   const historyPaginationImgs = [
    "history_2023_6_img",
    "history_2023_4_img",
    "history_2023_2_img",
    "history_2022_12_img",
    "history_2022_10_img",
    "history_2022_8_img",
    "history_2022_6_img",
    "history_2022_4_img",  
  ];

  /** HISTORY PC 영역 */
  const historySwiperPc = new Swiper(".history-swiper.pc", {
    direction: 'vertical',
    slidesPerView: 7,
    spaceBetween: 0,
    loop: true,
    slideToClickedSlide: true, //true 해줘야지 클릭했을때 loop을 실행 할수 있습니다.
    centeredSlides: true,
    allowTouchMove : false,
    on: {
      slideChange: function(swiper) {
        const activeIndex = swiper.activeIndex;
        const current = $(swiper.slides[activeIndex]).data('swiper-slide-index');
        const marginLeft = parseInt($('.history .history-swiper .swiper-pagination-bullet').css('margin-left')?.replace('px', ''));
        const marginRigth = parseInt($('.history .history-swiper .swiper-pagination-bullet').css('margin-right')?.replace('px', ''));
        const itemWidth = $('.history .history-swiper .swiper-pagination-bullet').width();
        const leftValue = -((itemWidth + marginLeft + marginRigth) * current);
        $('.history .bullet-container').css({ 'transform': `translateX( ${leftValue}px )`});

        if(isDesktop){
          let slideImg = $('.history .swiper-pagination-bullet');
          for(let i = 0; i < 3; i++){
            $('.history .bullet-container').append($(slideImg[i]).clone());
          }
        }
      },
    },
    pagination: {
      el: '.swiper-pagination',
      type: "custom",
      renderCustom: function (swiper, current, total) {
        const activeIndex = swiper.activeIndex;
        const activeTxt = swiper.slides[activeIndex]?.innerHTML;

        //이미지 Pagination
        let text = `<div class='bullet-container'>`
        for (let i = 1; i <= total; i++) {
          const linkNumber = total - i + 1;//인덱스 반대로 뒤집기
          if (current === i) {
            text += `<div class='swiper-pagination-bullet swiper-pagination-bullet-active'>
            <div class="activetxt">${activeTxt}</div>
            <a href="http://tastyzine.co.kr/main/index/${linkNumber}">
              <img src='./imgs/${historyPaginationImgs[i - 1]}.png' art="#" />
            </a>
          </div>`;
          } else {
            text += `<div class='swiper-pagination-bullet'>
              <a href="http://tastyzine.co.kr/main/index/${linkNumber}">
                <img src='./imgs/${historyPaginationImgs[i - 1]}.png' art="#" />
              </a>
            </div>`;
          }
        }
        text += "</div>";
        return text;
      },
    },
  });

  $('.history .history-swiper').on('click', '.swiper-slide', function(e) {
    e.preventDefault(); // 슬라이드 전환 중 클릭 이벤트 방지
    e.stopPropagation();
    const clickedIndex = $(this).index();
    historySwiperPc.slideTo(clickedIndex);
  });
  /** HISTORY PC 영역 끝*/
})();