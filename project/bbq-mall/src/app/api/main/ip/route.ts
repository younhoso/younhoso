import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  let ipAddress = request.headers.get('x-real-ip') as string;

  const forwardedFor = request.headers.get('x-forwarded-for') as string;
  if (!ipAddress && forwardedFor) {
    ipAddress = forwardedFor?.split(',').at(0) ?? 'Unknown';
  }

  return NextResponse.json(ipAddress);
}
