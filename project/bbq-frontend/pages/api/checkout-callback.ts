import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const orderId = req.body.orderId;

    if (!orderId || !orderId.trim().length) {
      return res.status(400).send('잘못된 접근입니다.');
    }

    return res.redirect(302, `/checkout/complete/${orderId}`);
  } else {
    return res.status(405).send('허용되지 않은 접근입니다.');
  }
}
