// https://nextjs.org/docs/pages/building-your-application/data-fetching/incremental-static-regeneration
import type { GetStaticProps, InferGetStaticPropsType } from 'next';

type Repo = {
  name: string;
  stargazers_count: number;
};

export default function Page({ number }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <h1>ISR</h1>
      <h2>number: {number}</h2>
    </div>
  );
}

export const getStaticProps = async () => {
  const num = await fetch(
    'https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain',
  );
  const number = await num.json();
  return { props: { number }, revalidate: 5 };
};
