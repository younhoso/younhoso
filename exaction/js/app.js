/**
 * LOVE in Action - 메인 앱 로직
 */
document.addEventListener("DOMContentLoaded", () => {
  new Swiper(".detail-swiper", {
    slidesPerView: 1,
    spaceBetween: 16,
    autoHeight: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
});
