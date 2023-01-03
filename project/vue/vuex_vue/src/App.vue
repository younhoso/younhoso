<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Home />
    <AllUsers />
    <SingnUp />

    <button @click="toggleVisible()">test</button>
    <h2 v-if="visible">ddddd</h2>

    <div>
      state: {{ state }}
    </div>
    <br />
    <button @click="setState(state += 1)">+더하기</button>
    <button @click="setState(state -= 1)">-빼기</button>
  </div>
</template>

<script>
import Home from './views/Home.vue'
import AllUsers from './components/Users/AllUsers.vue'
import SingnUp from './components/Users/SingnUp.vue'
import useToggle from './hooks/useToggle.js';

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
    const [ visible, toggleVisible ] = useToggle(false);

    return {
      visible, toggleVisible, state, setState
    }
  }
}
</script>

<style></style>
