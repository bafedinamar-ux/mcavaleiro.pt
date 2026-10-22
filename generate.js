const fs = require('fs');

// --- 1. CONFIGURAÇÃO ENTERPRISE ELITE ---
const CONFIG = {
  domain: 'https://mcavaleiro.pt',
  phone: '931 369 411',
  phoneRaw: '351931369411',
  companyName: 'M. Cavaleiro® Assistência Ultra 24H',
  ratingValue: '4.95',
  reviewCount: '512'
};

const categorias = [
  {
    nome: 'Frigoríficos',
    slug: 'frigorificos',
    avariasComuns: ['Erro de Refrigeração ou Temperatura Instável', 'Compressor Inverter com Ruído Anormal', 'Acumulação de Gelo no Congelador (No-Frost)']
  },
  {
    nome: 'Máquinas de Lavar',
    slug: 'maquinas-lavar',
    avariasComuns: ['Bomba de Escoamento Entupida ou Fuga', 'Tambor Bloqueado / Falha no Motor', 'Erro na Placa Eletrónica de Controlo']
  },
  {
    nome: 'Ar Condicionado',
    slug: 'ar-condicionado',
    avariasComuns: ['Fuga de Gás / Perda de Eficiência', 'Sinal de Erro no Display Digital', 'Necessidade de Higienização de Filtros']
  }
];

const marcas = [
  { nome: 'Bosch', slug: 'bosch' },
  { nome: 'Siemens', slug: 'siemens' },
  { nome: 'Whirlpool', slug: 'whirlpool' },
  { nome: 'Samsung', slug: 'samsung' },
  { nome: 'LG', slug: 'lg' },
  { nome: 'Balay', slug: 'balay' },
  { nome: 'Beko', slug: 'beko' }
];

const zonas = [
  { nome: 'Lisboa', slug: 'lisboa', freguesias: ['Parque das Nações', 'Alvalade', 'Benfica', 'Campo de Ourique', 'Avenidas Novas', 'Lumiar'], lat: '38.7223', lon: '-9.1393' },
  { nome: 'Cascais', slug: 'cascais', freguesias: ['Estoril', 'Parede', 'Carcavelos', 'Alcabideche', 'Sintra-Cascais'], lat: '38.6979', lon: '-9.4215' },
  { nome: 'Sintra', slug: 'sintra', freguesias: ['Algueirão-Mem Martins', 'Rio de Mouro', 'Massamá', 'Queluz', 'Colares'], lat: '38.8029', lon: '-9.3817' },
  { nome: 'Almada', slug: 'almada', freguesias: ['Costa da Caparica', 'Cova da Piedade', 'Pragal', 'Laranjeiro', 'Sobreda'], lat: '38.6790', lon: '-9.1569' },
  { nome: 'Oeiras', slug: 'oeiras', freguesias: ['Paço de Arcos', 'Algés', 'Carnaxide', 'Porto Salvo', 'Barcarena'], lat: '38.6917', lon: '-9.3114' },
  { nome: 'Amadora', slug: 'amadora', freguesias: ['Damaia', 'Reboleira', 'Falagueira', 'Venteira', 'Alfragide'], lat: '38.7599', lon: '-9.2339' },
  { nome: 'Setúbal', slug: 'setubal', freguesias: ['São Julião', 'Azeitão', 'Gâmbia', 'Sado', 'Anunciada'], lat: '38.5244', lon: '-8.8882' }
];

const currentDate = new Date().toISOString().split('T')[0];
let urlsSitemap = [
  `  <url>\n    <loc>${CONFIG.domain}/</loc>\n    <lastmod>${currentDate}</lastmod>\n    <changefreq>always</changefreq>\n    <priority>1.0</priority>\n  </url>`
];

let footerMatrixHtml = '<div class="seo-enterprise-matrix">\n';
let generatedCount = 0;

console.log('🌌 [Apple Elite Mode] A gerar páginas com design imersivo e alta conversão...');

