<template>
  <div>
    <h1>User</h1>
    이 유저는 {{userId}} 입니다.
  </div>
</template>

<script>
export default {
  name: 'UserViews',
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
  created(){
    console.log('router', this.$router)
    console.log('route', this.$route)
  },
  mounted(){},
  unmounted(){},
  methods: {}
}
</script>

<style>

</style>