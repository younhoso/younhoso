<template>
  <div>
    <h1>User Detail</h1>
    유저 번호: {{ userId }}

    <button @click="edit">수정</button>
  </div>
</template>

<script>
export default {
  name: 'UserDetail',
  components: {},
  computed: {
    userId(){
      return this.$route.params.id
    }
  },
  watch: {},
  data(){
    return {
      
    }
  },
  setup(){},
  created(){},
  mounted(){},
  unmounted(){},
  methods: {
    edit() {
      this.$router.push({name: 'user-edit'})
    }
  }
}
</script>

<style>

</style>