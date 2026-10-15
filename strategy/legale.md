# Shrtn — Impianto legale

Revisione dell'11 ottobre 2026, con integrazioni del 12 ottobre. Allineato a
`claude/strategy.md`, che è il documento guida: dove la strategia ha deciso, questo
documento indica come renderlo conforme e quale rischio residuo resta, senza modificare
la decisione.

Documenti in `docs/legal/` (pubblici) e `docs/legal/interno/` (interni, esclusi da git
tramite `.gitignore`).

## Verdetto di fattibilità

**Legalmente fattibile, senza riserve di principio.** Nessuna autorizzazione, nessuna
licenza, nessuna attività riservata. Il vincolo non è normativo, è operativo.

Gli obblighi di reazione non scalano con il fatturato: eseguire un ordine antipirateria
entro trenta minuti è identico con dieci clienti o con diecimila. **Il costo ricorrente
della conformità non è legale, è una persona reperibile** — anzi due, come prevede la
strategia. Con l'accreditamento a Piracy Shield e il blocco automatico basta il presidio
in orario di lavoro, *a condizione che l'accreditamento sia concesso a una micro
S.r.l.*: punto ancora da verificare prima del lancio.

Il rischio più probabile non è una sanzione ma l'inserimento in blacklist dopo una
campagna di phishing. Con due domini registrabili distinti quel rischio è confinato a
`shrtnfree.link` e non raggiunge i clienti paganti su `shrtn.link`.

## Presupposti

- Erogante: **S.r.l. italiana già esistente**.
- Piani a pagamento venduti **solo a imprese con un identificativo verificabile**: VIES,
  partita IVA o altro numero di registrazione che dimostri che l'impresa esiste ed è
  attiva. Liberi professionisti compresi. I consumatori usano solo il Free.
- **Il Free, con e senza account, è aperto ai privati.** Vedi la sezione dedicata.
- Documenti in **italiano e inglese**, prevalenza dell'italiano.
- Infrastruttura **nell'Unione europea**; il dominio Free su server e IP propri.
- **Domini:** `shrtn.link` sito, area clienti e link a pagamento; `{azienda}.shrtn.link`
  per il piano con sottodominio; `shrtnfree.link` per il Free registrato;
  `nofollow.shrtnfree.link` per il Free senza account. Il reindirizzamento tecnico
  della radice dei domini Free verso il sito non è un «link fra domini» ai sensi della
  regola 3 della strategia, che riguarda i link creati dagli utenti.
- `shr.mp` e la sponsorizzazione sono sviluppi futuri, fuori dal perimetro del lancio.

## Documenti prodotti

Pubblici (IT + EN): Termini e Condizioni, Politica di Uso Consentito, Informativa
Privacy, Cookie Policy, Procedura di Segnalazione e Rimozione.

Interni (IT): analisi dei rischi legali, guida operativa alla conformità (con i modelli
di testo, tra cui il footer F13), specifica di scoring del rischio delle destinazioni,
registro dei trattamenti art. 30 GDPR, valutazione del legittimo interesse.

## Decisioni della strategia e loro traduzione legale

