import { ref } from 'vue';

const useToggle = (initialValue) => {
  const text = 'useValueState 인자로 넣는것은 값만 넣어야 합니다.'
  if(initialValue.constructor === Object){
    console.warn(text)
  } 
  if(Array.isArray(initialValue)) {
    console.warn(text)
  }
  const visible = ref(initialValue);
  const toggleVisible = () => {
    visible.value = !visible.value
  }

  return [visible, toggleVisible]
};

export default useToggle;