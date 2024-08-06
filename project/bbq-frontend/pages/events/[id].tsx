import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { ContentAPI } from '@/apis';
import { Desktop, Mobile } from '@/components/functions';
import { EventPageTemplate } from '@/components/templates';
import { Event } from '@/types';

export default function EventDetailPage() {
  const router = useRouter();
  const { id: eventId } = router.query;

  const [event, setEvent] = useState<Event | undefined>(undefined);

  useEffect(() => {
    if (!eventId) return;
    ContentAPI.Event.get({ id: Number(eventId) })
      .then(res => {
        setEvent(res);
      })
      .catch(err => {
        console.error(err);
      });
  }, [eventId]);

  if (!event) {
    return null;
  }

  return (
    <>
      <Desktop>
        <EventPageTemplate event={event} />
      </Desktop>
      <Mobile>
        <EventPageTemplate.Mobile event={event} />
      </Mobile>
    </>
  );
}
