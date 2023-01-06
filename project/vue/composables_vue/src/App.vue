<template>
  <div>
    <setup :useName="useName"/>
    <Users />
  </div>
</template>

<script>
import setup from '@/components/setup.vue';
import Users from '@/components/Users/index.vue'

export default {
  name: 'App-22299e',
  components: {
    setup,
    Users
  },
  computed: {},
  watch: {},
  data(){
    return {
      useName: {
        id: 1,
        type: 'test',
        default: "I'm default"
      }
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