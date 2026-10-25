const fs = require('fs');

// --- 1. CONFIGURAÇÃO ENTERPRISE ULTRADENSE ---
const CONFIG = {
  domain: 'https://mcavaleiro.pt',
  phone: '931 369 411',
  phoneRaw: '351931369411',
  companyName: 'M. Cavaleiro® Assistência Ultra 24H',
  ratingValue: '4.95',
  reviewCount: '624'
};

// CATEGORIAS DE SERVIÇO
const categorias = [
  {
    nome: 'Frigoríficos',
    slug: 'frigorificos',
    avariasComuns: ['Erro de Refrigeração ou Temperatura Instável', 'Compressor Inverter com Ruído Anormal', 'Acumulação de Gelo no Congelador (No-Frost)', 'Fuga de Gás no Circuito Hermético']
  },
  {
    nome: 'Máquinas de Lavar Roupa',
    slug: 'maquinas-lavar-roupa',
    avariasComuns: ['Bomba de Escoamento Entupida ou Fuga', 'Tambor Bloqueado / Falha no Motor', 'Erro na Placa Eletrónica de Controlo', 'Porta Trancada com Água no Interior']
  },
  {
    nome: 'Máquinas de Lavar Loiça',
    slug: 'maquinas-lavar-loica',
    avariasComuns: ['Loiça Sai Suja ou Secagem Deficiente', 'Fuga de Água na Base (Alarme AquaStop)', 'Bomba de Circulação a Fazer Ruído', 'Erro de Aquecimento de Água']
  },
  {
    nome: 'Ar Condicionado',
    slug: 'ar-condicionado',
    avariasComuns: ['Fuga de Gás / Perda de Eficiência de Frio', 'Sinal de Erro no Display Digital', 'Necessidade de Higienização de Filtros', 'Unidade Interior a Pingar Água']
  }
];

// MARCAS DE ELETRODOMÉSTICOS
const marcas = [
  { nome: 'Bosch', slug: 'bosch' },
  { nome: 'Siemens', slug: 'siemens' },
  { nome: 'Whirlpool', slug: 'whirlpool' },
  { nome: 'Samsung', slug: 'samsung' },
  { nome: 'LG', slug: 'lg' },
  { nome: 'Balay', slug: 'balay' },
  { nome: 'Beko', slug: 'beko' },
  { nome: 'Indesit', slug: 'indesit' },
  { nome: 'Ariston / Hotpoint', slug: 'ariston' },
  { nome: 'Candy', slug: 'candy' },
  { nome: 'AEG', slug: 'aeg' },
  { nome: 'Electrolux', slug: 'electrolux' },
  { nome: 'Miele', slug: 'miele' },
  { nome: 'Smeg', slug: 'smeg' },
  { nome: 'Zanussi', slug: 'zanussi' },
  { nome: 'Teka', slug: 'teka' },
  { nome: 'Liebherr', slug: 'liebherr' },
  { nome: 'Fagor', slug: 'fagor' }
];

// MODIFICADORES DE INTENÇÃO COMERCIAL
const intentModificadores = [
  { tipo: 'reparacao', prefixo: 'Reparação de', prioridade: '0.85' },
  { tipo: 'assistencia-urgente', prefixo: 'Assistência Urgente a', prioridade: '0.90' },
  { tipo: 'tecnico-domicilio', prefixo: 'Técnico ao Domicílio para', prioridade: '0.80' }
];

// CÓDIGOS DE ERRO MAIS PESQUISADOS
const codigosErro = [
  { marca: 'Bosch', codigo: 'E20', desc: 'Erro de escoamento de água / filtro entupido na máquina de lavar.' },
  { marca: 'Bosch', codigo: 'E15', desc: 'Alarme AquaStop ativado: água detetada na base do equipamento.' },
  { marca: 'Samsung', codigo: '4C / 5C', desc: 'Falha no abastecimento ou entrada de água.' },
  { marca: 'Samsung', codigo: 'LE', desc: 'Erro de fuga de água detetada pelo sensor inferior.' },
  { marca: 'Whirlpool', codigo: 'F06 / F05', desc: 'Erro no motor ou falha de leitura de rotação do tambor.' },
  { marca: 'LG', codigo: 'OE', desc: 'Erro de escoamento (Water Outlet Error) - bomba ou tubo obstruído.' },
  { marca: 'LG', codigo: 'IE', desc: 'Erro de entrada de água (Water Inlet Error).' },
  { marca: 'Siemens', codigo: 'E18', desc: 'Erro de drenagem / bomba de escoamento bloqueada.' }
];

