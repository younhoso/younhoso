<template>
  <div>
    <ul v-for="data in datas" :key="data.id">
      <li>
        {{ data.id }}
        {{ date(data.timestamp) }}
      </li>
    </ul>
    <button >이름 변경</button>
    <input type="text" v-model="name" />
    <input type="text" v-model="email" />
  </div>
</template>

<script>
// import useObjectState from '@/composables/useObjectState'
import useDataLength from '@/composables/useDataLength'

export default {
  name: 'setup-668643',
  props: ['useName'],
  components: {},
  computed: {},
  watch: {},
  data(){
    return {
      name: "",
      email: ""
    }
  },
  setup({useName}){
    const init = {
      useName
    }
    // const [stateObject, setStateObject] = useObjectState(init);
    const [datas, setDatas] = useDataLength(init, 10);
    return {
      datas,
      setDatas
    }

  },
  created(){},
  methods: {
    date(timestamp) {
      return new Date(timestamp).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
    }
  }
}
</script>

<style>

</style>