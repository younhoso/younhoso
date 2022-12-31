<template>
  <div>
    <select :value="select" @change="setSelect($event)">
      <option
        v-for="(item, index) in selectList"
        :key="index"
        :value="item.value"
        >{{ item.name }}</option
      >
    </select>

    <span>선택 value: {{ select }}</span>
    <div v-if="snackbarFlag">
      선택: {{ text }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataBindingSelectView',
  components: {},
  computed: {},
  watch: {},
  data(){
    return {
        select: '',
        text: '',
        snackbarFlag: false,
        selectList: [
          {name: '선택해주세요.', value: ''},
          {name: 'name1', value: 'a'},
          {name: 'name2', value: 'b'},
          {name: 'name3', value: 'c'}
        ]
    }
  },
  setup(){},
  created(){},
  mounted(){},
  unmounted(){},
  methods: {
    setSelect(e) {
      const asisSelect = this.select;
      this.select = e.target.value;
      if(this.select === this.selectList[1].value){
        this.text = this.selectList[1].value + "선택불가!!";
        this.snackbarFlag = true;
        this.select = asisSelect;
      } else {
        this.snackbarFlag = false;
      }
    }
  }
}
</script>

<style>

</style>