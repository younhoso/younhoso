import FeaturedPosts from '@/components/FeaturedPosts';
import Hero from '@/components/Hero';
import SwiperPosts from '@/components/SwiperPosts';

export default function HomePage() {
  return (
    <section>
      <Hero />
      {/* @ts-expect-error Server Component */}
      <FeaturedPosts />
      {/* @ts-expect-error Server Component */}
      <SwiperPosts />
    </section>
  )
}
