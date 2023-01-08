<template>
  <div>
    <header v-if="historyLink">
      <router-link to="/login">로그인</router-link> |
      <router-link to="/signup">회원가입</router-link>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  computed: {
    historyLink () {
      return this.$route.meta && this.$route.meta.historyLink
    },
  },
  created(){
    
  }
}
</script>

<style>

</style>