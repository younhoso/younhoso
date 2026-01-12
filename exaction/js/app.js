/**
 * LOVE in Action - 메인 앱 로직
 * 함수형 패턴 적용
 */

/**
 * 데이터 로더 팩토리 함수
 * @param {string} url - JSON 파일 경로
 * @returns {Object} 데이터 로더 인터페이스
 */
const createDataLoader = (url) => {
  const state = {
    data: null,
    isLoaded: false,
  };

  const getState = () => ({ ...state });

  const load = async () => {
    const response = await fetch(url);
    state.data = await response.json();
    state.isLoaded = true;
    return state.data;
  };

  return { load, getState };
};

/**
 * 렌더러 팩토리 함수
 * @returns {Object} 렌더러 인터페이스
 */
const createRenderer = () => {
  const renderEvent = (event) => {
    // 일시
    const dateEl = document.querySelector('[data-field="date"]');
    if (dateEl) dateEl.textContent = event.date;

    // 장소
    const locationEl = document.querySelector('[data-field="location"]');
    if (locationEl) locationEl.textContent = event.location.name;

    const mapLinkEl = document.querySelector('[data-field="map-link"]');
    if (mapLinkEl) mapLinkEl.href = event.location.mapUrl;

    // 대상
    const targetEl = document.querySelector('[data-field="target"]');
    if (targetEl) targetEl.textContent = event.target;

    // 강사
    const speakersEl = document.querySelector('[data-field="speakers"]');
    if (speakersEl) {
      speakersEl.innerHTML = "";
      event.speakers.forEach((speaker) => {
        const span = document.createElement("span");
        span.innerHTML = `<span class="speaker-session">${speaker.session}:</span> <span class="speaker-name">${speaker.name}</span><span class="speaker-title">(${speaker.title})</span>`;
        speakersEl.appendChild(span);
        speakersEl.appendChild(document.createElement("br"));
      });
    }
  };

  const renderLinks = (links) => {
    // 카카오 채널 링크
    document.querySelectorAll('[data-link="kakao"]').forEach((el) => {
      el.href = links.kakaoChannel;
    });

    // 신청 폼 링크
    document.querySelectorAll('[data-link="apply"]').forEach((el) => {
      el.href = links.applyForm;
    });

    // 인스타그램 링크
    document.querySelectorAll('[data-link="instagram"]').forEach((el) => {
      el.href = links.instagram;
    });
  };

  const renderSlides = (slides) => {
    const wrapper = document.querySelector(".swiper-wrapper");
    if (!wrapper) return;

    wrapper.innerHTML = "";
    slides.forEach((slide) => {
      const div = document.createElement("div");
      div.className = "swiper-slide";

      const img = document.createElement("img");
      img.src = slide.src;
      img.alt = slide.alt;
      img.className = "detail-img";

      div.appendChild(img);
      wrapper.appendChild(div);
    });
  };

  const renderBottomSheet = (bottomSheet, links) => {
    const titleEl = document.querySelector(".bottom-sheet-title");
    if (titleEl) titleEl.textContent = bottomSheet.title;

    const usernameEl = document.querySelector(".story-username");
    if (usernameEl) usernameEl.textContent = bottomSheet.username;

    const logoEl = document.querySelector(".story-logo-img");
    if (logoEl) {
      logoEl.src = bottomSheet.logoSrc;
      logoEl.alt = "강청 로고";
    }

    const messageEl = document.querySelector(".bottom-sheet-message");
    if (messageEl) {
      messageEl.innerHTML = "";
      bottomSheet.messages.forEach((msg) => {
        const p = document.createElement("p");
        if (msg.includes("@")) {
          p.innerHTML = msg.replace(
            /@(\w+)/g,
            '<span class="highlight">@$1</span>'
          );
        } else {
          p.textContent = msg;
        }
        messageEl.appendChild(p);
      });
    }

    const btnEl = document.querySelector(".bottom-sheet-btn");
    if (btnEl) {
      btnEl.textContent = bottomSheet.buttonText;
      btnEl.href = links.instagram;
    }
  };

  const render = (data) => {
    renderEvent(data.event);
    renderLinks(data.links);
    renderSlides(data.slides);
    renderBottomSheet(data.bottomSheet, data.links);
  };

  return { render, renderEvent, renderLinks, renderSlides, renderBottomSheet };
};

