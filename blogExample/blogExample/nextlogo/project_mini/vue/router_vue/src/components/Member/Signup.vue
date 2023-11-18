<template>
  <div class="memberBox wide">
    <div class="step">
      <div
        v-for="step in steps"
        :key="step.id"
        class="item"
        :class="{active: step.id === currentStep}">
        <div class="num"><span>{{step.id}}</span></div>
        <div class="label" v-html="step.name"></div>
      </div>
    </div>
    <SignupStep1
      v-if="currentStep === '1'"
      @nextStep="nextStep" />
    <SignupStep2
      v-else-if="currentStep === '2'"
      @nextStep="nextStep" />
  </div>
</template>

<script>
import SignupStep1 from '@/components/Member/SignupStep1'
import SignupStep2 from '@/components/Member/SignupStep2'

export default {
  name: 'MemberSignup',
  props: [
    'currentStep'
  ],
  components: {
    SignupStep1,
    SignupStep2
  },
  computed: {
    stepInfo () {
      const current = this.currentStep
      return this.steps.find(x => x.id === current)
    }
  },
  mounted () {
  },
  data () {
    return {
      steps: [
        { id: '1', name: '회원가입<br>안내' },
        { id: '2', name: '동의과정' },
        { id: '3', name: '본인인증' },
        { id: '4', name: '회원정보<br>입력' },
        { id: '5', name: '회원정보<br>통합' }
      ],
      certType: null,
      certInfo: null,
      migration: null,
    }
  },
  methods: {
    nextStep (step) {
      this.$router.push({
        params: {
          currentStep: step
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
