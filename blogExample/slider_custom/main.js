(function () {
  const bg = document.querySelector(".bg-slide");
  const icon_slide = document.querySelector(".icon-slide");
  const items = Array.from(document.querySelectorAll(".slide-item"));
  const icon_item = Array.from(document.querySelectorAll(".icon-item"));
  let current;
  let n = 0;

  const add = function (el) {
    el.classList.add("active");
    current = el;
  };

  const remove = function (el) {
    current && el.classList.remove("active");
  };

  const addHander = function () {
    remove(items[n]);
    remove(icon_item[n]);
    n += 1;
    if (items.length === n) n = 0;
    add(items[n]);
    add(icon_item[n]);
  };
  add(items[0]);
  add(icon_item[0]);
  setInterval(addHander, 2500);
})();
