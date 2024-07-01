import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();
  return (
    <div>
      <h1>Router Page: {router.query.slug}</h1>
      <div>
        <button
          type="button"
          onClick={() => {
            router.push({ pathname: '/[slug]', query: { slug: 'push' } });
          }}
        >
          PUSH
        </button>
        <br />
        <button
          type="button"
          onClick={() => {
            router.replace({ pathname: '/[slug]', query: { slug: 'pushs' } });
          }}
        >
          REPLACE
        </button>
        <br />
        <button
          type="button"
          onClick={() => {
            router.reload();
          }}
        >
          RELOAD
        </button>
        <br />
        <div>
          <Link href={'/hello'}>HELLO</Link>
        </div>
        <br />
        <div>
          <Link href={'/bye'}>BYE</Link>
        </div>
      </div>
    </div>
  );
}
