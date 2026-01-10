/**
 * LOVE in Action - 메인 앱 로직
 */

// 페이지 로드 시 스크롤 상단으로 이동
window.onbeforeunload = () => {
  window.scrollTo(0, 0);
};

document.addEventListener("DOMContentLoaded", () => {
  // 스크롤 상단으로 이동
  window.scrollTo(0, 0);
  new Swiper(".detail-swiper", {
    slidesPerView: 1,
    spaceBetween: 16,
    autoHeight: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  // 바텀 시트 컴포넌트 초기화
  BottomSheet.init();

  // 스크롤 시 바텀 시트 자동 열기 (30% 스크롤 시)
  ScrollTrigger.init({ threshold: 0.3 });
});

/**
 * 바텀 시트 컴포넌트
 * 재사용 가능한 바텀 시트 UI 컴포넌트
 */
const BottomSheet = {
  overlay: null,
  isOpen: false,

  /**
   * 바텀 시트 초기화
   */
  init() {
    this.overlay = document.getElementById("bottom-sheet-overlay");
    if (!this.overlay) return;

    // 오버레이 클릭 시 닫기
    this.overlay.addEventListener("click", (e) => {
      if (e.target === this.overlay) {
        this.close();
      }
    });

    // ESC 키로 닫기
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen) {
        this.close();
      }
    });

    // 확인 버튼 클릭 이벤트
    const confirmBtn = this.overlay.querySelector(".bottom-sheet-btn");
    if (confirmBtn) {
      confirmBtn.addEventListener("click", () => {
        this.close();
      });
    }
  },

  /**
   * 바텀 시트 열기
   * @param {Object} options - 옵션 설정
   * @param {string} options.title - 제목
   * @param {string} options.message - 메시지
   * @param {string} options.buttonText - 버튼 텍스트
   * @param {Function} options.onConfirm - 확인 버튼 콜백
   */
  open(options = {}) {
    if (!this.overlay) return;

    // 옵션으로 내용 업데이트
    if (options.message) {
      const messageEl = this.overlay.querySelector(".bottom-sheet-message");
      if (messageEl) {
        messageEl.innerHTML = options.message;
      }
    }

    if (options.buttonText) {
      const btnEl = this.overlay.querySelector(".bottom-sheet-btn");
      if (btnEl) {
        btnEl.textContent = options.buttonText;
      }
    }

    if (options.onConfirm) {
      const btnEl = this.overlay.querySelector(".bottom-sheet-btn");
      if (btnEl) {
        btnEl.onclick = () => {
          options.onConfirm();
          this.close();
        };
      }
    }

    this.overlay.classList.add("active");
    this.isOpen = true;
    document.body.style.overflow = "hidden";
  },

  /**
   * 바텀 시트 닫기
   */
  close() {
    if (!this.overlay) return;

    this.overlay.classList.remove("active");
    this.isOpen = false;
    document.body.style.overflow = "";
  },

  /**
   * 바텀 시트 토글
   */
  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  },
};

/**
 * 스크롤 트리거 컴포넌트
 * 스크롤 위치에 따라 바텀 시트를 자동으로 열기
 */
const ScrollTrigger = {
  triggered: false,
  threshold: 0.5, // 페이지의 50% 스크롤 시 트리거

  /**
   * 스크롤 트리거 초기화
   * @param {Object} options - 옵션 설정
   * @param {number} options.threshold - 트리거 지점 (0~1, 기본 0.5)
   */
  init(options = {}) {
    if (options.threshold) {
      this.threshold = options.threshold;
    }

    window.addEventListener("scroll", this.handleScroll.bind(this), {
      passive: true,
    });
  },

  /**
   * 스크롤 이벤트 핸들러
   */
  handleScroll() {
    if (this.triggered) return;

    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = scrollTop / docHeight;

    if (scrollPercent >= this.threshold) {
      this.triggered = true;
      BottomSheet.open();
    }
  },
};
