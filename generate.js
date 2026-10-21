const fs = require('fs');

// --- 1. CONFIGURAÇÃO ULTRA INSTINCT ---
const CONFIG = {
  domain: 'https://mcavaleiro.pt',
  phone: '931 369 411',
  phoneRaw: '351931369411',
  companyName: 'M. Cavaleiro® Assistência Ultra 24H',
  ratingValue: '4.95',
  reviewCount: '312'
};

const marcas = [
  { nome: 'Bosch', slug: 'bosch', avariasComuns: ['Erro E15 ou Falha de Refrigeração', 'Compressor Inverter com Ruído', 'Congelador a Acumular Gelo'] },
  { nome: 'Siemens', slug: 'siemens', avariasComuns: ['Frigorífico Não Descongela', 'Sensor NTC Avariado', 'Alarme de Porta Aberta Ativo'] },
  { nome: 'Whirlpool', slug: 'whirlpool', avariasComuns: ['Placa Eletrónica Principal Danificada', 'Fuga de Gás no Circuito', 'Borracha da Porta Rompida'] },
  { nome: 'Samsung', slug: 'samsung', avariasComuns: ['Ventilador No-Frost Bloqueado', 'Display Digital com Erro', 'Drenagem Entupida / Fuga de Água'] },
  { nome: 'LG', slug: 'lg', avariasComuns: ['Compressor Linear com Falha', 'Fuga no Evaporador', 'Erro de Comunicação Placas'] }
];

const zonas = [
  { nome: 'Lisboa', slug: 'lisboa', freguesias: ['Parque das Nações', 'Alvalade', 'Benfica', 'Campo de Ourique', 'Avenidas Novas', 'Lumiar'], lat: '38.7223', lon: '-9.1393' },
  { nome: 'Cascais', slug: 'cascais', freguesias: ['Estoril', 'Parede', 'Carcavelos', 'Alcabideche', 'Sintra-Cascais'], lat: '38.6979', lon: '-9.4215' },
  { nome: 'Sintra', slug: 'sintra', freguesias: ['Algueirão-Mem Martins', 'Rio de Mouro', 'Massamá', 'Queluz', 'Colares'], lat: '38.8029', lon: '-9.3817' },
  { nome: 'Almada', slug: 'almada', freguesias: ['Costa da Caparica', 'Cova da Piedade', 'Pragal', 'Laranjeiro', 'Sobreda'], lat: '38.6790', lon: '-9.1569' },
  { nome: 'Oeiras', slug: 'oeiras', freguesias: ['Paço de Arcos', 'Algés', 'Carnaxide', 'Porto Salvo', 'Barcarena'], lat: '38.6917', lon: '-9.3114' },
  { nome: 'Amadora', slug: 'amadora', freguesias: ['Damaia', 'Reboleira', 'Falagueira', 'Venteira', 'Alfragide'], lat: '38.7599', lon: '-9.2339' }
];

const currentDate = new Date().toISOString().split('T')[0];
let urlsSitemap = [
  `  <url>\n    <loc>${CONFIG.domain}/</loc>\n    <lastmod>${currentDate}</lastmod>\n    <changefreq>always</changefreq>\n    <priority>1.0</priority>\n  </url>`
];

let footerMatrixHtml = '<div class="seo-enterprise-matrix">\n';
let generatedCount = 0;

console.log('🌌 [Ultra Instinct Mode] A ativar processamento neural de pSEO...');

