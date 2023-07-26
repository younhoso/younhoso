(() => {
  const $ = (el) => document.querySelector(el);
  const ctx = $('canvas').getContext('2d');
  const dpr = window.devicePixelRatio;
  
  let canvasWidth
  let canvasHeight
  let particles
  
  let interval = 1000 / 60;
  let now, delta
  let then = Date.now();

  class Particle {
    constructor(x, y, radius, vy){
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.vy = vy;
      this.acc = 1;
    }
    update(){
      this.vy += this.acc;
      this.y += this.vy;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI / 180 * 360);
      ctx.fillStyle = 'orange'
      ctx.fill();
      ctx.closePath();
    }
  };

  const randomNumBetween = (min, max) => {
    return Math.random() * (max - min + 1) + min
  }
  
  function init() {
    const TOTAL = 5; //파티클 개수(아이템 개수)
    canvasWidth = innerWidth
    canvasHeight = innerHeight

    $('canvas').width = canvasWidth * dpr;
    $('canvas').height = canvasHeight * dpr;
    ctx.scale(dpr, dpr);

    $('canvas').style.width = canvasWidth + 'px';
    $('canvas').style.height = canvasHeight + 'px';

    particles = [];
    for(let i = 0; i < TOTAL; i++){
      const x = randomNumBetween(0, canvasWidth);
      const y = randomNumBetween(0, canvasHeight);
      const radius = randomNumBetween(50, 100);
      const vy = randomNumBetween(1, 5);
      particles.push(new Particle(x, y, radius, vy));
    }
  }

  function animate() {
    window.requestAnimationFrame(animate);
    now = Date.now();
    delta = now - then;
    
    if(delta < interval) return
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    particles.forEach(particle => {
      particle.update();
      particle.draw();

      if(particle.y - particle.radius > canvasHeight) { //파티클 원의 크기가 바닦모두 지나갔을때 시점
        particle.y = -particle.radius; //파티클을 다시 브라우저 상단 위로 올림.
        particle.x = randomNumBetween(0, canvasWidth);
        particle.radius = randomNumBetween(50, 100);
        particle.vy = randomNumBetween(1, 5);
      }
    });

    then = now - (delta % interval);
  }

  window.addEventListener('load', () => {
    init()
    animate()
  });

  window.addEventListener('resize', () => {
    init()
  });
})();