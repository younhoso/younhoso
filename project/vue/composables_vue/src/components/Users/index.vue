<template>
  <div>
    Count: {{ state.count }}
    <button @click="dispatch({ type: 'decrement', mode: {step: 2} })">
      -
    </button>
    <button @click="dispatch({ type: 'increment', mode: {step: 2} })">
      +
    </button>
  </div>
</template>

<script>
import useReducer from '@/composables/useReducer.js';
import {reducer, initialState} from '@/common/computed.js'
export default {
  name: 'index-dc995a',
  components: {},
  computed: {},
  watch: {},
  data(){
    return {
     
    }
  },
  setup(){
    const [state, dispatch] = useReducer(reducer, initialState);
    return {
      state,
      dispatch
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