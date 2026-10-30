import {
  cookieOptions,
  parseSession,
  refreshSession,
  SESSION_COOKIE,
  siteUrl,
} from "lib/customer-account";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const jar = await cookies();
  const session = parseSession(jar.get(SESSION_COOKIE)?.value);
  if (!session) return NextResponse.redirect(`${siteUrl}/account/login`);
  try {
    const next = await refreshSession(session);
    const res = NextResponse.redirect(`${siteUrl}/account`);
    res.cookies.set(SESSION_COOKIE, JSON.stringify(next), {
      ...cookieOptions,
      maxAge: 60 * 60 * 24 * 30,
    });
    return res;
  } catch {
    const res = NextResponse.redirect(`${siteUrl}/account/login`);
    res.cookies.delete(SESSION_COOKIE);
    return res;
  }
}
