<template>
  <div>
    <div v-if="isLoging">로딩중...</div>
    <div v-if="error">서버에 문제가 생겼습니다. 잠시후 다시 이용해주세요.</div>
    <SearchBar @send="searchMovis"/>
    <MovieList v-bind:propsdata="response" />
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue';
import MovieList from '@/components/MovieList.vue';
import useFatch from '@/composables/useFatch.js'
import http from '@/api/index.js'

export const apis = {
  //search get
  search: (options) => http.get(`/search/movie?api_key=${process.env.VUE_APP_API_KEY}&language=ko-KR&${options}`),
  getmovie: () => http.get(`/movie/popular?api_key=${process.env.VUE_APP_API_KEY}&language=ko-KR&page=1`),
}

export default {
  name: 'App',
  data(){ //state 초기값
    return {
      
    }
  },
  setup(){
    const {response, isLoging, error, encoding} = useFatch(); //최총 브라우저 로딩
    encoding(apis.getmovie)
    return {response, isLoging, error, encoding}
  },
  methods: {
    searchMovis(searchText){
      this.encoding(apis.search, {query: searchText}) //특정 이벤트가 발생했을 시점
      this.isLoging = true;
      this.error = null;
    }
  },
  computed:{

  },
  created() {
  },
  components: {
    SearchBar,
    MovieList
  }
}
</script>

<style>

</style>