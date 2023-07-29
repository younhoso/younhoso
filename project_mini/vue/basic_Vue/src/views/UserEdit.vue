<template>
  <div>
    <h1>User Edit</h1>
    {{ userId }}
  </div>
</template>

<script>
export default {
  name: 'UserEdit',
  components: {},
  computed: {
    userId() {
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