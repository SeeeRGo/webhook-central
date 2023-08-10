import { kv } from "@vercel/kv";

const hrFormRefreshKey = 'hr_form_refresh_token'
const hrFormAccessKey = 'hr_form_access_token'

export async function getActiveAccessToken() {
  const refresh_token = await kv.get<string>(hrFormRefreshKey);
  const access_token = await kv.get<string>(hrFormAccessKey);
  const result: {access_token: string, refresh_token: string } = await fetch("https://api.huntflow.ru/v2/token/refresh", {
      "headers": {
        "authorization": `Bearer ${access_token}`,
        "content-type": "application/json",
      },
      "body": JSON.stringify({ refresh_token }),
      "method": "POST"
    })
    .then(res => res.text())
    .then(data => JSON.parse(data))
  console.log('result tokens', result);
  
  
  await kv.set(hrFormAccessKey, result.access_token || null)
  await kv.set(hrFormRefreshKey, result.refresh_token  || null)
  return result.access_token
}