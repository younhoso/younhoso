<template>
  <div>
    <div v-for="(itme, idx) in selectList" :key="idx" :class="[{'acvite': isChecked(itme)}, 'default']">
        <input type="checkbox" name="" :id="itme.name" :value="itme.name" v-model="languages">
        <label :for="itme.name">{{ itme.value }}</label>
    </div>
    <div v-for="(item, idx) in languages" :key="`i-${idx}`"> 선택함: {{ item }} </div>
  </div>
</template>

<script>
export default {
  name: 'DataBindingCheckboxView',
  components: {},
  computed: {
    
  },
  watch: {},
  data(){
    return {
      languages: [],
      selectList: [
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
      return this.languages.includes(value.name);
    }
  }
}
</script>

<style>
  .default.acvite{
    font-weight: 600;
    border: 1px solid tomato;
  }
</style>