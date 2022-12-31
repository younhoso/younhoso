<template>
  <div id="app">
    <nav>
      <ul>
        <li>
          <router-link to="/">Home</router-link>/
        </li>
         <li>
          <button @click="onClick">user</button>
        </li>
        <li>
          <button @click="onClickcareer">career</button>
        </li>
        <li>
          <button @click="onClickIntend">Intend</button>
        </li>
        <li>
          <button @click="onClickSelect">select</button>
        </li>
        <li>
          <button @click="onClickCheck">check</button>
        </li>
        <li>
          <button @click="onClickRadio">radio</button>
        </li>
      </ul>
      <router-view />
    </nav>
  </div>
</template>

<script>
export default {
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
    },
    onClickcareer () {
      this.$router.push(
        {
          name: 'career'
        }
      ).catch(() => {})
    },
    onClickIntend () {
      this.$router.push(
        {
          name: 'intend'
        }
      ).catch(() => {})
    },
    onClickSelect () {
      this.$router.push(
        {
          name: 'select'
        }
      ).catch(() => {})
    },
    onClickCheck () {
      this.$router.push(
        {
          name: 'check'
        }
      ).catch(() => {})
    },
    onClickRadio () {
      this.$router.push(
        {
          name: 'radio'
        }
      ).catch(() => {})
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