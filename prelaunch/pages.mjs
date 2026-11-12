import { linkFlow } from './flow.mjs';

export const plans = [
  { id: 'free', name: 'Free', domain: 'shrtnfree.link', price: '0 €',
    intro: 'Link gratuiti con account.',
    items: ['Codice breve generato automaticamente', 'QR standard in PNG e SVG', 'Destinazione fissa e attesa di 5 secondi', 'Nessuna garanzia di durata'],
    action: 'Crea un account Free' },
  { id: 'premium', name: 'Premium', domain: 'shrtn.link', monthly: '6,99', yearly: '69,99',
    intro: 'Per imprese con profilo verificato.',
    items: ['Destinazione modificabile', 'QR standard in PNG e SVG', 'Reindirizzamento immediato', 'Puoi mettere in pausa, riattivare o ritirare i link'],
    action: 'Abbonati a Premium' },
  { id: 'subdomain', name: 'Premium con sottodominio', domain: 'tuaazienda.shrtn.link', monthly: '29,99', yearly: '299,99',
    intro: 'Per imprese verificate con un dominio proprio.',
    items: ['Tutte le funzioni di Premium', 'Percorsi personalizzati sul tuo sottodominio', 'QR personalizzabile e pagina con i link aziendali', 'Documenti societari e verifica del dominio'],
    action: 'Scegli il piano con sottodominio' },
];

const mark = '<img class="mark" src="/brand/shrtn-symbol.svg" width="14" height="25" alt="">';
const logo = `<a class="logo" href="/" aria-label="Pagina iniziale di Shrtn.link">${mark}<span>Shrtn<span class="logo-suffix">.link</span></span></a>`;
const notice = 'I link gratuiti non hanno garanzia di durata. Per link che devono durare, Premium è disponibile per le imprese con partita IVA.';

const marketingCopy = 'Acconsento a ricevere via email novità e promozioni da Bisplot su prodotti, servizi, eventi e iniziative che Bisplot organizza o promuove.';
const formVersion = '2026-11-11-v1';
function interestDialog(apiEnabled) {
  return `<dialog id="interest" aria-labelledby="interest-title">
    <form method="dialog" class="close"><button aria-label="Chiudi">×</button></form>
    <h2 id="interest-title">Ci hai beccati in anticipo.</h2>
    <p id="interest-context"></p>
    ${apiEnabled ? `<p>Stiamo lavorando a Shrtn. Vuoi sapere quando è pronto? Oppure mandaci un ping per farci accelerare.</p>
    <p id="signup-unavailable" class="fine">Le iscrizioni apriranno a breve.</p>
    <form id="signup" method="post" action="/api/subscribe" data-version="${formVersion}" hidden>
      <label for="email">Email</label>
      <input id="email" type="email" name="email" placeholder="tu@azienda.it" required maxlength="254" autocomplete="email">
      <label class="check"><input type="checkbox" name="privacy" required><span>Ho letto l’<a id="notice-link" href="/privacy/" target="_blank" rel="noopener">informativa privacy</a>.</span></label>
      <label class="check"><input type="checkbox" name="marketing"><span>${marketingCopy} <small>(facoltativo)</small></span></label>
      <button class="button primary" type="submit">Avvisami al lancio</button>
      <p class="status" id="signup-status" role="status"></p>
    </form>
    <div class="ping">
      <button class="button outline" type="button" id="ping">Manda un ping</button>
      <p class="status fine" id="ping-status" role="status"></p>
    </div>` : '<p>Stiamo lavorando a shrtn.link. Le iscrizioni apriranno a breve.</p>'}
  </dialog>`;
}

export function layout(title, body, { path, apiEnabled }) {
  const current = href => path === href ? ' aria-current="page"' : '';
  return `<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="Link brevi per menu, etichette e packaging. Cambia la destinazione senza ristampare.">
<title>${title} · Shrtn</title>
<link rel="icon" href="/brand/shrtn-symbol.svg" type="image/svg+xml">
<link rel="stylesheet" href="/assets/prelaunch/style.css?v=eb6e395">
<script type="module" src="/assets/prelaunch/site.js"></script>
</head>
<body>
<a class="skip" href="#main">Vai al contenuto</a>
<header><div class="wrap bar">${logo}
  <nav aria-label="Menu principale">
    <a href="/"${current('/')}>Prodotto</a>
    <a href="/pricing/"${current('/pricing/')}>Prezzi</a>
    <button class="nav-button" type="button" data-interest="signin">Accedi</button>
    <a class="button primary nav-cta" href="/crea/"${current('/crea/')}>Prova un link</a>
  </nav>
</div></header>
<main id="main">${body}</main>
<footer><div class="wrap bar"><div class="footer-brand">${logo}<p><a class="bisplot-credit" href="https://bisplot.com/">Un prodotto di <img src="/assets/bisplot-logo.png" width="337" height="96" alt="Bisplot"></a></p></div>
  <nav aria-label="Menu nel piè di pagina"><a href="/pricing/">Prezzi</a><a href="/privacy/">Privacy</a></nav>
</div></footer>
${interestDialog(apiEnabled)}
</body>
</html>`;
}

