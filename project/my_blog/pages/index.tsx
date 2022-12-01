import Animation from '../components/Animation'
import ContentHero from '../components/ContentHero'
import Layout from '../components/Layout'
import Seo from '../components/Seo'

export default function Home() {
  return (
    <Layout>
      <Seo title="홈"/>
      <div className='p-4 lg:w-1/2'>
        <ContentHero />
      </div>
      <div className='p-4 lg:w-1/2'>
        <Animation />
      </div>
    </Layout>
  )
}