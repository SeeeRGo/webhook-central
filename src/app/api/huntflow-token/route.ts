import { getActiveAccessToken } from '@/utils/getActiveAccessToken';
import { NextResponse } from 'next/server';

export async function GET() {
  const token = await getActiveAccessToken()

  return NextResponse.json(
    {
      result: token,
    },
    {
      status: 200,
    },
  );
}
