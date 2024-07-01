import { useRouter } from 'next/router';

export default function StoreEditPage() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <h1>Stroe Detail: {id}</h1>
    </div>
  );
}
