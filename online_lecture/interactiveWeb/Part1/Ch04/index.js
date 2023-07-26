(() => {
  const listScrollChangeStartY = 373;
  const listScrollChangeEndY = 2432;
  const fixedDescriptionAppearTimeing = 3820;
  const fixedDescriptionAppearEnds = 4000;
  const listItems = Array.from(document.querySelectorAll('.list-item'));
  const panelImg = document.querySelector('.panel-img');
  const flyingSantaImage = document.querySelector('.flying-santa-image');
  const division = (listScrollChangeEndY - listScrollChangeStartY) / listItems.length; //한개당 가져야하는 스크롤 값

  const videoPlayBack = 500;
  const videoElement = document.querySelector('.video');
  const videoSection =  document.querySelector('.video-section');
  const fixedWrapper =  document.querySelector('.fixed-wrapper');
  const fixedDescription = document.querySelector('.fixed-description');

  const deviceYCenterInit = (element) => {
    return ((document.documentElement.clientHeight - element.offsetHeight) / 2);
  };

  const centerElement = (el, video) => {
    const element = document.querySelector(el);
    const parent = element.parentElement;
    if(window.pageYOffset > parent.offsetTop - deviceYCenterInit(element)){
      element.style.position = 'fixed';
      element.style.top = '50%';
      element.style.left = '50%';
      element.style.transform = `translate(-50%, -50%)`;
      if(video) video.currentTime = (window.pageYOffset - videoSection.offsetTop) / videoPlayBack
    } else {
      element.style.position = 'relative';
      element.style.top = 'initial';
      element.style.left = 'initial';
      element.style.transform = 'initial';
    }
  };

  const videoPlay = () => {
    videoSection.style.height = videoElement.duration * videoPlayBack + 'px';
  }

  videoElement.addEventListener('loadedmetadata', videoPlay)

  const init = () => {
    const wScrollY = window.pageYOffset;
    if(document.getElementsByClassName('on')){
      listItems.forEach((el) => {
        el.classList.remove('on');
      })
    }
    
    if(wScrollY > listScrollChangeStartY && wScrollY < listScrollChangeEndY){
      const targetIndex = Math.round((wScrollY - listScrollChangeStartY) / division); //스크롤 시작점에서 부터 / 한개당 가져야하는 스크롤 값 = 인덱스 값을 구함.

      if(listItems[targetIndex]) listItems[targetIndex].classList.add('on');
    }

    const scrollYBottom = wScrollY + document.documentElement.clientHeight;// 스크롤 끝지점 값을 얻을수 있다.
    if(scrollYBottom > panelImg.offsetTop && scrollYBottom < panelImg.offsetTop + panelImg.offsetHeight + 100){
      const translateX = 80 - 80 * (scrollYBottom - panelImg.offsetTop) / panelImg.offsetHeight;
      const translateY = -13 + 13 * (scrollYBottom - panelImg.offsetTop) / panelImg.offsetHeight;
      const rotationDegree = 23 - 23 * 1.7 * (scrollYBottom - panelImg.offsetTop) / panelImg.offsetHeight;

      flyingSantaImage.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${rotationDegree}deg)`;
    }

    centerElement('.fixed-wrapper', videoElement);
    // videoSection 전체 높이의 끝지점 위치를 얻고 - (fixedWrapper의 높이값(끝지점) + 디바이스 2등분일때 체크)
    const videoSectionHeightEnd = videoSection.offsetHeight + videoSection.offsetTop - (fixedWrapper.offsetHeight + deviceYCenterInit(fixedWrapper))
    if(window.pageYOffset > videoSectionHeightEnd){
      fixedWrapper.style.position = 'relative';
      fixedWrapper.style.top = 'initial';
      fixedWrapper.style.left = 'initial';
      fixedWrapper.style.transform = `translateY(${videoSection.offsetHeight - fixedWrapper.offsetHeight}px)`;
    }

    if(window.pageYOffset > fixedDescriptionAppearTimeing && window.pageYOffset < fixedDescriptionAppearEnds){
      fixedDescription.style.transform = `translateY(${fixedDescriptionAppearEnds - window.pageYOffset}px)`;
      fixedDescription.style.opacity = (window.pageYOffset - fixedDescriptionAppearTimeing) / 300;
    } else if(window.scrollY > fixedDescriptionAppearEnds){
      fixedDescription.style.transform = `translateY(0px)`;
      fixedDescription.style.opacity = 1;
    } else {
      fixedDescription.style.transform = `translateY(100px)`;
      fixedDescription.style.opacity = 0;
    }

    centerElement('.bank-beyond');
  }

  window.addEventListener('scroll', init);
})();

// slider영역의 스크롤 Container
class SliderChang {
  constructor() {
   this.sliderContentWrapper = document.querySelector('.slider-content-wrapper');
   this.sliderImage = document.querySelectorAll('.slider-image');
   this.sliderIndex = document.querySelector('.slider-index');
   this.sliderContainer = this.sliderContainer.bind(this);
   this.currentImgage = 0;
   this.eventHandle();
  }

  sliderChangHandle(step){
    this.currentImgage += step;
    if(this.currentImgage < 0) this.currentImgage = this.sliderImage.length - 1;
    if(this.currentImgage >= this.sliderImage.length) this.currentImgage = 0
    this.sliderContentWrapper.scrollLeft = this.sliderImage[this.currentImgage].offsetLeft;
  }

  sliderContainer(){
    const imageWidth = document.querySelectorAll('.slider-image')[0].offsetWidth
    this.currentImgage = Math.round(this.sliderContentWrapper.scrollLeft / imageWidth);
    this.sliderIndex.innerText =`${this.currentImgage + 1} / ${this.sliderImage.length}`
  }

  eventHandle() {
    this.sliderContentWrapper.addEventListener('scroll', this.sliderContainer)

    document.querySelector('.left-button').addEventListener('click' ,() => {
      this.sliderChangHandle(-1);
    });
    document.querySelector('.right-button').addEventListener('click' ,() => {
      this.sliderChangHandle(1);
    });
  }
}
new SliderChang();