| Decisione (strategy.md) | Traduzione nei documenti |
| --- | --- |
| Chiusura volontaria del Free, con e senza account: **30 giorni di preavviso**, nessun indennizzo. Nessun preavviso per rimozioni per abuso, ordini delle autorità o blocchi del dominio da parte di terzi (regola 9) | Clausola 10 dei Termini (già a 30 giorni) e bozza «Natura del Piano Free» qui sotto; rischio residuo 9 |
| Piani a pagamento: fine del servizio con 90 giorni di preavviso scritto e rimborso del periodo prepagato non goduto | Clausola di cessazione nei Termini; vale anche per la sostituzione o chiusura di `shrtn.link` |
| Link anonimi senza scadenza automatica | Nessuna clausola di scadenza; restano soggetti alla regola 9 |
| Codici mai riutilizzati (regola 5) | Termini: un codice cancellato non viene riassegnato |
| Link Premium dopo la disdetta | Congelati (non modificabili, ancora attivi) per almeno 12 mesi, poi 90 giorni di preavviso prima della disattivazione |
| Piano con sottodominio | Pagamento addebitato solo all'approvazione; rotte del sottodominio attive 30 giorni dopo la fine del piano |
| Mensile gratuito fino a fine mese; annuale addebitato per intero | Termini e pagina prezzi: decorrenza, rinnovo, recesso; nessuna prova gratuita sull'annuale |
| Pacchetto modifiche | **Eliminato**: nessuna clausola |
| Marchio «Shrtn» | Dopo il lancio, previo parere di registrabilità |
| Agenzie | Nessun piano; condizioni caso per caso, ogni sottodominio cliente con documenti e prova di dominio del cliente stesso |

**Preavviso di chiusura del Free: allineato il 12 ottobre.** Strategia (regola 9),
clausola 10 dei Termini e bozza «Natura del Piano Free» dicono ora la stessa cosa: 30
giorni di preavviso per la chiusura volontaria. Con i privati sul Free è ciò che evita
la presunzione di vessatorietà dell'art. 33, c. 2, lett. h, Cod. Cons.

## Privati sul servizio gratuito, pagamento solo per le imprese

**Lecito, e preferibile.** Nessuna norma obbliga a vendere ai consumatori, e il
regolamento europeo sul geoblocco vieta discriminazioni per nazionalità o residenza,
non per qualifica professionale. Vendere ai consumatori attiverebbe recesso di 14
giorni, informativa precontrattuale rafforzata, prezzi IVA inclusa, regime di conformità
dei servizi digitali (artt. 135-octies e ss. Cod. Cons.) e foro del consumatore: il
pagamento solo B2B li evita tutti.

**Che cosa comporta avere privati sul Free**, già gestito nei Termini:

1. Il contratto gratuito con un privato è un contratto col consumatore: le clausole
   vessatorie (artt. 33-37) si applicano anche senza prezzo. Clausola 23 (foro del
   consumatore) e clausola 10 (oggetto del servizio definito in modo chiaro).
2. L'art. 135-octies resta escluso finché i dati servono solo al servizio, alla
   sicurezza e agli obblighi di legge. Condizione da preservare: niente uso dei dati per
   pubblicità o profilazione; la futura sponsorizzazione resta non profilata. È anche ciò
   che mantiene vero il claim «gratuito» davanti all'AGCM.

**Tre condizioni da rispettare:**

1. **Il cancello deve funzionare.** Verifica che l'impresa esista e sia attiva, più
   dichiarazione di agire per scopi professionali al checkout — recepita nella clausola
   6 il 12 ottobre. Rischio residuo marginale: un titolare di partita IVA che compra per
   uso privato resta tecnicamente un consumatore, perché la qualifica dipende dallo
   scopo e non dalla dichiarazione.
2. **Non promettere ai privati una via d'uscita che non hanno.** «Per link che devono
   durare usa Premium» è un vicolo cieco per un privato. Clausola 10 corretta il 12
   ottobre: Premium è indicato come riservato alle imprese, e il privato è avvisato di non
   usare un link gratuito su materiale che non potrebbe sostituire. Avviso proposto
   accanto al pulsante: *«I link gratuiti non hanno garanzia di durata. Per link che
   devono durare, Premium è disponibile per le imprese con partita IVA.»*
3. **Trenta giorni di preavviso** per la chiusura volontaria del Free — allineato il 12
   ottobre in strategia, Termini e bozza.

## Clausole dei Termini da allineare

