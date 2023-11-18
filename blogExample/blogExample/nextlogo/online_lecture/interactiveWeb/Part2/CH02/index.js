(() => {
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio;
  const fps = 60;
  const interval = 1000 / fps;
  let now, delta
  let then = Date.now();

  let canvasWidth, canvasHeight

  function init() {
    canvasWidth = window.innerWidth
    canvasHeight = window.innerHeight

    canvas.width = canvasWidth * dpr
    canvas.height = canvasHeight * dpr
    ctx.scale(dpr, dpr);

    canvas.style.width = canvasWidth + 'px'
    canvas.style.height = canvasHeight + 'px'
  }

  function render() {
    requestAnimationFrame(render);
    now = Date.now();
    delta = now - then;
    if(delta < interval) return

    then = now - (delta % interval);
  }

  window.addEventListener('load', () => {
    init();
    render();
  });

  window.addEventListener('resize', () => {
    init();
  });

})();