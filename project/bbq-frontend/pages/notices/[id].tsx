import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { ContentAPI } from '@/apis';
import { Desktop, Mobile } from '@/components/functions';
import { BoardNoticePageTemplate } from '@/components/templates';
import { Notice } from '@/types';

export default function NoticePage() {
  const router = useRouter();
  const { id: noticeId } = router.query;

  const [notice, setNotice] = useState<Notice | undefined>(undefined);

  useEffect(() => {
    if (!noticeId) return;
    ContentAPI.Notice.get({ id: Number(noticeId) })
      .then(res => {
        setNotice(res);
      })
      .catch(err => {
        console.error(err);
        router.push('/board/notices');
      });
  }, [noticeId]);

  if (!notice) {
    return null;
  }

  return (
    <>
      <Desktop>
        <BoardNoticePageTemplate notice={notice} />
      </Desktop>
      <Mobile>
        <BoardNoticePageTemplate.Mobile notice={notice} />
      </Mobile>
    </>
  );
}
