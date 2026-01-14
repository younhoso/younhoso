const createApp = () => {
  // ==========================================================================
  // 상수
  // ==========================================================================
  const THEME_KEY = "theme";
  const DARK = "dark";
  const LIGHT = "light";

  // ==========================================================================
  // DOM 요소
  // ==========================================================================
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");

  // ==========================================================================
  // 테마 관련 함수
  // ==========================================================================
  const getStoredTheme = () => localStorage.getItem(THEME_KEY) || DARK;

  const setTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
    updateIcon(theme);
  };

  const updateIcon = (theme) => {
    themeIcon.textContent = theme === DARK ? "🌙" : "☀️";
  };

  const toggleTheme = () => {
    const current = getStoredTheme();
    const next = current === DARK ? LIGHT : DARK;
    setTheme(next);
  };

  // ==========================================================================
  // 이벤트 바인딩
  // ==========================================================================
  const bindEvents = () => {
    themeToggle.addEventListener("click", toggleTheme);
  };

  // ==========================================================================
  // 초기화
  // ==========================================================================
  const init = () => {
    updateIcon(getStoredTheme());
    bindEvents();
  };

  return { init };
};

document.addEventListener("DOMContentLoaded", () => {
  const app = createApp();
  app.init();
});