const benefits = [
  {
    icon: '<path d="M20 11a8 8 0 1 0-2 6m2-11v5h-5"/>',
    title: 'Lo stesso QR, anche quando la pagina cambia',
    detail: 'Con Premium aggiorni la destinazione del link e continui a usare il QR che hai già stampato.',
  },
  {
    icon: '<path d="M5 20V5h11v15M16 10h3v10M3 20h18M8 8h1m3 0h1m-5 4h1m3 0h1m-3 8v-4h2v4"/>',
    title: 'Un indirizzo con il nome della tua azienda',
    detail: 'Il piano con sottodominio è riservato alle imprese verificate che dimostrano di controllare il proprio dominio.',
  },
  {
    icon: '<path d="M12 22s7-3.5 7-10V6l-7-3-7 3v6c0 6.5 7 10 7 10Z"/><path d="m9 12 2 2 4-4"/>',
    title: 'Nessun tracciamento dei clic',
    detail: 'Non teniamo uno storico delle aperture per fare statistiche e non profiliamo chi apre i link.',
  },
];

export const home = `<section class="hero">
  <div class="wrap hero-grid">
    <div>
      <p class="eyebrow">Link brevi per aziende</p>
      <h1>Stampa il QR una volta.<br>Cambia la destinazione quando serve.</h1>
      <p class="lead">Con Premium puoi cambiare la pagina a cui punta il QR sul menu, sull’etichetta o sul cartello già stampato.</p>
      <div class="actions"><a class="button green" href="/pricing/">Scopri i piani <span aria-hidden="true">→</span></a><a class="button ghost" href="/crea/">Prova la demo</a></div>
    </div>
    <div class="example">
      <p class="example-label"><span aria-hidden="true">✓</span> Esempio di sottodominio aziendale</p>
      <p class="example-url">tuaazienda<span>.shrtn.link/</span><strong>menu</strong></p>
      <div class="example-destination">
        <p class="example-label">Destinazione attuale</p>
        <p class="mono" id="destination">tuaazienda.example/menu-estate.pdf</p>
        <button class="link-button" id="update-destination" type="button">Cambia destinazione <span aria-hidden="true">↗</span></button>
      </div>
    </div>
  </div>
</section>
<section class="wrap section principles" aria-labelledby="principles-title">
  <div class="principles-intro">
    <h2 id="principles-title">Un link che fa il suo lavoro</h2>
    <p>Chi apre il link arriva alla pagina giusta. Tu puoi concentrarti su quello che vuoi condividere.</p>
  </div>
  <div class="benefits">
    ${benefits.map(({ icon, title, detail }) => `<article>
      <span class="feature-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" focusable="false">${icon}</svg></span>
      <div><h3>${title}</h3><p>${detail}</p></div>
    </article>`).join('')}
  </div>
</section>
${linkFlow}
<section class="soft"><div class="wrap section split">
  <div><h2>Due domini, due usi.</h2><p>Scegli il piano in base a come userai il link.</p></div>
  <dl class="domains"><div><dt class="mono">shrtnfree.link</dt><dd>Link gratuiti, con destinazione fissa e senza garanzia di durata.</dd></div>
    <div><dt class="mono">shrtn.link</dt><dd>Link per imprese, con destinazione modificabile. Il piano con sottodominio include un indirizzo con il nome della tua azienda.</dd></div></dl>
</div></section>
<section class="wrap customers" aria-labelledby="customers-title">
  <h2 id="customers-title">Chi usa Shrtn.link</h2>
  <ul class="customer-logos" role="list">
    <li><img src="/assets/bisplot-logo.png" width="337" height="96" alt="Bisplot"></li>
    <li><img src="/assets/customers/helioh2.png" width="284" height="240" alt="HelioH2"></li>
    <li><img src="/assets/customers/pintore.png" width="626" height="114" alt="Pintore Editore"></li>
    <li><img src="/assets/customers/negri.png" width="261" height="228" alt="Centro Servizi Negri"></li>
    <li><img class="kopernik-logo" src="/assets/customers/kopernik.jpeg" width="100" height="100" alt="Kopernik Srl"></li>
    <li><img src="/assets/customers/sailgroup.png" width="457" height="240" alt="SailGroup"></li>
  </ul>
</section>`;

