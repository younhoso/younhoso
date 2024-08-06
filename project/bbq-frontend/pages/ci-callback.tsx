import { useEffect, useState } from 'react';

import { NextPageContext } from 'next';

export default function CICallbackPage({
  token,
  verifyType,
}: {
  token: string | null;
  verifyType: string | null;
}) {
  const [sent, setSent] = useState<boolean>(false);
  useEffect(() => {
    if (sent || !token || !verifyType) return;

    window.parent.postMessage(
      `@@cicallback@@$${JSON.stringify({
        token: token,
        verifyType: verifyType,
      })}`,
      '*',
    );

    setSent(true);
  }, [sent, token, verifyType]);
}

export async function getServerSideProps(context: NextPageContext) {
  const { req } = context;

  if (!req) {
    return { props: { token: null, verifyType: null } };
  }

  if (req.method === 'POST') {
    let body = '';
    for await (const chunk of req) {
      body += chunk;
    }

    try {
      const parsedBody = {
        token:
          (body.split('&').filter(s => s.startsWith('token='))[0] ?? '').split('token=')[1] ??
          (body.split('&').filter(s => s.startsWith('TOKEN='))[0] ?? '').split('TOKEN=')[1],
        verifyType:
          (body.split('&').filter(s => s.startsWith('verifyType='))[0] ?? '').split(
            'verifyType=',
          )[1] ??
          (body.split('&').filter(s => s.startsWith('VERIFY_TYPE='))[0] ?? '').split(
            'VERIFY_TYPE=',
          )[1],
      };
      return {
        props: {
          token: parsedBody.token ?? null,
          verifyType: parsedBody.verifyType ?? null,
        },
      };
    } catch (e) {
      console.error('Failed to parse JSON body:', e);
    }
  }

  return { props: { token: null, verifyType: null } };
}
