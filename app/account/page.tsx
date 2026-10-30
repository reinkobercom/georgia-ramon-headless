import {
  customerAccountsEnabled,
  customerQuery,
  LEGACY_ACCOUNT_URL,
  parseSession,
  SESSION_COOKIE,
} from "lib/customer-account";
import { formatPrice } from "lib/format";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = { title: "Mein Konto" };

type CustomerData = {
  customer: {
    firstName: string | null;
    lastName: string | null;
    emailAddress: { emailAddress: string } | null;
    defaultAddress: { formatted: string[] } | null;
    orders: {
      nodes: {
        id: string;
        name: string;
        processedAt: string;
        statusPageUrl: string;
        totalPrice: { amount: string; currencyCode: string };
        lineItems: { nodes: { title: string; quantity: number }[] };
      }[];
    };
  };
};

const QUERY = /* GraphQL */ `
  query Account {
    customer {
      firstName
      lastName
      emailAddress {
        emailAddress
      }
      defaultAddress {
        formatted(withName: true)
      }
      orders(first: 20, sortKey: PROCESSED_AT, reverse: true) {
        nodes {
          id
          name
          processedAt
          statusPageUrl
          totalPrice {
            amount
            currencyCode
          }
          lineItems(first: 10) {
            nodes {
              title
              quantity
            }
          }
        }
      }
    }
  }
`;

export default async function AccountPage(props: {
  searchParams: Promise<{ fehler?: string }>;
}) {
  if (!customerAccountsEnabled) redirect(LEGACY_ACCOUNT_URL);

  const { fehler } = await props.searchParams;
  const session = parseSession((await cookies()).get(SESSION_COOKIE)?.value);

  if (!session) {
    return (
      <div className="container-shop max-w-lg py-20 text-center">
        <h1 className="font-serif text-4xl">Mein Konto</h1>
        <p className="mt-4 text-cocoa-700">
          Melde dich an, um deine Bestellungen und Adressen zu sehen. Du bekommst einen
          Anmeldecode per E-Mail – ganz ohne Passwort.
        </p>
        {fehler ? (
          <p className="mt-4 rounded-sm bg-cream-200 p-3 text-sm">
            Die Anmeldung hat nicht geklappt. Bitte versuche es noch einmal.
          </p>
        ) : null}
        <Link href="/account/login" prefetch={false} className="btn-dark mt-8">
          Anmelden
        </Link>
      </div>
    );
  }

  if (Date.now() > session.expiresAt) redirect("/account/refresh");

  let data: CustomerData;
  try {
    data = await customerQuery<CustomerData>(session, QUERY);
  } catch {
    redirect("/account/refresh");
  }
  const c = data.customer;

  return (
    <div className="container-shop py-10 md:py-16">
      <div className="flex flex-col gap-4 border-b border-cream-300 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow text-gold-600">Mein Konto</p>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl">
            Hallo{c.firstName ? ` ${c.firstName}` : ""}!
          </h1>
          {c.emailAddress ? (
            <p className="mt-1 text-sm text-cocoa-500">{c.emailAddress.emailAddress}</p>
          ) : null}
        </div>
        <Link href="/account/logout" prefetch={false} className="text-sm underline">
          Abmelden
        </Link>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[2fr_1fr]">
        <section>
          <h2 className="font-serif text-2xl">Deine Bestellungen</h2>
          {c.orders.nodes.length ? (
            <ul className="mt-5 divide-y divide-cream-300 border-y border-cream-300">
              {c.orders.nodes.map((o) => (
                <li key={o.id} className="flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold">
                      Bestellung {o.name}
                      <span className="ml-2 text-sm font-normal text-cocoa-500">
                        {new Date(o.processedAt).toLocaleDateString("de-DE")}
                      </span>
                    </p>
                    <p className="mt-1 text-sm text-cocoa-500">
                      {o.lineItems.nodes.map((l) => `${l.quantity}× ${l.title}`).join(", ")}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 sm:text-right">
                    <span className="font-semibold">
                      {formatPrice(o.totalPrice.amount, o.totalPrice.currencyCode)}
                    </span>
                    <a href={o.statusPageUrl} className="text-sm underline">
                      Details
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-cocoa-700">
              Noch keine Bestellungen.{" "}
              <Link href="/search" className="underline">
                Jetzt Schokolade entdecken
              </Link>
            </p>
          )}
        </section>
        <aside className="rounded-sm bg-cream-100 p-6">
          <h2 className="font-serif text-xl">Standardadresse</h2>
          {c.defaultAddress ? (
            <address className="mt-3 text-sm leading-relaxed not-italic">
              {c.defaultAddress.formatted.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          ) : (
            <p className="mt-3 text-sm text-cocoa-500">
              Noch keine Adresse hinterlegt – sie wird bei deiner ersten Bestellung gespeichert.
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}
