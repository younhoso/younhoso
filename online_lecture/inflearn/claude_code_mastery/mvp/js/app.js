// ==========================================================================
// Main Application
// ==========================================================================

const createApp = (initialState = {}) => {
  // ==========================================================================
  // State
  // ==========================================================================
  const state = { ...initialState };

  // ==========================================================================
  // Utility Functions
  // ==========================================================================
  const getState = () => ({ ...state });

  const setState = (newState) => {
    Object.assign(state, newState);
  };

  // ==========================================================================
  // Bootstrap Functions
  // ==========================================================================
  const bindEvents = () => {
    // 이벤트 바인딩
  };

  const init = () => {
    bindEvents();
  };

  return { init, getState, setState };
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const app = createApp({ isLoading: false });
  app.init();
});
