<template>
  <ul>
    <li v-for="(item, idx) in propsdata" v-bind:key="idx">
      <img :src="'https://image.tmdb.org/t/p/w200/'+item.poster_path"/>
      <h4>{{ item.title }}</h4>
      <p>{{ item.overview }}</p>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'MovieList',
  props: ['propsdata'],
}
</script>

<style>

</style>