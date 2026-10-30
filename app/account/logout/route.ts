import { openIdConfig, parseSession, SESSION_COOKIE, siteUrl } from "lib/customer-account";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const jar = await cookies();
  const session = parseSession(jar.get(SESSION_COOKIE)?.value);
  let target = `${siteUrl}/`;
  if (session?.idToken) {
    try {
      const { end_session_endpoint } = await openIdConfig();
      const url = new URL(end_session_endpoint);
      url.search = new URLSearchParams({
        id_token_hint: session.idToken,
        post_logout_redirect_uri: `${siteUrl}/`,
      }).toString();
      target = url.toString();
    } catch {}
  }
  const res = NextResponse.redirect(target);
  res.cookies.delete(SESSION_COOKIE);
  return res;
}
