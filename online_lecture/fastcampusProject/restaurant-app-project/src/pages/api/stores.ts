// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { DataItem, StoreType } from '@/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse<DataItem[]>) {
  const data = await import('../../data/store_data.json');
  const stores = (data as { default: StoreType }).default.DATA;

  res.status(200).json(stores);
}
