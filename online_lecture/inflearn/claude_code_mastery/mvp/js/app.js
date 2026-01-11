/**
 * Portfolio App
 * MVP - Vanilla JavaScript (ES6+)
 * 함수형 패턴 적용
 */

// 목데이터 로드
const loadMockData = async () => {
  try {
    const response = await fetch("./data/mock.json");
    return response.json();
  } catch (e) {
    return MOCK_DATA;
  }
};

// App 팩토리 함수
const createApp = (initialState = {}) => {
  const state = {
    isSubmitting: false,
    config: null,
    messages: null,
    skills: null,
    projects: null,
    ...initialState,
  };

  const elements = {
    contactForm: null,
    submitBtn: null,
    skillBars: null,
    skillsGrid: null,
    projectsGrid: null,
  };

  const getState = () => ({ ...state });

  const setState = (newState) => {
    console.log(state);
    Object.assign(state, newState);
  };

  const cacheDOM = () => {
    elements.contactForm = document.getElementById("contactForm");
    elements.submitBtn = elements.contactForm?.querySelector(
      'button[type="submit"]'
    );
    elements.skillsGrid = document.getElementById("skillsGrid");
    elements.projectsGrid = document.getElementById("projectsGrid");
  };

  const bindEvents = () => {
    if (elements.contactForm) {
      elements.contactForm.addEventListener("submit", handleFormSubmit);
    }

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", handleSmoothScroll);
    });
  };

  // Skills 렌더링
  const renderSkills = () => {
    if (!elements.skillsGrid || !state.skills) return;

    const categoryNames = {
      frontend: "Frontend",
      backend: "Backend",
      tools: "Tools",
    };

    const html = Object.entries(state.skills)
      .map(
        ([category, skills]) => `
        <div class="skills__category">
          <h3>${categoryNames[category] || category}</h3>
          <ul class="skills__list">
            ${skills
              .map(
                (skill) => `
              <li class="skill">
                <span class="skill__name">${skill.name}</span>
                <div class="skill__bar" data-level="${skill.level}"></div>
              </li>
            `
              )
              .join("")}
          </ul>
        </div>
      `
      )
      .join("");

    elements.skillsGrid.innerHTML = html;

    // skillBars 캐싱 및 초기화
    elements.skillBars = document.querySelectorAll(".skill__bar");
    initSkillBars();
    observeSkillBars();
  };

  // Projects 렌더링
  const renderProjects = () => {
    if (!elements.projectsGrid || !state.projects) return;

    const html = state.projects
      .map(
        (project) => `
        <article class="project-card">
          <img
            src="${project.image}"
            alt="${project.title} 스크린샷"
            class="project-card__image"
          >
          <div class="project-card__content">
            <h3 class="project-card__title">${project.title}</h3>
            <p class="project-card__description">${project.description}</p>
            <div class="project-card__tech">
              ${project.tech.map((tech) => `<span>${tech}</span>`).join("")}
            </div>
            <div class="project-card__links">
              <a href="${
                project.demo
              }" target="_blank" rel="noopener noreferrer">Demo</a>
              <a href="${
                project.github
              }" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
        </article>
      `
      )
      .join("");

    elements.projectsGrid.innerHTML = html;
  };

  const validateForm = (data) => {
    const { name, email, message } = data;
    const { validation } = state.config;
    const emailRegex = new RegExp(validation.emailRegex);

    if (!name || name.trim().length < validation.nameMinLength) return false;
    if (!email || !emailRegex.test(email)) return false;
    if (!message || message.trim().length < validation.messageMinLength)
      return false;

    return true;
  };

  const simulateSubmit = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, data });
      }, state.config.submitDelay);
    });
  };

  const setSubmitting = (isSubmitting) => {
    setState({ isSubmitting });

    if (elements.submitBtn) {
      elements.submitBtn.disabled = isSubmitting;
      elements.submitBtn.textContent = isSubmitting
        ? state.messages.submitting
        : state.messages.submit;
    }
  };

  const showAlert = (message, type) => {
    const { alertColors } = state.config;
    const alert = document.createElement("div");
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
      background-color: ${
        type === "success" ? alertColors.success : alertColors.error
      };
    `;

    document.body.appendChild(alert);

    setTimeout(() => {
      alert.style.animation = "slideUp 0.3s ease";
      setTimeout(() => alert.remove(), 300);
    }, state.config.alertDuration);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (state.isSubmitting) return;

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (!validateForm(data)) {
      showAlert(state.messages.validationError, "error");
      return;
    }

    setSubmitting(true);

    try {
      await simulateSubmit(data);
      showAlert(state.messages.submitSuccess, "success");
      e.target.reset();
    } catch (error) {
      showAlert(state.messages.submitError, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSmoothScroll = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const headerOffset = state.config.headerOffset;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const initSkillBars = () => {
    elements.skillBars.forEach((bar) => {
      const level = bar.dataset.level || 0;
      bar.style.setProperty("--skill-level", `${level}%`);
    });
  };

  const observeSkillBars = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
          }
        });
      },
      { threshold: state.config.observerThreshold }
    );

    elements.skillBars.forEach((bar) => observer.observe(bar));
  };

  const initAlertStyles = () => {
    const alertStyles = document.createElement("style");
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
  };

  const init = async () => {
    const mockData = await loadMockData();
    setState({
      config: mockData.config,
      messages: mockData.messages,
      skills: mockData.skills,
      projects: mockData.projects,
    });

    cacheDOM();
    renderSkills();
    renderProjects();
    bindEvents();
    initAlertStyles();
  };

  return { init, getState, setState };
};

// Initialize app when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const app = createApp({ isSubmitting: false });
  app.init();

  // 디버깅용: 콘솔에서 app.getState()로 확인 가능
  window.app = app;
});
