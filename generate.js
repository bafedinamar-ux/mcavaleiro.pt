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

// ZONAS E FREGUESIAS (GRANDE LISBOA, LINHA DE SINTRA, CASCAIS E MARGEM SUL)
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

// Inicialização do array de URLs do sitemap com a página Principal e a nova página estática de Frigoríficos
let urlsSitemap = [
  `  <url>\n    <loc>${CONFIG.domain}/</loc>\n    <lastmod>${currentDate}</lastmod>\n    <changefreq>always</changefreq>\n    <priority>1.0</priority>\n  </url>`,
  `  <url>\n    <loc>${CONFIG.domain}/reparacao-frigorificos-lisboa-margem-sul.html</loc>\n    <lastmod>${currentDate}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.85</priority>\n  </url>`
];

let footerMatrixHtml = '<div class="seo-enterprise-matrix">\n';
let generatedCount = 0;

console.log('🌌 [Apple Elite Mode] A iniciar geração massiva de pSEO e salvando a página de frigoríficos...');

// --- 1.1 GERAR E GUARDAR A PÁGINA DE FRIGORÍFICOS ---
const fridgeFileName = 'reparacao-frigorificos-lisboa-margem-sul.html';
const fridgeContent = `<!DOCTYPE html>
<html lang="pt-PT">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Reparação de Frigoríficos em Lisboa e Margem Sul | M. Cavaleiro</title>
  <meta name="description" content="Assistência técnica e diagnóstico de frigoríficos em Lisboa e Margem Sul. Problemas de refrigeração, formação de gelo, fugas de água e ruídos. Contacte a M. Cavaleiro Reparações.">
  <meta name="robots" content="index,follow">
  <link rel="canonical" href="${CONFIG.domain}/${fridgeFileName}">
  <meta name="theme-color" content="#111827">
  <style>
    :root{--bg:#0b1120;--panel:#121c2e;--panel2:#17243a;--text:#f7f8fb;--muted:#b8c3d6;--orange:#ff8a24;--orange2:#ffb15c;--line:rgba(255,255,255,.12);--green:#20c878}
    *{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--bg);color:var(--text);font:16px/1.65 Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
    a{color:inherit} .wrap{width:min(1120px,calc(100% - 36px));margin:auto}
    header{border-bottom:1px solid var(--line);background:rgba(11,17,32,.94)}.nav{min-height:74px;display:flex;align-items:center;justify-content:space-between;gap:18px}.brand{font-weight:850;letter-spacing:.2px;text-decoration:none;font-size:1.08rem}.brand span{color:var(--orange)}.nav a.cta{background:var(--orange);color:#171717;padding:10px 15px;border-radius:10px;text-decoration:none;font-weight:800}
    .hero{padding:76px 0 54px;background:radial-gradient(ellipse at 78% 12%,rgba(255,138,36,.19),transparent 38%),linear-gradient(135deg,#0b1120,#101b2e)}
    .eyebrow{color:var(--orange2);font-weight:800;text-transform:uppercase;letter-spacing:1.5px;font-size:.78rem}.hero-grid{display:grid;grid-template-columns:1.25fr .75fr;gap:36px;align-items:center}
    h1{font-size:clamp(2.2rem,5vw,4rem);line-height:1.08;letter-spacing:-1.7px;margin:14px 0 20px}h2{font-size:clamp(1.6rem,3vw,2.3rem);line-height:1.18;letter-spacing:-.6px;margin:0 0 18px}h3{margin:0 0 8px;font-size:1.08rem}
    .lead{font-size:1.13rem;color:var(--muted);max-width:700px}.actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:26px}.btn{display:inline-flex;align-items:center;justify-content:center;padding:13px 18px;border-radius:11px;text-decoration:none;font-weight:850}.primary{background:var(--orange);color:#171717}.secondary{border:1px solid var(--line);background:rgba(255,255,255,.04)}
    .hero-card{background:linear-gradient(155deg,#1b2a40,#111b2c);border:1px solid var(--line);padding:26px;border-radius:22px;box-shadow:0 20px 60px rgba(0,0,0,.22)}.fridge{font-size:5rem;text-align:center;filter:drop-shadow(0 10px 25px rgba(0,0,0,.3))}.hero-card p{color:var(--muted);margin:10px 0 0}.mini-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:20px}.mini{background:rgba(255,255,255,.05);border:1px solid var(--line);padding:12px;border-radius:12px;font-size:.92rem}
    section{padding:64px 0}.intro{max-width:780px;color:var(--muted)}.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:15px;margin-top:26px}.card{background:var(--panel);border:1px solid var(--line);padding:22px;border-radius:16px}.card p{margin:0;color:var(--muted)}.icon{font-size:1.55rem;margin-bottom:12px}
    .soft{background:#0f1929;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}.zones{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:25px}.zone-group{padding:22px;border-radius:16px;background:var(--panel);border:1px solid var(--line)}.zone-group ul{padding-left:19px;margin-bottom:0;color:var(--muted)}.zone-group li{margin:4px 0}
    .steps{display:grid;grid-template-columns:repeat(3,1fr);gap:15px;margin-top:24px}.step{border-top:3px solid var(--orange);background:var(--panel);padding:20px;border-radius:0 0 14px 14px}.step b{display:block;font-size:1.05rem;margin-bottom:8px}.step p{margin:0;color:var(--muted)}
    .notice{margin-top:22px;padding:16px 18px;border:1px solid rgba(255,177,92,.35);border-radius:12px;color:var(--muted);background:rgba(255,138,36,.07)}
    .faq{max-width:850px}.faq details{padding:17px 0;border-bottom:1px solid var(--line)}.faq summary{font-weight:800;cursor:pointer}.faq details p{color:var(--muted);margin-bottom:0}
    .contact{background:linear-gradient(135deg,#18263b,#101827);border:1px solid var(--line);border-radius:22px;padding:32px;display:flex;align-items:center;justify-content:space-between;gap:24px}.contact p{color:var(--muted);margin:0}.contact-actions{display:flex;gap:10px;flex-wrap:wrap}
    footer{padding:26px 0;color:var(--muted);font-size:.9rem;border-top:1px solid var(--line)}footer a{color:var(--orange2)}
    .float{position:fixed;right:18px;bottom:18px;z-index:10;background:var(--green);color:#062414;padding:13px 17px;border-radius:999px;text-decoration:none;font-weight:900;box-shadow:0 8px 30px #0006}
    @media(max-width:800px){.hero-grid{grid-template-columns:1fr}.hero{padding-top:52px}.hero-card{max-width:520px}.cards,.zones,.steps{grid-template-columns:1fr 1fr}.contact{align-items:flex-start;flex-direction:column}}
    @media(max-width:540px){.cards,.zones,.steps{grid-template-columns:1fr}.nav{min-height:65px}.nav .cta{font-size:.85rem;padding:9px 10px}.hero-card{padding:20px}.contact{padding:23px}.wrap{width:min(100% - 28px,1120px)}}
  </style>
  <script type="application/ld+json">
  {
    "@context":"https://schema.org",
    "@type":"Service",
    "name":"Reparação e diagnóstico de frigoríficos",
    "serviceType":"Assistência técnica a frigoríficos",
    "provider":{
      "@type":"LocalBusiness",
      "name":"M. Cavaleiro Reparações",
      "url":"${CONFIG.domain}/",
      "telephone":"+${CONFIG.phoneRaw}",
      "areaServed":[
        {"@type":"City","name":"Lisboa"},
        {"@type":"AdministrativeArea","name":"Margem Sul"},
        {"@type":"City","name":"Almada"},
        {"@type":"City","name":"Seixal"},
        {"@type":"City","name":"Barreiro"},
        {"@type":"City","name":"Amadora"},
        {"@type":"City","name":"Sintra"},
        {"@type":"City","name":"Oeiras"},
        {"@type":"City","name":"Loures"}
      ]
    },
    "areaServed":["Lisboa","Almada","Seixal","Barreiro","Amadora","Sintra","Oeiras","Loures","Odivelas","Montijo","Setúbal"]
  }
  </script>
</head>
<body>
  <header>
    <div class="wrap nav">
      <a class="brand" href="${CONFIG.domain}/">M. CAVALEIRO <span>REPARAÇÕES</span></a>
      <a class="cta" href="https://wa.me/${CONFIG.phoneRaw}?text=Olá%2C%20preciso%20de%20assistência%20para%20um%20frigorífico." target="_blank" rel="noopener">WhatsApp · ${CONFIG.phone} ↗</a>
    </div>
  </header>

  <main>
    <section class="hero">
      <div class="wrap hero-grid">
        <div>
          <div class="eyebrow">Assistência técnica • Lisboa e Margem Sul</div>
          <h1>Reparação de frigoríficos em Lisboa e Margem Sul</h1>
          <p class="lead">O frigorífico deixou de arrefecer, acumula gelo, perde água ou faz um ruído fora do habitual? A M. Cavaleiro Reparações presta assistência técnica e diagnóstico de avarias, com deslocações em várias zonas da Grande Lisboa e da Margem Sul, mediante confirmação de disponibilidade.</p>
          <div class="actions">
            <a class="btn primary" href="https://wa.me/${CONFIG.phoneRaw}?text=Olá%2C%20preciso%20de%20diagnóstico%20para%20um%20frigorífico." target="_blank" rel="noopener">WhatsApp ${CONFIG.phone}</a>
            <a class="btn secondary" href="tel:+${CONFIG.phoneRaw}">Ligar ${CONFIG.phone}</a>
          </div>
        </div>
        <aside class="hero-card" aria-label="Resumo do serviço">
          <div class="fridge" aria-hidden="true">🧊</div>
          <h2 style="font-size:1.35rem;text-align:center;margin-bottom:8px">Diagnóstico antes de decidir</h2>
          <p style="text-align:center">A avaria deve ser avaliada antes de confirmar a reparação, o preço e a necessidade de peças.</p>
          <div class="mini-grid">
            <div class="mini">✓ Avaliação da avaria</div>
            <div class="mini">✓ Explicação do problema</div>
            <div class="mini">✓ Orçamento antes de avançar</div>
            <div class="mini">✓ Marcação por contacto direto</div>
          </div>
        </aside>
      </div>
    </section>

    <section>
      <div class="wrap">
        <h2>Que problemas podemos avaliar?</h2>
        <p class="intro">O diagnóstico depende do modelo, dos sintomas e dos testes realizados no equipamento. Estes são alguns dos problemas que justificam uma avaliação técnica.</p>
        <div class="cards">
          <article class="card"><div class="icon">🌡️</div><h3>O frigorífico não arrefece</h3><p>Pode estar relacionado com circulação de ar, sensores, ventilação, sistema de controlo ou circuito de refrigeração.</p></article>
          <article class="card"><div class="icon">🧊</div><h3>Gelo em excesso</h3><p>Acumulação de gelo no congelador, na parede interior ou em zonas onde normalmente não deveria aparecer.</p></article>
          <article class="card"><div class="icon">💧</div><h3>Fugas de água</h3><p>Água no chão ou dentro do equipamento pode resultar de drenagem obstruída ou de outros componentes.</p></article>
          <article class="card"><div class="icon">🔊</div><h3>Ruídos anormais</h3><p>Vibrações, estalidos ou ruídos persistentes que exigem identificação da origem antes de substituir peças.</p></article>
          <article class="card"><div class="icon">⚡</div><h3>Não liga ou desliga</h3><p>Verificação dos sintomas elétricos e de controlo, conforme o tipo de equipamento e a avaria apresentada.</p></article>
          <article class="card"><div class="icon">❄️</div><h3>Congela ou arrefece demasiado</h3><p>Temperatura irregular, alimentos a congelar no compartimento frigorífico ou funcionamento contínuo.</p></article>
        </div>
        <div class="notice"><strong>Nota:</strong> nem todas as avarias são economicamente viáveis de reparar. O orçamento e a viabilidade devem ser confirmados após diagnóstico; peças e prazos dependem da marca e do modelo.</div>
      </div>
    </section>

    <section class="soft">
      <div class="wrap">
        <h2>Zonas de assistência</h2>
        <p class="intro">A página reúne as principais zonas onde podes solicitar informação sobre assistência a frigoríficos. A deslocação e a disponibilidade devem ser confirmadas antes da marcação.</p>
        <div class="zones">
          <div class="zone-group"><h3>Lisboa e concelhos próximos</h3><ul><li>Lisboa</li><li>Benfica</li><li>Parque das Nações</li><li>Amadora</li><li>Odivelas</li><li>Loures</li><li>Oeiras</li></ul></div>
          <div class="zone-group"><h3>Sintra e linha</h3><ul><li>Sintra</li><li>Cacém</li><li>Rio de Mouro</li><li>Algueirão–Mem Martins</li><li>Queluz e Massamá</li><li>Cascais</li><li>Vila Franca de Xira</li></ul></div>
          <div class="zone-group"><h3>Margem Sul</h3><ul><li>Almada</li><li>Seixal</li><li>Amora</li><li>Corroios</li><li>Arrentela</li><li>Barreiro</li><li>Montijo e Setúbal</li></ul></div>
        </div>
        <p class="notice">Não encontras a tua localidade? Envia a zona e o modelo do frigorífico por WhatsApp para confirmar se é possível realizar a deslocação.</p>
      </div>
    </section>

    <section>
      <div class="wrap">
        <h2>Como funciona o pedido de assistência</h2>
        <div class="steps">
          <div class="step"><b>1. Envia os detalhes</b><p>Indica a localidade, a marca e o modelo, se estiver disponível, e descreve o que está a acontecer.</p></div>
          <div class="step"><b>2. Confirma a deslocação</b><p>É confirmada a disponibilidade e explicado o valor aplicável ao diagnóstico ou deslocação antes da marcação.</p></div>
          <div class="step"><b>3. Diagnóstico e orçamento</b><p>Depois de avaliar o equipamento, são explicadas as opções e os custos antes de avançar com a reparação.</p></div>
        </div>
      </div>
    </section>

    <section class="soft">
      <div class="wrap faq">
        <h2>Perguntas frequentes</h2>
        <details><summary>Quanto custa reparar um frigorífico?</summary><p>O custo depende da avaria, do modelo, das peças necessárias e da deslocação. Contacta-nos para confirmar o valor do diagnóstico e as condições antes da marcação.</p></details>
        <details><summary>Fazem assistência ao domicílio?</summary><p>As deslocações são avaliadas por localidade e disponibilidade. Envia a tua zona por WhatsApp para confirmar se está abrangida.</p></details>
        <details><summary>Reparam todas as marcas?</summary><p>A possibilidade de intervenção depende da marca, do modelo, da avaria e da disponibilidade de peças. Indica a marca e, se possível, a referência do equipamento para uma avaliação inicial.</p></details>
        <details><summary>O frigorífico ainda funciona, mas não arrefece bem. Devo esperar?</summary><p>É preferível não adiar a avaliação se a temperatura estiver inadequada, sobretudo para preservar os alimentos. Evita desmontar componentes ou intervir no circuito de refrigeração sem qualificação adequada.</p></details>
        <details><summary>Que informação devo enviar para pedir assistência?</summary><p>Envia a localidade, a marca, o modelo ou referência, uma descrição dos sintomas e, se possível, fotografias da etiqueta e do problema.</p></details>
      </div>
    </section>

    <section>
      <div class="wrap">
        <div class="contact">
          <div><h2>Precisas de assistência para o frigorífico?</h2><p>Envia a localidade, a marca e os sintomas. Confirmamos a disponibilidade e os próximos passos.</p><p style="margin-top:12px;color:#fff;font-weight:850;font-size:1.2rem">Contacto: <a href="tel:+${CONFIG.phoneRaw}" style="color:#ffb15c">${CONFIG.phone}</a></p></div>
          <div class="contact-actions">
            <a class="btn primary" href="https://wa.me/${CONFIG.phoneRaw}?text=Olá!%20Preciso%20de%20assistência%20para%20um%20frigorífico.%20Localidade%3A%20%20Marca%3A%20%20Avaria%3A%20" target="_blank" rel="noopener">Pedir pelo WhatsApp</a>
            <a class="btn secondary" href="tel:+${CONFIG.phoneRaw}">Ligar ${CONFIG.phone}</a>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer>
    <div class="wrap">
      <strong>M. Cavaleiro Reparações</strong> · Assistência técnica a frigoríficos em Lisboa e Margem Sul.<br>
      <a href="${CONFIG.domain}/">Visitar o site principal</a> · <a href="${CONFIG.domain}/">Outros serviços</a>
      <p>As zonas, a disponibilidade, os preços e os prazos são confirmados caso a caso. A M. Cavaleiro Reparações não deve ser apresentada como assistência oficial de uma marca sem autorização específica.</p>
    </div>
  </footer>
  <a class="float" href="https://wa.me/${CONFIG.phoneRaw}?text=Olá%2C%20preciso%20de%20assistência%20para%20um%20frigorífico." target="_blank" rel="noopener" aria-label="Contactar pelo WhatsApp">WhatsApp · ${CONFIG.phone} ↗</a>
</body>
</html>`;

