<template>
  <div>
    <button @click="toggleVisible()">test</button>
    <h2 v-if="visible">ddddd</h2>
  </div>
</template>

<script>
import useToggle from '@/hooks/useToggle'
export default {
  name: 'App-22299e',
  components: {},
  computed: {},
  watch: {},
  data(){
    return {
      
    }
  },
  setup(){
    const [visible, toggleVisible] = useToggle();
    return {
      visible,
      toggleVisible
    }
  },
  created(){},
  mounted(){},
  unmounted(){},
  methods: {}
}
</script>

<style>

</style>