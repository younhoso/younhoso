import {reactive, toRefs} from 'vue'
import http from '@/api/index.js'

const useFatch = (url) => {
  const state = reactive({
    response: [],
    error: null,
    isLoging: true
  });

  (async () => {
    try {
      const res = await http.get(url);
      state.response = res.data.results;
    } catch(error) {
      state.error = error;
    } finally {
      state.isLoging = false;
    }
  })();
  console.log(state)

  return {...toRefs(state)};
}

export default useFatch;