<template>
  <div>
    <div v-for="(item, idx) in radioList" :key="idx" :class="[{'acvite':isChecked(item)}, 'default']">
      <input type="radio" :id="item.name" :value="item.name" v-model="picked">
      <label :for="item.name">{{item.name}}</label>
      <br>
    </div>
    <span>Picked: {{ picked }}</span>
  </div>
</template>

<script>
export default {
  name: 'DataBindingRadioView',
  components: {},
  computed: {},
  watch: {},
  data(){
    return {
      picked: '',
      radioList: [
        {name: 'HTML', value: 'HTML'},
        {name: 'CSS', value: 'CSS'},
        {name: 'JS', value: 'JavaScript'}
      ]
    }
  },
  setup(){},
  created(){},
  mounted(){},
  unmounted(){},
  methods: {
    isChecked(value) {
      return this.picked.includes(value.name)
    }
  }
}
</script>

<style>

</style>