export const pricing = `<section class="wrap section">
  <div class="narrow center pricing-head">
    <h1>Un piano per ogni link.</h1>
    <p>Con Free condividi un link a destinazione fissa. Con Premium la tua impresa può cambiare la destinazione anche dopo la stampa.</p>
    <div class="toggle" role="group" aria-label="Fatturazione"><button type="button" data-period="monthly" aria-pressed="true">Mensile</button><button type="button" data-period="yearly" aria-pressed="false">Annuale</button></div>
  </div>
  <div class="plans">
    ${plans.map(plan => `<article class="plan ${plan.id === 'premium' ? 'featured' : ''}">
      <h2>${plan.name}</h2><p class="plan-domain mono">${plan.domain}</p>
      <p class="price" ${plan.monthly ? `data-monthly="${plan.monthly}" data-yearly="${plan.yearly}"` : ''}>${plan.price ?? plan.monthly + ' €'}</p>
      <p class="price-note">${plan.monthly ? 'al mese · IVA esclusa' : 'con account'}</p>
      <p class="plan-intro">${plan.intro}</p>
      <ul>${plan.items.map(item => `<li>${item}</li>`).join('')}</ul>
      <button class="button ${plan.id === 'premium' ? 'green' : 'outline'}" type="button" data-interest="${plan.id}">${plan.action}</button>
    </article>`).join('')}
  </div>
  <div class="pricing-notes narrow">
    <p>Vuoi provare senza account? <a href="/crea/">Apri la demo</a>. Il piano senza account prevede link su <code>nofollow.shrtnfree.link</code>. I codici QR sono disponibili con un account.</p>
    <details><summary>Premium senza verifica del profilo</summary><p>Se hai un identificativo d’impresa, puoi attivare Premium prima di completare la verifica del profilo. Il prezzo è di <strong>17,99 € al mese</strong> o <strong>179,99 € all’anno</strong>, IVA esclusa. Con un profilo verificato accedi al prezzo ridotto.</p><button class="button outline" type="button" data-interest="premium-unverified">Abbonati senza verifica</button></details>
    <details><summary>Quanto dura un link dopo la disdetta?</summary><p>I link Premium su <code>shrtn.link</code> restano attivi e non modificabili per almeno dodici mesi, con 90 giorni di preavviso prima della disattivazione. I percorsi sul sottodominio aziendale restano attivi per 30 giorni dalla fine del piano.</p></details>
    <details><summary>Che differenza c’è fra Free e Premium?</summary><p>Prima del reindirizzamento, i link Free mostrano la destinazione per cinque secondi. La destinazione è fissa. Premium permette di modificarla e offre il reindirizzamento immediato.</p></details>
  </div>
</section>`;

export const demo = `<section class="wrap section demo-page">
  <div><p class="eyebrow">Demo</p><h1>Prova un link breve.</h1><p>Incolla un indirizzo per vedere un esempio di link gratuito senza account.</p><p class="demo-notice"><strong>Il link di prova non è attivo e l’indirizzo che inserisci resta nel browser.</strong></p><a href="/pricing/">Confronta i piani →</a></div>
  <form id="demo-form" class="demo-card" method="post">
    <label for="url">Indirizzo di destinazione</label>
    <input id="url" type="url" required maxlength="2048" placeholder="https://esempio.it/menu" autocomplete="off">
    <p class="fine">${notice}</p>
    <button type="submit" class="button primary">Genera link demo <span aria-hidden="true">→</span></button>
    <div class="demo-result" id="demo-result" hidden><p>Link demo · non attivo</p><output class="mono" id="demo-link"></output><button class="button outline" id="copy" type="button">Copia il link demo</button></div>
    <p class="status fine" id="demo-status" role="status"></p>
  </form>
</section>`;

export const privacy = apiEnabled => `<section class="wrap section narrow">
  <h1>Privacy</h1>
  <p>L’indirizzo che inserisci nella demo resta nel tuo browser. ${apiEnabled ? 'Quando le iscrizioni sono aperte, il modulo mostra l’informativa applicabile agli avvisi di lancio.' : 'Le iscrizioni non sono ancora aperte.'}</p>
  ${apiEnabled ? '' : `<p>Questo sito è ospitato su GitHub Pages. GitHub registra gli indirizzi IP dei visitatori per motivi di sicurezza. <a href="https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#data-collection">Scopri come GitHub Pages raccoglie i dati</a>.</p>`}
</section>`;
