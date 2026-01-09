# 컴포넌트 스타일

> UI 컴포넌트 스타일 가이드

---

## 버튼

### Primary 버튼

```css
.btn-primary {
  background: var(--color-accent); /* #3182f6 */
  color: #ffffff;
  padding: var(--space-3) var(--space-5); /* 12px 20px */
  border-radius: 8px;
  font-weight: var(--font-semibold);
  font-size: var(--text-md);
  min-height: 44px; /* 터치 영역 */
  transition: background 0.2s ease;
}

.btn-primary:hover {
  background: #1b64da;
}

.btn-primary:active {
  background: #1557c0;
}
```

### Secondary 버튼

```css
.btn-secondary {
  background: transparent;
  color: var(--color-accent);
  border: 1px solid var(--color-accent);
  padding: var(--space-3) var(--space-5);
  border-radius: 8px;
  font-weight: var(--font-medium);
  min-height: 44px;
}
```

### Ghost 버튼

```css
.btn-ghost {
  background: transparent;
  color: var(--color-text-secondary);
  padding: var(--space-2) var(--space-3);
  border-radius: 6px;
}

.btn-ghost:hover {
  background: rgba(0, 0, 0, 0.05);
}
```

---

## 카드

```css
.card {
  background: #ffffff;
  border-radius: 12px;
  padding: var(--space-5); /* 20px */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.card-hover {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
```

---

## 배지

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: var(--space-1) var(--space-2); /* 4px 8px */
  border-radius: 4px;
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
}

.badge-primary {
  background: rgba(49, 130, 246, 0.1);
  color: var(--color-accent);
}

.badge-gray {
  background: rgba(139, 149, 161, 0.15);
  color: var(--color-text-secondary);
}
```

---

## 링크

```css
.link {
  color: var(--color-accent);
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.link:hover {
  opacity: 0.8;
  text-decoration: underline;
}
```

---

## 구분선

```css
.divider {
  height: 1px;
  background: rgba(0, 0, 0, 0.06);
  margin: var(--space-6) 0;
}
```

---

## 입력 필드

```css
.input {
  width: 100%;
  padding: var(--space-3) var(--space-4); /* 12px 16px */
  border: 1px solid #e5e8eb;
  border-radius: 8px;
  font-size: var(--text-md);
  min-height: 44px;
  transition: border-color 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(49, 130, 246, 0.1);
}

.input::placeholder {
  color: var(--color-text-secondary);
}
```

---

## 토스트

```css
.toast {
  position: fixed;
  bottom: var(--space-6);
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-text); /* #191f28 */
  color: #ffffff;
  padding: var(--space-3) var(--space-5);
  border-radius: 8px;
  font-size: var(--text-sm);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: toast-in 0.3s ease;
}

@keyframes toast-in {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}
```
