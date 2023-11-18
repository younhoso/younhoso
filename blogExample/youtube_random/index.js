(() => {
  const globalbg = document.querySelector(".global");
  const center = document.querySelector(".center");
  const iframeinner = document.querySelector(".iframe-inner");

  const embedId = [
    "3v7tCmicvzw?si=_ky4ZdjgBIJXtnLK",
    "U-43VLjiyoc?si=kcCydJIMrYslYVUC",
    "Ldla2VnvgbA?si=0GdfRtkvp0wSHtpQ",
    "sCeVHKM1l54?si=8YZH2O_HTCewBzzr",
  ];

  let lastEmbedId = null;
  // 한번 노출된 영상은 연속으로 노출이 안되게 할려는 함수.
  const getRandomEmbedId = () => {
    // lastEmbedId와 같지 않은 요소들만 추출합니다.
    const filteredEmbedId = embedId.filter((id) => id !== lastEmbedId);

    // filteredEmbedId 배열에서 랜덤하게 한 요소를 선택합니다.
    const newEmbedId =
      filteredEmbedId[Math.floor(Math.random() * filteredEmbedId.length)];

    // 선택한 요소를 기억합니다.
    lastEmbedId = newEmbedId;

    return newEmbedId;
  };

  const randomTemplate = () => {
    const randomEmbedId = getRandomEmbedId();
    const iframeTemplate = `
      <iframe
        src="https://www.youtube.com/embed/${randomEmbedId}"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
      <img src="./imgs/close.png" alt="닫기" class="close-btn" />
    `;
    return iframeTemplate;
  };

  center.addEventListener("click", () => {
    globalbg.classList.add("active");
    iframeinner.classList.add("active");
    iframeinner.innerHTML = randomTemplate();
  });

  iframeinner.addEventListener("click", () => {
    globalbg.classList.remove("active");
    iframeinner.classList.remove("active");
    iframeinner.innerHTML = "";
  });
})();
