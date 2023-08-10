import { getActiveAccessToken } from '@/utils/getActiveAccessToken';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const orgId = '170849'
export async function POST(request: NextRequest) {
  const headers = request.headers
  const data = await request.formData()

  console.log('data', data);
  console.log('headers', headers);
  const access_token = await getActiveAccessToken()
  
  const {Name, Email, Name_2, Input, Специализация} = Object.fromEntries(data)
  const body = { first_name: Name.toString().split(' ')[0], last_name: Name.toString().split(' ')[1] ?? '' , middle_name: Name.toString().split(' ')[2] ?? '', email: Email, city: Name_2, resume_link: Input}
  const hunfFlowBody = {
    "first_name": body.first_name,
    "last_name": body.last_name,
    "middle_name": body.middle_name,
    "money": "",
    "phone": "",
    "email": body.email,
    "skype": "",
    "position": Специализация ?? '',
    "company": "",
    "externals": [
      {
        "auth_type": "NATIVE",
        "data": {
          "body": `Город: ${Name_2}\n${body.resume_link}`
        },
      }
    ],
  }
  try {
    await fetch(`https://api.huntflow.ru/v2/accounts/${orgId}/applicants`, {
      "headers": {
        "authorization": `Bearer ${access_token}`,
        "content-type": "application/json",
      },
      "body": JSON.stringify(hunfFlowBody),
      "method": "POST"
    });
  } catch (e) {
    console.log('error', e);
  }

  return NextResponse.json(
    {
      result: 'OK',
    },
    {
      status: 200,
    },
  );
}
