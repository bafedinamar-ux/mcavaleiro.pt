const fs = require('fs');

// Matrix de Zonas com SEO Local (Coordenadas, Código Postal, Freguesias)
const zonas = [
  { slug: 'carnaxide', nome: 'Carnaxide', concelho: 'Oeiras', lat: 38.7258, lng: -9.2415, cp: '2790', secundarias: ['Queijas', 'Outorela', 'Linda-a-Velha'] },
  { slug: 'amadora', nome: 'Amadora', concelho: 'Amadora', lat: 38.7597, lng: -9.2238, cp: '2700', secundarias: ['Alfragide', 'Venteira', 'Damaia', 'Reboleira'] },
  { slug: 'sintra', nome: 'Sintra', concelho: 'Sintra', lat: 38.8029, lng: -9.3817, cp: '2710', secundarias: ['Queluz', 'Rio de Mouro', 'Mem Martins', 'Belas'] },
  { slug: 'entrecampos', nome: 'Entrecampos', concelho: 'Lisboa', lat: 38.7481, lng: -9.1481, cp: '1600', secundarias: ['Campo Grande', 'Campo Pequeno', 'Avenidas Novas'] },
  { slug: 'alvalade', nome: 'Alvalade', concelho: 'Lisboa', lat: 38.7533, lng: -9.1439, cp: '1700', secundarias: ['Av. de Roma', 'Areeiro', 'Campo Grande'] },
  { slug: 'benfica', nome: 'Benfica', concelho: 'Lisboa', lat: 38.7494, lng: -9.1983, cp: '1500', secundarias: ['São Domingos de Benfica', 'Fonte Nova', 'Laranjeiras'] },
  { slug: 'parque-das-nacoes', nome: 'Parque das Nações', concelho: 'Lisboa', lat: 38.7686, lng: -9.0933, cp: '1990', secundarias: ['Expo', 'Moscavide', 'Sacavém', 'Olivais'] },
  { slug: 'odivelas', nome: 'Odivelas', concelho: 'Odivelas', lat: 38.7954, lng: -9.1802, cp: '2675', secundarias: ['Colinas do Cruzeiro', 'Ramada', 'Pontinha'] },
  { slug: 'cascais', nome: 'Cascais', concelho: 'Cascais', lat: 38.6979, lng: -9.4215, cp: '2750', secundarias: ['Estoril', 'Parede', 'Carcavelos'] },
  { slug: 'almada', nome: 'Almada', concelho: 'Almada', lat: 38.6790, lng: -9.1569, cp: '2800', secundarias: ['Cacilhas', 'Feijó', 'Pragal', 'Corroios'] },
  { slug: 'loures', nome: 'Loures', concelho: 'Loures', lat: 38.8315, lng: -9.1721, cp: '2670', secundarias: ['Sacavém', 'Santo António dos Cavaleiros', 'Bobadela'] },
  { slug: 'oeiras', nome: 'Oeiras', concelho: 'Oeiras', lat: 38.6969, lng: -9.3005, cp: '2780', secundarias: ['Paço de Arcos', 'Algés', 'Porto Salvo'] }
];

// Matrix de Marcas Estratégicas
const marcas = [
  { slug: 'lg', nome: 'LG', cor: '#a50034' },
  { slug: 'bosch', nome: 'Bosch', cor: '#e20015' },
  { slug: 'samsung', nome: 'Samsung', cor: '#1428a0' },
  { slug: 'teka', nome: 'Teka', cor: '#e30613' }
];

