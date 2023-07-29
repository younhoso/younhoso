<template>
  <div>
    <h1>SignUp</h1>
    <input
      label="아이디"
      v-model="userId"
    />
    <input
      label="비밀번호"
      type="password"
      v-model="password"
    />
    <input
      label="이름"
      v-model="name"
    />
    <input
      label="주소"
      v-model="address"
    />
    <input
      label="이미지"
      v-model="src"
    />
    <button @click="signUpAdd">회원가입</button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'SingnUp',
  components: {},
  computed: {},
  watch: {},
  data(){
    return {
      userId: null,
      password: null,
      name: null,
      address: null,
      src: null
    }
  },
  setup(){},
  created(){},
  mounted(){},
  unmounted(){},
  methods: {
    ...mapMutations(['addUsers']),
    signUpAdd() {
      let userObj = {
        userId: this.userId,
        password: this.password,
        name: this.name,
        address: this.address,
        src: this.src
      }
      this.addUsers(userObj);
      this.clearForm()
    },
    clearForm(){
      this.userId = null,
      this.password = null,
      this.name = null,
      this.address = null,
      this.src = null
    }
  },
}
</script>

<style>

</style>