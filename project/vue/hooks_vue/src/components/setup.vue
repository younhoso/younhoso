<template>
  <div>
    {{stateObject.defaults.default}}
    <button @click="onClick">이름 변경</button>
  </div>
</template>

<script>
import useObjectState from '@/hooks/useObjectState'
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
  setup(props){
    const datas = {
      id: 1,
      defaults: props.useName
    }
    const [stateObject, setStateObject] = useObjectState(datas);
    console.log(stateObject)
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