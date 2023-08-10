// import { getNewAccessToken } from '@/utils/getNewAccessToken';
import { NextResponse } from 'next/server';

export async function GET() {
  // const token = await getNewAccessToken()

  return NextResponse.json(
    {
      result: 'token',
    },
    {
      status: 200,
    },
  );
}
