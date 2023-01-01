<template>
  <div>
    <h1>User</h1>
    <p>유저를 검색해 주세요.</p>
    <div>
      <input type="text" placeholder="유저 번호를 입력해주세요." v-model="userId">
    </div>
    <button @click="path">검색</button>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'UserViews',
  components: {},
  watch: {},
  data(){
    return {
      userId: null
    }
  },
  setup(){},
  created(){
    console.log('router', this.$router)
    console.log('route', this.$route)
  },
  mounted(){},
  unmounted(){},
  methods: {
    path() {
      this.$router.push({
        name: 'user-detail', 
        params: {
          id: this.userId
        }
      })
    }
  }
}
</script>

<style>

</style>