<template>
  <div>
    <button @click="setState()">test</button>
    <h2 v-if="state">ddddd</h2>
    <br/>
    <setup :useName="useName"/>
  </div>
</template>

<script>
import useToggle from '@/hooks/useToggle';
import setup from '@/components/setup.vue'

export default {
  name: 'App-22299e',
  components: {
    setup,
  },
  computed: {},
  watch: {},
  data(){
    return {
      useName: {
        id: 1,
        type: 'test',
        default: "I'm default"
      }
    }
  },
  setup(){
    const [state, setState] = useToggle();
    return {
      state,
      setState
    }
  },
  created(){},
  mounted(){},
  unmounted(){},
  methods: {
    onClick(){ 
      console.log(this)
    }
  }
}
</script>

<style>

</style>