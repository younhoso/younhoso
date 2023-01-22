<template>
  <div>
    <div v-if="isLoging">로딩중...</div>
    <SearchBar @send="searchMovis"/>
    <MovieList v-bind:propsdata="items" />
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue';
import MovieList from '@/components/MovieList.vue';
import useFatch from '@/composables/useFatch.js'

export default {
  name: 'App',
  data(){ //state 초기값
    return {
      items: [],
      isLoging: false
    }
  },
  methods: {
    async searchMovis(text){
      const {response, isLoging} = useFatch(`/search/movie?api_key=${process.env.VUE_APP_API_KEY}&language=ko-KR&query=${text}`);
      this.items = response;
      this.isLoging = isLoging;
    },
    getMoview() {
      const {response, isLoging} = useFatch(`/movie/popular?api_key=${process.env.VUE_APP_API_KEY}&language=ko-KR&page=1`);
      this.items = response
      this.isLoging = isLoging;
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