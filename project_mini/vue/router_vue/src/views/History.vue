<template>
  <div>
    History 페이지
    <button @click="onRouterIntro"> 하위 이동 </button>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'History-a06fb6',
  components: {},
  computed: {},
  watch: {},
  data(){
    return {
      
    }
  },
  setup(){},
  created(){},
  mounted(){},
  unmounted(){},
  methods: {
    onRouterIntro() {
      this.$router.push({
        name: 'intro'
      }).catch(() => {})
    }
  }
}
</script>

<style>

</style>