// --- 2. GERAÇÃO DE PÁGINAS COM VISUAL DE ALTO IMPACTO ---
categorias.forEach(cat => {
  marcas.forEach(marca => {
    footerMatrixHtml += `  <div class="matrix-column">\n    <h3>${cat.nome} ${marca.nome}</h3>\n    <ul>\n`;

    zonas.forEach(zona => {
      const fileName = `reparacao-${cat.slug}-${marca.slug}-${zona.slug}.html`;
      const pageUrl = `${CONFIG.domain}/${fileName}`;
      generatedCount++;

      urlsSitemap.push(
        `  <url>\n    <loc>${pageUrl}</loc>\n    <lastmod>${currentDate}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.85</priority>\n  </url>`
      );

      footerMatrixHtml += `      <li><a href="/${fileName}">${cat.nome} ${marca.nome} em ${zona.nome}</a></li>\n`;

      const freguesiasTexto = zona.freguesias.join(', ');
      const avariasListHtml = cat.avariasComuns.map(avaria => `<li><span class="icon-warn">⚠️</span> <strong>${avaria}</strong></li>`).join('\n');

      const outrasMarcas = marcas
        .filter(m => m.slug !== marca.slug)
        .map(m => `<a href="/reparacao-${cat.slug}-${m.slug}-${zona.slug}.html">${m.nome}</a>`)
        .join(' · ');

      const outrasZonas = zonas
        .filter(z => z.slug !== zona.slug)
        .map(z => `<a href="/reparacao-${cat.slug}-${marca.slug}-${z.slug}.html">${z.nome}</a>`)
        .join(' · ');

      // CSS ELITE APPLE-STYLE COM ANIMAÇÕES E LUZES AMBIENTES
      const pageContent = `<!DOCTYPE html><html lang="pt-PT"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Reparação de ${cat.nome} ${marca.nome} em ${zona.nome} | Piquete 24H</title><meta name="description" content="Assistência urgente a ${cat.nome.toLowerCase()} ${marca.nome} em ${zona.nome} (${freguesiasTexto}). Técnicos ao domicílio no próprio dia com garantia escrita."><link rel="canonical" href="${pageUrl}"><meta name="robots" content="index, follow">
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Início", "item": "${CONFIG.domain}/" },
        { "@type": "ListItem", "position": 2, "name": "${cat.nome} ${marca.nome}", "item": "${pageUrl}" }
      ]
    },
    {
      "@type": "HVACBusiness",
      "@id": "${CONFIG.domain}/#biz",
      "name": "${CONFIG.companyName}",
      "telephone": "+${CONFIG.phoneRaw}",
      "url": "${CONFIG.domain}",
      "priceRange": "€€",
      "address": { "@type": "PostalAddress", "addressLocality": "${zona.nome}", "addressCountry": "PT" },
      "geo": { "@type": "GeoCoordinates", "latitude": "${zona.lat}", "longitude": "${zona.lon}" },
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "${CONFIG.ratingValue}", "reviewCount": "${CONFIG.reviewCount}" }
    },
    {
      "@type": "Service",
      "name": "Reparação de ${cat.nome} ${marca.nome} em ${zona.nome}",
      "provider": { "@id": "${CONFIG.domain}/#biz" },
      "areaServed": { "@type": "City", "name": "${zona.nome}" },
      "description": "Intervenção técnica rápida em ${cat.nome.toLowerCase()} ${marca.nome}."
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Qual o tempo de resposta em ${zona.nome}?",
          "acceptedAnswer": { "@type": "Answer", "text": "Deslocação ao domicílio em ${zona.nome} no próprio dia, tipicamente em menos de 1 hora." }
        },
        {
          "@type": "Question",
          "name": "As reparações têm garantia?",
          "acceptedAnswer": { "@type": "Answer", "text": "Sim, todas as reparações e peças aplicadas a ${marca.nome} possuem garantia legal por escrito." }
        }
      ]
    }
  ]
}
</script>
<style>:root{--bg:#000000;--card:rgba(20,20,25,0.75);--accent:#30d158;--accent-glow:rgba(48,209,88,0.3);--text:#f5f5f7;--sub:#86868b;--border:rgba(255,255,255,0.12)}*{box-sizing:border-box;margin:0;padding:0}body{background:var(--bg);background-image:radial-gradient(circle at 50% -20%, #1a2332 0%, #000000 60%);color:var(--text);font-family:-apple-system,BlinkMacSystemFont,"SF Pro Display","SF Pro Text",sans-serif;padding:24px 16px;line-height:1.6;max-width:920px;margin:0 auto;min-height:100vh;display:flex;flex-direction:column;justify-content:space-between}.nav{font-size:0.85rem;color:var(--sub);margin-bottom:24px;letter-spacing:-0.01em}.nav a{color:var(--sub);text-decoration:none;transition:color 0.2s}.nav a:hover{color:#fff}.card{background:var(--card);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid var(--border);padding:45px 35px;border-radius:28px;margin-bottom:20px;box-shadow:0 25px 50px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.1)}.badge{display:inline-flex;align-items:center;gap:8px;background:rgba(48,209,88,0.12);border:1px solid rgba(48,209,88,0.3);color:var(--accent);padding:8px 16px;border-radius:30px;font-weight:700;font-size:0.75rem;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:20px}.pulse-dot{width:8px;height:8px;background:var(--accent);border-radius:50%;box-shadow:0 0 0 0 rgba(48,209,88,0.7);animation:pulse 2s infinite}h1{font-size:clamp(2rem,4.5vw,2.75rem);font-weight:800;color:#fff;margin-bottom:20px;letter-spacing:-0.03em;line-height:1.1}p{margin-bottom:18px;color:#d1d1d6;font-size:1.05rem;letter-spacing:-0.01em}ul{list-style:none;margin:25px 0}li{margin-bottom:12px;font-size:0.95rem;display:flex;align-items:center;gap:10px;background:rgba(255,255,255,0.03);padding:12px 16px;border-radius:12px;border:1px solid rgba(255,255,255,0.05)}.cta{margin-top:35px;display:flex;gap:14px;flex-wrap:wrap}.btn-wa{background:var(--accent);color:#000;font-weight:800;padding:18px 32px;border-radius:32px;text-decoration:none;display:inline-flex;align-items:center;gap:10px;font-size:1.1rem;box-shadow:0 8px 25px var(--accent-glow);transition:all 0.3s cubic-bezier(0.16,1,0.3,1)}.btn-wa:hover{transform:translateY(-2px);box-shadow:0 12px 35px rgba(48,209,88,0.5)}.btn-call{background:rgba(255,255,255,0.06);color:#fff;font-weight:700;padding:18px 32px;border-radius:32px;text-decoration:none;border:1px solid var(--border);font-size:1.1rem;transition:all 0.3s cubic-bezier(0.16,1,0.3,1)}.btn-call:hover{background:rgba(255,255,255,0.12);transform:translateY(-2px)}.links-net{margin-top:30px;padding-top:25px;border-top:1px solid var(--border);font-size:0.85rem;color:var(--sub)}.links-net a{color:var(--accent);text-decoration:none;transition:opacity 0.2s}.links-net a:hover{opacity:0.8}footer{text-align:center;color:var(--sub);font-size:0.85rem;margin-top:30px;border-top:1px solid var(--border);padding-top:20px}@keyframes pulse{0%{transform:scale(0.95);box-shadow:0 0 0 0 rgba(48,209,88,0.7)}70%{transform:scale(1);box-shadow:0 0 0 10px rgba(48,209,88,0)}100%{transform:scale(0.95);box-shadow:0 0 0 0 rgba(48,209,88,0)}}@media(max-width:600px){.cta{flex-direction:column}.btn-wa,.btn-call{text-align:center;justify-content:center;width:100%}.card{padding:25px 20px}}</style></head>
<body><div><div class="nav"><a href="/">Início</a> &gt; <span>${cat.nome} ${marca.nome} em ${zona.nome}</span></div>
<main><article class="card">
<div class="badge"><div class="pulse-dot"></div> Piquete Ativo em ${zona.nome} · Nota ${CONFIG.ratingValue}/5 ⭐</div>
<h1>Reparação de ${cat.nome} ${marca.nome} em ${zona.nome}</h1>
<p>O seu equipamento <strong>${marca.nome}</strong> avariou em <strong>${zona.nome}</strong>? Dispomos de técnicos especialistas ao domicílio no próprio dia em todas as freguesias: <em>${freguesiasTexto}</em>.</p>
<p>Diagnóstico rigoroso e transparente, com aplicação exclusiva de peças originais e garantia certificada.</p>
<h3 style="color:#fff;margin-top:25px;font-size:1.2rem;letter-spacing:-0.01em;">Principais Avarias Resolvidas no Local:</h3>
<ul>${avariasListHtml}</ul>
<div class="cta">
<a href="https://wa.me/${CONFIG.phoneRaw}?text=Olá!%20Preciso%20de%20assistência%20urgente%20para%20${cat.slug}%20${marca.nome}%20em%20${zona.nome}." class="btn-wa" target="_blank" rel="noopener">💬 WhatsApp Urgente (${CONFIG.phone})</a>
<a href="tel:${CONFIG.phoneRaw}" class="btn-call">📞 Ligar Piquete Agora</a>
</div>
<div class="links-net">
<p><strong>Outras marcas de ${cat.nome.toLowerCase()} em ${zona.nome}:</strong> ${outrasMarcas}</p>
<p style="margin-top:10px"><strong>${cat.nome} ${marca.nome} noutras localidades:</strong> ${outrasZonas}</p>
</div>
</article></main></div>
<footer><p>© ${CONFIG.companyName} · Serviço técnico especializado em ${zona.nome}.</p></footer></body></html>`;

      fs.writeFileSync(fileName, pageContent, 'utf8');
    });

    footerMatrixHtml += `    </ul>\n  </div>\n`;
  });
});

