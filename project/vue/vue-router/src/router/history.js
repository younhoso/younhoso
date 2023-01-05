import Index from '@/views/History.vue'
import Intro from '@/components/History/Intro.vue'

const history = [
  {
    path: '/history',
    name: 'history',
    meta: {
      detectRollover: true, // GNB 롤오버 표시하지 않고 0번째 children으로 링크
      hiddenGnb: true // 스크롤시 gnb 숨김 (scrollTop > 0)
    },
    component: Index,
    children: [
      {
        path: 'intro',
        name: 'intro',
        component: Intro
      }
    ]
  }
]

export default history