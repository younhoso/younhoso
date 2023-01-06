<template>
  <div>
    {{stateObject.defaults.default}}
    <button @click="onClick">이름 변경</button>
  </div>
</template>

<script>
import useObjectState from '@/composables/useObjectState'
export default {
  name: 'setup-668643',
  props: ['useName'],
  components: {},
  computed: {},
  watch: {},
  data(){
    return {
      
    }
  },
  setup({useName}){
    const datas = {
      id: 1,
      defaults: useName
    }
    const [stateObject, setStateObject] = useObjectState(datas);
    return {
      stateObject,
      setStateObject
    }
  },
  created(){},
  mounted(){},
  unmounted(){},
  methods: {
    onClick() {
      this.setStateObject(this.stateObject.defaults.default = 'test')
    }
  }
}
</script>

<style>

</style>