<template>
  <div>
    <h1>All Users</h1>
    <ul>
      <li 
          v-for="( item, index ) in $store.state.allUsers"
          :key="index"
          avatar
      >
      <div>{{ item.name }}</div>
      
      </li>
    </ul>

  </div>
</template>
  
<script>  
  export default {
    data() {
      return {
        
      }
    },
    mounted() {
      
    }
  }
</script>
  