<template>
  <div>
    <h2>About View</h2>
    <p>{{ $route.path }}</p>
    <p>{{ $route.name }}</p>
    <button class="btn btn-primary" @click="$router.push('/')">Home으로 이동</button>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
