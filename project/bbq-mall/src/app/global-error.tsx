'use client';

import { useEffect } from 'react';

import * as Sentry from '@sentry/nextjs';
import Error from 'next/error';

export default function GlobalError({ error }: { error: Error }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body></body>
    </html>
  );
}