// ZONAS E FREGUESIAS
const zonas = [
  { nome: 'Lisboa', slug: 'lisboa', freguesias: ['Centro Histórico', 'Avenidas Novas', 'Alvalade', 'Lumiar', 'Parque das Nações', 'Campo de Ourique'], lat: '38.7223', lon: '-9.1393' },
  { nome: 'Benfica', slug: 'benfica', freguesias: ['Bairro de Benfica', 'São Domingos de Benfica', 'Fonte Nova', 'Estrada de Benfica'], lat: '38.7483', lon: '-9.1994' },
  { nome: 'Parque das Nações', slug: 'parque-das-nacoes', freguesias: ['Moscavide Sul', 'Expo Sul', 'Expo Norte', 'Olivais'], lat: '38.7686', lon: '-9.0942' },
  { nome: 'Amadora', slug: 'amadora', freguesias: ['Alfragide', 'Damaia', 'Reboleira', 'Falagueira', 'Venteira', 'Mina de Água'], lat: '38.7599', lon: '-9.2339' },
  { nome: 'Agualva-Cacém', slug: 'cacem', freguesias: ['Agualva', 'Cacém', 'Mira-Sintra', 'São Marcos'], lat: '38.7702', lon: '-9.3013' },
  { nome: 'Algueirão-Mem Martins', slug: 'algueirao-mem-martins', freguesias: ['Mem Martins', 'Algueirão', 'Mercês', 'Tapada das Mercês'], lat: '38.7963', lon: '-9.3402' },
  { nome: 'Sintra', slug: 'sintra', freguesias: ['Sintra Vila', 'Colares', 'São Pedro de Penaferrim', 'Terrugem', 'Pero Pinheiro'], lat: '38.8029', lon: '-9.3817' },
  { nome: 'Queluz e Massamá', slug: 'queluz-massama', freguesias: ['Queluz', 'Massamá', 'Monte Abraão', 'Belas'], lat: '38.7566', lon: '-9.2562' },
  { nome: 'Rio de Mouro', slug: 'rio-de-mouro', freguesias: ['Rinchoa', 'Paiões', 'Alto do Forte', 'Varge Mondar'], lat: '38.7845', lon: '-9.3201' },
  { nome: 'Cascais', slug: 'cascais', freguesias: ['Cascais Centro', 'Estoril', 'Parede', 'Carcavelos', 'Alcabideche', 'Guincho'], lat: '38.6979', lon: '-9.4215' },
  { nome: 'Oeiras', slug: 'oeiras', freguesias: ['Paço de Arcos', 'Algés', 'Carnaxide', 'Porto Salvo', 'Barcarena', 'Queijas'], lat: '38.6917', lon: '-9.3114' },
  { nome: 'Odivelas', slug: 'odivelas', freguesias: ['Odivelas Centro', 'Ramada', 'Pontinha', 'Famões', 'Caneças', 'Póvoa de Santo Adrião'], lat: '38.7918', lon: '-9.1824' },
  { nome: 'Loures', slug: 'loures', freguesias: ['Loures Centro', 'Sacavém', 'Prior Velho', 'Bobadela', 'Santa Iria de Azoia'], lat: '38.8309', lon: '-9.1681' },
  { nome: 'Vila Franca de Xira', slug: 'vila-franca-de-xira', freguesias: ['Alverca do Ribatejo', 'Forte da Casa', 'Póvoa de Santa Iria', 'VFX Centro'], lat: '38.9553', lon: '-8.9886' },
  { nome: 'Almada', slug: 'almada', freguesias: ['Costa da Caparica', 'Cova da Piedade', 'Pragal', 'Laranjeiro', 'Sobreda', 'Charneca da Caparica'], lat: '38.6790', lon: '-9.1569' },
  { nome: 'Seixal', slug: 'seixal', freguesias: ['Corroios', 'Amora', 'Fernão Ferro', 'Arrentela', 'Aldeia de Paio Pires'], lat: '38.6433', lon: '-9.1025' },
  { nome: 'Barreiro', slug: 'barreiro', freguesias: ['Santo André', 'Verderena', 'Alto do Seixalinho', 'Palhais'], lat: '38.6622', lon: '-9.0722' },
  { nome: 'Montijo', slug: 'montijo', freguesias: ['Montijo Centro', 'Afonsoeiro', 'Atalaia', 'Pegões'], lat: '38.7067', lon: '-8.9739' },
  { nome: 'Setúbal', slug: 'setubal', freguesias: ['São Julião', 'Azeitão', 'Gâmbia', 'Sado', 'Anunciada'], lat: '38.5244', lon: '-8.8882' }
];

