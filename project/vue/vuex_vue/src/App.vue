<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <AllUsers />
    <SingnUp />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import AllUsers from './components/Users/AllUsers.vue'
import SingnUp from './components/Users/SingnUp.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    AllUsers,
    SingnUp
  }
}
</script>

<style></style>
