<template>
  <nav>
    <ul>
      <li><button @click="onRouterMain">main</button></li>
      <li><button @click="onRouterMedia">Media</button></li>
      <router-view></router-view>
    </ul>
  </nav>
</template>

<script>


export default {
  name: 'App',
  methods: {
    onRouterMain() {
      this.$router.push(
        {
          name: 'main'
        }).catch(() => {})
    },
    onRouterMedia() {
      this.$router.push(
        {
          name: 'mediaAll'
        }).catch(() => {})
    }
  }  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
