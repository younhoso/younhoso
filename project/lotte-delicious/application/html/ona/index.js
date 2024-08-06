(() => {
  const globalbg = document.querySelector(".global-bg");
  const youtubeBtn = document.querySelector(".youtube-icon");
  const iframeinner = document.querySelector(".iframe-inner");

  const embedId = [
    "N7Ytq-4SRwM?si=1GH_Ik_kU5WQ1Gyd", //크리에이터 오디션에 상금 1억 등장이라
    "QwndhrsjFQY?si=EmRT1teomjs6wth0", //아직도 목표가 실버버튼? 곽경영의 분노
    "TxHB60EWYBs?si=C6BiOmDWz2IYcg-J", //대한민국 최초 크리에이터 서바이벌이 뭘까?
    "FGvotb3WD0A?si=OOaZOAgpcr0n4dRJ", //히밥 : 구독왕 그냥 제가 참가하면 안되나요?
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

  youtubeBtn.addEventListener("click", () => {
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
