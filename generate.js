const fs = require('fs');

// --- 1. GERAR MATRIZ DE LINKS NO INDEX.HTML ---
let footerLinksHtml = '<div class="seo-matrix-grid">\n';

if (typeof marcas !== 'undefined' && typeof zonas !== 'undefined') {
  marcas.forEach(marca => {
    footerLinksHtml += `  <div class="seo-matrix-col">\n    <h4>${marca.nome}</h4>\n    <ul>\n`;
    zonas.forEach(zona => {
      const pageUrl = `/reparacao-frigorificos-${marca.slug}-${zona.slug}.html`;
      footerLinksHtml += `      <li><a href="${pageUrl}">Frigoríficos ${marca.nome} em ${zona.nome}</a></li>\n`;
    });
    footerLinksHtml += `    </ul>\n  </div>\n`;
  });
}
footerLinksHtml += '</div>';

if (fs.existsSync('index.html')) {
  let indexContent = fs.readFileSync('index.html', 'utf8');
  const startTag = '<!-- SEO_MATRIX_START -->';
  const endTag = '<!-- SEO_MATRIX_END -->';

  if (indexContent.includes(startTag) && indexContent.includes(endTag)) {
    const regex = new RegExp(`${startTag}[\\s\\S]*?${endTag}`, 'm');
    indexContent = indexContent.replace(regex, `${startTag}\n${footerLinksHtml}\n${endTag}`);
    fs.writeFileSync('index.html', indexContent, 'utf8');
    console.log('index.html atualizado com a matriz de links dinâmicos!');
  }
}

// --- 2. GERAR SITEMAP.XML AUTOMÁTICO ---
let urlsSitemap = [
  '  <url><loc>https://mcavaleiro.pt/</loc><priority>1.0</priority></url>'
];

if (typeof marcas !== 'undefined' && typeof zonas !== 'undefined') {
  marcas.forEach(marca => {
    zonas.forEach(zona => {
      const pageUrl = `https://mcavaleiro.pt/reparacao-frigorificos-${marca.slug}-${zona.slug}.html`;
      urlsSitemap.push(`  <url><loc>${pageUrl}</loc><priority>0.8</priority></url>`);
    });
  });
}

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsSitemap.join('\n')}
</urlset>`;

fs.writeFileSync('sitemap.xml', sitemapContent);
console.log("Sitemap.xml gerado e gravado com sucesso!");