| Tema | Testo da recepire |
| --- | --- |
| Verifica dell'impresa | Ammissione con VIES, partita IVA **o altro numero di registrazione**; per l'Italia senza VIES, riscontro su Agenzia delle Entrate o dati camerali. **VIES decide la fatturazione** (inversione contabile), non l'ammissione. *Recepito nella clausola 6 il 12 ottobre.* |
| Prezzi | Premium non verificato €17,99 / €179,99; Premium verificato €6,99 / €69,99; Premium con sottodominio €29,99 / €299,99, solo aziende verificate. IVA esclusa |
| Profilo verificato | Nome e cognome o ragione sociale, identificativo d'impresa, cellulare (codice SMS solo per confermare il numero, mai per l'accesso), email personale e aziendale (link di conferma) |
| Accesso | Email, Google, Apple, LinkedIn. SPID/CIE dopo il lancio |
| Sottodominio | Documenti societari certificati + record TXT sul dominio proprio, dominio con almeno 12 mesi, riverifica ogni 90 giorni |
| Etichette | Riservate: nomi di sistema e parole tipiche della frode (`login`, `signin`, `account`, `pay`, `payment`, `verify`, `secure`, `support`, `bank`, `wallet` e simili). Marchi rinomati: revisione manuale, sottodominio solo al titolare |
| Free | Chiusura volontaria, o sostituzione per scelta di un dominio non bloccato, con **30 giorni di preavviso**; nessun preavviso per rimozioni per abuso, ordini delle autorità o blocchi di terzi; nessuna migrazione dei link su un dominio bloccato. *Clausola 10 già conforme* |
| Limiti Free | 10 link al giorno per dominio di destinazione registrabile, condivisi fra tutti gli utenti; per le piattaforme ammesse 10 al giorno per utente (account o IP) |
| Destinazioni | Free non modificabili dopo la creazione; nessun link fra `shrtnfree.link` e `shrtn.link`; nessun altro shortener o servizio link-in-bio come destinazione |
| QR | Generato solo per utenti registrati (Free con account e piani a pagamento); i link anonimi su `nofollow.shrtnfree.link` sono solo testuali. Ogni QR emesso da Shrtn è riconducibile a un account |
| Riservatezza | Nulla di confidenziale dietro un link breve, a nessun livello: i codici sono enumerabili |

## Le conclusioni stabili

**Qualificazione DSA.** Prestatore di servizi di memorizzazione (hosting, art. 6 Reg. UE
2022/2065), non piattaforma online. Obblighi: artt. 11, 12, 14, 16, 17, 18. Esente dalle
relazioni di trasparenza (art. 15, par. 2) finché resta micro o piccola impresa.
L'esenzione da responsabilità dipende dalla tempestività della reazione.

**Antipirateria.** Con l'ordinanza 333/25/CONS AGCOM ha sanzionato Cloudflare respingendo
la difesa «non eravamo accreditati a Piracy Shield». Non accreditarsi non protegge.
**Accreditamento prima del lancio**, previa verifica che sia concesso a Shrtn.

**Vantaggio privacy.** Nessun dato sui visitatori esposto ai clienti → Shrtn è titolare
autonomo, non responsabile ex art. 28: niente DPA con i clienti. Cade se si espone anche
solo un conteggio dei clic.

**Ordini contro segnalazioni.** Un ordine si esegue, una segnalazione si valuta. Il
contraddittorio preventivo di 24-48 ore è riservato agli account identificati.

**Asimmetria sulle verifiche.** Blocchi veloci anche con verifica incompleta; dati degli
utenti mai al primo contatto e mai in automatico.

**Identità aziendale.** La verifica del dominio delega il giudizio ai registri e alle
loro procedure (UDRP, riassegnazione .it); i marchi rinomati passano comunque da
revisione manuale.

## Rischi residui

