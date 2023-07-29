import {reactive, toRefs} from 'vue'

/**
 * 
 * @returns object, function 
 * @example
 * setup(){ response(데이터), isLoging, error, encoding들을 사용할수 있습니다.
 *   const {response, isLoging, error, encoding} = useFatch();
 *   encoding(apis.search, {query: searchText})
 *   return {response, isLoging, error}
 * }
 */
const useFatch = () => {
  const state = reactive({
    response: [],
    error: null,
    isLoging: true
  });

  const encoding = async (urlFun, options = {}) => {
    let params = '';
    if(typeof urlFun !== 'function') {
      console.warn('encoding 첫번째 인자로 넣는것은 API URL이 담긴 메소드(함수)만 넣어야 합니다.')
    }
    if(typeof options === 'object') {
      //options(object)값들을 -> Parameter문자로 변경합니다.
      const queryString = Object.entries(options).map(el => encodeURIComponent(el[0]) + '=' + encodeURIComponent(el[1])).join('&')
      params = queryString;
    } else {
      console.warn('encoding 두번째 인자로 넣는것은 object만 넣어야 합니다.')
    }

    try {
      const res = await urlFun(params)
      state.response = res.data.results;
    } catch(error) {
      state.error = error;
    } finally {
      state.isLoging = false;
    }
  };

  return {...toRefs(state), encoding};
}

export default useFatch;