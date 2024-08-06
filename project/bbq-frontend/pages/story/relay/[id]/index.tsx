import { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { ContentAPI } from '@/apis';
import { RelayDetailPageTemplate } from '@/components/templates';
import { Relay } from '@/types';
import { parseApiError } from '@/utils';

export default function RelayDetailPage() {
  const router = useRouter();
  const { id: relayId } = router.query;

  const [relay, setRelay] = useState<Relay | undefined>(undefined);

  useEffect(() => {
    if (!relayId) return;
    ContentAPI.Relay.get({ id: Number(relayId) })
      .then(res => {
        setRelay(res);
      })
      .catch(err => {
        console.error(err);
        router.push('/story/relay');
      });
  }, [relayId]);

  const handleDeleteButtonClick = useCallback(() => {
    if (!relay) return;
    if (!relay.id) return;
    if (!confirm('정말 삭제하시겠습니까?')) return;
    ContentAPI.Relay.delete({ id: Number(relayId) })
      .then(res => {
        alert('삭제했습니다.');
        router.push('/story/relay');
      })
      .catch(err => {
        console.error(err);
        alert(parseApiError(err).message);
      });
  }, [relay]);

  if (!relay) {
    return null;
  }

  return (
    <>
      <RelayDetailPageTemplate relay={relay} handleDeleteButtonClick={handleDeleteButtonClick} />
    </>
  );
}
