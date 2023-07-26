(() => {
  const cursorDefaultInner = document.querySelector('.cursor__default');
  const cursorTranceInner = document.querySelector('.cursor__trace');
  const cursor = document.querySelector('.cursor');
  const header = document.querySelector('.header');
  const poster = document.querySelector('.poster__parallax');

  const moveEvent = (e) => {
    const {clientX, clientY} = e;
    cursorDefaultInner.style.cssText = `transform: translate(${clientX}px, ${clientY}px)`;
    cursorTranceInner.style.cssText = `transform: translate(${clientX}px, ${clientY}px)`;
  };

  const downEvent = (e) => {
    cursor.classList.add('active');
  };

  const upEvent = (e) => {
    cursor.classList.remove('active');
  };

  const createRipple = (e) => {
    const {clientX, clientY} = e;
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    cursor.appendChild(ripple);

    ripple.style.cssText = `top: ${clientY - ripple.clientHeight / 2}px; left: ${clientX - ripple.clientWidth / 2}px;`

    ripple.addEventListener('animationend', () => {
      cursor.removeChild(ripple)
    })
  };

  const preloaderBtn = document.querySelector('.preloader__btn');
  let intervalId = null;
  let intervalClear = null;
  let scale = 1;
  const preloaderHideThreshold = 18;

  function setPreloaderStyle(scale) {
    preloaderBtn.style.cssText = `transform:scale(${scale}) translate(0, 0);`;
    document.querySelector('.preloader__btn_hold').style.cssText = `opacity: ${1 - (scale - 1) / preloaderHideThreshold}`
  }

  const preloaderClear = (e) => {
    scale -= 0.175;
    setPreloaderStyle(scale);
    
    if(scale >= 1){
      intervalClear = requestAnimationFrame(preloaderClear);
      cancelAnimationFrame(intervalId)
    }
    if(e.type === 'mouseup')cancelAnimationFrame(intervalId)
  };

  const preloader = () => {
    scale += 0.175;
    setPreloaderStyle(scale); 
    intervalId = requestAnimationFrame(preloader);
    cancelAnimationFrame(intervalClear)
   
    if(scale >= preloaderHideThreshold){
      document.querySelector('.preloader').classList.add('hidden-area');
      const poster = document.querySelector('.poster');
      header.classList.remove('hidden-area');
      poster.classList.remove('hidden-area');
      header.classList.add('shown-area');
      poster.classList.add('shown-area');

      cancelAnimationFrame(intervalId)
    }
  };

  const headerMove = (e) => {
    const {clientX, clientY} = e;
    const xRelativeToHeader = clientX / header.clientWidth;
    const yRelativeToHeader = clientY / header.clientHeight;

    document.querySelector(".header__title").style.cssText = `transform: translate(${xRelativeToHeader * -50}px, ${yRelativeToHeader * -50}px)`;
    document.querySelector('.circle-1').style.cssText = `transform: translate(${xRelativeToHeader * -25}px, ${yRelativeToHeader * -25}px)`;
    document.querySelector('.circle-2').style.cssText = `transform: translate(${xRelativeToHeader * 25}px, ${yRelativeToHeader * 25}px)`;
    
    document.querySelector('.cube__image_1').style.cssText = `transform: translate(${xRelativeToHeader * -15}px, ${yRelativeToHeader * -15}px)`;
    document.querySelector('.cube__image_2').style.cssText = `transform: translate(${xRelativeToHeader * -8}px, ${yRelativeToHeader * -8}px)`;
    document.querySelector('.cube__image_3').style.cssText = `transform: translate(${xRelativeToHeader * -20}px, ${yRelativeToHeader * -20}px)`;
    document.querySelector('.cube__image_4').style.cssText = `transform: translate(${xRelativeToHeader * -5}px, ${yRelativeToHeader * -5}px)`;
  };

  const options = {
    threshold: 0.3
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      console.log(entry.intersectionRatio)
      if(entry.isIntersecting){
        entry.target.classList.add('poster-image_state_visible')
      }
    })
  }, options);

  Array.from(document.querySelectorAll('.poster-image_wrapper')).forEach((poster) => {
    observer.observe(poster)
  });

  const posterMove = (e) => {
    const xRelativeToPoster = e.clientX / poster.clientWidth;
    const yRelativeToPoster = e.clientY / poster.clientHeight;
    document.querySelector('#poster-image_wrapper_2').style.cssText = `transform: translate(${xRelativeToPoster * -40}px, ${yRelativeToPoster * -40}px)`;
    document.querySelector('#poster-image_wrapper_3').style.cssText = `transform: translate(${xRelativeToPoster * 40}px, ${yRelativeToPoster * 40}px)`;
  }

  preloaderBtn.addEventListener('mouseup', preloaderClear);
  preloaderBtn.addEventListener('mousedown', preloader);

  document.addEventListener('mousemove', moveEvent);
  document.addEventListener('mousedown', downEvent);
  document.addEventListener('mouseup', upEvent);
  document.addEventListener('click', createRipple);

  header.addEventListener('mousemove', headerMove);
  poster.addEventListener('mousemove', posterMove);
})();