fs.writeFileSync(fridgeFileName, fridgeContent, 'utf8');

// --- 2. GERAÇÃO AUTÓNOMA DE PÁGINAS pSEO ---
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
      const avariasListHtml = cat.avariasComuns.map(avaria => `<li>⚠️ <strong>${avaria}</strong></li>`).join('\n');

      const outrasMarcas = marcas
        .filter(m => m.slug !== marca.slug)
        .slice(0, 8)
        .map(m => `<a href="/reparacao-${cat.slug}-${m.slug}-${zona.slug}.html">${m.nome}</a>`)
        .join(' · ');

      const outrasZonas = zonas
        .filter(z => z.slug !== zona.slug)
        .slice(0, 8)
        .map(z => `<a href="/reparacao-${cat.slug}-${marca.slug}-${z.slug}.html">${z.nome}</a>`)
        .join(' · ');

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
          "name": "As reparações de ${marca.nome} têm garantia?",
          "acceptedAnswer": { "@type": "Answer", "text": "Sim, todas as reparações e peças aplicadas em equipamentos ${marca.nome} possuem garantia legal por escrito." }
        }
      ]
    }
  ]
}
</script>
<style>:root{--bg:#000000;--card:rgba(20,20,25,0.75);--accent:#30d158;--accent-glow:rgba(48,209,88,0.3);--text:#f5f5f7;--sub:#86868b;--border:rgba(255,255,255,0.12)}*{box-sizing:border-box;margin:0;padding:0}body{background:var(--bg);background-image:radial-gradient(circle at 50% -20%, #1a2332 0%, #000000 60%);color:var(--text);font-family:-apple-system,BlinkMacSystemFont,"SF Pro Display","SF Pro Text",sans-serif;padding:24px 16px;line-height:1.6;max-width:920px;margin:0 auto;min-height:100vh;display:flex;flex-direction:column;justify-content:space-between}.nav{font-size:0.85rem;color:var(--sub);margin-bottom:24px;letter-spacing:-0.01em}.nav a{color:var(--sub);text-decoration:none;transition:color 0.2s}.nav a:hover{color:#fff}.card{background:var(--card);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid var(--border);padding:45px 35px;border-radius:28px;margin-bottom:20px;box-shadow:0 25px 50px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.1)}.badge{display:inline-flex;align-items:center;gap:8px;background:rgba(48,209,88,0.12);border:1px solid rgba(48,209,88,0.3);color:var(--accent);padding:8px 16px;border-radius:30px;font-weight:700;font-size:0.75rem;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:20px}.pulse-dot{width:8px;height:8px;background:var(--accent);border-radius:50%;box-shadow:0 0 0 0 rgba(48,209,88,0.7);animation:pulse 2s infinite}h1{font-size:clamp(1.9rem,4.5vw,2.6rem);font-weight:800;color:#fff;margin-bottom:20px;letter-spacing:-0.03em;line-height:1.15}p{margin-bottom:18px;color:#d1d1d6;font-size:1.05rem;letter-spacing:-0.01em}ul{list-style:none;margin:25px 0}li{margin-bottom:12px;font-size:0.95rem;display:flex;align-items:center;gap:10px;background:rgba(255,255,255,0.03);padding:12px 16px;border-radius:12px;border:1px solid rgba(255,255,255,0.05)}.cta{margin-top:35px;display:flex;gap:14px;flex-wrap:wrap}.btn-wa{background:var(--accent);color:#000;font-weight:800;padding:18px 32px;border-radius:32px;text-decoration:none;display:inline-flex;align-items:center;gap:10px;font-size:1.1rem;box-shadow:0 8px 25px var(--accent-glow);transition:all 0.3s cubic-bezier(0.16,1,0.3,1)}.btn-wa:hover{transform:translateY(-2px);box-shadow:0 12px 35px rgba(48,209,88,0.5)}.btn-call{background:rgba(255,255,255,0.06);color:#fff;font-weight:700;padding:18px 32px;border-radius:32px;text-decoration:none;border:1px solid var(--border);font-size:1.1rem;transition:all 0.3s cubic-bezier(0.16,1,0.3,1)}.btn-call:hover{background:rgba(255,255,255,0.12);transform:translateY(-2px)}.links-net{margin-top:30px;padding-top:25px;border-top:1px solid var(--border);font-size:0.85rem;color:var(--sub)}.links-net a{color:var(--accent);text-decoration:none;transition:opacity 0.2s}.links-net a:hover{opacity:0.8}footer{text-align:center;color:var(--sub);font-size:0.85rem;margin-top:30px;border-top:1px solid var(--border);padding-top:20px}@keyframes pulse{0%{transform:scale(0.95);box-shadow:0 0 0 0 rgba(48,209,88,0.7)}70%{transform:scale(1);box-shadow:0 0 0 10px rgba(48,209,88,0)}100%{transform:scale(0.95);box-shadow:0 0 0 0 rgba(48,209,88,0)}}@media(max-width:600px){.cta{flex-direction:column}.btn-wa,.btn-call{text-align:center;justify-content:center;width:100%}.card{padding:25px 20px}}</style></head>
<body><div><div class="nav"><a href="/">Início</a> &gt; <span>${cat.nome} ${marca.nome} em ${zona.nome}</span></div>
<main><article class="card">
<div class="badge"><div class="pulse-dot"></div> Piquete Ativo em ${zona.nome} · Nota ${CONFIG.ratingValue}/5 ⭐</div>
<h1>Reparação de ${cat.nome} ${marca.nome} em ${zona.nome}</h1>
<p>O seu equipamento <strong>${marca.nome}</strong> avariou em <strong>${zona.nome}</strong>? Dispomos de técnicos especialistas ao domicílio no próprio dia em todas as áreas: <em>${freguesiasTexto}</em>.</p>
<p>Diagnóstico rigoroso e transparente, com aplicação exclusiva de peças originais e garantia certificada por escrito.</p>
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

    footerMatrixHtml += `  </ul>\n  </div>\n`;
  });
});

