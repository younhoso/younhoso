// 요리반상회 MVP - Main Application

// ============================================
// Configuration
// ============================================
const CONFIG = {
  DEMO_MODE: true, // API 키 없이 데모 데이터 사용
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ACCEPTED_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  GEMINI_API_KEY: '', // 실제 사용시 환경변수로 관리
};

// ============================================
// Demo Data (loaded from external JSON)
// ============================================
let DEMO_DATA = null;

async function loadDemoData() {
  if (DEMO_DATA) return DEMO_DATA;
  const response = await fetch('./demo-data.json');
  DEMO_DATA = await response.json();
  return DEMO_DATA;
}

// ============================================
// DOM Elements
// ============================================
const $ = (selector) => document.querySelector(selector);
const uploadArea = $('#uploadArea');
const fileInput = $('#fileInput');
const previewArea = $('#previewArea');
const previewImage = $('#previewImage');
const removeBtn = $('#removeBtn');
const actionArea = $('#actionArea');
const analyzeBtn = $('#analyzeBtn');
const loading = $('#loading');
const resultsSection = $('#resultsSection');
const menuCards = $('#menuCards');
const exportJsonBtn = $('#exportJsonBtn');
const exportPdfBtn = $('#exportPdfBtn');

// ============================================
// State
// ============================================
let currentFile = null;
let currentBase64 = null;
let analysisResult = null;

// ============================================
// Event Listeners
// ============================================
function initEventListeners() {
  // Click to upload
  uploadArea.addEventListener('click', () => fileInput.click());

  // File input change
  fileInput.addEventListener('change', handleFileSelect);

  // Drag and drop
  uploadArea.addEventListener('dragover', handleDragOver);
  uploadArea.addEventListener('dragleave', handleDragLeave);
  uploadArea.addEventListener('drop', handleDrop);

  // Remove image
  removeBtn.addEventListener('click', resetUpload);

  // Analyze
  analyzeBtn.addEventListener('click', handleAnalyze);

  // Export
  exportJsonBtn.addEventListener('click', exportToJson);
  exportPdfBtn.addEventListener('click', exportToPdf);
}

// ============================================
// File Handling
// ============================================
function handleFileSelect(e) {
  const file = e.target.files[0];
  if (file) processFile(file);
}

function handleDragOver(e) {
  e.preventDefault();
  e.stopPropagation();
  uploadArea.classList.add('dragover');
}

function handleDragLeave(e) {
  e.preventDefault();
  e.stopPropagation();
  uploadArea.classList.remove('dragover');
}

function handleDrop(e) {
  e.preventDefault();
  e.stopPropagation();
  uploadArea.classList.remove('dragover');

  const file = e.dataTransfer.files[0];
  if (file) processFile(file);
}

function processFile(file) {
  // Validate file type
  if (!CONFIG.ACCEPTED_TYPES.includes(file.type)) {
    alert('JPG, PNG, WEBP 형식의 이미지만 업로드 가능합니다.');
    return;
  }

  // Validate file size
  if (file.size > CONFIG.MAX_FILE_SIZE) {
    alert('파일 크기는 10MB 이하여야 합니다.');
    return;
  }

  currentFile = file;

  // Convert to base64
  const reader = new FileReader();
  reader.onload = (e) => {
    currentBase64 = e.target.result;
    showPreview(currentBase64);
  };
  reader.readAsDataURL(file);
}

function showPreview(base64) {
  previewImage.src = base64;
  uploadArea.hidden = true;
  previewArea.hidden = false;
  actionArea.hidden = false;
  resultsSection.hidden = true;
}

function resetUpload() {
  currentFile = null;
  currentBase64 = null;
  analysisResult = null;
  fileInput.value = '';
  uploadArea.hidden = false;
  previewArea.hidden = true;
  actionArea.hidden = true;
  resultsSection.hidden = true;
  menuCards.innerHTML = '';
}

