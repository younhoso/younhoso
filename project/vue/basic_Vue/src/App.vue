<template>
  <div id="app">
    <HelloWorld msg="Hello Vue 2" />
    <nav>
      <ul>
        <li>
          <router-link to="/">Home</router-link>/
        </li>
         <li>
          <button @click="onClick">user</button>
        </li>
      </ul>
      <router-view />
    </nav>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
export default {
  components: {
    HelloWorld,
  },
  methods: {
    onClick () {
      this.$router.push(
        {
          name: 'user', 
          params: {
            id: 3,
            tesg: '111',
            tesg2: 32443
          }
        }).catch(() => {})
    }
  }
};
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