const currentDate = new Date().toISOString().split('T')[0];

let urlsSitemap = [
  `  <url>\n    <loc>${CONFIG.domain}/</loc>\n    <lastmod>${currentDate}</lastmod>\n    <changefreq>always</changefreq>\n    <priority>1.0</priority>\n  </url>`,
  `  <url>\n    <loc>${CONFIG.domain}/reparacao-frigorificos-lisboa-margem-sul.html</loc>\n    <lastmod>${currentDate}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.85</priority>\n  </url>`
];

let footerMatrixHtml = '<div class="seo-enterprise-matrix">\n';
let generatedCount = 0;

console.log('🔥 A gerar todo o site e sitemap...');

// --- 2. GERAÇÃO DE PÁGINAS pSEO ---
categorias.forEach(cat => {
  marcas.forEach(marca => {
    footerMatrixHtml += `  <div class="matrix-column">\n    <h3>${cat.nome} ${marca.nome}</h3>\n    <ul>\n`;

    zonas.forEach(zona => {
      intentModificadores.forEach(mod => {
        const fileName = `${mod.tipo}-${cat.slug}-${marca.slug}-${zona.slug}.html`;
        const pageUrl = `${CONFIG.domain}/${fileName}`;
        generatedCount++;

        urlsSitemap.push(
          `  <url>\n    <loc>${pageUrl}</loc>\n    <lastmod>${currentDate}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${mod.prioridade}</priority>\n  </url>`
        );

        if(mod.tipo === 'reparacao') {
          footerMatrixHtml += `      <li><a href="/${fileName}">${cat.nome} ${marca.nome} em ${zona.nome}</a></li>\n`;
        }

        const freguesiasTexto = zona.freguesias.join(', ');
        const avariasListHtml = cat.avariasComuns.map(avaria => `<li>⚠️ <strong>${avaria}</strong></li>`).join('\n');

        const pageContent = `<!DOCTYPE html><html lang="pt-PT"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>${mod.prefixo} ${cat.nome} ${marca.nome} em ${zona.nome} | Piquete 24H</title><meta name="description" content="${mod.prefixo} ${cat.nome.toLowerCase()} ${marca.nome} em ${zona.nome} (${freguesiasTexto}). Técnicos especializados ao domicílio com garantia escrita."><link rel="canonical" href="${pageUrl}"><meta name="robots" content="index, follow">
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
      "name": "${mod.prefixo} ${cat.nome} ${marca.nome} em ${zona.nome}",
      "provider": { "@id": "${CONFIG.domain}/#biz" },
      "areaServed": { "@type": "City", "name": "${zona.nome}" },
      "description": "Intervenção técnica rápida em equipamentos ${marca.nome}."
    }
  ]
}
</script>
<style>:root{--bg:#000000;--card:rgba(20,20,25,0.85);--accent:#30d158;--accent-glow:rgba(48,209,88,0.3);--text:#f5f5f7;--sub:#86868b;--border:rgba(255,255,255,0.12)}*{box-sizing:border-box;margin:0;padding:0}body{background:var(--bg);background-image:radial-gradient(circle at 50% -20%, #1a2332 0%, #000000 60%);color:var(--text);font-family:-apple-system,BlinkMacSystemFont,sans-serif;padding:24px 16px;line-height:1.6;max-width:920px;margin:0 auto;min-height:100vh;display:flex;flex-direction:column;justify-content:space-between}.nav{font-size:0.85rem;color:var(--sub);margin-bottom:24px}.nav a{color:var(--sub);text-decoration:none}.card{background:var(--card);backdrop-filter:blur(20px);border:1px solid var(--border);padding:45px 35px;border-radius:28px;margin-bottom:20px;box-shadow:0 25px 50px rgba(0,0,0,0.8)}.badge{display:inline-flex;align-items:center;gap:8px;background:rgba(48,209,88,0.12);border:1px solid rgba(48,209,88,0.3);color:var(--accent);padding:8px 16px;border-radius:30px;font-weight:700;font-size:0.75rem;text-transform:uppercase;margin-bottom:20px}.pulse-dot{width:8px;height:8px;background:var(--accent);border-radius:50%;animation:pulse 2s infinite}h1{font-size:clamp(1.9rem,4.5vw,2.6rem);font-weight:800;color:#fff;margin-bottom:20px;line-height:1.15}p{margin-bottom:18px;color:#d1d1d6;font-size:1.05rem}ul{list-style:none;margin:25px 0}li{margin-bottom:12px;font-size:0.95rem;display:flex;align-items:center;gap:10px;background:rgba(255,255,255,0.03);padding:12px 16px;border-radius:12px;border:1px solid rgba(255,255,255,0.05)}.cta{margin-top:35px;display:flex;gap:14px;flex-wrap:wrap}.btn-wa{background:var(--accent);color:#000;font-weight:800;padding:18px 32px;border-radius:32px;text-decoration:none;display:inline-flex;align-items:center;gap:10px;font-size:1.1rem;box-shadow:0 8px 25px var(--accent-glow)}.btn-call{background:rgba(255,255,255,0.06);color:#fff;font-weight:700;padding:18px 32px;border-radius:32px;text-decoration:none;border:1px solid var(--border);font-size:1.1rem}.float-wa{position:fixed;right:20px;bottom:20px;background:var(--accent);color:#000;padding:14px 20px;border-radius:99px;font-weight:900;text-decoration:none;box-shadow:0 10px 30px rgba(48,209,88,0.5);z-index:999;display:flex;align-items:center;gap:8px}@keyframes pulse{0%{transform:scale(0.95);box-shadow:0 0 0 0 rgba(48,209,88,0.7)}70%{transform:scale(1);box-shadow:0 0 0 10px rgba(48,209,88,0)}100%{transform:scale(0.95);box-shadow:0 0 0 0 rgba(48,209,88,0)}}@media(max-width:600px){.cta{flex-direction:column}.btn-wa,.btn-call{text-align:center;justify-content:center;width:100%}.card{padding:25px 20px}}</style></head>
<body><div><div class="nav"><a href="/">Início</a> &gt; <span>${mod.prefixo} ${cat.nome} ${marca.nome} em ${zona.nome}</span></div>
<main><article class="card">
<div class="badge"><div class="pulse-dot"></div> Piquete Ativo em ${zona.nome} · Nota ${CONFIG.ratingValue}/5 ⭐</div>
<h1>${mod.prefixo} ${cat.nome} ${marca.nome} em ${zona.nome}</h1>
<p>Procura <strong>${mod.prefixo.toLowerCase()} ${cat.nome.toLowerCase()} ${marca.nome}</strong> em <strong>${zona.nome}</strong>? Prestamos assistência rápida ao domicílio nas freguesias de <em>${freguesiasTexto}</em>.</p>
<p>Serviço certificado, transparente e com garantia por escrito em todas as intervenções.</p>
<h3 style="color:#fff;margin-top:25px;font-size:1.2rem;">Principais Avarias Resolvidas no Local:</h3>
<ul>${avariasListHtml}</ul>
<div class="cta">
<a href="https://wa.me/${CONFIG.phoneRaw}?text=Olá!%20Preciso%20de%20assistência%20urgente%20para%20${cat.slug}%20${marca.slug}%20em%20${zona.slug}." class="btn-wa" target="_blank" rel="noopener">💬 WhatsApp Urgente (${CONFIG.phone})</a>
<a href="tel:${CONFIG.phoneRaw}" class="btn-call">📞 Ligar Piquete Agora</a>
</div>
</article></main></div>
<a href="https://wa.me/${CONFIG.phoneRaw}?text=Olá!%20Preciso%20de%20assistência%20urgente%20em%20${zona.nome}." class="float-wa" target="_blank" rel="noopener">💬 WhatsApp 24H</a>
<footer><p>© ${CONFIG.companyName} · Serviço técnico especializado em ${zona.nome}.</p></footer></body></html>`;

        fs.writeFileSync(fileName, pageContent, 'utf8');
      });
    });

    footerMatrixHtml += `  </ul>\n  </div>\n`;
  });
});

