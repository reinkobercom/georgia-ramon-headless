import {
  AUTH_COOKIE,
  cookieOptions,
  createPkce,
  customerAccountsEnabled,
  LEGACY_ACCOUNT_URL,
  openIdConfig,
  redirectUri,
} from "lib/customer-account";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  if (!customerAccountsEnabled) return NextResponse.redirect(LEGACY_ACCOUNT_URL);

  const returnTo = new URL(req.url).searchParams.get("returnTo") || "/account";
  const { verifier, challenge, state, nonce } = createPkce();
  const { authorization_endpoint } = await openIdConfig();

  const url = new URL(authorization_endpoint);
  url.search = new URLSearchParams({
    client_id: process.env.SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID!,
    response_type: "code",
    redirect_uri: redirectUri,
    scope: "openid email customer-account-api:full",
    state,
    nonce,
    code_challenge: challenge,
    code_challenge_method: "S256",
    locale: "de",
  }).toString();

  const res = NextResponse.redirect(url);
  res.cookies.set(AUTH_COOKIE, JSON.stringify({ verifier, state, returnTo }), {
    ...cookieOptions,
    maxAge: 600,
  });
  return res;
}
