import { reactive } from 'vue';

const useDataLength = (initialObg = {}, dataCounter = 5) => {
  const state = reactive(initialObg);
  let datas = Array(dataCounter).fill(0).map((_, i) => ({
    id: i + 1,
    timestamp: Date.now(),
    state
  }));
  console.log(datas)
  const setDatas = (newState) => {
    datas = newState(datas)
  }
  return [datas, setDatas];
};

export default useDataLength;