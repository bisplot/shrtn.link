export const PRIVACY_VERSION = '2026-11-18-v1';
export const PRIVACY_DATE = '18 novembre 2026';
export const PRIVACY_DATE_EN = 'November 18, 2026';
export const PRIVACY_EMAIL = 'privacy@bisplot.com';

const sections = [
  ['titolare', 'Chi tratta i tuoi dati'],
  ['ambito', 'A cosa si applica questa informativa'],
  ['dati', 'Quali dati trattiamo, perché e per quanto tempo'],
  ['cookie', 'Cookie e strumenti di tracciamento'],
  ['destinatari', 'A chi comunichiamo i dati'],
  ['trasferimenti', 'Trasferimenti fuori dall’Unione europea'],
  ['diritti', 'I tuoi diritti'],
  ['altro', 'Decisioni automatizzate, minori e sicurezza'],
  ['modifiche', 'Modifiche e versioni'],
];

const mail = `<a href="mailto:${PRIVACY_EMAIL}">${PRIVACY_EMAIL}</a>`;

const table = (head, rows) => `<div class="table-scroll"><table>
  <thead><tr>${head.map(cell => `<th scope="col">${cell}</th>`).join('')}</tr></thead>
  <tbody>${rows.map(([first, ...rest]) => `<tr><th scope="row">${first}</th>${rest.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody>
</table></div>`;

const italian = () => `<div id="privacy-it" class="legal-lang" lang="it">
  <header class="legal-head">
    <p class="eyebrow">Informativa ai sensi degli artt. 13 e 14 del Regolamento (UE) 2016/679</p>
    <h1 id="privacy-title">Informativa sulla privacy</h1>
    <p class="legal-meta">Versione <span class="mono">${PRIVACY_VERSION}</span> · in vigore dal ${PRIVACY_DATE}</p>
  </header>

  <aside class="summary" aria-labelledby="summary-title">
    <h2 id="summary-title">In breve</h2>
    <ul>
      <li><strong>Nessun cookie e nessuna analisi del traffico.</strong> Il sito non usa cookie, pixel, statistiche di terzi né font esterni.</li>
      <li><strong>Lasci un dato solo se ce lo dai tu.</strong> L’unico dato personale che raccogliamo di nostra iniziativa è l’email che inserisci per essere avvisato al lancio.</li>
      <li><strong>Il marketing è facoltativo.</strong> Per ricevere l’avviso di lancio non devi accettare novità e promozioni.</li>
      <li><strong>Non vendiamo dati</strong> e non li usiamo per pubblicità o profilazione.</li>
      <li><strong>Per qualsiasi richiesta</strong> scrivi a ${mail}.</li>
    </ul>
  </aside>

  <nav class="toc" aria-labelledby="toc-title">
    <h2 id="toc-title">Indice</h2>
    <ol>${sections.map(([id, title]) => `<li><a href="#${id}">${title}</a></li>`).join('')}</ol>
  </nav>

  <section id="titolare" aria-labelledby="h-titolare">
    <h2 id="h-titolare">1. Chi tratta i tuoi dati</h2>
    <p>Shrtn è un servizio di <strong>Bisplot</strong>, titolare del trattamento dei dati descritti in questa pagina. I dati societari completi (denominazione, sede legale, partita IVA, PEC) saranno pubblicati qui quando la società sarà costituita e iscritta al Registro delle imprese.</p>
    <p>Per ogni questione sui tuoi dati personali, compreso l’esercizio dei diritti della sezione 7, scrivi a ${mail}.</p>
    <p>Non abbiamo nominato un responsabile della protezione dei dati: non ricorrono i presupposti dell’art. 37 GDPR.</p>
  </section>

  <section id="ambito" aria-labelledby="h-ambito">
    <h2 id="h-ambito">2. A cosa si applica questa informativa</h2>
    <p>Shrtn è in fase di pre-lancio. Questa informativa riguarda ciò che il sito <span class="mono">shrtn.link</span> e il suo servizio di supporto trattano oggi:</p>
    <ul>
      <li>la navigazione del sito e della demo;</li>
      <li>l’apertura dei link brevi già pubblicati su <span class="mono">shrtn.link</span>;</li>
      <li>l’iscrizione agli avvisi di lancio;</li>
      <li>il contatore “ping”;</li>
      <li>le email che ci scrivi.</li>
    </ul>
    <p>Account, abbonamenti, verifica dell’impresa e pagamenti non sono ancora attivi e <strong>oggi non raccogliamo alcun dato per queste funzioni</strong>. Prima di attivarli pubblicheremo un’informativa aggiornata, e se hai chiesto di essere avvisato te lo comunicheremo.</p>
  </section>

  <section id="dati" aria-labelledby="h-dati">
    <h2 id="h-dati">3. Quali dati trattiamo, perché e per quanto tempo</h2>

    <h3>3.1 Navigazione del sito e apertura dei link brevi</h3>
    <p>Il sito è ospitato su GitHub Pages. Quando apri una pagina o un link breve, il fornitore del servizio riceve inevitabilmente dati tecnici: indirizzo IP, data e ora, pagina richiesta, tipo di browser. Noi non ne facciamo copia, non li leggiamo e non li colleghiamo ad altri dati.</p>
    <p>Quando apri un link breve, la pagina di transizione mostra la destinazione e ti reindirizza. Il tuo browser può contattare il sito di destinazione poco prima del reindirizzamento: da quel momento il trattamento dei tuoi dati dipende da quel sito e dalla sua informativa.</p>
    ${table(['Finalità', 'Base giuridica', 'Conservazione'], [
      ['Erogare il sito e il reindirizzamento, e proteggerli da abusi e attacchi', 'Legittimo interesse, art. 6.1.f GDPR', 'Secondo le politiche del fornitore (sezione 5). Noi non conserviamo copia'],
    ])}

    <h3>3.2 Demo</h3>
    <p>L’indirizzo che inserisci nella demo <strong>non lascia il tuo browser</strong>: il link di prova viene generato sul tuo dispositivo, non è attivo e non viene inviato né salvato da noi.</p>

    <h3>3.3 Iscrizione agli avvisi di lancio</h3>
    <p>Se compili il modulo “Avvisami al lancio” trattiamo:</p>
    <ul>
      <li>il tuo <strong>indirizzo email</strong>;</li>
      <li>il <strong>piano o la funzione</strong> da cui sei partito (per esempio Free, Premium, sottodominio, accesso), per avvisarti della cosa giusta;</li>
      <li>se hai dato o no il <strong>consenso facoltativo</strong> a novità e promozioni;</li>
      <li>la <strong>data e l’ora</strong> della richiesta e le <strong>versioni</strong> del modulo e di questa informativa che hai accettato, per poter dimostrare che cosa hai accettato.</li>
    </ul>
    <p>L’applicazione che riceve il modulo non registra il tuo indirizzo IP né il tuo user agent.</p>
    ${table(['Finalità', 'Base giuridica', 'Conservazione', 'Conferimento'], [
      ['Avviso di lancio relativo al piano o alla funzione che hai scelto', 'Tua richiesta: misure precontrattuali, art. 6.1.b GDPR', 'Fino all’invio dell’avviso o alla tua richiesta di cancellazione; in ogni caso non oltre 24 mesi dall’iscrizione', 'Facoltativo. Senza email non possiamo avvisarti'],
      ['Novità e promozioni di Bisplot su prodotti, servizi, eventi e iniziative che Bisplot organizza o promuove', 'Consenso, art. 6.1.a GDPR e art. 130 Codice Privacy. Puoi revocarlo in ogni momento', 'Fino alla revoca; in ogni caso non oltre 24 mesi dall’iscrizione, salvo nuovo consenso', 'Facoltativo. Il rifiuto non influisce sull’avviso di lancio'],
      ['Conservare la prova dell’informativa letta e del consenso', 'Legittimo interesse, art. 6.1.f GDPR (accountability, art. 7.1 GDPR)', 'Per il tempo in cui conserviamo l’iscrizione, più i termini di prescrizione in caso di contestazione', 'Parte della richiesta'],
    ])}
    <p>Per revocare il consenso, cambiare scelta o cancellarti scrivi a ${mail}. Il modulo non modifica una scelta già registrata: se ti iscrivi di nuovo con la stessa email e lo stesso piano, la prima scelta resta valida finché non ce lo chiedi per email.</p>
    <p>Oggi non utilizziamo un servizio di invio email. Se lo adotteremo, lo aggiungeremo all’elenco della sezione 5 prima del primo invio.</p>

    <h3>3.4 Contatore “ping”</h3>
    <p>Il pulsante “Manda un ping” genera nel tuo browser un identificativo casuale, che resta in memoria finché non chiudi la pagina, e lo invia insieme a data e ora per aumentare un contatore di interesse. Non è collegato alla tua email né a un account, e l’applicazione non registra il tuo indirizzo IP.</p>
    ${table(['Finalità', 'Base giuridica', 'Conservazione'], [
      ['Contare quante persone hanno mostrato interesse al servizio', 'Legittimo interesse, art. 6.1.f GDPR', 'Fino alla fine della fase di pre-lancio e comunque non oltre 12 mesi; poi solo il totale'],
    ])}

    <h3>3.5 Dati tecnici del servizio di supporto</h3>
    <p>Le richieste di iscrizione e di ping passano da Cloudflare, che protegge e distribuisce il servizio, e arrivano a un server gestito da noi. Cloudflare e il server possono registrare indirizzo IP, data e ora e tipo di richiesta, esclusivamente per sicurezza e prevenzione degli abusi. I registri tenuti da noi non sono conservati oltre 90 giorni.</p>

    <h3>3.6 Email e richieste che ci invii</h3>
    <p>Se ci scrivi trattiamo il tuo indirizzo, il contenuto del messaggio e i dati che ci fornisci per risponderti. Base giuridica: art. 6.1.b o 6.1.f GDPR, secondo il caso. Conserviamo la corrispondenza per 24 mesi dall’ultimo scambio, o fino alla definizione di un eventuale contenzioso.</p>
  </section>

  <section id="cookie" aria-labelledby="h-cookie">
    <h2 id="h-cookie">4. Cookie e strumenti di tracciamento</h2>
    <p>Il sito non imposta cookie e non scrive dati sul tuo dispositivo (niente <em>local storage</em>, niente identificatori persistenti). Non usa strumenti di analisi o pubblicità, pixel o servizi di terzi per font, mappe o video. Per questo non mostra un banner cookie: non ne ha bisogno.</p>
    <p>Shrtn non offre statistiche sui clic ai suoi clienti e non profila chi apre i link. Se cambiassimo approccio aggiorneremmo questa informativa prima di farlo.</p>
  </section>

  <section id="destinatari" aria-labelledby="h-destinatari">
    <h2 id="h-destinatari">5. A chi comunichiamo i dati</h2>
    <p>Non vendiamo dati personali. Li comunichiamo solo a chi serve a far funzionare il servizio:</p>
    ${table(['Destinatario', 'Ruolo', 'Che cosa riceve', 'Dove'], [
      ['GitHub (Microsoft)', 'Fornitore di hosting del sito', 'Dati tecnici di navigazione (IP, data e ora, pagina). <a href="https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#data-collection">Come GitHub Pages raccoglie i dati</a>', 'Stati Uniti e altri Paesi'],
      ['Cloudflare', 'Fornitore di rete e sicurezza del servizio di supporto', 'Dati tecnici delle richieste e quanto contenuto nel modulo di iscrizione o nel ping', 'Stati Uniti e altri Paesi'],
      ['Fornitore di infrastruttura di Bisplot (server)', 'Responsabile del trattamento', 'Il database delle iscrizioni e dei ping', 'Indicato su richiesta'],
      ['Consulenti professionali', 'Responsabili o titolari autonomi', 'Quanto necessario alla consulenza', 'Italia'],
      ['Autorità giudiziarie e amministrative', 'Titolari autonomi', 'Quanto richiesto dalla legge', 'Italia / UE'],
    ])}
    <p>Non evadiamo richieste di dati delle autorità in automatico: ne verifichiamo l’autenticità e la competenza e comunichiamo solo quanto richiesto. L’elenco aggiornato dei fornitori è disponibile scrivendo a ${mail}.</p>
  </section>

  <section id="trasferimenti" aria-labelledby="h-trasferimenti">
    <h2 id="h-trasferimenti">6. Trasferimenti fuori dall’Unione europea</h2>
    <p>I fornitori della sezione 5 possono trattare dati negli Stati Uniti e in altri Paesi terzi. Il trasferimento avviene sulla base della decisione di adeguatezza della Commissione europea per i fornitori aderenti al Data Privacy Framework UE-USA oppure, in alternativa, delle clausole contrattuali tipo adottate dalla Commissione. Puoi chiederci copia delle garanzie adottate scrivendo a ${mail}.</p>
  </section>

  <section id="diritti" aria-labelledby="h-diritti">
    <h2 id="h-diritti">7. I tuoi diritti</h2>
    <p>Puoi chiederci in ogni momento accesso, rettifica, cancellazione, limitazione e portabilità dei dati che ci hai fornito; puoi opporti ai trattamenti fondati sul legittimo interesse e revocare il consenso, senza effetti sui trattamenti già svolti.</p>
    <p>Scrivi a ${mail}. Rispondiamo entro un mese, prorogabile di due per richieste complesse, dandotene avviso.</p>
    <p>Alcuni limiti: non possiamo identificarti partendo dal solo indirizzo IP o dall’identificativo casuale del ping, e in quel caso si applica l’art. 11 GDPR. Può essere necessario conservare le prove di un consenso o di una richiesta per difenderci in giudizio.</p>
    <p>Hai diritto di proporre reclamo al <a href="https://www.garanteprivacy.it">Garante per la protezione dei dati personali</a> o all’autorità del Paese in cui risiedi o lavori, e di rivolgerti all’autorità giudiziaria.</p>
  </section>

  <section id="altro" aria-labelledby="h-altro">
    <h2 id="h-altro">8. Decisioni automatizzate, minori e sicurezza</h2>
    <p><strong>Decisioni automatizzate.</strong> Non adottiamo decisioni basate unicamente su trattamenti automatizzati che producano effetti giuridici nei tuoi confronti (art. 22 GDPR) e non facciamo profilazione.</p>
    <p><strong>Minori.</strong> Il servizio è rivolto a imprese e professionisti e non è destinato a minori di 18 anni. Se pensi che un minore ci abbia dato dati, scrivici e li cancelleremo.</p>
    <p><strong>Sicurezza.</strong> Le comunicazioni con il sito e con il servizio di supporto avvengono in HTTPS. Il servizio di supporto accetta richieste solo dal sito <span class="mono">shrtn.link</span> e limita il numero di richieste. Il database delle iscrizioni è un file riservato, non accessibile ad altri utenti del server. Raccogliamo solo i dati che servono. In caso di violazione dei dati personali che comporti un rischio per i tuoi diritti agiremo secondo gli artt. 33 e 34 GDPR.</p>
  </section>

  <section id="modifiche" aria-labelledby="h-modifiche">
    <h2 id="h-modifiche">9. Modifiche e versioni</h2>
    <p>Pubblichiamo ogni versione di questa informativa su questa pagina, con numero e data di entrata in vigore. Registriamo la versione che hai letto quando ti iscrivi agli avvisi di lancio. Se la modifica è sostanziale e ci hai dato la tua email, te lo comunichiamo almeno 30 giorni prima dell’entrata in vigore.</p>
    <p>Questa è la versione <span class="mono">${PRIVACY_VERSION}</span>, in vigore dal ${PRIVACY_DATE}. Fa fede la versione in italiano.</p>
  </section>

  <p class="legal-end"><a href="#privacy-title">Torna all’inizio ↑</a></p>
</div>`;

const sectionsEn = [
  ['en-controller', 'Who processes your data'],
  ['en-scope', 'What this notice covers'],
  ['en-data', 'What data we process, why and for how long'],
  ['en-cookies', 'Cookies and tracking'],
  ['en-recipients', 'Who we share data with'],
  ['en-transfers', 'Transfers outside the European Union'],
  ['en-rights', 'Your rights'],
  ['en-other', 'Automated decisions, minors and security'],
  ['en-changes', 'Changes and versions'],
];

const english = () => `<div id="privacy-en" class="legal-lang" lang="en">
  <header class="legal-head">
    <p class="eyebrow">Notice under Articles 13 and 14 of Regulation (EU) 2016/679</p>
    <h1 id="privacy-title-en">Privacy notice</h1>
    <p class="legal-meta">Version <span class="mono">${PRIVACY_VERSION}</span> · effective ${PRIVACY_DATE_EN}. The Italian version prevails.</p>
  </header>

  <aside class="summary" aria-labelledby="summary-title-en">
    <h2 id="summary-title-en">In short</h2>
    <ul>
      <li><strong>No cookies and no traffic analytics.</strong> The site uses no cookies, pixels, third-party statistics or external fonts.</li>
      <li><strong>You only leave data if you give it to us.</strong> The only personal data we collect on our own initiative is the email you enter to be notified at launch.</li>
      <li><strong>Marketing is optional.</strong> You do not have to accept news and promotions to receive the launch notice.</li>
      <li><strong>We do not sell data</strong> and do not use it for advertising or profiling.</li>
      <li><strong>For any request</strong> write to ${mail}.</li>
    </ul>
  </aside>

  <nav class="toc" aria-labelledby="toc-title-en">
    <h2 id="toc-title-en">Contents</h2>
    <ol>${sectionsEn.map(([id, title]) => `<li><a href="#${id}">${title}</a></li>`).join('')}</ol>
  </nav>

  <section id="en-controller" aria-labelledby="h-en-controller">
    <h2 id="h-en-controller">1. Who processes your data</h2>
    <p>Shrtn is a service of <strong>Bisplot</strong>, the controller of the data described on this page. The full company details (name, registered office, VAT number, certified email) will be published here once the company has been incorporated and entered in the Business Register.</p>
    <p>For any question about your personal data, including the exercise of your rights under section 7, write to ${mail}.</p>
    <p>We have not appointed a data protection officer, as the conditions of Article 37 GDPR are not met.</p>
  </section>

  <section id="en-scope" aria-labelledby="h-en-scope">
    <h2 id="h-en-scope">2. What this notice covers</h2>
    <p>Shrtn is in pre-launch. This notice covers what the <span class="mono">shrtn.link</span> website and its support service process today:</p>
    <ul>
      <li>browsing the website and the demo;</li>
      <li>opening the short links already published on <span class="mono">shrtn.link</span>;</li>
      <li>signing up for launch notices;</li>
      <li>the “ping” counter;</li>
      <li>the emails you send us.</li>
    </ul>
    <p>Accounts, subscriptions, business verification and payments are not yet active and <strong>we do not collect any data for them today</strong>. Before activating them we will publish an updated notice and, if you asked to be notified, tell you.</p>
  </section>

  <section id="en-data" aria-labelledby="h-en-data">
    <h2 id="h-en-data">3. What data we process, why and for how long</h2>

    <h3>3.1 Browsing the website and opening short links</h3>
    <p>The website is hosted on GitHub Pages. When you open a page or a short link, the hosting provider inevitably receives technical data: IP address, date and time, requested page, browser type. We do not copy it, read it or link it to other data.</p>
    <p>When you open a short link, the transition page shows the destination and redirects you. Your browser may contact the destination site shortly before the redirect: from then on, how your data is handled depends on that site and its notice.</p>
    ${table(['Purpose', 'Legal basis', 'Retention'], [
      ['Providing the website and the redirect, and protecting them from abuse and attacks', 'Legitimate interest, Art. 6(1)(f) GDPR', 'According to the provider’s policies (section 5). We keep no copy'],
    ])}

    <h3>3.2 Demo</h3>
    <p>The address you enter in the demo <strong>never leaves your browser</strong>: the sample link is generated on your device, is not active and is neither sent to nor stored by us.</p>

    <h3>3.3 Launch notice signup</h3>
    <p>If you fill in the “Notify me at launch” form, we process:</p>
    <ul>
      <li>your <strong>email address</strong>;</li>
      <li>the <strong>plan or feature</strong> you started from (for example Free, Premium, subdomain, sign-in), so that we notify you about the right thing;</li>
      <li>whether or not you gave the <strong>optional consent</strong> to news and promotions;</li>
      <li>the <strong>date and time</strong> of the request and the <strong>versions</strong> of the form and of this notice you accepted, so that we can prove what you accepted.</li>
    </ul>
    <p>The application that receives the form does not record your IP address or user agent.</p>
    ${table(['Purpose', 'Legal basis', 'Retention', 'Providing the data'], [
      ['Launch notice about the plan or feature you chose', 'Your request: pre-contractual steps, Art. 6(1)(b) GDPR', 'Until the notice is sent or you ask for deletion; in any case no longer than 24 months from signup', 'Optional. Without an email we cannot notify you'],
      ['News and promotions from Bisplot about products, services, events and initiatives that Bisplot organises or promotes', 'Consent, Art. 6(1)(a) GDPR and Art. 130 of the Italian Privacy Code. You can withdraw it at any time', 'Until withdrawal; in any case no longer than 24 months from signup, unless you consent again', 'Optional. Declining does not affect the launch notice'],
      ['Keeping proof of the notice read and of consent', 'Legitimate interest, Art. 6(1)(f) GDPR (accountability, Art. 7(1) GDPR)', 'For as long as we keep the signup, plus limitation periods in case of dispute', 'Part of the request'],
    ])}
    <p>To withdraw consent, change your choice or have yourself deleted, write to ${mail}. The form does not change a choice already recorded: if you sign up again with the same email and the same plan, the first choice stays valid until you ask us by email.</p>
    <p>We do not currently use an email sending service. If we adopt one, we will add it to the list in section 5 before the first message is sent.</p>

    <h3>3.4 “Ping” counter</h3>
    <p>The “Send a ping” button generates a random identifier in your browser, which stays in memory until you close the page, and sends it with the date and time to increase an interest counter. It is not linked to your email or to an account, and the application does not record your IP address.</p>
    ${table(['Purpose', 'Legal basis', 'Retention'], [
      ['Counting how many people have shown interest in the service', 'Legitimate interest, Art. 6(1)(f) GDPR', 'Until the end of pre-launch and in any case no longer than 12 months; afterwards only the total'],
    ])}

    <h3>3.5 Technical data of the support service</h3>
    <p>Signup and ping requests go through Cloudflare, which protects and delivers the service, and reach a server managed by us. Cloudflare and the server may record IP address, date and time and request type, solely for security and abuse prevention. Logs kept by us are not retained for more than 90 days.</p>

    <h3>3.6 Emails and requests you send us</h3>
    <p>If you write to us we process your address, the content of your message and the data you provide in order to reply. Legal basis: Art. 6(1)(b) or 6(1)(f) GDPR, as applicable. We keep correspondence for 24 months after the last exchange, or until any dispute is settled.</p>
  </section>

  <section id="en-cookies" aria-labelledby="h-en-cookies">
    <h2 id="h-en-cookies">4. Cookies and tracking</h2>
    <p>The website sets no cookies and writes no data to your device (no local storage, no persistent identifiers). It uses no analytics or advertising tools, pixels, or third-party services for fonts, maps or video. That is why it shows no cookie banner: it does not need one.</p>
    <p>Shrtn does not offer click statistics to its customers and does not profile people who open links. If we changed approach we would update this notice before doing so.</p>
  </section>

  <section id="en-recipients" aria-labelledby="h-en-recipients">
    <h2 id="h-en-recipients">5. Who we share data with</h2>
    <p>We do not sell personal data. We share it only with those needed to run the service:</p>
    ${table(['Recipient', 'Role', 'What it receives', 'Where'], [
      ['GitHub (Microsoft)', 'Website hosting provider', 'Technical browsing data (IP, date and time, page). <a href="https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#data-collection">How GitHub Pages collects data</a>', 'United States and other countries'],
      ['Cloudflare', 'Network and security provider for the support service', 'Technical request data and what is in the signup form or the ping', 'United States and other countries'],
      ['Bisplot infrastructure provider (server)', 'Processor', 'The signup and ping database', 'Provided on request'],
      ['Professional advisers', 'Processors or independent controllers', 'What is needed for the advice', 'Italy'],
      ['Judicial and administrative authorities', 'Independent controllers', 'What the law requires', 'Italy / EU'],
    ])}
    <p>We do not answer authorities’ data requests automatically: we verify their authenticity and competence and disclose only what is requested. The up-to-date list of providers is available by writing to ${mail}.</p>
  </section>

  <section id="en-transfers" aria-labelledby="h-en-transfers">
    <h2 id="h-en-transfers">6. Transfers outside the European Union</h2>
    <p>The providers in section 5 may process data in the United States and other third countries. The transfer relies on the European Commission’s adequacy decision for providers certified under the EU-US Data Privacy Framework or, alternatively, on the standard contractual clauses adopted by the Commission. You can ask us for a copy of the safeguards by writing to ${mail}.</p>
  </section>

  <section id="en-rights" aria-labelledby="h-en-rights">
    <h2 id="h-en-rights">7. Your rights</h2>
    <p>You can ask us at any time for access, rectification, erasure, restriction and portability of the data you gave us; you can object to processing based on legitimate interest and withdraw consent, without affecting processing already carried out.</p>
    <p>Write to ${mail}. We reply within one month, extendable by two for complex requests, and we will tell you if so.</p>
    <p>Some limits: we cannot identify you from an IP address alone or from the random ping identifier, in which case Article 11 GDPR applies. It may be necessary to keep proof of a consent or request in order to defend ourselves in legal proceedings.</p>
    <p>You have the right to lodge a complaint with the <a href="https://www.garanteprivacy.it">Italian Data Protection Authority (Garante per la protezione dei dati personali)</a> or with the authority of the country where you live or work, and to go to court.</p>
  </section>

  <section id="en-other" aria-labelledby="h-en-other">
    <h2 id="h-en-other">8. Automated decisions, minors and security</h2>
    <p><strong>Automated decisions.</strong> We do not take decisions based solely on automated processing that produce legal effects on you (Art. 22 GDPR) and we do not profile.</p>
    <p><strong>Minors.</strong> The service is aimed at businesses and professionals and is not intended for people under 18. If you think a minor has given us data, write to us and we will delete it.</p>
    <p><strong>Security.</strong> Communications with the website and the support service use HTTPS. The support service accepts requests only from the <span class="mono">shrtn.link</span> website and limits the number of requests. The signup database is a private file, not accessible to other users on the server. We collect only the data we need. In case of a personal data breach that poses a risk to your rights we will act under Articles 33 and 34 GDPR.</p>
  </section>

  <section id="en-changes" aria-labelledby="h-en-changes">
    <h2 id="h-en-changes">9. Changes and versions</h2>
    <p>We publish every version of this notice on this page, with its number and effective date. We record the version you read when you sign up for launch notices. If a change is material and you have given us your email, we will tell you at least 30 days before it takes effect.</p>
    <p>This is version <span class="mono">${PRIVACY_VERSION}</span>, effective ${PRIVACY_DATE_EN}. The Italian version prevails.</p>
  </section>

  <p class="legal-end"><a href="#privacy-title-en">Back to top ↑</a></p>
</div>`;

export const privacy = () => `<article class="wrap section legal" aria-label="Privacy">
  <div class="lang-switch" role="group" aria-label="Lingua / Language" hidden>
    <button type="button" data-lang="it" aria-pressed="true">Italiano</button>
    <button type="button" data-lang="en" aria-pressed="false">English</button>
  </div>
  ${italian()}
  ${english()}
</article>`;
