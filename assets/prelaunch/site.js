const t = JSON.parse(document.querySelector('#strings').textContent);
const fill = (text, values) => text.replace(/\{(\w+)\}/g, (_, key) => values[key]);
const destination = document.querySelector('#destination');
if (destination) {
  const menus = t.menus;
  let index = 0;
  document.querySelector('#update-destination').addEventListener('click', () => {
    index = (index + 1) % menus.length;
    destination.textContent = `${t.destinationPrefix}${menus[index]}`;
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
      price.textContent = price.dataset[period];
      price.nextElementSibling.textContent = price.dataset[`${period}Note`];
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
      status.textContent = t.demoInvalid;
      return;
    }
    const alphabet = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
    const code = Array.from(crypto.getRandomValues(new Uint8Array(7)), value => alphabet[value % 32]).join('');
    link.textContent = `nofollow.shrtnfree.link/${code}`;
    result.hidden = false;
    status.textContent = t.demoGenerated;
  });
  document.querySelector('#copy').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(link.textContent);
      status.textContent = t.demoCopied;
    } catch {
      status.textContent = t.demoCopyFailed;
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
  const response = await fetch(`${dialog.dataset.apiOrigin ?? ''}${path}`, options);
  const body = await response.json();
  if (!response.ok) throw new Error(t.errors[response.status] ?? body.error ?? t.retry);
  return body;
}

function displayPings(count) {
  const message = count === 1 ? t.pingOne : fill(t.pingMany, { n: count.toLocaleString(t.locale) });
  pingStatus.textContent = pingSent ? fill(t.pingSent, { message }) : message;
}

document.querySelectorAll('[data-interest]').forEach(button => {
  button.addEventListener('click', async () => {
    trigger = button;
    intent = button.dataset.interest;
    document.querySelector('#interest-context').textContent = t.intents[intent];
    signup?.reset();
    if (signupStatus) signupStatus.textContent = '';
    dialog.showModal();
    if (!signup || !ping) return;
    signup.hidden = !privacyVersion;
    if (!privacyVersion) {
      request('/api/config').then(config => {
        if (!config.privacyVersion || !config.privacyUrl) return;
        privacyVersion = config.privacyVersion;
        const notice = new URL(config.privacyUrl);
        if (document.documentElement.lang === 'en') notice.searchParams.set('lang', 'en');
        document.querySelector('#notice-link').href = notice.href;
        document.querySelector('#signup-unavailable').hidden = true;
        signup.hidden = false;
      }).catch(() => {});
    }
    if (pingSent) return;
    pingStatus.textContent = '';
    try {
      const { count } = await request('/api/ping');
      ping.closest('.ping').hidden = false;
      if (!pingSent && !ping.disabled) displayPings(count);
    } catch {
      if (!pingSent && !ping.disabled) pingStatus.textContent = t.pingUnavailable;
    }
  });
});

dialog.addEventListener('close', () => trigger?.focus());
signup?.addEventListener('submit', async event => {
  event.preventDefault();
  const button = signup.querySelector('[type=submit]');
  button.disabled = true;
  signupStatus.textContent = t.saving;
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
    signupStatus.textContent = t.saved;
  } catch (error) {
    if (dialog.open && intent === currentIntent) signupStatus.textContent = error.message;
  } finally {
    button.disabled = false;
  }
});

ping?.addEventListener('click', async () => {
  ping.disabled = true;
  pingStatus.textContent = t.sending;
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

const languageSwitch = document.querySelector('.lang-switch');
if (languageSwitch) {
  const blocks = { it: document.querySelector('#privacy-it'), en: document.querySelector('#privacy-en') };
  const titles = { it: 'Informativa sulla privacy · Shrtn', en: 'Privacy notice · Shrtn' };
  const select = (lang, push) => {
    for (const [code, block] of Object.entries(blocks)) block.hidden = code !== lang;
    languageSwitch.querySelectorAll('[data-lang]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.lang === lang));
    });
    document.documentElement.lang = lang;
    document.title = titles[lang];
    if (push) {
      const url = new URL(location.href);
      if (lang === 'en') url.searchParams.set('lang', 'en'); else url.searchParams.delete('lang');
      history.replaceState(null, '', url);
    }
  };
  languageSwitch.hidden = false;
  languageSwitch.addEventListener('click', event => {
    const button = event.target.closest('[data-lang]');
    if (button) select(button.dataset.lang, true);
  });
  const requested = new URL(location.href).searchParams.get('lang');
  select(requested === 'en' || requested === 'it' ? requested : document.documentElement.lang === 'en' ? 'en' : 'it', false);
}
