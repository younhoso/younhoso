import {fetchData} from './ajax.js';

(() => {
  const isDesktop = window.innerWidth > 1080;

  // 성공 템플릿 PC 선택 영역
  const successTemplateSelectPc = ({year, month}) => {
    return `
      <div class="swiper-slide">
        <p>${month} <span>${year}</span></p>
      </div>
    `;
  };
  // 성공 템플릿 PC 이미지 영역
   const successTemplateImgsPc = ({year, month, thumb, link}) => {
    return `
      <div class='swiper-slide'>
        <div class="activetxt">
          <p class="month">${month} <span class="year">${year}</span></p>
        </div>
          <img src=${thumb} art="#" />
          <a href=${link}></a>
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

  // 데이터 처리
  function processData(response) {
    // 데이터 처리 로직 작성
    const templateHtmlSelectPc = response.map((datas) => {
      return successTemplateSelectPc(datas)
    }).join('');
    const templateHtmlImgsPc = response.map((datas) => {
      return successTemplateImgsPc(datas)
    }).join('');
    const templateHtmlMo = response.map((datas) => {
      return successTemplateMo(datas)
    }).join('');

    $('.history_pc .swiper-wrapper.select-swiper').html(templateHtmlSelectPc);
    $('.history_pc .thumbs-swiper .swiper-wrapper').html(templateHtmlImgsPc);
    $('.history_mo .swiper-wrapper').html(templateHtmlMo);
  };

  // 오류 처리
  function handleError(error) {
    console.error('오류 발생:', error);
    //  통신 실패 시 템플릿을 만들어 추가합니다.
    const errorHTML = errorTemplate(errorThrown);
    $('.history_pc .swiper-wrapper.select-swiper').html(errorHTML)
    $('.history_pc .thumbs-swiper .swiper-wrapper').html(errorHTML);
    $('.history_mo .swiper-wrapper').html(errorHTML);
  };

  // Ajax 요청 수행 및 처리
  fetchData('https://younhoso.github.io/younhoso/blogExample/infinite_rolling/ex2/data/history.json')
  .done(function(response) {
    processData(response);
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    handleError(errorThrown);
  });

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
  
  /** HISTORY PC - 이미지 영역 슬라이드 */
  const subThumbs = new Swiper('.history .thumbs-swiper', {
    slidesPerView: 'auto',
    loop: true,
    slideToClickedSlide: false,
    centeredSlides: false,
    allowTouchMove : false,
    on: {
      init: function() {
        const wrapperEl = this.wrapperEl;
        const activeIndex = this.activeIndex;
        const marginLeft = parseInt($('.history .thumbs-swiper .swiper-slide').css('margin-left')?.replace('px', ''));
        const marginRigth = parseInt($('.history .thumbs-swiper .swiper-slide').css('margin-right')?.replace('px', ''));
        const itemWidth = this.slides[0]?.offsetWidth;

        const leftValue = -((itemWidth + (marginLeft + marginRigth)) * activeIndex);
        wrapperEl.style.transform = 'translate3d('+ leftValue +'px, 0, 0)';
      },
      slideChange: function () {
        const previousIndex = this.previousIndex;
        const lastIndex = this.loopedSlides - 1;
        const activeIndex = this.activeIndex;
        const activerealIndexIndex = this.realIndex;

        const wrapperEl = this.wrapperEl;
        const marginLeft = parseInt($('.history .thumbs-swiper .swiper-slide').css('margin-left')?.replace('px', ''));
        const marginRigth = parseInt($('.history .thumbs-swiper .swiper-slide').css('margin-right')?.replace('px', ''));
        const itemWidth = this.slides[0]?.offsetWidth;

        const leftValue = -((itemWidth + (marginLeft + marginRigth)) * activeIndex);
        wrapperEl.style.transform = 'translate3d(' + leftValue + 'px, 0, 0)';
      },
    },
  });
  /** HISTORY PC - 이미지 영역 슬라이드 끝*/
  
  /** HISTORY PC - 선택 영역 슬라이드 */
  const historySwiperPc = new Swiper(".history .history-swiper.pc", {
    direction: 'vertical',
    slidesPerView: 7,
    loopedSlides: 8, //슬라이드의 객수와 같은 값을 지정
    spaceBetween: 0,
    loop: true,
    resistance : false,
    slideToClickedSlide: true, //true 해줘야지 클릭했을때 loop을 실행 할수 있습니다.
    centeredSlides: true,
    allowTouchMove : false,
  });
  /** HISTORY PC - 선택 영역 슬라이드 끝*/

  $('.history .swiper-wrapper').on('click', '.swiper-slide', function(e) {
    e.preventDefault(); // 슬라이드 전환 중 클릭 이벤트 방지
    e.stopPropagation();
    const clickedIndex = $(this).index();
    subThumbs.slideTo(clickedIndex);
    historySwiperPc.slideTo(clickedIndex);
  });
})();