const illustrations = {
  pdf: `
    <path d="M25 10h28l18 18v34H25z" fill="none" stroke="var(--ink)" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M53 10v18h18M34 40h27M34 48h21M34 56h15" fill="none" stroke="var(--accent)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  `,
  "background-remove": `
    <path d="M16 15h64v42H16z" fill="none" stroke="var(--ink)" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M16 36h22V15M60 15v20h20M16 48h14v9M67 47h13v10" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M38 52c0-7 5-11 11-11 5 0 7 3 10 5 2-2 5-3 8-3v20H38z" fill="var(--ink)"/>
  `,
  compress: `
    <path d="M17 17h38v38H17z" fill="none" stroke="var(--ink)" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M42 43h37v25H42z" fill="none" stroke="var(--accent)" stroke-width="3" stroke-linejoin="round"/>
    <path d="M29 26v20M22 39l7 7 7-7M59 50v12M53 57l6 6 6-6" fill="none" stroke="var(--ink)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  `,
  format: `
    <path d="M17 22h25v34H17zM54 22h25v34H54z" fill="none" stroke="var(--ink)" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M23 32h13M23 39h13M60 32h13M60 39h13M45 31v15M40 41l5 5 5-5" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  `,
  "resize-crop": `
    <path d="M28 15v45h47M18 25h45v40" fill="none" stroke="var(--ink)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M38 30h18v18H38zM67 55v11h-9M22 15h-6v6M63 15h10v10" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  `,
  tiktok: `
    <path d="M30 13h36v46H30z" fill="none" stroke="var(--ink)" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M48 22v20a7 7 0 1 1-7-7M48 23c2 6 6 9 12 10" fill="none" stroke="var(--accent)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M35 52h4M57 52h4" fill="none" stroke="var(--ink)" stroke-width="2.5" stroke-linecap="round"/>
  `
};

export function renderToolIllustration(name) {
  const drawing = illustrations[name];
  if (!drawing) throw new Error(`Ilustrasi alat tidak dikenal: ${name}`);

  return `<svg viewBox="0 0 96 72" role="presentation" aria-hidden="true" focusable="false">${drawing}</svg>`;
}
