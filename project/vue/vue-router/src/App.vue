<template>
  <div>
    <Header ref="header" />
    <nav>
      <!-- <ul>
        <li><button @click="onRouterMain">main</button></li>
        <li><button @click="onRouterMedia">Media</button></li>
        <li><button @click="onRouterHistory">History</button></li>
        <router-view></router-view>
      </ul> -->
    </nav>
  </div>
</template>

<script>
import Header from '@/views/Header';
export default {
  name: 'App',
  components: {
    Header
  },
  methods: {
   
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
