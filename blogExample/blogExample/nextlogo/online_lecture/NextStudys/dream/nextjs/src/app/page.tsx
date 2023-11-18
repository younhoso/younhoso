import Image from 'next/image'
import styles from './page.module.css'
import Counter from '@/components/Counter'

export default function Home() {
  console.log('안녕!!')
  return (
    <>
      <h1>홈페이지다!!!!</h1>
      <Counter />
    </>
  )
}
