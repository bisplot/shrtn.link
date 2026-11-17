import { linkFlow } from './flow.mjs';

export const LANGS = ['it', 'en'];

// One entry per page: the path in each language. The English site lives under /en/.
export const ROUTES = {
  home: { it: '/', en: '/en/' },
  pricing: { it: '/pricing/', en: '/en/pricing/' },
  demo: { it: '/crea/', en: '/en/demo/' },
  privacy: { it: '/privacy/', en: '/en/privacy/' },
};

const priceText = {
  it: value => `${value.replace('.', ',')} €`,
  en: value => `€${value}`,
};

const copy = {
  it: {
    skip: 'Vai al contenuto',
    logoLabel: 'Pagina iniziale di Shrtn.link',
    mainNav: 'Menu principale',
    footerNav: 'Menu nel piè di pagina',
    navProduct: 'Prodotto',
    navPricing: 'Prezzi',
    navSignin: 'Accedi',
    navTry: 'Prova un link',
    footerPricing: 'Prezzi',
    footerPrivacy: 'Privacy',
    credit: 'Un prodotto di',
    description: 'Link brevi per menu, etichette e packaging. Cambia la destinazione senza ristampare.',
    switchLabel: 'Passa all’inglese',
    switchText: 'EN',
    dialog: {
      close: 'Chiudi',
      title: 'Ci hai beccati in anticipo.',
      working: 'Stiamo lavorando a Shrtn.',
      unavailable: 'Le iscrizioni apriranno a breve.',
      email: 'Email',
      placeholder: 'tu@azienda.it',
      privacy: 'Ho letto l’<a id="notice-link" href="__PRIVACY__" target="_blank" rel="noopener">informativa privacy</a>.',
      marketing: 'Acconsento a ricevere via email novità e promozioni da Bisplot su prodotti, servizi, eventi e iniziative che Bisplot organizza o promuove.',
      optional: '(facoltativo)',
      submit: 'Avvisami al lancio',
      ping: 'Manda un ping',
    },
    strings: {
      locale: 'it-IT',
      retry: 'Riprova tra poco.',
      menus: ['menu-estate.pdf', 'menu-autunno.pdf', 'menu-inverno.pdf'],
      destinationPrefix: 'tuaazienda.example/',
      demoInvalid: 'Inserisci un indirizzo web pubblico che inizi con http:// o https://.',
      demoGenerated: 'Esempio generato. Il link non è attivo.',
      demoCopied: 'Esempio copiato.',
      demoCopyFailed: 'Puoi selezionare il link e copiarlo manualmente.',
      pingOne: '1 ping ricevuto.',
      pingMany: '{n} ping ricevuti.',
      pingSent: 'Ping inviato! {message}',
      pingUnavailable: 'Conteggio al momento non disponibile.',
      sending: 'Invio…',
      saving: 'Salvataggio…',
      saved: 'Richiesta di avviso ricevuta.',
      intents: {
        free: 'L’account Free sarà disponibile al lancio.',
        premium: 'Il piano Premium non è ancora in vendita.',
        subdomain: 'Il piano con sottodominio non è ancora in vendita.',
        signin: 'L’area account sarà disponibile al lancio.',
        'premium-unverified': 'Il piano Premium senza verifica non è ancora in vendita.',
      },
      errors: {},
    },
    notice: 'I link gratuiti non hanno garanzia di durata. Per link che devono durare, Premium è disponibile per le imprese con partita IVA.',
    plans: [
      { id: 'free', name: 'Free', domain: 'shrtnfree.link', price: '0 €', priceNote: 'con account',
        intro: 'Link gratuiti con account.',
        items: ['Codice breve generato automaticamente', 'QR standard in PNG e SVG', 'Destinazione fissa e attesa di 5 secondi', 'Nessuna garanzia di durata'],
        action: 'Crea un account Free' },
      { id: 'premium', name: 'Premium', domain: 'shrtn.link', monthly: '6.99', yearly: '69.99',
        intro: 'Per imprese con profilo verificato.',
        items: ['Destinazione modificabile', 'QR standard in PNG e SVG', 'Reindirizzamento immediato', 'Puoi mettere in pausa, riattivare o ritirare i link'],
        action: 'Abbonati a Premium' },
      { id: 'subdomain', name: 'Premium con sottodominio', domain: 'tuaazienda.shrtn.link', monthly: '29.99', yearly: '299.99',
        intro: 'Per imprese verificate con un dominio proprio.',
        items: ['Tutte le funzioni di Premium', 'Percorsi personalizzati sul tuo sottodominio', 'QR personalizzabile e pagina con i link aziendali', 'Documenti societari e verifica del dominio'],
        action: 'Scegli il piano con sottodominio' },
    ],
    perMonth: 'al mese · IVA esclusa',
    perYear: 'all’anno · IVA esclusa',
    benefits: [
      ['Lo stesso QR, anche quando la pagina cambia', 'Con Premium aggiorni la destinazione del link e continui a usare il QR che hai già stampato.'],
      ['Un indirizzo con il nome della tua azienda', 'Il piano con sottodominio è riservato alle imprese verificate che dimostrano di controllare il proprio dominio.'],
      ['Nessun tracciamento dei clic', 'Non teniamo uno storico delle aperture per fare statistiche e non profiliamo chi apre i link.'],
    ],
    home: {
      eyebrow: 'Link brevi per aziende',
      h1: 'Stampa il QR una volta.<br>Cambia la destinazione quando serve.',
      lead: 'Con Premium puoi cambiare la pagina a cui punta il QR sul menu, sull’etichetta o sul cartello già stampato.',
      plans: 'Scopri i piani',
      demo: 'Prova la demo',
      exampleLabel: 'Esempio di sottodominio aziendale',
      exampleUrl: 'tuaazienda',
      current: 'Destinazione attuale',
      change: 'Cambia destinazione',
      principles: 'Un link che fa il suo lavoro',
      principlesText: 'Chi apre il link arriva alla pagina giusta. Tu puoi concentrarti su quello che vuoi condividere.',
      domainsTitle: 'Due domini, due usi.',
      domainsText: 'Scegli il piano in base a come userai il link.',
      freeDomain: 'Link gratuiti, con destinazione fissa e senza garanzia di durata.',
      paidDomain: 'Link per imprese, con destinazione modificabile. Il piano con sottodominio include un indirizzo con il nome della tua azienda.',
      customers: 'Chi usa Shrtn.link',
    },
    pricing: {
      h1: 'Un piano per ogni link.',
      lead: 'Con Free condividi un link a destinazione fissa. Con Premium la tua impresa può cambiare la destinazione anche dopo la stampa.',
      billing: 'Fatturazione',
      monthly: 'Mensile',
      yearly: 'Annuale',
      tryPrefix: 'Vuoi provare senza account?',
      tryLink: 'Apri la demo',
      trySuffix: 'Il piano senza account prevede link su',
      tryEnd: 'I codici QR sono disponibili con un account.',
      unverifiedSummary: 'Premium senza verifica del profilo',
      unverifiedText: 'Se hai un identificativo d’impresa, puoi attivare Premium prima di completare la verifica del profilo. Il prezzo è di <strong>17,99 € al mese</strong> o <strong>179,99 € all’anno</strong>, IVA esclusa. Con un profilo verificato accedi al prezzo ridotto.',
      unverifiedButton: 'Abbonati senza verifica',
      durationSummary: 'Quanto dura un link dopo la disdetta?',
      durationText: 'I link Premium su <code>shrtn.link</code> restano attivi e non modificabili per almeno dodici mesi, con 90 giorni di preavviso prima della disattivazione. I percorsi sul sottodominio aziendale restano attivi per 30 giorni dalla fine del piano.',
      differenceSummary: 'Che differenza c’è fra Free e Premium?',
      differenceText: 'Prima del reindirizzamento, i link Free mostrano la destinazione per cinque secondi. La destinazione è fissa. Premium permette di modificarla e offre il reindirizzamento immediato.',
    },
    demo: {
      eyebrow: 'Demo',
      h1: 'Prova un link breve.',
      lead: 'Incolla un indirizzo per vedere un esempio di link gratuito senza account.',
      notice: 'Il link di prova non è attivo e l’indirizzo che inserisci resta nel browser.',
      compare: 'Confronta i piani →',
      label: 'Indirizzo di destinazione',
      placeholder: 'https://esempio.it/menu',
      submit: 'Genera link demo',
      result: 'Link demo · non attivo',
      copy: 'Copia il link demo',
    },
    titles: { home: 'Link brevi per aziende', pricing: 'Prezzi', demo: 'Prova un link', privacy: 'Informativa sulla privacy' },
    privacyDescription: 'Come Shrtn tratta i dati personali: nessun cookie, nessuna analisi del traffico, email solo per gli avvisi di lancio.',
  },
  en: {
    skip: 'Skip to content',
    logoLabel: 'Shrtn.link home page',
    mainNav: 'Main menu',
    footerNav: 'Footer menu',
    navProduct: 'Product',
    navPricing: 'Pricing',
    navSignin: 'Sign in',
    navTry: 'Try a link',
    footerPricing: 'Pricing',
    footerPrivacy: 'Privacy',
    credit: 'A product of',
    description: 'Short links for menus, labels and packaging. Change the destination without reprinting.',
    switchLabel: 'Switch to Italian',
    switchText: 'IT',
    dialog: {
      close: 'Close',
      title: 'You caught us early.',
      working: 'We’re working on Shrtn.',
      unavailable: 'Signups will open soon.',
      email: 'Email',
      placeholder: 'you@company.com',
      privacy: 'I have read the <a id="notice-link" href="__PRIVACY__" target="_blank" rel="noopener">privacy notice</a>.',
      marketing: 'I agree to receive news and promotions from Bisplot by email about products, services, events and initiatives that Bisplot organizes or promotes.',
      optional: '(optional)',
      submit: 'Notify me at launch',
      ping: 'Send a ping',
    },
    strings: {
      locale: 'en-GB',
      retry: 'Please try again shortly.',
      menus: ['summer-menu.pdf', 'autumn-menu.pdf', 'winter-menu.pdf'],
      destinationPrefix: 'yourcompany.example/',
      demoInvalid: 'Enter a public web address starting with http:// or https://.',
      demoGenerated: 'Example generated. The link is not active.',
      demoCopied: 'Example copied.',
      demoCopyFailed: 'You can select the link and copy it manually.',
      pingOne: '1 ping received.',
      pingMany: '{n} pings received.',
      pingSent: 'Ping sent! {message}',
      pingUnavailable: 'The count is not available right now.',
      sending: 'Sending…',
      saving: 'Saving…',
      saved: 'Launch notice request received.',
      intents: {
        free: 'The Free account will be available at launch.',
        premium: 'The Premium plan is not on sale yet.',
        subdomain: 'The subdomain plan is not on sale yet.',
        signin: 'The account area will be available at launch.',
        'premium-unverified': 'Premium without verification is not on sale yet.',
      },
      errors: {
        400: 'Check your email address and confirm that you have read the current privacy notice.',
        403: 'Request not allowed.',
        413: 'Request too large.',
        415: 'Unsupported request.',
        429: 'Too many requests. Try again in a minute.',
        503: 'Signups are not open yet, or saving is unavailable. Try again shortly.',
      },
    },
    notice: 'Free links come with no guarantee of duration. For links that must last, Premium is available to businesses with a VAT number.',
    plans: [
      { id: 'free', name: 'Free', domain: 'shrtnfree.link', price: '€0', priceNote: 'with an account',
        intro: 'Free links with an account.',
        items: ['Automatically generated short code', 'Standard QR in PNG and SVG', 'Fixed destination and a 5-second wait', 'No guarantee of duration'],
        action: 'Create a Free account' },
      { id: 'premium', name: 'Premium', domain: 'shrtn.link', monthly: '6.99', yearly: '69.99',
        intro: 'For businesses with a verified profile.',
        items: ['Editable destination', 'Standard QR in PNG and SVG', 'Immediate redirect', 'You can pause, reactivate or retire links'],
        action: 'Subscribe to Premium' },
      { id: 'subdomain', name: 'Premium with subdomain', domain: 'yourcompany.shrtn.link', monthly: '29.99', yearly: '299.99',
        intro: 'For verified businesses with their own domain.',
        items: ['All Premium features', 'Custom paths on your subdomain', 'Customizable QR and a page with your company links', 'Company documents and domain verification'],
        action: 'Choose the subdomain plan' },
    ],
    perMonth: 'per month · excl. VAT',
    perYear: 'per year · excl. VAT',
    benefits: [
      ['The same QR, even when the page changes', 'With Premium you update the link’s destination and keep using the QR you have already printed.'],
      ['An address with your company name', 'The subdomain plan is reserved for verified businesses that prove they control their own domain.'],
      ['No click tracking', 'We do not keep a history of opens for statistics and we do not profile people who open links.'],
    ],
    home: {
      eyebrow: 'Short links for businesses',
      h1: 'Print the QR once.<br>Change the destination when you need to.',
      lead: 'With Premium you can change the page the QR points to on a menu, label or sign that is already printed.',
      plans: 'See the plans',
      demo: 'Try the demo',
      exampleLabel: 'Example of a company subdomain',
      exampleUrl: 'yourcompany',
      current: 'Current destination',
      change: 'Change destination',
      principles: 'A link that does its job',
      principlesText: 'Whoever opens the link lands on the right page. You can focus on what you want to share.',
      domainsTitle: 'Two domains, two uses.',
      domainsText: 'Choose the plan based on how you will use the link.',
      freeDomain: 'Free links, with a fixed destination and no guarantee of duration.',
      paidDomain: 'Links for businesses, with an editable destination. The subdomain plan includes an address with your company name.',
      customers: 'Who uses Shrtn.link',
    },
    pricing: {
      h1: 'A plan for every link.',
      lead: 'With Free you share a link with a fixed destination. With Premium your business can change the destination even after printing.',
      billing: 'Billing',
      monthly: 'Monthly',
      yearly: 'Yearly',
      tryPrefix: 'Want to try without an account?',
      tryLink: 'Open the demo',
      trySuffix: 'The no-account plan uses links on',
      tryEnd: 'QR codes are available with an account.',
      unverifiedSummary: 'Premium without profile verification',
      unverifiedText: 'If you have a business identifier, you can activate Premium before completing profile verification. The price is <strong>€17.99 per month</strong> or <strong>€179.99 per year</strong>, excluding VAT. With a verified profile you get the reduced price.',
      unverifiedButton: 'Subscribe without verification',
      durationSummary: 'How long does a link last after cancellation?',
      durationText: 'Premium links on <code>shrtn.link</code> stay active and uneditable for at least twelve months, with 90 days’ notice before deactivation. Paths on the company subdomain stay active for 30 days after the plan ends.',
      differenceSummary: 'What is the difference between Free and Premium?',
      differenceText: 'Before redirecting, Free links show the destination for five seconds. The destination is fixed. Premium lets you edit it and redirects immediately.',
    },
    demo: {
      eyebrow: 'Demo',
      h1: 'Try a short link.',
      lead: 'Paste an address to see an example of a free link without an account.',
      notice: 'The sample link is not active and the address you enter stays in your browser.',
      compare: 'Compare the plans →',
      label: 'Destination address',
      placeholder: 'https://example.com/menu',
      submit: 'Generate demo link',
      result: 'Demo link · not active',
      copy: 'Copy the demo link',
    },
    titles: { home: 'Short links for businesses', pricing: 'Pricing', demo: 'Try a link', privacy: 'Privacy notice' },
    privacyDescription: 'How Shrtn handles personal data: no cookies, no traffic analytics, email only for launch notices.',
  },
};

