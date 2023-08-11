import { hrFormAccessKey, hrFormRefreshKey } from "@/constants";
import { kv } from "@vercel/kv";

function hasTokens(value: any): value is {access_token: string, refresh_token: string } {
  return !!value.access_token && !!value.refresh_token
}

export async function getNewAccessToken() {
  const refresh_token = await kv.get<string>(hrFormRefreshKey);
  const result = await fetch("https://api.huntflow.ru/v2/token/refresh", {
      "headers": {
        "content-type": "application/json",
      },
      "body": JSON.stringify({ refresh_token }),
      "method": "POST"
    })
    .then(res => res.json())
  if (hasTokens(result)) {
    await kv.set(hrFormAccessKey, result.access_token)
    await kv.set(hrFormRefreshKey, result.refresh_token)
  } 
}