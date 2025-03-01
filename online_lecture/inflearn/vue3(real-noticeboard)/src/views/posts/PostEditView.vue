<template>
  <h2>게시글 수정</h2>
  <hr class="my-4" />
  <PostForm v-model:title="post.title" v-model:content="post.content" @submit.prevent="edit">
    <template #actions>
      <button type="button" class="btn btn-outline-dark" @click="goDetailPage">취소</button>
      <button class="btn btn-primary">수정</button>
    </template>
  </PostForm>

  <AppAlert :items="alerts" />
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { getPostsById, updatePost } from '@/api/posts';
import PostForm from '@/components/posts/PostForm.vue';

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const post = ref({
  title: null,
  content: null,
});

const fetchPost = async () => {
  try {
    const { data } = await getPostsById(id);
    setPost(data);
  } catch (error) {
    console.error(error);
    vAlert(error.message);
  }
};

const setPost = ({ title, content }) => {
  post.value.title = title;
  post.value.content = content;
};

fetchPost();
const edit = async () => {
  try {
    await updatePost(id, { ...post.value });
    vAlert('수정이 완료되었습니다.!', 'success');
    // router.push({ name: 'PostDetail', params: { id } });
  } catch (error) {
    console.error(error);
    vAlert(error.message);
  }
};

const goDetailPage = () => {
  router.push({ name: 'PostDetail', params: { id } });
};

const alerts = ref([]);
const vAlert = (message, type = 'error') => {
  alerts.value.push({ message, type });
  setTimeout(() => {
    alerts.value.shift();
  }, 2000);
};
</script>

<style scoped></style>
