import { SiteManifest, Block } from '../types/manifest';

export interface RenderResult {
  fullHtml: string;
  html: string;
  css: string;
  js: string;
}

/**
 * Escapes HTML characters to prevent XSS in output
 */
function escapeHtml(str: string = ''): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Generates radius in rem/px based on theme setting
 */
function getBorderRadiusVal(radius: string): string {
  switch (radius) {
    case 'none': return '0px';
    case 'sm': return '4px';
    case 'md': return '10px';
    case 'lg': return '20px';
    case 'full': return '9999px';
    default: return '10px';
  }
}

/**
 * Static Web Renderer: Pure HTML5 + CSS3 + Minimal Vanilla JS
 */
export function renderStaticSite(manifest: SiteManifest): RenderResult {
  const { meta, theme, blocks, settings } = manifest;
  const rtl = meta.rtl !== false;
  const dir = rtl ? 'rtl' : 'ltr';
  const lang = meta.language || 'fa';
  const radius = getBorderRadiusVal(theme.borderRadius);

  // CSS variables and styles
  const css = `
/* ===================================================
   TAVANA PRODUCT FORGE - Generated Stylesheet
   Static Standalone Clean CSS
   =================================================== */
:root {
  --primary: ${theme.primaryColor};
  --accent: ${theme.accentColor};
  --bg: ${theme.backgroundColor};
  --text: ${theme.textColor};
  --card-bg: ${theme.cardBackground};
  --border: ${theme.darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'};
  --radius: ${radius};
  --font-family: 'Vazirmatn', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Tahoma, sans-serif;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: ${settings.smoothScroll ? 'smooth' : 'auto'};
}

body {
  font-family: var(--font-family);
  background-color: var(--bg);
  color: var(--text);
  line-height: 1.65;
  direction: ${dir};
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

a {
  color: inherit;
  text-decoration: none;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 20px;
  padding-right: 20px;
}

.section {
  padding: 70px 0;
  position: relative;
}

.section-header {
  text-align: center;
  margin-bottom: 48px;
}

.section-title {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 12px;
  letter-spacing: -0.02em;
}

.section-subtitle {
  font-size: 1.05rem;
  opacity: 0.8;
  max-width: 620px;
  margin: 0 auto;
}

.badge {
  display: inline-block;
  padding: 4px 14px;
  background: color-mix(in srgb, var(--primary) 15%, transparent);
  color: var(--primary);
  border: 1px solid color-mix(in srgb, var(--primary) 30%, transparent);
  border-radius: 9999px;
  font-size: 0.82rem;
  font-weight: 600;
  margin-bottom: 16px;
}

/* Button styles */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 28px;
  border-radius: var(--radius);
  font-size: 0.98rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.btn-primary {
  background-color: var(--primary);
  color: #0b0f17;
  font-weight: 700;
}
.btn-primary:hover {
  filter: brightness(1.1);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px color-mix(in srgb, var(--primary) 30%, transparent);
}

.btn-secondary {
  background: color-mix(in srgb, var(--text) 8%, transparent);
  color: var(--text);
  border: 1px solid var(--border);
}
.btn-secondary:hover {
  background: color-mix(in srgb, var(--text) 14%, transparent);
  transform: translateY(-2px);
}

/* Block: Hero */
.hero-section {
  padding: 90px 0 70px;
  min-height: 75vh;
  display: flex;
  align-items: center;
}

.hero-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.hero-centered {
  text-align: center;
  max-width: 820px;
  margin: 0 auto;
}
.hero-centered .hero-ctas {
  justify-content: center;
}

.hero-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
}

.hero-title {
  font-size: clamp(2.2rem, 5vw, 3.6rem);
  font-weight: 900;
  line-height: 1.22;
  letter-spacing: -0.03em;
}

.hero-subtitle {
  font-size: 1.15rem;
  opacity: 0.85;
  line-height: 1.8;
}

.hero-ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 10px;
}

.hero-media img {
  width: 100%;
  height: auto;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35);
  object-fit: cover;
  aspect-ratio: 16/10;
}

/* Block: Features & Services Grid */
.grid-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.card {
  background-color: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 28px;
  transition: transform 0.2s ease, border-color 0.2s ease;
}
.card:hover {
  transform: translateY(-4px);
  border-color: color-mix(in srgb, var(--primary) 40%, transparent);
}

.card-icon {
  font-size: 2rem;
  margin-bottom: 16px;
  display: inline-block;
  color: var(--primary);
}

.card-title {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 10px;
}

.card-desc {
  font-size: 0.95rem;
  opacity: 0.8;
  line-height: 1.6;
}

/* Block: Gallery */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
}
.gallery-item {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  aspect-ratio: 4/3;
  background: var(--card-bg);
}
.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}
.gallery-item:hover img {
  transform: scale(1.05);
}
.gallery-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background: linear-gradient(to top, rgba(0,0,0,0.85), transparent);
  color: #fff;
  font-size: 0.9rem;
}

/* Block: Testimonials */
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}
.testimonial-card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 26px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.testimonial-quote {
  font-size: 1rem;
  font-style: italic;
  opacity: 0.9;
  margin-bottom: 20px;
  line-height: 1.7;
}
.testimonial-author {
  display: flex;
  align-items: center;
  gap: 12px;
}
.testimonial-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  background: var(--primary);
}
.testimonial-name {
  font-weight: 700;
  font-size: 0.95rem;
}
.testimonial-role {
  font-size: 0.82rem;
  opacity: 0.65;
}

/* Block: Pricing */
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
  gap: 24px;
  align-items: stretch;
}
.pricing-card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 36px 28px;
  display: flex;
  flex-direction: column;
  position: relative;
}
.pricing-card.highlighted {
  border-color: var(--primary);
  box-shadow: 0 10px 30px color-mix(in srgb, var(--primary) 20%, transparent);
}
.pricing-name {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 8px;
}
.pricing-price {
  font-size: 2.2rem;
  font-weight: 900;
  color: var(--primary);
  margin-bottom: 16px;
}
.pricing-price small {
  font-size: 0.9rem;
  font-weight: 400;
  opacity: 0.75;
}
.pricing-features {
  list-style: none;
  margin: 20px 0;
  flex-grow: 1;
}
.pricing-features li {
  padding: 8px 0;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.92rem;
  opacity: 0.9;
  border-bottom: 1px solid var(--border);
}
.pricing-features li:last-child {
  border-bottom: none;
}
.pricing-features li::before {
  content: '✓';
  color: var(--primary);
  font-weight: bold;
}

/* Block: FAQ */
.faq-list {
  max-width: 760px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.faq-item {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
}
.faq-question {
  width: 100%;
  padding: 18px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: none;
  border: none;
  color: var(--text);
  font-family: inherit;
  font-size: 1.05rem;
  font-weight: 700;
  cursor: pointer;
  text-align: ${rtl ? 'right' : 'left'};
}
.faq-question::after {
  content: '+';
  font-size: 1.4rem;
  font-weight: 400;
  transition: transform 0.2s ease;
}
.faq-item.active .faq-question::after {
  content: '−';
  transform: rotate(180deg);
}
.faq-answer {
  display: none;
  padding: 0 24px 20px;
  font-size: 0.95rem;
  opacity: 0.85;
  line-height: 1.7;
}
.faq-item.active .faq-answer {
  display: block;
}

/* Block: Contact */
.contact-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 36px;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 40px;
}
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}
.contact-icon {
  font-size: 1.3rem;
  color: var(--primary);
}
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.form-input, .form-textarea {
  width: 100%;
  padding: 12px 16px;
  background: color-mix(in srgb, var(--bg) 60%, transparent);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--text);
  font-family: inherit;
  font-size: 0.95rem;
}
.form-input:focus, .form-textarea:focus {
  outline: none;
  border-color: var(--primary);
}

/* Block: About */
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
}
.about-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 24px;
}
.stat-box {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px;
  text-align: center;
}
.stat-val {
  font-size: 1.8rem;
  font-weight: 900;
  color: var(--primary);
}
.stat-label {
  font-size: 0.85rem;
  opacity: 0.75;
}

/* Block: CTA Section */
.cta-box {
  background: linear-gradient(135deg, color-mix(in srgb, var(--primary) 20%, var(--card-bg)), var(--card-bg));
  border: 1px solid color-mix(in srgb, var(--primary) 40%, transparent);
  border-radius: var(--radius);
  padding: 60px 30px;
  text-align: center;
}

/* Block: Footer */
.footer-section {
  border-top: 1px solid var(--border);
  padding: 48px 0 24px;
  background: color-mix(in srgb, var(--card-bg) 60%, var(--bg));
  font-size: 0.9rem;
}
.footer-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 32px;
}
.footer-brand {
  font-size: 1.3rem;
  font-weight: 800;
}
.footer-links {
  display: flex;
  gap: 20px;
  list-style: none;
}
.footer-links a:hover {
  color: var(--primary);
}
.footer-bottom {
  text-align: center;
  padding-top: 24px;
  border-top: 1px solid var(--border);
  opacity: 0.65;
}

/* Back to Top */
.back-to-top {
  position: fixed;
  bottom: 24px;
  ${rtl ? 'left: 24px;' : 'right: 24px;'}
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--primary);
  color: #0b0f17;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  font-size: 1.3rem;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
  transition: opacity 0.3s ease, transform 0.2s ease;
  z-index: 99;
  opacity: 0;
  pointer-events: none;
}
.back-to-top.visible {
  opacity: 1;
  pointer-events: auto;
}
.back-to-top:hover {
  transform: translateY(-3px);
}

/* Responsive constraints */
@media (max-width: 860px) {
  .hero-split, .contact-wrapper, .about-grid {
    grid-template-columns: 1fr;
  }
  .hero-section {
    padding: 60px 0 40px;
    min-height: auto;
  }
  .section {
    padding: 50px 0;
  }
  .hero-title {
    font-size: 2.2rem;
  }
}

${settings.customCss || ''}
  `.trim();

  // Generate HTML for each block
  const blocksHtml = blocks
    .filter((b) => b.visible !== false)
    .map((b) => renderBlockHtml(b))
    .join('\n\n');

  // Minimal Vanilla JS
  const js = `
document.addEventListener('DOMContentLoaded', function() {
  // FAQ toggles
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(function(btn) {
    btn.addEventListener('click', function() {
      const item = this.closest('.faq-item');
      item.classList.toggle('active');
    });
  });

  // Contact form submission feedback
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('پیام شما با موفقیت دریافت شد. به زودی با شما تماس خواهیم گرفت.');
      contactForm.reset();
    });
  }

  // Back to Top button
  const backBtn = document.querySelector('.back-to-top');
  if (backBtn) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        backBtn.classList.add('visible');
      } else {
        backBtn.classList.remove('visible');
      }
    });
    backBtn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
  `.trim();

  const bodyContent = `
    <main>
      ${blocksHtml}
    </main>
    ${settings.backToTop ? '<button class="back-to-top" title="بازگشت به بالا" aria-label="Back to top">↑</button>' : ''}
  `.trim();

  // Full HTML ready for single-file preview or iframe
  const fullHtml = `<!doctype html>
<html lang="${lang}" dir="${dir}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(meta.title)}</title>
    <meta name="description" content="${escapeHtml(meta.description || '')}" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <style>
${css}
    </style>
  </head>
  <body>
${bodyContent}
    <script>
${js}
    </script>
  </body>
</html>`;

  return {
    fullHtml,
    html: bodyContent,
    css,
    js,
  };
}