// ============================================
// Analysis
// ============================================
async function handleAnalyze() {
  if (!currentBase64) return;

  showLoading(true);

  try {
    if (CONFIG.DEMO_MODE || !CONFIG.GEMINI_API_KEY) {
      // Demo mode - simulate API delay
      await delay(1500);
      analysisResult = await loadDemoData();
    } else {
      // Real API call
      analysisResult = await analyzeWithGemini(currentBase64);
    }

    renderResults(analysisResult);
  } catch (error) {
    console.error('Analysis failed:', error);
    alert('분석 중 오류가 발생했습니다. 다시 시도해주세요.');
  } finally {
    showLoading(false);
  }
}

async function analyzeWithGemini(base64Image) {
  const prompt = `이 메뉴판/음식 이미지를 분석해서 다음 JSON 형식으로 응답해주세요:
{
  "menus": [
    {
      "menuName": "메뉴 이름",
      "ingredients": [
        {"name": "재료명", "icon": "이모지", "certain": true/false}
      ],
      "allergens": ["알레르겐1", "알레르겐2"],
      "originRequired": ["원산지 표기 필요 항목"]
    }
  ]
}

21대 알레르겐: 난류, 우유, 메밀, 땅콩, 대두, 밀, 고등어, 게, 새우, 돼지고기, 복숭아, 토마토, 아황산류, 호두, 닭고기, 쇠고기, 오징어, 조개류, 잣, 굴, 전복

JSON만 응답해주세요.`;

  // Remove data URL prefix
  const imageData = base64Image.replace(/^data:image\/\w+;base64,/, '');

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${CONFIG.GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: prompt },
            { inline_data: { mime_type: 'image/jpeg', data: imageData } }
          ]
        }]
      })
    }
  );

  if (!response.ok) {
    throw new Error('API request failed');
  }

  const data = await response.json();
  const text = data.candidates[0].content.parts[0].text;

  // Extract JSON from response
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Invalid JSON response');
  }

  return JSON.parse(jsonMatch[0]);
}

// ============================================
// Rendering
// ============================================
function renderResults(data) {
  menuCards.innerHTML = '';

  data.menus.forEach(menu => {
    const card = createMenuCard(menu);
    menuCards.appendChild(card);
  });

  resultsSection.hidden = false;
  resultsSection.scrollIntoView({ behavior: 'smooth' });
}

function createMenuCard(menu) {
  const card = document.createElement('div');
  card.className = 'menu-card';

  card.innerHTML = `
    <div class="menu-card-header">
      <span class="menu-icon">🍽️</span>
      <h3 class="menu-name">${escapeHtml(menu.menuName)}</h3>
    </div>

    <div class="menu-section">
      <div class="section-title">재료</div>
      <div class="ingredients-list">
        ${menu.ingredients.map(ing => `
          <span class="ingredient-tag ${ing.certain ? '' : 'uncertain'}">
            <span class="icon">${ing.icon}</span>
            ${escapeHtml(ing.name)}${ing.certain ? '' : ' (추정)'}
          </span>
        `).join('')}
      </div>
    </div>

    ${menu.allergens.length > 0 ? `
      <div class="menu-section">
        <div class="section-title">알레르겐 경고</div>
        <div class="allergen-list">
          ${menu.allergens.map(a => `
            <span class="allergen-tag">⚠️ ${escapeHtml(a)}</span>
          `).join('')}
        </div>
      </div>
    ` : ''}

    ${menu.originRequired.length > 0 ? `
      <div class="menu-section">
        <div class="section-title">원산지 표기 필요</div>
        <div class="origin-list">
          ${menu.originRequired.map(o => `
            <span class="origin-tag">📍 ${escapeHtml(o)}</span>
          `).join('')}
        </div>
      </div>
    ` : ''}
  `;

  return card;
}

// ============================================
// Export Functions
// ============================================
function exportToJson() {
  if (!analysisResult) return;

  const dataStr = JSON.stringify(analysisResult, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `menu-analysis-${getTimestamp()}.json`;
  a.click();

  URL.revokeObjectURL(url);
}

function exportToPdf() {
  window.print();
}

// ============================================
// Utility Functions
// ============================================
function showLoading(show) {
  loading.hidden = !show;
  actionArea.hidden = show;
  if (show) {
    resultsSection.hidden = true;
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function getTimestamp() {
  const now = new Date();
  return now.toISOString().slice(0, 10).replace(/-/g, '');
}

// ============================================
// Initialize
// ============================================
document.addEventListener('DOMContentLoaded', initEventListeners);
