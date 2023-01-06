import Index from '@/views/Member.vue'
import Signup from '@/components/Member/Signup.vue'

const member = [
  {
    path: '/member',
    name: 'member',
    component: Index,
    children: [
      {
        path: 'signup/:currentStep',
        name: 'signup',
        component: Signup,
        props: true
      },
    ]
  }
];

export default member