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
  try {
    const r = await fetch('https://blogweb-green.vercel.app/api/products/');
    console.log('Status:', r.status);
    if (r.status === 200) {
      const products = JSON.parse(r.body);
      console.log('Total products:', products.length);
      console.log('First product:', products[0].nameEn, '|', products[0].category);
      console.log('Has images:', products[0].images ? 'yes' : 'no');
    } else {
      console.log('Body:', r.body.substring(0, 300));
    }
  } catch (e) {
    console.log('Error:', e.message);
  }
})();
