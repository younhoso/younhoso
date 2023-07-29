<template>
  <div>
    <div class="topTitle">
      <div class="title">전북현대 <span class="pcBreak">통합 회원가입 안내</span></div>
      <div class="subTitle">전북현대모터스에프씨 웹사이트 통합 회원가입에 대한 안내입니다.<br>기존 회원분들도 웹, 앱, 초록이네, 그린스쿨 이용을 위해 통합가입을 진행하셔야 합니다.</div>
      <button type="button" class="btn large primary1" @click="nextStep">신규 회원가입<br>(통합 회원가입)</button>
    </div>
    <div class="signupQna">
      <div class="inner">
        <div class="q">통합 회원은 <span class="pcBreak">무엇인가요?</span></div>
        <div class="a">전북현대 기존 웹사이트, 모바일 애플리케이션, 초록이네, 그린스쿨 사이트의 아이디 제도를 통합하여 하나의 아이디로 여러 사이트를 사용 하실 수 있도록 통합 회원제도를 운영합니다!</div>
      </div>
      <div class="inner">
        <div class="q">기존 모바일 앱 아이디가<span class="pcBreak"> 기억나지 않아요.</span></div>
        <div class="a">기존 아이디가 기억이 나지 않을 시 '아이디 찾기'를 하셔야합니다. 통합 회원가입 이전의 회원 분들은 아이디를 찾지 못하셨을 경우 '통합 회원가입'을 진행해주셔야 하며, 가입 시 본인인증절차를 하시면 기존 아이디가 자동으로 입력됩니다.</div>
      </div>
      <div class="inner">
        <div class="q">통합 회원가입은 <span class="pcBreak">어떻게 하나요?</span></div>
        <div class="a">기존 모바일 앱에 가입한 적이 있으실 경우, 사용하셨던 모바일 앱 아이디를 이용하여 통합 회원가입을 해주시면 됩니다. 모바일 앱에 가입한 적이 없는 회원은 새 아이디를 개설한 뒤 동의과정을 걸쳐 패밀리 사이트의 가입 및 내역을 통합하여 사용할 수 있습니다.</div>
      </div>
      <div class="inner">
        <div class="q">통합 회원을 통해 무엇을 <span class="pcBreak">제공 받을 수 있나요?</span></div>
        <div class="a">통합 회원가입 제도를 통하여 흩어져 있던 전북현대와 관련된 각종 구매, 예매 내역을 한 곳에 모아 편하게 보실 수 있습니다.</div>
      </div>
      <div class="inner">
        <div class="q">통합 회원가입은 <span class="pcBreak">안전한가요?</span></div>
        <div class="a">새 웹사이트와 모바일 앱 출시 그리고 통합 회원제도의 개인정보 관리 시스템을 보다 더 체계적으로 도입하여 회원의 소중한 개인정보를 안전하게 처리합니다.</div>
      </div>
      <div class="inner">
        <div class="q">멤버십 회원 포인트는 <span class="pcBreak">어떻게 되나요?</span></div>
        <div class="a">기존 멤버십 회원일 경우 보유하고 있던 포인트는 전북현대 통합 포인트로 구축될 예정입니다. 이는 입장권 및 MD 구매 시 사용 가능합니다.</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignupStep1',
  mounted() {
    document.getElementsByTagName('html')[0].classList.add('memberPage')
    document.getElementsByTagName('body')[0].classList.add('memberPage')
  },
  methods: {
    nextStep () {
      this.$emit('nextStep', '2')
    }
  },
  beforeDestroy() {
    document.getElementsByTagName('html')[0].classList.remove('memberPage')
    document.getElementsByTagName('body')[0].classList.remove('memberPage')
  },
}
</script>

<style lang="scss" scoped>

</style>
