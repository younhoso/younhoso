<template>
  <div>
    <div class="topTitle">
      <div class="title">전북현대<br>회원가입 동의과정</div>
      <div class="subTitle">전북현대모터스에프씨 웹사이트 가입을 위한 동의과정입니다.<br>필수 동의 항목은 미동의 시 가입이 불가능합니다.</div>
    </div>
    <!-- 동의사항 -->
    <div
      v-for="item in agree"
      :key="item.name"
      class="agreeBox">
      <div class="agreeLabel">
        {{item.label}} <span class="required">({{item.required ? '필수' : '선택'}})</span>
      </div>
      <div class="agreeContent">
        <div class="textarea" v-html="item.content"></div>
      </div>
      <div class="checkAgree">
        <div class="checkbox radio">
          <input
            type="radio"
            :name="item.name"
            :id="`${item.name}_y`"
            value="y"
            v-model="item.agree">
          <label :for="`${item.name}_y`">동의</label>
        </div>
        <div class="checkbox radio">
          <input
            type="radio"
            :name="item.name"
            :id="`${item.name}_n`"
            value="n"
            v-model="item.agree">
          <label :for="`${item.name}_n`">미동의</label>
        </div>
      </div>
    </div>
    <!-- //동의사항 -->
    <!-- 전체동의 -->
    <div class="agreeAll">
      <p class="label">상기 모든 내용(선택항목 포함)을 동의하시겠습니까?</p>
      <div class="checkAgree">
        <div class="checkbox radio">
          <input
            type="radio"
            name="agree_all"
            id="agree_all_y"
            v-model="agreeAll_yn"
            value="y"
            @change="setAgreeAll(true)">
          <label for="agree_all_y">동의</label>
        </div>
        <div class="checkbox radio">
          <input
            type="radio"
            name="agree_all"
            id="agree_all_n"
            v-model="agreeAll_yn"
            value="n"
            @change="setAgreeAll(false)">
          <label for="agree_all_n">미동의</label>
        </div>
      </div>
    </div>
    <!-- //전체동의 -->
    <div class="memberBtns">
      <button type="button" class="btn large mobileFull primary1" @click="nextStep">신규 회원가입<br>(통합 회원가입)</button>
    </div>
  </div>
</template>

<script>
import terms from '@/library/terms'
export default {
  name: 'SignupStep2',
  computed: {
    validate () {
      const disagree = this.agree.filter(x => {
        return x.required && (x.agree === 'n' || x.agree === '')
      }).map(x => x.label)
      return {
        result: disagree.length === 0,
        disagree: disagree.join(', ')
      }
    }
  },
  mounted() {
    document.getElementsByTagName('html')[0].classList.add('memberPage')
    document.getElementsByTagName('body')[0].classList.add('memberPage')
  },
  data () {
    return {
      agreeAll_yn: '',
      agreeAll: true,
      agree: [
        {
          name: 'agree_1',
          label: '이용약관',
          required: true,
          content: terms.terms, // 추후 policy에 별도 html 불러오는 형태
          agree: ''
        },
        {
          name: 'agree_2',
          label: '개인정보 수집 및 이용에 대한 안내',
          required: true,
          content: terms.policy_1,
          agree: ''
        },
        {
          name: 'agree_3',
          label: '개인정보 처리위탁 안내',
          required: true,
          content: terms.policy_2,
          agree: ''
        },
        {
          name: 'agree_4',
          label: '개인정보의 마케팅 활용 및 광고성 메시지 수신 동의',
          required: false,
          content: terms.policy_3,
          agree: ''
        }
      ]
    }
  },
  methods: {
    setAgreeAll (agreeAll) {
      this.agree = this.agree.map(x => {
        return {
          ...x,
          agree: agreeAll ? 'y' : 'n'
        }
      })
      this.agreeAll_yn = agreeAll
    },
    nextStep () {
      if (this.validate.result) {
        this.$emit('nextStep', '3')
      } else {
        alert(`${this.validate.disagree}\n항목에 동의하지 않으셨습니다.`)
      }
    }
  },
  beforeDestroy() {
    document.getElementsByTagName('html')[0].classList.remove('memberPage')
    document.getElementsByTagName('body')[0].classList.remove('memberPage')
  },
}
</script>