footerMatrixHtml += '</div>';

console.log(`🌌 [Apple Elite] ${generatedCount} páginas geradas com visual de alto impacto.`);

// --- 3. ATUALIZAÇÃO DO INDEX.HTML ---
if (fs.existsSync('index.html')) {
  let indexContent = fs.readFileSync('index.html', 'utf8');
  const startTag = '<!-- SEO_MATRIX_START -->';
  const endTag = '<!-- SEO_MATRIX_END -->';

  if (indexContent.includes(startTag) && indexContent.includes(endTag)) {
    const regex = new RegExp(`${startTag}[\\s\\S]*?${endTag}`, 'm');
    indexContent = indexContent.replace(regex, `${startTag}\n${footerMatrixHtml}\n${endTag}`);
    fs.writeFileSync('index.html', indexContent, 'utf8');
    console.log('✅ Matriz de links injetada com sucesso no index.html!');
  }
}

// --- 4. SITEMAP E ROBOTS ---
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsSitemap.join('\n')}
</urlset>`;

fs.writeFileSync('sitemap.xml', sitemapContent, 'utf8');
fs.writeFileSync('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${CONFIG.domain}/sitemap.xml\n`, 'utf8');

console.log(`🚀 [Deployment Ready] Infraestrutura pSEO pronta com ${urlsSitemap.length} URLs de luxo.`);
