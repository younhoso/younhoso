import { NextRequest, NextResponse } from 'next/server';

import { getFetchAPI } from '..';

const API_KEY_AUTH = process.env.API_KEY_AUTH!;

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const response = await getFetchAPI(
      `movie/now_playing?api_key=${API_KEY_AUTH}&language=en-US&page=1`,
    );
    return NextResponse.json(response);
  } catch (error) {
    if (error) {
      return NextResponse.json({ error: '서버 내부 오류가 발생했습니다.' });
    }
  }
}