// --- 3. GERAÇÃO DE PÁGINAS DE ERROS ---
codigosErro.forEach(err => {
  const errSlug = `erro-${err.codigo.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${err.marca.toLowerCase()}`;
  const fileName = `${errSlug}.html`;
  const pageUrl = `${CONFIG.domain}/${fileName}`;
  generatedCount++;

  urlsSitemap.push(
    `  <url>\n    <loc>${pageUrl}</loc>\n    <lastmod>${currentDate}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.75</priority>\n  </url>`
  );

  const errorPageContent = `<!DOCTYPE html><html lang="pt-PT"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Significado Erro ${err.codigo} ${err.marca} | Como Resolver</title><meta name="description" content="O seu equipamento ${err.marca} mostra o erro ${err.codigo}? Saiba o que significa (${err.desc}) e contacte o piquete para assistência em Lisboa e Margem Sul."><link rel="canonical" href="${pageUrl}"><meta name="robots" content="index, follow">
<style>:root{--bg:#000000;--card:rgba(20,20,25,0.85);--accent:#30d158;--text:#f5f5f7;--sub:#86868b;--border:rgba(255,255,255,0.12)}*{box-sizing:border-box;margin:0;padding:0}body{background:var(--bg);color:var(--text);font-family:-apple-system,sans-serif;padding:24px 16px;line-height:1.6;max-width:800px;margin:0 auto;min-height:100vh;display:flex;flex-direction:column;justify-content:space-between}.card{background:var(--card);border:1px solid var(--border);padding:40px;border-radius:24px;margin-bottom:20px}h1{color:#fff;font-size:2.2rem;margin-bottom:15px}.btn-wa{background:var(--accent);color:#000;font-weight:800;padding:16px 28px;border-radius:30px;text-decoration:none;display:inline-flex;align-items:center;gap:10px;margin-top:20px}.float-wa{position:fixed;right:20px;bottom:20px;background:var(--accent);color:#000;padding:14px 20px;border-radius:99px;font-weight:900;text-decoration:none;z-index:999}</style></head>
<body><div><article class="card">
<span style="color:var(--accent);font-weight:700;text-transform:uppercase;font-size:0.8rem">Guia de Avarias ${err.marca}</span>
<h1>Erro ${err.codigo} em Eletrodomésticos ${err.marca}</h1>
<p>Se o visor do seu aparelho <strong>${err.marca}</strong> indica o código <strong>${err.codigo}</strong>, significa habitualmente: <em>${err.desc}</em>.</p>
<p>Se a reinicialização simples não resolver o problema, evite danos maiores na placa ou componentes e contacte o piquete técnico.</p>
<a href="https://wa.me/${CONFIG.phoneRaw}?text=Olá!%20O%20meu%20aparelho%20${err.marca}%20está%20com%20o%20erro%20${err.codigo}." class="btn-wa" target="_blank">💬 Pedir Apoio Técnico (${CONFIG.phone})</a>
</article></div><a href="https://wa.me/${CONFIG.phoneRaw}?text=Erro%20${err.codigo}%20${err.marca}" class="float-wa" target="_blank">💬 WhatsApp 24H</a><footer><p>© ${CONFIG.companyName}</p></footer></body></html>`;

  fs.writeFileSync(fileName, errorPageContent, 'utf8');
});