// Função geradora de Template HTML
function gerarPágina(zona, marca) {
  const fileName = `reparacao-frigorificos-${marca.slug}-${zona.slug}.html`;
  const zonasTexto = [zona.nome, ...zona.secundarias].join(', ');

  const htmlContent = `<!DOCTYPE html>
<html lang="pt-PT">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reparação de Frigoríficos ${marca.nome} em ${zona.nome} | Piquete 24h M Cavaleiro</title>
  <meta name="description" content="Assistência técnica especializada em frigoríficos e combinados ${marca.nome} em ${zona.nome} (${zonasTexto}). Diagnóstico no próprio dia, compressores Inverter e recarga de gás R600a.">
  
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "M Cavaleiro Reparações - Frigoríficos ${marca.nome} ${zona.nome}",
    "telephone": "+351931369490",
    "url": "https://mcavaleiro.pt/${fileName}",
    "priceRange": "€€",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "${zona.nome}",
      "addressRegion": "${zona.concelho}",
      "postalCode": "${zona.cp}",
      "addressCountry": "PT"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": ${zona.lat},
      "longitude": ${zona.lng}
    }
  }
  </script>

  <style>
    :root { --bg-dark: #0f172a; --card-bg: #1e293b; --accent-green: #30d158; --text-light: #f8fafc; --text-muted: #94a3b8; --marca-color: ${marca.cor}; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background-color: var(--bg-dark); color: var(--text-light); line-height: 1.6; }
    .top-bar { background: #dc2626; color: #fff; text-align: center; padding: 10px 15px; font-weight: 800; font-size: 0.9rem; text-transform: uppercase; }
    .hero { padding: 40px 20px; text-align: center; max-width: 900px; margin: 0 auto; }
    .badge { display: inline-block; background: var(--marca-color); color: #fff; padding: 6px 16px; border-radius: 20px; font-weight: 700; font-size: 0.85rem; margin-bottom: 15px; }
    h1 { font-size: 2.2rem; font-weight: 900; margin-bottom: 15px; }
    h1 span { color: var(--accent-green); }
    .cta-button { display: inline-flex; background: var(--accent-green); color: #000; font-weight: 800; font-size: 1.2rem; padding: 18px 35px; border-radius: 50px; text-decoration: none; margin-top: 20px; }
    .tech-section { background: var(--card-bg); padding: 40px 20px; margin-top: 30px; }
    .container { max-width: 900px; margin: 0 auto; }
    .problems-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; margin-top: 20px; }
    .problem-card { background: #0f172a; padding: 20px; border-radius: 12px; border-left: 4px solid var(--accent-green); }
    footer { text-align: center; padding: 30px 20px; color: var(--text-muted); }
  </style>
</head>
<body>
  <div class="top-bar">🚨 PIQUETE ${marca.nome} EM ${zona.nome.toUpperCase()} | ASSISTÊNCIA DIRETA HOJE</div>
  <header class="hero">
    <span class="badge">ESPECIALISTA ${marca.nome}</span>
    <h1>Reparação de Frigoríficos ${marca.nome} em <span>${zona.nome}</span></h1>
    <p>Assistência técnica direta na zona de ${zonasTexto}. Diagnóstico no próprio dia com garantia.</p>
    <a href="tel:351931369490" class="cta-button">📞 LIGAR PARA O TÉCNICO (931 369 490)</a>
  </header>

  <section class="tech-section">
    <div class="container">
      <h2 style="color: var(--accent-green);">Avarias Frequentes ${marca.nome} em ${zona.nome}</h2>
      <div class="problems-grid">
        <div class="problem-card"><h3>Diagnóstico ao Compressor</h3><p>Reparação e substituição de motores Inverter/convencionais ${marca.nome}.</p></div>
        <div class="problem-card"><h3>Recarga de Gás R600a</h3><p>Teste de pressão com azoto e carga do circuito refrigerante.</p></div>
        <div class="problem-card"><h3>Placas Eletrónicas</h3><p>Resolução de erros digitais no ecrã e avarias na placa principal.</p></div>
        <div class="problem-card"><h3>Degelo No-Frost</h3><p>Troca de ventoinhas, resistências e sensores de temperatura NTC.</p></div>
      </div>
    </div>
  </section>

  <footer>
    <p>&copy; 2026 M Cavaleiro Reparações - ${zona.nome}. Todos os direitos reservados.</p>
    <p><a href="index.html" style="color: var(--accent-green); text-decoration: none;">← Voltar à Página Principal</a></p>
  </footer>
</body>
</html>`;

  fs.writeFileSync(fileName, htmlContent);
  console.log(`[GERADO] ${fileName}`);
}

// Executar criação em massa (12 zonas x 4 marcas = 48 páginas)
marcas.forEach(marca => {
  zonas.forEach(zona => {
    gerarPágina(zona, marca);
  });
});
