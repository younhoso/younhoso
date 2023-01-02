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
  import { EventBus } from '@/main.js';
  export default {
    data() {
      return {
        
      }
    },
    mounted() {
      EventBus.$on('signUp', users => {
        this.$store.state.allUsers.push(users)
      });
    }
  }
</script>
  