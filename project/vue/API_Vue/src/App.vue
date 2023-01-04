<template>
  <div>
    <SearchBar @send="searchMovis"/>
    <MovieList v-bind:propsdata="items" />
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue';
import MovieList from '@/components/MovieList.vue';
import {apis} from '@/api/index';

export default {
  name: 'App',
  data(){ //state 초기값
    return {
      items: []
    }
  },
  methods: {
    async searchMovis(txt){
      const response = await apis.search(txt);
      this.items = response.data.results
    },
    async getMoview() {
      const response = await apis.getmovie();
      this.items = response.data.results
    }
  },
  computed:{

  },
  created() {
    this.getMoview()
  },
  components: {
    SearchBar,
    MovieList
  }
}
</script>

<style>

</style>