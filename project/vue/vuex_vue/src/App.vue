<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <Home />
    <AllUsers />
    <SingnUp />
    <br />
  </div>
</template>

<script>
import Home from './views/Home.vue'
import AllUsers from './components/Users/AllUsers.vue'
import SingnUp from './components/Users/SingnUp.vue';

export default {
  name: 'App',
  components: {
    Home,
    AllUsers,
    SingnUp
  },
  data() {
    return {
    }
  },
  setup(){
  }
}
</script>

<style>

</style>
