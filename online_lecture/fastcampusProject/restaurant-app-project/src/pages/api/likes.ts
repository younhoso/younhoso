import { authOptions } from './auth/[...nextauth]';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

import prisma from '@/db';
import { LikeApiResponse, LikeInterface } from '@/types';

type ErrorResponse = { error: string };

interface ResponseType {
  limit?: string;
  page?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LikeInterface | LikeApiResponse | ErrorResponse>,
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user) {
    return res.status(401);
  }

  if (req.method === 'POST') {
    //찜하기 로직 처리
    const { storeId }: { storeId: number } = req.body;

    try {
      // Like 데이터가 있는지 확인
      let like = await prisma.like.findFirst({
        where: {
          storeId,
          userId: session?.user?.id,
        },
      });

      // 만약 이미 찜을 했다면, 해당 like 데이터 삭제. 아니라면, 데이터 생성
      if (like) {
        // 이미 찜을 한 상황
        like = await prisma.like.delete({
          where: {
            id: like.id,
          },
        });
        return res.status(204).json(like);
      } else {
        // 찜을 하지 않은 상황
        like = await prisma.like.create({
          data: {
            storeId,
            userId: session?.user?.id,
          },
        });

        return res.status(201).json(like);
      }
    } catch (error) {
      console.error('Prisma Error:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'GET') {
    const count = await prisma.like.count({
      where: {
        userId: session.user.id,
      },
    });

    const { limit = '10', page = '1' }: ResponseType = req.query;
    const skipPage = parseInt(page) - 1;

    try {
      const likes = await prisma.like.findMany({
        orderBy: { createAt: 'desc' },
        where: {
          userId: session.user.id,
        },
        include: {
          store: true,
        },
        take: parseInt(limit),
        skip: skipPage * parseInt(limit),
      });

      return res.status(200).json({
        data: likes,
        page: parseInt(page),
        totalPage: Math.ceil(count / parseInt(limit)),
      });
    } catch (error) {
      console.error('Prisma Error:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
