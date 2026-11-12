const destination = document.querySelector('#destination');
if (destination) {
  const menus = ['menu-estate.pdf', 'menu-autunno.pdf', 'menu-inverno.pdf'];
  let index = 0;
  document.querySelector('#update-destination').addEventListener('click', () => {
    index = (index + 1) % menus.length;
    destination.textContent = `tuaazienda.example/${menus[index]}`;
  });
  destination.setAttribute('aria-live', 'polite');
}

document.querySelectorAll('[data-period]').forEach(button => {
  button.addEventListener('click', () => {
    const period = button.dataset.period;
    document.querySelectorAll('[data-period]').forEach(choice => {
      choice.setAttribute('aria-pressed', String(choice === button));
    });
    document.querySelectorAll('[data-monthly]').forEach(price => {
      price.textContent = `${price.dataset[period]} €`;
      price.nextElementSibling.textContent = period === 'monthly' ? 'al mese · IVA esclusa' : 'all’anno · IVA esclusa';
    });
  });
});

const demo = document.querySelector('#demo-form');
if (demo) {
  const result = document.querySelector('#demo-result');
  const link = document.querySelector('#demo-link');
  const status = document.querySelector('#demo-status');
  demo.addEventListener('input', () => {
    result.hidden = true;
    status.textContent = '';
  });
  demo.addEventListener('submit', event => {
    event.preventDefault();
    const url = new URL(demo.querySelector('#url').value);
    if (!['https:', 'http:'].includes(url.protocol) || !url.hostname.includes('.') || url.username || url.password) {
      result.hidden = true;
      status.textContent = 'Inserisci un indirizzo web pubblico che inizi con http:// o https://.';
      return;
    }
    const alphabet = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
    const code = Array.from(crypto.getRandomValues(new Uint8Array(7)), value => alphabet[value % 32]).join('');
    link.textContent = `nofollow.shrtnfree.link/${code}`;
    result.hidden = false;
    status.textContent = 'Esempio generato. Il link non è attivo.';
  });
  document.querySelector('#copy').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(link.textContent);
      status.textContent = 'Esempio copiato.';
    } catch {
      status.textContent = 'Puoi selezionare il link e copiarlo manualmente.';
    }
  });
}

const dialog = document.querySelector('#interest');
const signup = document.querySelector('#signup');
const signupStatus = document.querySelector('#signup-status');
const ping = document.querySelector('#ping');
const pingStatus = document.querySelector('#ping-status');
let intent;
let trigger;
let pingSent = false;
let pingId;
let privacyVersion;

async function request(path, data) {
  const options = data ? {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
  } : {};
  const response = await fetch(path, options);
  const body = await response.json();
  if (!response.ok) throw new Error(body.error ?? 'Riprova tra poco.');
  return body;
}

function displayPings(count) {
  const message = count === 1 ? '1 ping ricevuto.' : `${count.toLocaleString('it-IT')} ping ricevuti.`;
  pingStatus.textContent = pingSent ? `Ping inviato! ${message}` : message;
}

document.querySelectorAll('[data-interest]').forEach(button => {
  button.addEventListener('click', async () => {
    trigger = button;
    intent = button.dataset.interest;
    document.querySelector('#interest-context').textContent = {
      free: 'L’account Free sarà disponibile al lancio.',
      premium: 'Il piano Premium non è ancora in vendita.',
      subdomain: 'Il piano con sottodominio non è ancora in vendita.',
      signin: 'L’area account sarà disponibile al lancio.',
      'premium-unverified': 'Il piano Premium senza verifica non è ancora in vendita.',
    }[intent];
    signup?.reset();
    if (signupStatus) signupStatus.textContent = '';
    dialog.showModal();
    if (!signup || !ping) return;
    signup.hidden = !privacyVersion;
    if (!privacyVersion) {
      request('/api/config').then(config => {
        if (!config.privacyVersion || !config.privacyUrl) return;
        privacyVersion = config.privacyVersion;
        document.querySelector('#notice-link').href = config.privacyUrl;
        document.querySelector('#signup-unavailable').hidden = true;
        signup.hidden = false;
      }).catch(() => {});
    }
    if (pingSent) return;
    pingStatus.textContent = '';
    try {
      const { count } = await request('/api/ping');
      if (!pingSent && !ping.disabled) displayPings(count);
    } catch {
      if (!pingSent && !ping.disabled) pingStatus.textContent = 'Conteggio al momento non disponibile.';
    }
  });
});

dialog.addEventListener('close', () => trigger?.focus());
signup?.addEventListener('submit', async event => {
  event.preventDefault();
  const button = signup.querySelector('[type=submit]');
  button.disabled = true;
  signupStatus.textContent = 'Salvataggio…';
  const currentIntent = intent;
  try {
    await request('/api/subscribe', {
      email: signup.elements.email.value,
      privacy: signup.elements.privacy.checked,
      marketing: signup.elements.marketing.checked,
      formVersion: signup.dataset.version,
      privacyVersion,
      intent,
    });
    if (!dialog.open || intent !== currentIntent) return;
    signup.reset();
    signupStatus.textContent = 'Richiesta di avviso ricevuta.';
  } catch (error) {
    if (dialog.open && intent === currentIntent) signupStatus.textContent = error.message;
  } finally {
    button.disabled = false;
  }
});

ping?.addEventListener('click', async () => {
  ping.disabled = true;
  pingStatus.textContent = 'Invio…';
  try {
    pingId ??= crypto.randomUUID();
    const { count } = await request('/api/ping', { id: pingId });
    pingSent = true;
    displayPings(count);
  } catch (error) {
    ping.disabled = false;
    pingStatus.textContent = error.message;
  }
});
