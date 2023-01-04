import { ref, readonly, onUnmounted } from 'vue';

const useScrollCurrent = () => {
  const progress = ref(0);

  const onScroll = () => {
    const bodyHeight = document.documentElement.clientHeight;
    const currentScroll = window.scrollY;

    progress.value = currentScroll / bodyHeight;
  }

  window.addEventListener('scroll', onScroll);

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll);
  });

  return { progress: readonly(progress) };
}

export default useScrollCurrent;