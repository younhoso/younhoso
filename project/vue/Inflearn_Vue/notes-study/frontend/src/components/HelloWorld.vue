<template>
  <div class="hello">

    <p :class="[$style.red]">ddd</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  created(){
    console.log(this)
  }
}
</script>

<style></style>
