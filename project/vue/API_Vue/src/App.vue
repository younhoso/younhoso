<template>
  <div>
    <div v-if="isLoging">로딩중...</div>
    <div v-if="error">서버에 문제가 생겼습니다. 잠시후 다시 이용해주세요.</div>
    <SearchBar @send="searchMovis"/>
    <MovieList v-bind:propsdata="items" />
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue';
import MovieList from '@/components/MovieList.vue';
import useFatch from '@/composables/useFatch.js'
import {apis} from '@/api/index.js'

export default {
  name: 'App',
  data(){ //state 초기값
    return {
      items: [],
      isLoging: false,
      error: null
    }
  },
  methods: {
    async searchMovis(searchText){
      const {response, isLoging, error} = useFatch(apis.search, searchText);
      this.items = response;
      this.isLoging = isLoging;
      this.error = error;
    },
    getMoview() {
      const {response, isLoging} = useFatch(apis.getmovie);
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