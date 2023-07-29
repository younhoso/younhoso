<template>
  <div>
    <Gnb 
      :current="currentMenu"
      @openMenu="openMenu"
    />
  </div>
</template>

<script>
import Gnb from '@/components/Gnb'
export default {
  name: 'Header-cf2b03',
  components: {
    Gnb
  },
  computed: {},
  watch: {},
  data(){
    return {
      currentMenu: null,
      dimmMenu: false,
    }
  },
  setup(){},
  created(){},
  mounted(){},
  unmounted(){},
  methods: {
    openMenu (menu) {
      this.currentMenu = menu.name
      this.dimmMenu = menu.intro
    },
  }
}
</script>

<style>

</style>