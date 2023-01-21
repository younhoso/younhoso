<template>
  <div>
    {{ username }}
    {{ age }}
    <br/>
    <input type="text" v-model="username">
    <br/>
    <button @click="changeFu">버튼</button>
  </div>
</template>

<script>
import useObjectState from '@/composables/useObjectState.js';
export default {
  name: 'App-22299e',
  setup(){
    const [stateObject, setStateObject] = useObjectState({
      username: 'TriplxLab',
      age: 50
    });
    return {...stateObject, setStateObject}
	},
  methods: {
    changeFu() {
      this.setStateObject(() => {
        this.username = '1'
        this.age = '1'
      })
    }
  }
}
</script>

<style>

</style>