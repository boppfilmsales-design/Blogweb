const https = require('https');

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { followRedirect: true }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    }).on('error', reject);
  });
}

(async () => {
  const urls = [
    'https://blogweb-p54qwqfy9-boppfilmsales-2646s-projects.vercel.app/api/products/',
    'https://blogweb-green.vercel.app/api/products/'
  ];
  for (const url of urls) {
    try {
      const r = await fetch(url);
      console.log(`\n${url}`);
      console.log('  Status:', r.status);
      if (r.status === 200) {
        const products = JSON.parse(r.body);
        console.log('  Total products:', products.length);
        console.log('  First:', products[0].nameEn, '|', products[0].category);
      } else {
        console.log('  Error:', r.body.substring(0, 200));
      }
    } catch (e) {
      console.log(`${url} -> Error: ${e.message}`);
    }
  }
})();
