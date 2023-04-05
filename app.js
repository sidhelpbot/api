const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({ 
    headless: false, 
    executablePath: '/nix/store/x205pbkd5xh5g4iv0g58xjla55has3cx-chromium-108.0.5359.94/bin/chromium-browser',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  // Navigate to a URL and log the page title to the console
  const page = await browser.newPage();
  await page.goto('https://my.telegram.org/apps');
  const pageTitle = await page.title();
  console.log(pageTitle);

     async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
await sleep(60000)
  await browser.close();
})();
