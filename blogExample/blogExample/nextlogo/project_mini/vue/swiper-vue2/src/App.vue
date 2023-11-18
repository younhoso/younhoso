<template>
  <div>
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide class="swiper-slide">Slide 1</swiper-slide>
      <swiper-slide class="swiper-slide">Slide 2</swiper-slide>
      <swiper-slide class="swiper-slide">Slide 3</swiper-slide>
      <div class="swiper-scrollbar" slot="scrollbar"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  name: 'swiper-example-vertical',
  title: 'Vertical slider',
  data() {
    return {
      swiperOption: {
        scrollbar: {
          el: '.swiper-scrollbar',
          hide: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  components: {
    Swiper,
    SwiperSlide
  }
};
</script>

<style scoped>
#app { height: 100% }
html,
body {
  position: relative;
  height: 100%;
}

body {
  background: #eee;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #000;
  margin: 0;
  padding: 0;
}

.swiper {
  width: 100%;
  height: 90vh;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #8b8b8b;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>