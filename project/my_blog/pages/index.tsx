import ContentHero from '../components/contentHero'
import Layout from '../components/layout'
import Seo from '../components/Seo'

export default function Home() {
  return (
    <Layout>
      <Seo title="홈"/>
      <ContentHero />
    </Layout>
  )
}