export const t = lang => copy[lang];

const mark = '<img class="mark" src="/brand/shrtn-symbol.svg" width="14" height="25" alt="">';
const logo = lang => `<a class="logo" href="${ROUTES.home[lang]}" aria-label="${copy[lang].logoLabel}">${mark}<span>Shrtn<span class="logo-suffix">.link</span></span></a>`;

const formVersion = '2026-11-11-v1';
function interestDialog(lang, apiOrigin) {
  const d = copy[lang].dialog;
  return `<dialog id="interest" aria-labelledby="interest-title" data-api-origin="${apiOrigin}">
    <form method="dialog" class="close"><button aria-label="${d.close}">×</button></form>
    <h2 id="interest-title">${d.title}</h2>
    <p id="interest-context"></p>
    <p>${d.working}</p>
    <p id="signup-unavailable" class="fine">${d.unavailable}</p>
    <form id="signup" method="post" action="${apiOrigin}/api/subscribe" data-version="${formVersion}" hidden>
      <label for="email">${d.email}</label>
      <input id="email" type="email" name="email" placeholder="${d.placeholder}" required maxlength="254" autocomplete="email">
      <label class="check"><input type="checkbox" name="privacy" required><span>${d.privacy.replace('__PRIVACY__', ROUTES.privacy[lang])}</span></label>
      <label class="check"><input type="checkbox" name="marketing"><span>${d.marketing} <small>${d.optional}</small></span></label>
      <button class="button primary" type="submit">${d.submit}</button>
      <p class="status" id="signup-status" role="status"></p>
    </form>
    <div class="ping" hidden>
      <button class="button outline" type="button" id="ping">${d.ping}</button>
      <p class="status fine" id="ping-status" role="status"></p>
    </div>
  </dialog>`;
}

