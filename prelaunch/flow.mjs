const steps = [
  {
    title: 'Copia l’indirizzo originale',
    detail: 'Apri la pagina che vuoi condividere e copia il suo indirizzo.',
    drawing: `
      <rect x="22" y="18" width="143" height="76" rx="8"/>
      <path d="M22 36h143"/>
      <circle cx="33" cy="27" r="1"/><circle cx="40" cy="27" r="1"/><circle cx="47" cy="27" r="1"/>
      <rect class="flow-tint" x="34" y="47" width="110" height="21" rx="4"/>
      <path class="flow-accent" d="M43 57.5h64"/>
      <path d="M34 79h55"/>
      <rect class="flow-paper" x="147" y="64" width="23" height="29" rx="3"/>
      <rect class="flow-tint" x="153" y="70" width="23" height="29" rx="3"/>
      <path class="flow-accent" d="M159 80h11m-11 6h8"/>`,
  },
  {
    title: 'Incollalo nel modulo',
    detail: 'Inserisci l’indirizzo nel campo di Shrtn.link e genera il link breve.',
    drawing: `
      <rect x="20" y="37" width="160" height="59" rx="8"/>
      <rect class="flow-tint" x="32" y="53" width="136" height="21" rx="4"/>
      <path class="flow-accent" d="M42 63.5h78m5-5v10"/>
      <path d="M32 84h50"/>
      <rect class="flow-paper" x="83" y="13" width="34" height="30" rx="4"/>
      <rect class="flow-tint" x="91" y="9" width="18" height="9" rx="3"/>
      <path d="M91 26h18m-18 7h12"/>
      <path class="flow-accent" d="M100 43v10m-4-4 4 4 4-4"/>`,
  },
  {
    title: 'Ottieni il link breve',
    detail: 'Copia il nuovo link. Se hai un account, puoi anche scaricare il codice QR.',
    drawing: `
      <rect class="flow-tint" x="19" y="41" width="101" height="32" rx="16"/>
      <path class="flow-accent" d="m43 56 3-3a4 4 0 0 1 6 6l-3 3m-8-4-3 3a4 4 0 0 1-6-6l3-3m1 9 13-9M64 57h41"/>
      <path d="M126 57h7"/>
      <rect x="139" y="24" width="44" height="66" rx="7"/>
      <path d="M155 82h12"/>
      <g class="flow-accent">
        <rect x="147" y="37" width="9" height="9" rx="1"/>
        <rect x="167" y="37" width="9" height="9" rx="1"/>
        <rect x="147" y="57" width="9" height="9" rx="1"/>
        <path d="M150 41.5h3m17 0h3m-23 20h3m8-23v12h-12m12 6h10v-5h5m-15 10h5v5h10v-9"/>
      </g>`,
  },
  {
    title: 'Condividilo o stampalo',
    detail: 'Invia il link in chat o via email. Per un menu, un’etichetta o un cartello, scegli un QR Premium.',
    drawing: `
      <circle cx="58" cy="37" r="13"/>
      <path d="M38 94V76a20 20 0 0 1 20-20h3a15 15 0 0 1 13 8l7 11 18-9 5 8-25 14a7 7 0 0 1-9-3l-4-6m-1 15V79m-21 15h36"/>
      <rect class="flow-tint" x="102" y="49" width="17" height="30" rx="4" transform="rotate(11 110 64)"/>
      <path class="flow-accent" d="m123 57 11-5m-11 13 11 4"/>
      <path d="M141 37h29l9 57h-48zM137 76h36"/>
      <g class="flow-accent">
        <rect x="145" y="46" width="7" height="7" rx="1"/>
        <rect x="159" y="46" width="7" height="7" rx="1"/>
        <rect x="145" y="59" width="7" height="7" rx="1"/>
        <path d="M156 57h5v6h5v5h-11"/>
      </g>`,
  },
];

export const linkFlow = `<section class="wrap section link-flow" aria-labelledby="flow-title">
  <div class="flow-header">
    <h2 id="flow-title">Come funziona</h2>
    <a href="/crea/">Prova la demo <span aria-hidden="true">→</span></a>
  </div>
  <ol class="flow-steps" role="list">
    ${steps.map(({ title, detail, drawing }, index) => `<li class="flow-step">
      <div class="flow-figure" aria-hidden="true">
        <svg class="flow-drawing" viewBox="0 0 200 112" fill="none" stroke="currentColor"
          stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
          focusable="false">${drawing}</svg>
        ${index < steps.length - 1 ? '<span class="flow-arrow">→</span>' : ''}
      </div>
      <div class="flow-copy"><h3>${title}</h3><p>${detail}</p></div>
    </li>`).join('')}
  </ol>
</section>`;
