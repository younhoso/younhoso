// 프로필 공유
function shareProfile() {
  const shareData = {
    title: document.querySelector(".profile-name").textContent,
    url: window.location.href,
  };

  if (navigator.share) {
    navigator.share(shareData).catch(() => {
      copyToClipboard(window.location.href);
    });
  } else {
    copyToClipboard(window.location.href);
  }
}

// 클립보드 복사
function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      showToast("링크가 복사되었습니다");
    })
    .catch(() => {
      showToast("복사에 실패했습니다");
    });
}

// 토스트 메시지
function showToast(message) {
  let toast = document.querySelector(".toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

// 프로필 이미지 에러 처리
document.addEventListener("DOMContentLoaded", () => {
  const profileImg = document.getElementById("profileImg");

  if (profileImg) {
    profileImg.addEventListener("error", function () {
      this.src =
        "data:image/svg+xml," +
        encodeURIComponent(`
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
                    <rect width="80" height="80" fill="#e5e8eb"/>
                    <circle cx="40" cy="32" r="14" fill="#b0b8c1"/>
                    <ellipse cx="40" cy="70" rx="24" ry="18" fill="#b0b8c1"/>
                </svg>
            `);
    });
  }
});
