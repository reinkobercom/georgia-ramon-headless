import {
  AUTH_COOKIE,
  cookieOptions,
  exchangeCode,
  SESSION_COOKIE,
  siteUrl,
} from "lib/customer-account";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const params = new URL(req.url).searchParams;
  const jar = await cookies();
  const pending = JSON.parse(jar.get(AUTH_COOKIE)?.value || "{}") as {
    verifier?: string;
    state?: string;
    returnTo?: string;
  };

  const code = params.get("code");
  if (!code || !pending.verifier || params.get("state") !== pending.state) {
    return NextResponse.redirect(`${siteUrl}/account?fehler=login`);
  }

  try {
    const session = await exchangeCode(code, pending.verifier);
    const res = NextResponse.redirect(`${siteUrl}${pending.returnTo || "/account"}`);
    res.cookies.set(SESSION_COOKIE, JSON.stringify(session), {
      ...cookieOptions,
      maxAge: 60 * 60 * 24 * 30,
    });
    res.cookies.delete(AUTH_COOKIE);
    return res;
  } catch (e) {
    console.error(e);
    return NextResponse.redirect(`${siteUrl}/account?fehler=token`);
  }
}
