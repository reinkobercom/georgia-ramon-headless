"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";

type Consent = { statistics: boolean; marketing: boolean; ts: number };
const KEY = "gr-consent-v1";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

function readConsent(): Consent | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
}

function saveConsent(c: Consent) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(c));
  } catch {}
}

export function openConsentSettings() {
  window.dispatchEvent(new Event("gr:open-consent"));
}

export function ConsentManager() {
  const [consent, setConsent] = useState<Consent | null>(null);
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(false);
  const [stats, setStats] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const c = readConsent();
    setConsent(c);
    if (!c) setOpen(true);
    const onOpen = () => {
      const cur = readConsent();
      setStats(!!cur?.statistics);
      setMarketing(!!cur?.marketing);
      setDetails(true);
      setOpen(true);
    };
    window.addEventListener("gr:open-consent", onOpen);
    return () => window.removeEventListener("gr:open-consent", onOpen);
  }, []);

  function decide(statistics: boolean, mkt: boolean) {
    const c = { statistics, marketing: mkt, ts: Date.now() };
    saveConsent(c);
    const revoked = (consent?.statistics && !statistics) || (consent?.marketing && !mkt);
    setConsent(c);
    setOpen(false);
    if (revoked) window.location.reload(); // bereits geladene Skripte entfernen
  }

  return (
    <>
      {consent?.statistics && GA_ID ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
          </Script>
        </>
      ) : null}
      {consent?.marketing && PIXEL_ID ? (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL_ID}');fbq('track','PageView');`}
        </Script>
      ) : null}

      {open ? (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby="consent-title"
          className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-5"
        >
          <div className="mx-auto max-w-3xl rounded-sm border border-cocoa-700 bg-cocoa-950 p-5 text-cream-100 shadow-2xl sm:p-6">
            <p id="consent-title" className="font-serif text-xl text-cream-50">
              Ein kleines Stück Cookie? 🍫
            </p>
            <p className="mt-2 text-sm leading-relaxed text-cream-300">
              Wir nutzen notwendige Cookies für Warenkorb und Checkout. Mit deiner Zustimmung
              verwenden wir außerdem Statistik (Google Analytics) und Marketing (Meta), um den Shop
              zu verbessern. Du kannst deine Wahl jederzeit im Footer ändern.{" "}
              <Link href="https://georgia-ramon.com/policies/privacy-policy" className="underline">
                Datenschutz
              </Link>
            </p>

            {details ? (
              <div className="mt-4 space-y-2 text-sm">
                <Toggle label="Notwendig" description="Warenkorb, Checkout, Sicherheit" checked disabled />
                <Toggle label="Statistik" description="Google Analytics 4" checked={stats} onChange={setStats} />
                <Toggle label="Marketing" description="Meta Pixel (Facebook/Instagram)" checked={marketing} onChange={setMarketing} />
              </div>
            ) : null}

            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
              {details ? (
                <button type="button" onClick={() => decide(stats, marketing)} className="btn-outline-light py-3">
                  Auswahl speichern
                </button>
              ) : (
                <button type="button" onClick={() => setDetails(true)} className="btn-outline-light py-3">
                  Einstellungen
                </button>
              )}
              <button type="button" onClick={() => decide(false, false)} className="btn-outline-light py-3">
                Nur notwendige
              </button>
              <button type="button" onClick={() => decide(true, true)} className="btn-gold py-3">
                Alle akzeptieren
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function Toggle({
  label,
  description,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-4 rounded-sm bg-cocoa-900 px-4 py-3">
      <span>
        <span className="block font-semibold text-cream-50">{label}</span>
        <span className="text-xs text-cream-300">{description}</span>
      </span>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="h-5 w-5 accent-[#c49a45]"
      />
    </label>
  );
}

export function ConsentSettingsLink({ className }: { className?: string }) {
  return (
    <button type="button" onClick={openConsentSettings} className={className}>
      Cookie-Einstellungen
    </button>
  );
}
