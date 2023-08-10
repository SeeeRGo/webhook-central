import { kv } from "@vercel/kv";

const hrFormRefreshKey = 'hr_form_refresh_token'
const hrFormAccessKey = 'hr_form_access_token'

export async function getActiveAccessToken() {
  const refresh_token = await kv.get<string>(hrFormRefreshKey);
  const access_token = await kv.get<string>(hrFormAccessKey);
  const result = await fetch("https://api.huntflow.ru/v2/token/refresh", {
      "headers": {
        "authorization": `Bearer ${access_token}`,
        "content-type": "application/json",
      },
      "body": JSON.stringify({ refresh_token }),
      "method": "POST"
    }).then(res => res.json())
  await kv.set(hrFormAccessKey, result.access_token)
  await kv.set(hrFormRefreshKey, result.refresh_token)
  return result.access_token
}