/**
 * Render individual block to HTML
 */
function renderBlockHtml(block: Block): string {
  const idAttr = block.customId ? ` id="${escapeHtml(block.customId)}"` : '';

  switch (block.type) {
    case 'hero': {
      const isSplit = block.layout === 'split-left' || block.layout === 'split-right';
      return `
      <section class="section hero-section"${idAttr}>
        <div class="container">
          <div class="${isSplit ? 'hero-split' : 'hero-centered'}">
            <div class="hero-content">
              ${block.badge ? `<div class="badge">${escapeHtml(block.badge)}</div>` : ''}
              <h1 class="hero-title">${escapeHtml(block.title)}</h1>
              <p class="hero-subtitle">${escapeHtml(block.subtitle)}</p>
              <div class="hero-ctas">
                ${block.ctaPrimary ? `<a href="${escapeHtml(block.ctaPrimary.link)}" class="btn btn-primary">${escapeHtml(block.ctaPrimary.text)}</a>` : ''}
                ${block.ctaSecondary ? `<a href="${escapeHtml(block.ctaSecondary.link)}" class="btn btn-secondary">${escapeHtml(block.ctaSecondary.text)}</a>` : ''}
              </div>
            </div>
            ${isSplit && block.imageUrl ? `
            <div class="hero-media">
              <img src="${escapeHtml(block.imageUrl)}" alt="${escapeHtml(block.title)}" loading="lazy" />
            </div>` : ''}
          </div>
        </div>
      </section>
      `;
    }

    case 'features': {
      return `
      <section class="section"${idAttr}>
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">${escapeHtml(block.title)}</h2>
            ${block.subtitle ? `<p class="section-subtitle">${escapeHtml(block.subtitle)}</p>` : ''}
          </div>
          <div class="grid-cards">
            ${block.items.map((item) => `
              <div class="card">
                <div class="card-icon">${escapeHtml(item.icon || '⚡')}</div>
                <h3 class="card-title">${escapeHtml(item.title)}</h3>
                <p class="card-desc">${escapeHtml(item.description)}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
      `;
    }

    case 'services': {
      return `
      <section class="section"${idAttr}>
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">${escapeHtml(block.title)}</h2>
            ${block.subtitle ? `<p class="section-subtitle">${escapeHtml(block.subtitle)}</p>` : ''}
          </div>
          <div class="grid-cards">
            ${block.items.map((item) => `
              <div class="card">
                <div class="card-icon">${escapeHtml(item.icon || '⚙️')}</div>
                ${item.badge ? `<span class="badge" style="float: left; margin: 0;">${escapeHtml(item.badge)}</span>` : ''}
                <h3 class="card-title">${escapeHtml(item.title)}</h3>
                <p class="card-desc">${escapeHtml(item.description)}</p>
                ${item.price ? `<div style="margin-top: 16px; font-weight: 800; color: var(--primary);">${escapeHtml(item.price)}</div>` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      </section>
      `;
    }

    case 'gallery': {
      return `
      <section class="section"${idAttr}>
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">${escapeHtml(block.title)}</h2>
            ${block.subtitle ? `<p class="section-subtitle">${escapeHtml(block.subtitle)}</p>` : ''}
          </div>
          <div class="gallery-grid">
            ${block.items.map((item) => `
              <div class="gallery-item">
                <img src="${escapeHtml(item.imageUrl)}" alt="${escapeHtml(item.title)}" loading="lazy" />
                <div class="gallery-caption">
                  <strong>${escapeHtml(item.title)}</strong>
                  ${item.caption ? `<p>${escapeHtml(item.caption)}</p>` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
      `;
    }

    case 'testimonials': {
      return `
      <section class="section"${idAttr}>
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">${escapeHtml(block.title)}</h2>
            ${block.subtitle ? `<p class="section-subtitle">${escapeHtml(block.subtitle)}</p>` : ''}
          </div>
          <div class="testimonials-grid">
            ${block.items.map((item) => `
              <div class="testimonial-card">
                <p class="testimonial-quote">«${escapeHtml(item.quote)}»</p>
                <div class="testimonial-author">
                  ${item.avatarUrl ? `<img src="${escapeHtml(item.avatarUrl)}" alt="${escapeHtml(item.name)}" class="testimonial-avatar" />` : ''}
                  <div>
                    <div class="testimonial-name">${escapeHtml(item.name)}</div>
                    <div class="testimonial-role">${escapeHtml(item.role)}</div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
      `;
    }

    case 'pricing': {
      return `
      <section class="section"${idAttr}>
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">${escapeHtml(block.title)}</h2>
            ${block.subtitle ? `<p class="section-subtitle">${escapeHtml(block.subtitle)}</p>` : ''}
          </div>
          <div class="pricing-grid">
            ${block.items.map((item) => `
              <div class="pricing-card ${item.highlighted ? 'highlighted' : ''}">
                ${item.badge ? `<div class="badge" style="align-self: flex-start;">${escapeHtml(item.badge)}</div>` : ''}
                <h3 class="pricing-name">${escapeHtml(item.name)}</h3>
                <div class="pricing-price">${escapeHtml(item.price)} <small>${escapeHtml(item.period || '')}</small></div>
                ${item.description ? `<p style="font-size: 0.9rem; opacity: 0.75; margin-bottom: 12px;">${escapeHtml(item.description)}</p>` : ''}
                <ul class="pricing-features">
                  ${item.features.map((f) => `<li>${escapeHtml(f)}</li>`).join('')}
                </ul>
                <a href="${escapeHtml(item.ctaLink)}" class="btn ${item.highlighted ? 'btn-primary' : 'btn-secondary'}" style="margin-top: auto;">${escapeHtml(item.ctaText)}</a>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
      `;
    }

    case 'faq': {
      return `
      <section class="section"${idAttr}>
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">${escapeHtml(block.title)}</h2>
            ${block.subtitle ? `<p class="section-subtitle">${escapeHtml(block.subtitle)}</p>` : ''}
          </div>
          <div class="faq-list">
            ${block.items.map((item) => `
              <div class="faq-item">
                <button type="button" class="faq-question">${escapeHtml(item.question)}</button>
                <div class="faq-answer"><p>${escapeHtml(item.answer)}</p></div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
      `;
    }

    case 'contact': {
      return `
      <section class="section"${idAttr}>
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">${escapeHtml(block.title)}</h2>
            ${block.subtitle ? `<p class="section-subtitle">${escapeHtml(block.subtitle)}</p>` : ''}
          </div>
          <div class="contact-wrapper">
            <div class="contact-info">
              ${block.phone ? `
              <div class="contact-item">
                <span class="contact-icon">📞</span>
                <div>
                  <strong>شماره تماس</strong>
                  <p dir="ltr" style="text-align: right;">${escapeHtml(block.phone)}</p>
                </div>
              </div>` : ''}
              ${block.email ? `
              <div class="contact-item">
                <span class="contact-icon">✉️</span>
                <div>
                  <strong>ایمیل</strong>
                  <p dir="ltr" style="text-align: right;">${escapeHtml(block.email)}</p>
                </div>
              </div>` : ''}
              ${block.address ? `
              <div class="contact-item">
                <span class="contact-icon">📍</span>
                <div>
                  <strong>آدرس</strong>
                  <p>${escapeHtml(block.address)}</p>
                </div>
              </div>` : ''}
              ${block.workingHours ? `
              <div class="contact-item">
                <span class="contact-icon">⏰</span>
                <div>
                  <strong>ساعات کاری</strong>
                  <p>${escapeHtml(block.workingHours)}</p>
                </div>
              </div>` : ''}
            </div>
            ${block.showForm ? `
            <form class="contact-form">
              <input type="text" class="form-input" placeholder="نام و نام خانوادگی" required />
              <input type="tel" class="form-input" placeholder="شماره تماس یا ایمیل" required />
              <textarea class="form-textarea" rows="4" placeholder="متن پیام شما..." required></textarea>
              <button type="submit" class="btn btn-primary">${escapeHtml(block.formButtonText || 'ارسال پیام')}</button>
            </form>` : ''}
          </div>
        </div>
      </section>
      `;
    }

    case 'about': {
      return `
      <section class="section"${idAttr}>
        <div class="container">
          <div class="about-grid">
            <div>
              <h2 class="section-title">${escapeHtml(block.title)}</h2>
              ${block.subtitle ? `<p class="section-subtitle" style="margin: 0 0 20px 0; text-align: start;">${escapeHtml(block.subtitle)}</p>` : ''}
              <p style="opacity: 0.85; line-height: 1.8; margin-bottom: 24px;">${escapeHtml(block.content)}</p>
              ${block.stats && block.stats.length > 0 ? `
              <div class="about-stats">
                ${block.stats.map((s) => `
                  <div class="stat-box">
                    <div class="stat-val">${escapeHtml(s.value)}</div>
                    <div class="stat-label">${escapeHtml(s.label)}</div>
                  </div>
                `).join('')}
              </div>` : ''}
            </div>
            ${block.imageUrl ? `
            <div>
              <img src="${escapeHtml(block.imageUrl)}" alt="${escapeHtml(block.title)}" style="width: 100%; border-radius: var(--radius); border: 1px solid var(--border);" loading="lazy" />
            </div>` : ''}
          </div>
        </div>
      </section>
      `;
    }

    case 'cta': {
      return `
      <section class="section"${idAttr}>
        <div class="container">
          <div class="cta-box">
            ${block.badge ? `<div class="badge">${escapeHtml(block.badge)}</div>` : ''}
            <h2 class="section-title">${escapeHtml(block.title)}</h2>
            ${block.subtitle ? `<p class="section-subtitle" style="margin-bottom: 28px;">${escapeHtml(block.subtitle)}</p>` : ''}
            <a href="${escapeHtml(block.buttonLink)}" class="btn btn-primary">${escapeHtml(block.buttonText)}</a>
          </div>
        </div>
      </section>
      `;
    }

    case 'footer': {
      return `
      <footer class="footer-section"${idAttr}>
        <div class="container">
          <div class="footer-top">
            <div>
              <div class="footer-brand">${escapeHtml(block.brandName)}</div>
              ${block.description ? `<p style="opacity: 0.75; margin-top: 6px; max-width: 400px;">${escapeHtml(block.description)}</p>` : ''}
            </div>
            <ul class="footer-links">
              ${block.links.map((link) => `
                <li><a href="${escapeHtml(link.url)}">${escapeHtml(link.title)}</a></li>
              `).join('')}
            </ul>
          </div>
          <div class="footer-bottom">
            <p>${escapeHtml(block.copyright)}</p>
          </div>
        </div>
      </footer>
      `;
    }

    default:
      return '';
  }
}
