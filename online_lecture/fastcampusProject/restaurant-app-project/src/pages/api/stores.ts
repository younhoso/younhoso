// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/db';
import { StoreApiResponse, StoreTypeCustom } from '@/types';

interface ResponseType {
  page?: string;
  limit?: string;
  q?: string;
  district?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoreApiResponse | StoreTypeCustom[] | StoreTypeCustom>,
) {
  const { page = '', limit = '', q, district }: ResponseType = req.query;
  if (req.method === 'POST') {
    // POST 요청 데이터 생성을 처리한다.
    const data = req.body;
    const result = await prisma.store.create({
      data: { ...data },
    });

    return res.status(200).json(result);
  } else if (req.method === 'GET') {
    // GET 요청 처리
    if (page) {
      const count = await prisma.store.count();
      const skipPage = parseInt(page) - 1;
      const stores = await prisma.store.findMany({
        orderBy: { id: 'asc' },
        where: {
          name: q ? { contains: q } : {},
          address: district ? { contains: district } : {},
        },
        take: parseInt(limit),
        skip: skipPage * 10,
      });

      res.status(200).json({
        page: parseInt(page),
        data: stores,
        totalCont: count,
        totalPage: Math.ceil(count / 10),
      });
    } else {
      const { id }: { id?: string } = req.query;

      const stores = await prisma.store.findMany({
        orderBy: { id: 'asc' },
        where: {
          id: id ? parseInt(id) : {},
        },
      });

      return res.status(200).json(id ? stores[0] : stores);
    }
  }
}
