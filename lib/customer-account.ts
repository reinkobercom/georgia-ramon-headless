import { createHash, randomBytes } from "crypto";
import { baseUrl } from "lib/utils";

/**
 * Shopify Customer Account API (OAuth 2.0 + PKCE, öffentlicher Client).
 * Aktiv nur mit CUSTOMER_ACCOUNTS_ENABLED=true – erfordert „Neue Kundenkonten“ in Shopify.
 */
export const customerAccountsEnabled =
  process.env.CUSTOMER_ACCOUNTS_ENABLED === "true" &&
  !!process.env.SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID;

export const LEGACY_ACCOUNT_URL = "https://georgia-ramon.com/account";
export const accountHref = customerAccountsEnabled ? "/account" : LEGACY_ACCOUNT_URL;

export const SESSION_COOKIE = "gr_customer";
export const AUTH_COOKIE = "gr_customer_auth";

const clientId = process.env.SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID ?? "";
const shopDomain = process.env.SHOPIFY_STORE_DOMAIN ?? "";
export const siteUrl = process.env.SITE_URL || baseUrl;
export const redirectUri = `${siteUrl}/account/callback`;

type OpenIdConfig = {
  authorization_endpoint: string;
  token_endpoint: string;
  end_session_endpoint: string;
};

export type CustomerSession = {
  accessToken: string;
  refreshToken: string;
  idToken: string;
  expiresAt: number; // ms
};

async function discover<T>(path: string): Promise<T> {
  const res = await fetch(`https://${shopDomain}${path}`, { next: { revalidate: 86400 } });
  if (!res.ok) throw new Error(`Discovery ${path} fehlgeschlagen (${res.status})`);
  return res.json();
}

export const openIdConfig = () => discover<OpenIdConfig>("/.well-known/openid-configuration");
export const apiConfig = () =>
  discover<{ graphql_api: string }>("/.well-known/customer-account-api");

const b64url = (buf: Buffer) =>
  buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

export function createPkce() {
  const verifier = b64url(randomBytes(32));
  const challenge = b64url(createHash("sha256").update(verifier).digest());
  return { verifier, challenge, state: b64url(randomBytes(16)), nonce: b64url(randomBytes(16)) };
}

async function tokenRequest(params: Record<string, string>): Promise<CustomerSession> {
  const { token_endpoint } = await openIdConfig();
  const res = await fetch(token_endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "georgia-ramon-headless",
      Origin: siteUrl,
    },
    body: new URLSearchParams({ client_id: clientId, ...params }),
  });
  if (!res.ok) throw new Error(`Token-Anfrage fehlgeschlagen (${res.status}): ${await res.text()}`);
  const t = await res.json();
  return {
    accessToken: t.access_token,
    refreshToken: t.refresh_token,
    idToken: t.id_token ?? "",
    expiresAt: Date.now() + (t.expires_in - 60) * 1000,
  };
}

export const exchangeCode = (code: string, verifier: string) =>
  tokenRequest({
    grant_type: "authorization_code",
    redirect_uri: redirectUri,
    code,
    code_verifier: verifier,
  });

export async function refreshSession(session: CustomerSession) {
  const next = await tokenRequest({
    grant_type: "refresh_token",
    refresh_token: session.refreshToken,
  });
  return { ...next, idToken: next.idToken || session.idToken };
}

export function parseSession(raw?: string): CustomerSession | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as CustomerSession;
  } catch {
    return null;
  }
}

export const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "lax" as const,
  path: "/",
};

export async function customerQuery<T>(
  session: CustomerSession,
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const { graphql_api } = await apiConfig();
  const res = await fetch(graphql_api, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: session.accessToken },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });
  const body = await res.json();
  if (body.errors) throw new Error(body.errors[0]?.message ?? "Customer Account API Fehler");
  return body.data as T;
}
