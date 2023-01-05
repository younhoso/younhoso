import Index from '@/views/Media.vue'
import List from '@/components/Media/List.vue'

const media = [
  {
    path: '/media',
    name: 'media',
    component: Index,
    redirect: {
      name: 'mediaAll'
    },
    children: [
      {
        path: 'all',
        name: 'mediaAll',
        meta: {
          detectRollover: true, // GNB 롤오버 표시하지 않고 0번째 children으로 링크
          hiddenGnb: true // 스크롤시 gnb 숨김 (scrollTop > 0)
        },
        component: List,
      }
    ]
  }
]

export default media