const puppeteer = require('puppeteer');
const http = require('http');

(async function() {
  const browser = await puppeteer.launch({
    headless: true,
  });

  const server = http.createServer(async function (req, res) {
    if (req.url == '/') {
      res.writeHead(200, { 'Content-Type': 'application/pdf' });
      res.write(await createPdf(browser, await getBody(req)));
      res.end();
    }
  });

  server.listen(5000);
  console.log('Server listening on port 5000...');
})();

async function createPdf(browser, body) {
  const page = await browser.newPage();
  await page.setContent(body);
  return page.pdf();
}

async function getBody(req) {
  return new Promise((resolve, reject) => {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });

    req.on('end', () => {
      resolve(body.toString());
    });

    req.on('error', (err) => reject(err));
  });
}