export function layout(title, body, { route, lang, apiOrigin, description, site = 'https://shrtn.link' }) {
  const c = copy[lang];
  const other = lang === 'it' ? 'en' : 'it';
  const path = ROUTES[route][lang];
  const current = key => path === ROUTES[key][lang] ? ' aria-current="page"' : '';
  const strings = JSON.stringify(c.strings).replace(/</g, '\\u003c');
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="${description ?? c.description}">
<link rel="canonical" href="${site}${path}">
<link rel="alternate" hreflang="it" href="${site}${ROUTES[route].it}">
<link rel="alternate" hreflang="en" href="${site}${ROUTES[route].en}">
<link rel="alternate" hreflang="x-default" href="${site}${ROUTES[route].it}">
<title>${title} · Shrtn</title>
<link rel="icon" href="/brand/shrtn-symbol.svg" type="image/svg+xml">
<link rel="stylesheet" href="/assets/prelaunch/style.css?v=i18n-v1">
<script type="application/json" id="strings">${strings}</script>
<script type="module" src="/assets/prelaunch/site.js?v=i18n-v1"></script>
</head>
<body>
<a class="skip" href="#main">${c.skip}</a>
<header><div class="wrap bar">${logo(lang)}
  <nav aria-label="${c.mainNav}">
    <a href="${ROUTES.home[lang]}"${current('home')}>${c.navProduct}</a>
    <a href="${ROUTES.pricing[lang]}"${current('pricing')}>${c.navPricing}</a>
    <button class="nav-button" type="button" data-interest="signin">${c.navSignin}</button>
    <a class="lang-link" href="${ROUTES[route][other]}" hreflang="${other}" lang="${other}" aria-label="${c.switchLabel}">${c.switchText}</a>
    <a class="button primary nav-cta" href="${ROUTES.demo[lang]}"${current('demo')}>${c.navTry}</a>
  </nav>
</div></header>
<main id="main">${body}</main>
<footer><div class="wrap bar"><div class="footer-brand">${logo(lang)}<p><a class="bisplot-credit" href="https://bisplot.com/">${c.credit} <img src="/assets/bisplot-logo.png" width="337" height="96" alt="Bisplot"></a></p></div>
  <nav aria-label="${c.footerNav}"><a href="${ROUTES.pricing[lang]}">${c.footerPricing}</a><a href="${ROUTES.privacy[lang]}">${c.footerPrivacy}</a></nav>
</div></footer>
${interestDialog(lang, apiOrigin)}
</body>
</html>`;
}

const icons = [
  '<path d="M20 11a8 8 0 1 0-2 6m2-11v5h-5"/>',
  '<path d="M5 20V5h11v15M16 10h3v10M3 20h18M8 8h1m3 0h1m-5 4h1m3 0h1m-3 8v-4h2v4"/>',
  '<path d="M12 22s7-3.5 7-10V6l-7-3-7 3v6c0 6.5 7 10 7 10Z"/><path d="m9 12 2 2 4-4"/>',
];

export const home = lang => {
  const c = copy[lang];
  const h = c.home;
  return `<section class="hero">
  <div class="wrap hero-grid">
    <div>
      <p class="eyebrow">${h.eyebrow}</p>
      <h1>${h.h1}</h1>
      <p class="lead">${h.lead}</p>
      <div class="actions"><a class="button green" href="${ROUTES.pricing[lang]}">${h.plans} <span aria-hidden="true">→</span></a><a class="button ghost" href="${ROUTES.demo[lang]}">${h.demo}</a></div>
    </div>
    <div class="example">
      <p class="example-label"><span aria-hidden="true">✓</span> ${h.exampleLabel}</p>
      <p class="example-url">${h.exampleUrl}<span>.shrtn.link/</span><strong>menu</strong></p>
      <div class="example-destination">
        <p class="example-label">${h.current}</p>
        <p class="mono" id="destination">${c.strings.destinationPrefix}${c.strings.menus[0]}</p>
        <button class="link-button" id="update-destination" type="button">${h.change} <span aria-hidden="true">↗</span></button>
      </div>
    </div>
  </div>
</section>
<section class="wrap section principles" aria-labelledby="principles-title">
  <div class="principles-intro">
    <h2 id="principles-title">${h.principles}</h2>
    <p>${h.principlesText}</p>
  </div>
  <div class="benefits">
    ${c.benefits.map(([title, detail], index) => `<article>
      <span class="feature-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" focusable="false">${icons[index]}</svg></span>
      <div><h3>${title}</h3><p>${detail}</p></div>
    </article>`).join('')}
  </div>
</section>
${linkFlow(lang)}
<section class="soft"><div class="wrap section split">
  <div><h2>${h.domainsTitle}</h2><p>${h.domainsText}</p></div>
  <dl class="domains"><div><dt class="mono">shrtnfree.link</dt><dd>${h.freeDomain}</dd></div>
    <div><dt class="mono">shrtn.link</dt><dd>${h.paidDomain}</dd></div></dl>
</div></section>
<section class="wrap customers" aria-labelledby="customers-title">
  <h2 id="customers-title">${h.customers}</h2>
  <ul class="customer-logos" role="list">
    <li><img src="/assets/bisplot-logo.png" width="337" height="96" alt="Bisplot"></li>
    <li><img src="/assets/customers/helioh2.png" width="284" height="240" alt="HelioH2"></li>
    <li><img src="/assets/customers/pintore.png" width="626" height="114" alt="Pintore Editore"></li>
    <li><img src="/assets/customers/negri.png" width="261" height="228" alt="Centro Servizi Negri"></li>
    <li><img class="kopernik-logo" src="/assets/customers/kopernik.jpeg" width="100" height="100" alt="Kopernik Srl"></li>
    <li><img src="/assets/customers/sailgroup.png" width="457" height="240" alt="SailGroup"></li>
  </ul>
</section>`;
};

export const pricing = lang => {
  const c = copy[lang];
  const p = c.pricing;
  const money = priceText[lang];
  return `<section class="wrap section">
  <div class="narrow center pricing-head">
    <h1>${p.h1}</h1>
    <p>${p.lead}</p>
    <div class="toggle" role="group" aria-label="${p.billing}"><button type="button" data-period="monthly" aria-pressed="true">${p.monthly}</button><button type="button" data-period="yearly" aria-pressed="false">${p.yearly}</button></div>
  </div>
  <div class="plans">
    ${c.plans.map(plan => `<article class="plan ${plan.id === 'premium' ? 'featured' : ''}">
      <h2>${plan.name}</h2><p class="plan-domain mono">${plan.domain}</p>
      <p class="price" ${plan.monthly ? `data-monthly="${money(plan.monthly)}" data-yearly="${money(plan.yearly)}" data-monthly-note="${c.perMonth}" data-yearly-note="${c.perYear}"` : ''}>${plan.price ?? money(plan.monthly)}</p>
      <p class="price-note">${plan.monthly ? c.perMonth : plan.priceNote}</p>
      <p class="plan-intro">${plan.intro}</p>
      <ul>${plan.items.map(item => `<li>${item}</li>`).join('')}</ul>
      <button class="button ${plan.id === 'premium' ? 'green' : 'outline'}" type="button" data-interest="${plan.id}">${plan.action}</button>
    </article>`).join('')}
  </div>
  <div class="pricing-notes narrow">
    <p>${p.tryPrefix} <a href="${ROUTES.demo[lang]}">${p.tryLink}</a>. ${p.trySuffix} <code>nofollow.shrtnfree.link</code>. ${p.tryEnd}</p>
    <details><summary>${p.unverifiedSummary}</summary><p>${p.unverifiedText}</p><button class="button outline" type="button" data-interest="premium-unverified">${p.unverifiedButton}</button></details>
    <details><summary>${p.durationSummary}</summary><p>${p.durationText}</p></details>
    <details><summary>${p.differenceSummary}</summary><p>${p.differenceText}</p></details>
  </div>
</section>`;
};

export const demo = lang => {
  const c = copy[lang];
  const d = c.demo;
  return `<section class="wrap section demo-page">
  <div><p class="eyebrow">${d.eyebrow}</p><h1>${d.h1}</h1><p>${d.lead}</p><p class="demo-notice"><strong>${d.notice}</strong></p><a href="${ROUTES.pricing[lang]}">${d.compare}</a></div>
  <form id="demo-form" class="demo-card" method="post">
    <label for="url">${d.label}</label>
    <input id="url" type="url" required maxlength="2048" placeholder="${d.placeholder}" autocomplete="off">
    <p class="fine">${c.notice}</p>
    <button type="submit" class="button primary">${d.submit} <span aria-hidden="true">→</span></button>
    <div class="demo-result" id="demo-result" hidden><p>${d.result}</p><output class="mono" id="demo-link"></output><button class="button outline" id="copy" type="button">${d.copy}</button></div>
    <p class="status fine" id="demo-status" role="status"></p>
  </form>
</section>`;
};

export { privacy, PRIVACY_VERSION } from './privacy.mjs';
