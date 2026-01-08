/**
 * Profile App
 * MVP - Vanilla JavaScript (ES6+)
 */
const App = (() => {
  'use strict';

  // State
  const state = {
    isSharing: false
  };

  // DOM Elements
  const elements = {
    shareBtn: null,
    profileImg: null,
    toast: null
  };

  // Share Data
  const shareData = {
    title: '',
    url: window.location.href
  };

  /**
   * Initialize the application
   */
  const init = () => {
    cacheDOM();
    initShareData();
    createToast();
    bindEvents();
    initImageFallback();
  };

  /**
   * Cache DOM elements
   */
  const cacheDOM = () => {
    elements.shareBtn = document.querySelector('.contact-button');
    elements.profileImg = document.getElementById('profileImg');
  };

  /**
   * Initialize share data from DOM
   */
  const initShareData = () => {
    const nameEl = document.querySelector('.profile-name');
    if (nameEl) {
      shareData.title = nameEl.textContent;
    }
  };

  /**
   * Create toast element
   */
  const createToast = () => {
    let toast = document.querySelector('.toast');

    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      toast.setAttribute('role', 'alert');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }

    elements.toast = toast;
  };

  /**
   * Bind event listeners
   */
  const bindEvents = () => {
    // Share button click
    if (elements.shareBtn) {
      elements.shareBtn.addEventListener('click', handleShare);
    }
  };

  /**
   * Initialize image fallback
   */
  const initImageFallback = () => {
    if (elements.profileImg) {
      elements.profileImg.addEventListener('error', handleImageError);
    }
  };

  /**
   * Handle image load error
   */
  const handleImageError = function() {
    this.src = 'data:image/svg+xml,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
        <rect width="80" height="80" fill="#e5e8eb"/>
        <circle cx="40" cy="32" r="14" fill="#b0b8c1"/>
        <ellipse cx="40" cy="70" rx="24" ry="18" fill="#b0b8c1"/>
      </svg>
    `);
  };

  /**
   * Handle share button click
   */
  const handleShare = async () => {
    if (state.isSharing) return;
    state.isSharing = true;

    try {
      // Web Share API supported
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback to clipboard
        await copyToClipboard(shareData.url);
      }
    } catch (err) {
      // User cancelled or error - try clipboard fallback
      if (err.name !== 'AbortError') {
        await copyToClipboard(shareData.url);
      }
    } finally {
      state.isSharing = false;
    }
  };

  /**
   * Copy text to clipboard
   * @param {string} text - Text to copy
   */
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast('링크가 복사되었습니다');
    } catch (err) {
      // Fallback for older browsers
      fallbackCopy(text);
    }
  };

  /**
   * Fallback copy method for older browsers
   * @param {string} text - Text to copy
   */
  const fallbackCopy = (text) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.cssText = 'position:fixed;left:-9999px;top:-9999px;';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand('copy');
      showToast('링크가 복사되었습니다');
    } catch (err) {
      showToast('복사에 실패했습니다');
    }

    document.body.removeChild(textArea);
  };

  /**
   * Show toast message
   * @param {string} message - Message to display
   * @param {number} duration - Duration in ms (default: 2000)
   */
  const showToast = (message, duration = 2000) => {
    if (!elements.toast) return;

    elements.toast.textContent = message;
    elements.toast.classList.add('show');

    setTimeout(() => {
      elements.toast.classList.remove('show');
    }, duration);
  };

  // Public API
  return {
    init
  };
})();

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', App.init);
