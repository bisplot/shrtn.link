export const plans = [
  { id: 'free', name: 'Free', domain: 'shrtnfree.link', price: '0 €',
    intro: 'Link gratuiti con account.',
    items: ['Codice breve assegnato da Shrtn', 'QR standard in PNG e SVG', 'Destinazione fissa e anteprima di 5 secondi', 'Nessuna garanzia di durata'],
    action: 'Crea un account Free' },
  { id: 'premium', name: 'Premium', domain: 'shrtn.link', monthly: '6,99', yearly: '69,99',
    intro: 'Per imprese con profilo verificato.',
    items: ['Destinazione modificabile', 'QR standard in PNG e SVG', 'Reindirizzamento immediato', 'Pausa, riattivazione e ritiro dei link'],
    action: 'Abbonati a Premium' },
  { id: 'subdomain', name: 'Premium con sottodominio', domain: 'tuaazienda.shrtn.link', monthly: '29,99', yearly: '299,99',
    intro: 'Per imprese verificate con un proprio dominio.',
    items: ['Tutte le funzioni di Premium', 'Percorsi a scelta sotto il nome aziendale', 'QR personalizzabile e pagina dei link del brand', 'Documenti societari e verifica del dominio'],
    action: 'Abbonati con sottodominio' },
];

const mark = '<span class="mark" aria-hidden="true">✓</span>';
const logo = `<a class="logo" href="/" aria-label="Shrtn, home">${mark}Shrtn</a>`;
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
    </div>` : '<p>Stiamo lavorando a Shrtn. Le iscrizioni apriranno a breve.</p>'}
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
<link rel="icon" href="/assets/prelaunch/mark.svg" type="image/svg+xml">
<link rel="stylesheet" href="/assets/prelaunch/style.css">
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
<footer><div class="wrap bar">${logo}<p>Link brevi per ciò che stampi.</p>
  <nav aria-label="Menu nel piè di pagina"><a href="/pricing/">Prezzi</a><a href="/privacy/">Privacy</a></nav>
</div></footer>
${interestDialog(apiEnabled)}
</body>
</html>`;
}

const benefits = [
  ['⤴', 'Pensato per ciò che stampi', 'Menu, volantini, etichette e packaging. Con Premium cambi la destinazione senza ristampare il QR.'],
  ['✓', 'Il nome della tua azienda', 'Il sottodominio è riservato alle imprese verificate che dimostrano il controllo del proprio dominio.'],
  ['⊘', 'Nessuna analitica dei clic', 'Shrtn non offre statistiche ai clienti e non profila i visitatori.'],
];

export const home = `<section class="hero">
  <div class="wrap hero-grid">
    <div>
      <p class="eyebrow">Link brevi per aziende</p>
      <h1>Stampalo una volta.<br>Aggiornalo quando serve.</h1>
      <p class="lead">Il QR sul menu, sull’etichetta o sul cartello resta lo stesso. Con Shrtn Premium puoi cambiare la pagina che si apre dopo la scansione.</p>
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
<section class="wrap section">
  <div class="benefits">${benefits.map(([icon, title, detail]) => `<article><span class="feature-icon" aria-hidden="true">${icon}</span><h2>${title}</h2><p>${detail}</p></article>`).join('')}</div>
</section>
<section class="soft"><div class="wrap section split">
  <div><h2>Due domini, due usi.</h2><p>Un link da condividere oggi e un QR da stampare su centinaia di confezioni rispondono a esigenze diverse.</p></div>
  <dl class="domains"><div><dt class="mono">shrtnfree.link</dt><dd>Link gratuiti, con destinazione fissa e senza garanzia di durata.</dd></div>
    <div><dt class="mono">shrtn.link</dt><dd>Link per imprese, con destinazione modificabile. Un indirizzo con il nome dell’azienda è disponibile con il piano con sottodominio.</dd></div></dl>
</div></section>
<section class="wrap section narrow center"><h2>Il tuo prossimo QR</h2><p>Confronta i piani prima di mandare in stampa.</p><a class="button primary" href="/pricing/">Vedi i prezzi</a></section>`;

export const pricing = `<section class="wrap section">
  <div class="narrow center pricing-head">
    <h1>Un piano per ogni link.</h1>
    <p>Free per condividere un indirizzo. Premium per le imprese che vogliono poter cambiare la destinazione anche dopo la stampa.</p>
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
    <p>Vuoi provare senza account? <a href="/crea/">Apri la demo</a>. Il servizio anonimo usa <code>nofollow.shrtnfree.link</code> e genera solo link testuali.</p>
    <details><summary>Premium senza verifica del profilo</summary><p>Con un identificativo d’impresa puoi scegliere Premium senza completare la verifica del profilo a <strong>17,99 € al mese</strong> o <strong>179,99 € all’anno</strong>, IVA esclusa. La verifica consente di accedere al prezzo ridotto.</p><button class="button outline" type="button" data-interest="premium-unverified">Abbonati senza verifica</button></details>
    <details><summary>Quanto dura un link dopo la disdetta?</summary><p>I link Premium su <code>shrtn.link</code> restano attivi e non modificabili per almeno dodici mesi, con 90 giorni di preavviso prima della disattivazione. I percorsi sul sottodominio aziendale restano attivi per 30 giorni dalla fine del piano.</p></details>
    <details><summary>Che differenza c’è fra Free e Premium?</summary><p>I link Free mostrano la destinazione su una pagina di passaggio di cinque secondi. La destinazione è fissa. Premium permette di modificarla e offre il reindirizzamento immediato.</p></details>
  </div>
</section>`;

export const demo = `<section class="wrap section demo-page">
  <div><p class="eyebrow">Demo</p><h1>Prova un link breve.</h1><p>Incolla un indirizzo per vedere come apparirebbe un link gratuito senza account. La demo non crea un reindirizzamento e l’indirizzo rimane nel browser.</p><a href="/pricing/">Confronta i piani →</a></div>
  <form id="demo-form" class="demo-card" method="post">
    <label for="url">Indirizzo di destinazione</label>
    <input id="url" type="url" required maxlength="2048" placeholder="https://esempio.it/menu" autocomplete="off">
    <p class="fine">${notice}</p>
    <button type="submit" class="button primary">Genera link demo <span aria-hidden="true">→</span></button>
    <div class="demo-result" id="demo-result" hidden><p>Link demo · non attivo</p><output class="mono" id="demo-link"></output><button class="button outline" id="copy" type="button">Copia esempio</button></div>
    <p class="status fine" id="demo-status" role="status"></p>
  </form>
</section>`;

export const privacy = apiEnabled => `<section class="wrap section narrow">
  <h1>Privacy</h1><p>La demo elabora nel browser l’indirizzo che inserisci. ${apiEnabled ? 'Quando le iscrizioni sono aperte, il modulo mostra l’informativa applicabile agli avvisi di lancio.' : 'Le iscrizioni non sono ancora aperte.'}</p>
</section>`;
