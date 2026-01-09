/**
 * LOVE in Action - 메인 앱 로직
 */
const App = (() => {
  // 신청 링크 URL (실제 URL로 교체 필요)
  const APPLY_URL = 'https://forms.google.com/your-form-id';

  /**
   * 초기화
   */
  const init = () => {
    setupApplyButton();
  };

  /**
   * 신청 버튼 설정
   */
  const setupApplyButton = () => {
    const applyBtn = document.getElementById('applyBtn');

    if (applyBtn) {
      applyBtn.addEventListener('click', handleApplyClick);
    }
  };

  /**
   * 신청 버튼 클릭 핸들러
   */
  const handleApplyClick = (e) => {
    e.preventDefault();

    // 신청 링크로 이동
    window.open(APPLY_URL, '_blank', 'noopener,noreferrer');
  };

  /**
   * 토스트 메시지 표시
   */
  const showToast = (message) => {
    // 기존 토스트 제거
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
      existingToast.remove();
    }

    // 새 토스트 생성
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    // 3초 후 제거
    setTimeout(() => {
      toast.remove();
    }, 3000);
  };

  return { init, showToast };
})();

// DOM 로드 후 초기화
document.addEventListener('DOMContentLoaded', App.init);
