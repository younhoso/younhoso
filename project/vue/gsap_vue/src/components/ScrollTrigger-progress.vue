<template>
  <div class="hello">
    <div id="normal-progress" class="progress"></div>
    <div class="progress-de"></div>
    <div v-html="widthTxt" class="text"></div>
    <div class="box">
      <h2 class="text1">Scroll trigger</h2>
      <h2 class="text2">This is my first one</h2>
      <h2 class="text3">How is it?</h2>
    </div>
    <div class="box2">
      <h2 class="text4">Scroll trigger</h2>
      <h2 class="text5">This is my first one</h2>
      <h2 class="text6">How is it?</h2>
    </div>
  </div>
</template>

<script>
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default {
  name: 'HelloWorld',
  data(){
    return {
      target: document.querySelector('.txt'),
      widthTxt: 0
    }
  },
  mounted() {
    this.scrollAnimation();
  },
  methods: {
    scrollAnimation() {
      gsap.to("#normal-progress", {
        width: 100 +'%',
        ease: "none",
        scrollTrigger: { 
          scrub: true,
          onUpdate: self => {
            this.widthTxt = Math.floor(self.progress * 100) + '%'
          }
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  margin-top: 200px;
  margin-bottom: 200px;
}

.progress {
  width: 0;
  height: 4px;
  background-color:#3467D9;
  position: fixed;
  top: 0;
  z-index: 9;
}
.progress-de {
  width: 100vw;
  height: 4px;
  background-color: #000;
  position: fixed;
  top: 0;
}
.text {
  position: fixed;
  top: 0;
  font-size: 40px;
  font-weight: 600;
}
</style>