footerMatrixHtml += '</div>';

console.log(`🌌 [Apple Elite Massivo] Concluído! ${generatedCount} páginas pSEO geradas + página de frigoríficos.`);

// --- 3. ATUALIZAÇÃO DO INDEX.HTML ---
if (fs.existsSync('index.html')) {
  let indexContent = fs.readFileSync('index.html', 'utf8');
  const startTag = '<!-- SEO_MATRIX_START -->';
  const endTag = '<!-- SEO_MATRIX_END -->';

  if (indexContent.includes(startTag) && indexContent.includes(endTag)) {
    const regex = new RegExp(`${startTag}[\\s\\S]*?${endTag}`, 'm');
    indexContent = indexContent.replace(regex, `${startTag}\n${footerMatrixHtml}\n${endTag}`);
    fs.writeFileSync('index.html', indexContent, 'utf8');
    console.log('✅ Matriz gigante de links injetada com sucesso no index.html!');
  }
}

// --- 4. SITEMAP E ROBOTS ---
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsSitemap.join('\n')}
</urlset>`;

fs.writeFileSync('sitemap.xml', sitemapContent, 'utf8');
fs.writeFileSync('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${CONFIG.domain}/sitemap.xml\n`, 'utf8');

console.log(`🚀 [Ready for deployment] Sitemap atualizado com ${urlsSitemap.length} URLs de alta conversão!`);
