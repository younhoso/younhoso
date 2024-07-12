// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';

import { StoreTypeCustom } from '@/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoreTypeCustom[]>,
) {
  const prisma = new PrismaClient();
  const stores = await prisma.store.findMany();

  res.status(200).json(stores);
}
