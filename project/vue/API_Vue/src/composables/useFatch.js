import {reactive, toRefs} from 'vue'

const useFatch = (urlFun, searchText = '') => {
  const state = reactive({
    response: [],
    error: null,
    isLoging: true
  });

  (async () => {
    try {
      const res = await urlFun(searchText);
      state.response = res.data.results;
    } catch(error) {
      state.error = error;
    } finally {
      state.isLoging = false;
    }
  })();

  return {...toRefs(state)};
}

export default useFatch;