footerMatrixHtml += '</div>';

// --- 4. ATUALIZAÇÃO DO INDEX.HTML ---
if (fs.existsSync('index.html')) {
  let indexContent = fs.readFileSync('index.html', 'utf8');
  const startTag = '<!-- SEO_MATRIX_START -->';
  const endTag = '<!-- SEO_MATRIX_END -->';

  const calculatorWidget = `
  <div style="background:rgba(25,25,35,0.9);border:1px solid rgba(48,209,88,0.3);padding:30px;border-radius:24px;margin:40px 0;box-shadow:0 20px 40px rgba(0,0,0,0.6)">
    <h2 style="color:#fff;margin-bottom:15px;font-size:1.5rem">⚡ Simulação Rápida de Assistência</h2>
    <p style="color:#b8c3d6;margin-bottom:20px">Selecione os dados do seu equipamento para enviar diretamente para o técnico de piquete:</p>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:15px;margin-bottom:20px">
      <select id="simCat" style="background:#111;color:#fff;padding:12px;border-radius:12px;border:1px solid rgba(255,255,255,0.2)">
        <option value="Frigorífico">Frigorífico</option>
        <option value="Máquina de Lavar Roupa">Máquina de Lavar Roupa</option>
        <option value="Máquina de Lavar Loiça">Máquina de Lavar Loiça</option>
        <option value="Ar Condicionado">Ar Condicionado</option>
      </select>
      <select id="simZona" style="background:#111;color:#fff;padding:12px;border-radius:12px;border:1px solid rgba(255,255,255,0.2)">
        <option value="Lisboa">Lisboa</option>
        <option value="Amadora">Amadora</option>
        <option value="Sintra">Sintra</option>
        <option value="Cascais">Cascais</option>
        <option value="Oeiras">Oeiras</option>
        <option value="Almada / Margem Sul">Almada / Margem Sul</option>
        <option value="Outra Zona">Outra Zona</option>
      </select>
    </div>
    <button onclick="enviarSimulacao()" style="background:#30d158;color:#000;font-weight:900;padding:16px 28px;border:none;border-radius:20px;cursor:pointer;font-size:1.05rem;width:100%;box-shadow:0 8px 20px rgba(48,209,88,0.4)">💬 Enviar Simulação para o WhatsApp 24H</button>
  </div>
  <script>
    function enviarSimulacao() {
      const cat = document.getElementById('simCat').value;
      const zona = document.getElementById('simZona').value;
      const texto = encodeURIComponent('Olá! Fiz uma simulação no site. Preciso de assistência para ' + cat + ' na zona de ' + zona + '. Podem confirmar disponibilidade?');
      window.open('https://wa.me/${CONFIG.phoneRaw}?text=' + texto, '_blank');
    }
  </script>
  `;

  if (indexContent.includes(startTag) && indexContent.includes(endTag)) {
    const regex = new RegExp(`${startTag}[\\s\\S]*?${endTag}`, 'm');
    indexContent = indexContent.replace(regex, `${startTag}\n${calculatorWidget}\n${footerMatrixHtml}\n${endTag}`);
    fs.writeFileSync('index.html', indexContent, 'utf8');
  }
}

// --- 5. SITEMAP E ROBOTS ---
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsSitemap.join('\n')}
</urlset>`;

fs.writeFileSync('sitemap.xml', sitemapContent, 'utf8');
fs.writeFileSync('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${CONFIG.domain}/sitemap.xml\n`, 'utf8');

console.log(`🚀 Concluído! Foram geradas ${generatedCount} páginas e o sitemap.xml foi atualizado!`);
