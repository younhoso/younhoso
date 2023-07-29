<template>
  <div>
    <input type="text" v-model="text" @keypress.enter="sendEventEmit"/>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      text: '',
      loading: false
    }
  }, 
  methods: {
    sendEventEmit(){
      this.$emit('send', this.text)
    }
  }

}
</script>

<style>