/**
 * 바텀 시트 팩토리 함수
 * @param {string} overlayId - 오버레이 요소 ID
 * @returns {Object} 바텀 시트 인터페이스
 */
const createBottomSheet = (overlayId) => {
  const state = {
    overlay: document.getElementById(overlayId),
    isOpen: false,
  };

  const getState = () => ({ ...state });

  const open = () => {
    if (!state.overlay) return;

    state.overlay.classList.add("active");
    state.isOpen = true;
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    if (!state.overlay) return;

    state.overlay.classList.remove("active");
    state.isOpen = false;
    document.body.style.overflow = "";
  };

  const toggle = () => {
    state.isOpen ? close() : open();
  };

  const init = () => {
    if (!state.overlay) return;

    state.overlay.addEventListener("click", (e) => {
      if (e.target === state.overlay) {
        close();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && state.isOpen) {
        close();
      }
    });

    const confirmBtn = state.overlay.querySelector(".bottom-sheet-btn");
    if (confirmBtn) {
      confirmBtn.addEventListener("click", close);
    }

    const closeBtn = state.overlay.querySelector(".bottom-sheet-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", close);
    }
  };

  return { init, open, close, toggle, getState };
};

/**
 * 스크롤 트리거 팩토리 함수
 * @param {Object} options - 설정 옵션
 * @returns {Object} 스크롤 트리거 인터페이스
 */
const createScrollTrigger = (options = {}) => {
  const state = {
    triggered: false,
    threshold: options.threshold || 0.5,
    onTrigger: options.onTrigger || (() => {}),
  };

  const getState = () => ({ ...state });

  const handleScroll = () => {
    if (state.triggered) return;

    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = scrollTop / docHeight;

    if (scrollPercent >= state.threshold) {
      state.triggered = true;
      state.onTrigger();
    }
  };

  const reset = () => {
    state.triggered = false;
  };

  const init = () => {
    window.addEventListener("scroll", handleScroll, { passive: true });
  };

  return { init, reset, getState };
};

/**
 * 메인 앱 팩토리 함수
 * @param {Object} initialState - 초기 상태
 * @returns {Object} 앱 인터페이스
 */
const createApp = (initialState = {}) => {
  const state = {
    dataLoader: null,
    renderer: null,
    bottomSheet: null,
    scrollTrigger: null,
    swiper: null,
    ...initialState,
  };

  const getState = () => ({ ...state });

  const initSwiper = () => {
    state.swiper = new Swiper(".detail-swiper", {
      slidesPerView: 1,
      spaceBetween: 16,
      autoHeight: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  };

  const init = async () => {
    window.scrollTo(0, 0);

    // 데이터 로드 및 렌더링
    state.dataLoader = createDataLoader("data/site.json");
    state.renderer = createRenderer();

    const data = await state.dataLoader.load();
    state.renderer.render(data);

    // Swiper 초기화 (데이터 렌더링 후)
    initSwiper();

    // 바텀 시트 초기화
    state.bottomSheet = createBottomSheet("bottom-sheet-overlay");
    state.bottomSheet.init();

    // 스크롤 트리거 초기화
    state.scrollTrigger = createScrollTrigger({
      threshold: 0.8,
      onTrigger: () => state.bottomSheet.open(),
    });
    state.scrollTrigger.init();
  };

  return { init, getState };
};

// 페이지 로드 시 스크롤 상단으로 이동
window.onbeforeunload = () => {
  window.scrollTo(0, 0);
};

// 앱 초기화
document.addEventListener("DOMContentLoaded", () => {
  const app = createApp({ isLoading: false });
  app.init();
});
