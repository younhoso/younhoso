<template>
  <ul class="mainMenuBox">
    <li v-for="main in mainMenu" :key="main.name" class="mainMenu" :class="{ active: main.name === current }"
      @click="menuGo(main)" @mouseenter="openMenu(main)">
      {{ main.title }}
    </li>
  </ul>
</template>

<script>
import MENU from '@/common/menuGnb'
export default {
  name: 'index-1bf7f2',
  props: [
    'current',
    'isLogin'
  ],
  components: {},
  computed: {
    mainMenu() {
      return this.menu.filter(x => x.name && x.menuBar !== false)
    },
    detectRollover () {
      return this.$route.meta && this.$route.meta.detectRollover
    }
  },
  watch: {},
  data(){
    return {
      introMenu: [ // 마우스오버시 서브메뉴가 노출되는 타입이 아닌 클릭하여 인트로 페이지로 바로 이동
        'club',
        'history',
        'record'
      ]
    }
  },
  setup(){},
  created(){
    this.menu = MENU;
  },
  mounted(){},
  unmounted(){},
  methods: {
    isIntroMenu(menuName) {
      return this.introMenu.includes(menuName)
    },
    menuGo(menu){
      const menuName = menu.name
      const detectRollover = this.detectRollover
      if (menuName && this.isIntroMenu(menuName)) {
        this.$router.push({ name: menu.intro }).catch(() => {})
      }
      if (detectRollover) { // 롤오버 하지않고 첫번째 하위메뉴 링크
        console.log(menu)
        this.$router.push({ name: menu.children? menu.children[0].name : menu.name }).catch(() => {})
      }
    },
    openMenu(menu){
      const detectRollover = this.detectRollover
      if(!detectRollover){
        this.$emit('openMenu', menu)
      }
    }
  }
}
</script>

<style>

</style>