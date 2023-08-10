import { getActiveAccessToken } from '@/utils/getActiveAccessToken';
import { NextResponse } from 'next/server';

export async function GET() {
  await getActiveAccessToken()

  return NextResponse.json(
    {
      result: 'OK',
    },
    {
      status: 200,
    },
  );
}
