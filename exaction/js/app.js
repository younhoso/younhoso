/**
 * LOVE in Action - 메인 앱 로직
 * 함수형 패턴 적용
 */

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

    // 오버레이 클릭 시 닫기
    state.overlay.addEventListener("click", (e) => {
      if (e.target === state.overlay) {
        close();
      }
    });

    // ESC 키로 닫기
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && state.isOpen) {
        close();
      }
    });

    // 확인 버튼 클릭 이벤트
    const confirmBtn = state.overlay.querySelector(".bottom-sheet-btn");
    if (confirmBtn) {
      confirmBtn.addEventListener("click", close);
    }

    // 닫기 버튼 클릭 이벤트
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
 * @param {number} options.threshold - 트리거 지점 (0~1)
 * @param {Function} options.onTrigger - 트리거 콜백
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

  const init = () => {
    // 스크롤 상단으로 이동
    window.scrollTo(0, 0);

    // Swiper 초기화
    initSwiper();

    // 바텀 시트 초기화
    state.bottomSheet = createBottomSheet("bottom-sheet-overlay");
    state.bottomSheet.init();

    // 스크롤 트리거 초기화 (80% 스크롤 시 바텀 시트 열기)
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
