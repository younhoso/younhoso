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
          role: 'list',
          subName: 'all'
        },
        component: List,
      }
    ]
  }
]

export default media