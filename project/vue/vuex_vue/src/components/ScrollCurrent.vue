<template>
  <div :style="computedStyle" class="snakke-progress"></div>
</template>

<script>
import useScrollCurrent from '@/hooks/useScrollCurrent.js';

export default {
  name: 'Snakke-17fa5f',
  components: {},
  computed: {
    computedStyle(){
      return {
        width: this.progress * 100 + '%'
      }
    }
  },
  watch: {},
  data(){
    return {
      
    }
  },
  setup(){
    const { progress } = useScrollCurrent();
    return {
      progress
    }
  },
  created(){},
  mounted(){},
  unmounted(){},
  methods: {}
}
</script>

<style>
.snakke-progress {
  position: fixed;
  width: 0;
  height: 10px;
  background-color: #00a8ff;
}


</style>