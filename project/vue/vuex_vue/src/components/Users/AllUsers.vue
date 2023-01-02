<template>
  <div>
    <h1>All Users({{ count }})</h1>
    <h1>Seoul Users ({{ seouls }}) ({{ percent }}%)</h1>
    <ul>
      <li 
        v-for="( item, index ) in allUsers"
        :key="index"
        avatar
      >
        <div>{{ item.name }}</div>
        <div class="imgInner">
          <img :src="imageSource(item.src)" :alt="item.userId" />
        </div>
      </li>
    </ul>
  </div>
</template>
  
<script>  
  import { EventBus } from '@/main.js';
  import { mapGetters, mapState } from 'vuex';

  export default {
    data() {
      return {
        
      }
    },
    computed: {
      ...mapGetters({
        count: 'allUsersCount',
        seouls: 'countOfSeoul',
        percent: 'percentOfSeoul'
      }),
      ...mapState(['allUsers'])
    },  
    mounted() {
      EventBus.$on('signUp', users => {
        this.$store.state.allUsers.push(users)
      });
    },
    methods: {
      imageSource: function (name) {
        let src = ''
        try {
          src = require(`@/assets/images/${('' + name).toLowerCase()}`)
        } catch (error) {
          console.warn(error)
          return null
        }
        return src
      },
    }
  }
</script>

<style>
.imgInner{
  width: 100px;
}
.imgInner img{
  width: 100%;
}
</style>
  