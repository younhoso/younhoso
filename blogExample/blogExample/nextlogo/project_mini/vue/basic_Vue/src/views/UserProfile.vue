<template>
  <div>
    UserProfile
    <h2>{{userId}}</h2>
  </div>
</template>

<script>
export default {
  name: 'UserProfile',
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
  methods: {}
}
</script>

<style>

</style>