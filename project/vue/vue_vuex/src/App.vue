<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <AllUsers />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import AllUsers from './components/Users/AllUsers.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    AllUsers
  }
}
</script>

<style></style>