// --- 2. GERAÇÃO AUTÓNOMA DE PÁGINAS COM OTIMIZAÇÃO CRÍTICA DE CSS ---
marcas.forEach(marca => {
  footerMatrixHtml += `  <div class="matrix-column">\n    <h3>Frigoríficos ${marca.nome}</h3>\n    <ul>\n`;

  zonas.forEach(zona => {
    const fileName = `reparacao-frigorificos-${marca.slug}-${zona.slug}.html`;
    const pageUrl = `${CONFIG.domain}/${fileName}`;
    generatedCount++;

    urlsSitemap.push(
      `  <url>\n    <loc>${pageUrl}</loc>\n    <lastmod>${currentDate}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.85</priority>\n  </url>`
    );

    footerMatrixHtml += `      <li><a href="/${fileName}">Frigoríficos ${marca.nome} em ${zona.nome}</a></li>\n`;

    const freguesiasTexto = zona.freguesias.join(', ');
    const avariasListHtml = marca.avariasComuns.map(avaria => `<li>⚠️ <strong>${avaria}</strong></li>`).join('\n');
    
    // Cross-linking dinâmico avançado
    const outrasMarcas = marcas
      .filter(m => m.slug !== marca.slug)
      .map(m => `<a href="/reparacao-frigorificos-${m.slug}-${zona.slug}.html">${m.nome}</a>`)
      .join(' · ');

    const outrasZonas = zonas
      .filter(z => z.slug !== zona.slug)
      .map(z => `<a href="/reparacao-frigorificos-${marca.slug}-${z.slug}.html">${z.nome}</a>`)
      .join(' · ');

    // Template HTML Ultra Otimizado (Minificado e com CSS Inline crítico para Core Web Vitals perfeitos)
    const pageContent = `<!DOCTYPE html><html lang="pt-PT"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Reparação de Frigoríficos ${marca.nome} em ${zona.nome} | Piquete 24H</title><meta name="description" content="Assistência urgente a frigoríficos ${marca.nome} em ${zona.nome} (${freguesiasTexto}). Técnicos ao domicílio no próprio dia com garantia escrita."><link rel="canonical" href="${pageUrl}"><meta name="robots" content="index, follow">
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
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
      "name": "Reparação ${marca.nome} em ${zona.nome}",
      "provider": { "@id": "${CONFIG.domain}/#biz" },
      "areaServed": { "@type": "City", "name": "${zona.nome}" },
      "description": "Intervenção técnica rápida em frigoríficos ${marca.nome}."
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
<style>:root{--bg:#020204;--card:#101014;--accent:#30d158;--text:#f5f5f7;--sub:#86868b;--border:rgba(255,255,255,0.08)}*{box-sizing:border-box;margin:0;padding:0}body{background:var(--bg);color:var(--text);font-family:-apple-system,BlinkMacSystemFont,sans-serif;padding:20px;line-height:1.6;max-width:900px;margin:0 auto}.nav{font-size:0.85rem;color:var(--sub);margin-bottom:20px}.nav a{color:var(--sub);text-decoration:none}.card{background:var(--card);border:1px solid var(--border);padding:35px;border-radius:24px;margin-bottom:20px;box-shadow:0 10px 30px rgba(0,0,0,0.9)}.badge{display:inline-block;background:rgba(48,209,88,0.15);color:var(--accent);padding:6px 14px;border-radius:20px;font-weight:700;font-size:0.8rem;text-transform:uppercase;margin-bottom:16px}h1{font-size:clamp(1.8rem,4vw,2.4rem);font-weight:800;color:#fff;margin-bottom:15px}p{margin-bottom:15px;color:#d1d1d6}ul{list-style:none;margin:20px 0}li{margin-bottom:10px;font-size:0.95rem}.cta{margin-top:30px;display:flex;gap:12px;flex-wrap:wrap}.btn-wa{background:var(--accent);color:#000;font-weight:800;padding:16px 28px;border-radius:30px;text-decoration:none;display:inline-flex;align-items:center;gap:8px;font-size:1.05rem}.btn-call{background:rgba(255,255,255,0.08);color:#fff;font-weight:700;padding:16px 28px;border-radius:30px;text-decoration:none;border:1px solid var(--border);font-size:1.05rem}.links-net{margin-top:25px;padding-top:20px;border-top:1px solid var(--border);font-size:0.85rem;color:var(--sub)}.links-net a{color:var(--accent);text-decoration:none}footer{text-align:center;color:var(--sub);font-size:0.85rem;margin-top:40px;border-top:1px solid var(--border);padding-top:20px}@media(max-width:600px){.cta{flex-direction:column}.btn-wa,.btn-call{text-align:center;justify-content:center}}</style></head>
<body><div class="nav"><a href="/">Início</a> &gt; <span>${marca.nome} em ${zona.nome}</span></div>
<main><article class="card">
<span class="badge">⚡ Piquete Ativo · Nota ${CONFIG.ratingValue}/5 ⭐</span>
<h1>Reparação de Frigoríficos ${marca.nome} em ${zona.nome}</h1>
<p>O seu frigorífico <strong>${marca.nome}</strong> avariou em <strong>${zona.nome}</strong>? Dispomos de técnicos ao domicílio no próprio dia em todas as freguesias: <em>${freguesiasTexto}</em>.</p>
<p>Diagnóstico rigoroso e transparente, com aplicação exclusiva de <strong>peças originais ${marca.nome}</strong>.</p>
<h3 style="color:#fff;margin-top:25px;">Avarias Frequentes Resolvidas no Local:</h3>
<ul>${avariasListHtml}</ul>
<div class="cta">
<a href="https://wa.me/${CONFIG.phoneRaw}?text=Olá!%20Preciso%20de%20assistência%20para%20frigorífico%20${marca.nome}%20em%20${zona.nome}." class="btn-wa" target="_blank" rel="noopener">💬 WhatsApp Urgente (${CONFIG.phone})</a>
<a href="tel:${CONFIG.phoneRaw}" class="btn-call">📞 Ligar Piquete Agora</a>
</div>
<div class="links-net">
<p><strong>Outras marcas em ${zona.nome}:</strong> ${outrasMarcas}</p>
<p style="margin-top:8px"><strong>${marca.nome} noutras localidades:</strong> ${outrasZonas}</p>
</div>
</article></main>
<footer><p>© ${CONFIG.companyName} · Serviço especializado em ${zona.nome}.</p></footer></body></html>`;

    fs.writeFileSync(fileName, pageContent, 'utf8');
  });

  footerMatrixHtml += `    </ul>\n  </div>\n`;
});

footerMatrixHtml += '</div>';

console.log(`🌌 [Ultra Instinct] ${generatedCount} páginas geradas com velocidade de renderização instantânea.`);

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

// --- 4. SITEMAP E ROBOTS OTIMIZADOS ---
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsSitemap.join('\n')}
</urlset>`;

fs.writeFileSync('sitemap.xml', sitemapContent, 'utf8');
fs.writeFileSync('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${CONFIG.domain}/sitemap.xml\n`, 'utf8');

console.log(`🚀 [Ready for deployment] Infraestrutura completa gerada com ${urlsSitemap.length} URLs indexáveis.`);
