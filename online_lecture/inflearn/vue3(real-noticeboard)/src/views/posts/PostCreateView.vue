<template>
  <div>게시글 등록</div>
  <hr class="my-4" />
  <PostForm v-model:title="form.title" v-model:content="form.content" @submit.prevent="save">
    <template #actions>
      <button type="button" class="btn btn-outline-dark me-2" @click="goListPage">목록</button>
      <button class="btn btn-primary">저장</button>
    </template>
  </PostForm>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { createPost } from '@/api/posts';
import PostForm from '@/components/posts/PostForm.vue';

const router = useRouter();
const form = ref({
  title: null,
  content: null,
});
const save = () => {
  try {
    createPost({
      ...form.value,
      createdAt: Date.now(),
    });
    router.replace({ name: 'PostList' });
  } catch (error) {
    console.log(error);
  }
};

const goListPage = () => {
  router.push({ name: 'PostList' });
};
</script>

<style lang="scss" scoped></style>