| # | Rischio | Livello | Trattamento |
| ---: | --- | --- | --- |
| 1 | Creazione anonima su `nofollow.shrtnfree.link` | Alto | IP di creazione conservato 12 mesi per prevenzione abusi (legittimo interesse, dichiarato nell'informativa); limite condiviso per dominio di destinazione; nessun QR generato per i link anonimi (riduce il phishing via QR stampati); art. 17 DSA non applicabile senza contatti (par. 2) |
| 2 | Verifica oltre VIES | Medio | Clausola 6 dei Termini aggiornata il 12 ottobre; senza fonte pubblica verificabile, niente prezzo verificato |
| 3 | Footer della pagina di transizione | Basso | Modello F13: ragione sociale, partita IVA, IP dei visitatori conservato 90 giorni solo per sicurezza e mai condiviso con il creatore, link a Termini, Privacy e Segnalazioni su `shrtn.link` |
| 4 | Google Web Risk (Lookup API) al lancio | Basso | Google Cloud come responsabile del trattamento con trasferimento verso gli USA dichiarato nell'informativa; il log giornaliero registra solo il link controllato, mai chi lo apre. L'Update API (controllo locale) è un miglioramento opzionale, non un requisito |
| 5 | Dati di verifica | Basso | Solo contatti verificati; dei documenti societari si conservano esito, data ed estremi, la copia solo se motivata e a tempo |
| 6 | «Permanente» nei testi pubblici | Medio | La parola resta nel posizionamento, ma ogni testo rivolto al cliente usa la formula: «Il QR continua a funzionare finché hai il piano, e per almeno dodici mesi dopo.» Mai «per sempre» senza condizione (art. 21 Cod. Cons.; pubblicità ingannevole B2B, D.Lgs. 145/2007) |
| 7 | Pubblicità comparativa (Bitly, Rebrandly, strumenti per la ristorazione) | Basso | Lecita se i confronti sono verificabili, aggiornati e fra servizi omogenei (art. 4 D.Lgs. 145/2007); prezzi dei concorrenti datati alla fonte |
| 8 | Piattaforme ammesse senza Web Risk; operare il Free fuori dall'Italia | Basso / escluso | Lista ammessa lecita se aggiunte e rimozioni sono decisioni umane registrate; denylist interna e rimozione rapida restano. Spostare il Free fuori dall'Italia **non è un'opzione**: non sottrae né agli obblighi antipirateria (precedente Cloudflare) né al DSA |
| 9 | Chiusura volontaria del Free | Basso | 30 giorni di preavviso: evita la presunzione di vessatorietà verso i consumatori (art. 33, c. 2, lett. h, Cod. Cons.). Avviso su pagina di transizione e modulo di creazione, e per email agli utenti registrati; per gli anonimi, senza contatti, la pagina di transizione è l'unico canale possibile e va documentata nel registro. Le esclusioni dal preavviso (abuso, ordini, blocchi di terzi) devono restare limitate a cause non dipendenti dalla scelta di Shrtn |
| 10 | Privati che usano un link Free su materiale stampato | Basso | Avviso alla creazione e clausola 10: per i privati non esiste un piano a pagamento a cui passare |

## Piano Free: nessuna garanzia

La clausola non va scritta come esonero di responsabilità ma come **definizione
dell'oggetto del servizio**, che l'art. 34, comma 2, Cod. Cons. sottrae al giudizio di
vessatorietà se chiara e comprensibile. Quattro conseguenze:

1. **Avviso alla creazione**, accanto al pulsante: *«I link gratuiti non hanno garanzia
   di durata. Per link che devono durare, Premium è disponibile per le imprese con
   partita IVA.»*
2. **Il limite che nessuna clausola supera**: restano salve dolo e colpa grave
   (art. 1229 c.c.), per esempio non applicare lo screening che i documenti interni
   prescrivono.
3. **Pagina di transizione**: contenuti minimi come da strategia (destinazione completa,
   avviso di sicurezza, nessuna garanzia, «Segnala questo link», footer F13).
4. **Due regimi distinti**: ciò che accade a Shrtn (blocco del dominio da parte di terzi,
   ordini, abusi) non ha preavviso; ciò che Shrtn sceglie (chiudere il servizio o
   sostituire un dominio funzionante) ha 30 giorni.

**Bozza — Termini e Condizioni, Piano Free (IT).** Da far revisionare all'avvocato;
coerente con la clausola 10 in `docs/legal/termini-e-condizioni.md`.

> **Natura del Piano Free.** Il Piano Free, con o senza account, è un servizio gratuito
> fornito secondo disponibilità, senza alcun livello di servizio garantito. I Link Free
> sono pubblicati su domini dedicati, attualmente `shrtnfree.link` e
> `nofollow.shrtnfree.link`. Shrtn non garantisce che i Link Free restino attivi,
> raggiungibili o funzionanti per alcuna durata: possono smettere di funzionare, anche in
> modo permanente e senza preavviso, se il dominio che li ospita viene bloccato,
> segnalato o filtrato da terzi che Shrtn non controlla, se un Link Free viene rimosso per
> violazione della Politica di Uso Consentito o in esecuzione di un ordine di
> un'autorità. In questi casi Shrtn può sostituire il dominio per i nuovi link e non è
> tenuta a ripristinare o trasferire i Link Free esistenti.
>
> **Chiusura del Piano Free.** Shrtn può cessare il Piano Free, in tutto o in parte, o
> sostituire per propria scelta un dominio che non sia stato bloccato, con un preavviso
> di almeno **30 giorni**, comunicato sulla pagina di transizione e sul modulo di
> creazione dei Link Free e, agli utenti registrati, per email. Alla scadenza del
> preavviso i Link Free interessati smettono di funzionare, senza indennizzo.
>
> Chi ha bisogno di continuità deve usare un piano a pagamento, riservato alle imprese.
> Restano salve le responsabilità che la legge non consente di escludere, incluse quelle
> per dolo o colpa grave.

**Draft — Terms of Service, Free Plan (EN).**

> **Nature of the Free Plan.** The Free Plan, with or without an account, is a free
> service provided on an as-available basis, with no guaranteed service level. Free Links
> are published on dedicated domains, currently `shrtnfree.link` and
> `nofollow.shrtnfree.link`. Shrtn does not guarantee that Free Links will remain active,
> reachable or working for any period: they may stop working, including permanently and
> without notice, if the hosting domain is blocked, flagged or filtered by third parties
> Shrtn does not control, or if a Free Link is removed for breaching the Acceptable Use
> Policy or to comply with an order of an authority. In such cases Shrtn may replace the
> domain for new links and is not required to restore or transfer existing Free Links.
>
> **Discontinuation of the Free Plan.** Shrtn may discontinue the Free Plan, in whole or
> in part, or replace by its own choice a domain that has not been blocked, with at
> least **30 days' notice**, given on the transition page and on the Free Link creation
> form and, for registered users, by email. When the notice period ends the affected Free
> Links stop working, without compensation.
>
> Anyone who needs continuity should use a paid plan, available to businesses. Liability
> that cannot be excluded by law, including for wilful misconduct or gross negligence,
> is not affected.

## Verifica del profilo: trattamento dei dati

**Base giuridica.** Esecuzione del contratto (art. 6, par. 1, lett. b) per applicare il
prezzo verificato; legittimo interesse (lett. f) per prevenzione di frodi e abusi.
**Non il consenso**: la verifica condiziona il prezzo, quindi non sarebbe libero.

**Minimizzazione.** Il cellulare serve solo a confermare il numero (codice SMS) e per
comunicazioni di servizio; nessun marketing senza consenso separato. Nessun documento
d'identità. I documenti societari contengono dati di amministratori e soci: si conservano
esito, data ed estremi.

**Adempimenti.** Registro dei trattamenti e informativa: «verifica del profilo»,
«verifica societaria per il sottodominio», «prevenzione abusi sui link anonimi»,
«sicurezza della pagina di transizione (IP 90 giorni)», «controllo delle destinazioni con
Google Web Risk». Fornitori SMS e Google Cloud come responsabili ex art. 28. Valutare con
l'avvocato se serve una DPIA (art. 35) per la verifica documentale.

## Requisiti di prodotto che i documenti presuppongono

1. Accreditamento Piracy Shield con API collegate al kill switch.
2. Kill switch con log immodificabile, anche massivo.
3. Invio automatico della motivazione delle restrizioni (art. 17 DSA).
4. Pagina di indisponibilità neutra e identica per ogni stato.
5. Checkout con due esiti distinti: *può acquistare* (identificativo d'impresa) e *come
   si fattura* (VIES), più la dichiarazione di agire per scopi professionali.
6. Registro unico di segnalazioni, ordini, misure, riesami, ritiri del Free e modifiche
   alla lista delle piattaforme ammesse.
7. Screening delle destinazioni: Web Risk Lookup, URLhaus, denylist interna; ricontrollo
   giornaliero al primo utilizzo.
8. Modulo pubblico di segnalazione e pulsante «Segnala questo link» sulla transizione.
9. Verifica dominio via TXT ripetuta ogni 90 giorni per il sottodominio.
10. Approvazione separata delle clausole vessatorie al checkout (art. 1341 c.c.).
11. Avviso «nessuna garanzia di durata» accanto al pulsante di creazione del Free, che
    indichi Premium come riservato alle imprese.
12. Divieto di link fra i due domini e verso altri shortener.
13. Etichette riservate e revisione manuale dei marchi rinomati.
14. Limite giornaliero per dominio di destinazione (Public Suffix List) e limite per utente
    sulle piattaforme ammesse; pulsante «suggerisci una piattaforma».
15. Footer F13 sulla pagina di transizione.
16. **Avviso di chiusura del Free**: banner configurabile su pagina di transizione e
    modulo di creazione, ed email agli utenti registrati, almeno 30 giorni prima; data
    di invio e testo conservati nel registro unico.

## Priorità prima del lancio

1. **NDA e cessione dei diritti con Davide e Matteo**, firmati prima di scrivere codice:
   senza, il backend non è pienamente della società.
2. **Piracy Shield, PEC e due persone reperibili** con passaggio di consegne scritto.
3. ~~Fonti di verifica nei Termini (clausola 6)~~ — fatto il 12 ottobre.
4. **Footer F13** sulla pagina di transizione.
5. **Informativa privacy** con Google Cloud, fornitore SMS, IP dei visitatori e IP di
   creazione anonima.
6. **Testi pubblici sulla durata** con la formula del rischio 6.
7. ~~Preavviso di chiusura del Free~~ — allineato a 30 giorni il 12 ottobre.
8. **Revisione dell'avvocato**, inclusa la clausola 10 (natura e chiusura del Free).
9. **Allineare** `docs/technical-brief-davide-matteo.md` e `docs/strategy.md` del repo
   alla strategia corrente (prezzi, domini, niente `shr.mp`, niente Compact).

## Fuori ambito (verificato)

Regolamento P2B 2019/1150, NIS2, data retention art. 132 Codice Privacy, ROC. European
Accessibility Act: fuori ambito per la parte B2B; per il Free aperto ai privati vale
l'esenzione delle microimprese per i servizi.

## Ancora aperte

Foro esclusivo; contenuti per adulti leciti; pubblicazione volontaria della relazione di
trasparenza; fornitori di verifica e durata di conservazione dei dati di verifica;
conservazione della copia dei documenti societari.

## Nota per il commercialista

Dal 1° gennaio 2027 si applica il Testo unico IVA (D.Lgs. 19 gennaio 2026, n. 10):
verificare che riferimenti normativi su fatture e inversione contabile siano aggiornati.
Clienti UE fuori Italia senza VIES valido: fattura con IVA italiana.
