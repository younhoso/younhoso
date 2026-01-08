/**
 * Portfolio App
 * MVP - Vanilla JavaScript (ES6+)
 */
const App = (() => {
  'use strict';

  // State
  const state = {
    isSubmitting: false
  };

  // DOM Elements
  const elements = {
    contactForm: null,
    submitBtn: null,
    skillBars: null
  };

  /**
   * Initialize the application
   */
  const init = () => {
    cacheDOM();
    bindEvents();
    initSkillBars();
  };

  /**
   * Cache DOM elements
   */
  const cacheDOM = () => {
    elements.contactForm = document.getElementById('contactForm');
    elements.submitBtn = elements.contactForm?.querySelector('button[type="submit"]');
    elements.skillBars = document.querySelectorAll('.skill__bar');
  };

  /**
   * Bind event listeners
   */
  const bindEvents = () => {
    // Contact form submission
    if (elements.contactForm) {
      elements.contactForm.addEventListener('submit', handleFormSubmit);
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleSmoothScroll);
    });

    // Intersection Observer for skill bars animation
    observeSkillBars();
  };

  /**
   * Handle form submission
   * @param {Event} e - Submit event
   */
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (state.isSubmitting) return;

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Validate form data
    if (!validateForm(data)) {
      showAlert('모든 필드를 올바르게 입력해주세요.', 'error');
      return;
    }

    setSubmitting(true);

    try {
      // Simulate API call (replace with actual API endpoint)
      await simulateSubmit(data);
      showAlert('메시지가 성공적으로 전송되었습니다!', 'success');
      e.target.reset();
    } catch (error) {
      showAlert('메시지 전송에 실패했습니다. 다시 시도해주세요.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  /**
   * Validate form data
   * @param {Object} data - Form data
   * @returns {boolean}
   */
  const validateForm = (data) => {
    const { name, email, message } = data;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || name.trim().length < 2) return false;
    if (!email || !emailRegex.test(email)) return false;
    if (!message || message.trim().length < 10) return false;

    return true;
  };

  /**
   * Simulate form submission
   * @param {Object} data - Form data
   * @returns {Promise}
   */
  const simulateSubmit = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, data });
      }, 1000);
    });
  };

  /**
   * Set form submitting state
   * @param {boolean} isSubmitting
   */
  const setSubmitting = (isSubmitting) => {
    state.isSubmitting = isSubmitting;

    if (elements.submitBtn) {
      elements.submitBtn.disabled = isSubmitting;
      elements.submitBtn.textContent = isSubmitting ? '전송 중...' : '메시지 보내기';
    }
  };

  /**
   * Show alert message
   * @param {string} message - Alert message
   * @param {string} type - Alert type (success/error)
   */
  const showAlert = (message, type) => {
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `alert alert--${type}`;
    alert.textContent = message;
    alert.style.cssText = `
      position: fixed;
      top: 80px;
      left: 50%;
      transform: translateX(-50%);
      padding: 1rem 2rem;
      border-radius: 8px;
      color: white;
      font-weight: 500;
      z-index: 1001;
      animation: slideDown 0.3s ease;
      background-color: ${type === 'success' ? '#10b981' : '#ef4444'};
    `;

    document.body.appendChild(alert);

    // Remove alert after 3 seconds
    setTimeout(() => {
      alert.style.animation = 'slideUp 0.3s ease';
      setTimeout(() => alert.remove(), 300);
    }, 3000);
  };

  /**
   * Handle smooth scroll for anchor links
   * @param {Event} e - Click event
   */
  const handleSmoothScroll = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const headerOffset = 70;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  /**
   * Initialize skill bars with data-level attribute
   */
  const initSkillBars = () => {
    elements.skillBars.forEach(bar => {
      const level = bar.dataset.level || 0;
      bar.style.setProperty('--skill-level', `${level}%`);
    });
  };

  /**
   * Observe skill bars for animation trigger
   */
  const observeSkillBars = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const level = bar.dataset.level || 0;
          bar.style.setProperty('--skill-level', `${level}%`);

          // Animate the skill bar
          requestAnimationFrame(() => {
            bar.querySelector('::after') ||
            (bar.style.cssText += `--skill-level: ${level}%;`);
            bar.classList.add('animated');
          });

          // Trigger CSS animation
          setTimeout(() => {
            bar.style.setProperty('width', `${level}%`);
          }, 100);
        }
      });
    }, { threshold: 0.5 });

    elements.skillBars.forEach(bar => {
      // Set initial width via CSS custom property
      const level = bar.dataset.level || 0;

      // Apply animation via pseudo-element
      const style = document.createElement('style');
      style.textContent = `
        .skill__bar[data-level="${level}"]::after {
          width: ${level}%;
        }
      `;
      document.head.appendChild(style);

      observer.observe(bar);
    });
  };

  // Public API
  return {
    init
  };
})();

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', App.init);

// Add CSS for alert animations
const alertStyles = document.createElement('style');
alertStyles.textContent = `
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }
  @keyframes slideUp {
    from {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
    to {
      opacity: 0;
      transform: translateX(-50%) translateY(-20px);
    }
  }
`;
document.head.appendChild(alertStyles);
