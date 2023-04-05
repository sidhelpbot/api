let axios = require('axios');
const puppeteer = require('puppeteer-core');

async function create_new_tg_app(stel_token, tg_app_hash, app_title, app_shortname, app_url, app_platform, app_desc) {
  console.log("yes")

  const browser = await puppeteer.launch({ 
    headless: false, 
    slowMo: 10,
    timeout: 600000,
    // executablePath: '/nix/store/x205pbkd5xh5g4iv0g58xjla55has3cx-chromium-108.0.5359.94/bin/chromium-browser',
    executablePath: '/home/runner/.nix-profile/bin/google-chrome-stable',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
const page = await browser.newPage();

const stelToken = stel_token.split("stel_token=")[1].split(";")[0];
await sleep(6000)
  console.log(stelToken)
  page.setDefaultTimeout(600000);

 await page.setViewport({
  width: 940,
  height: 2080,
  deviceScaleFactor: 1,
}); 
await page.setCookie({
  name: 'stel_token',
  value: stelToken,
  domain: 'my.telegram.org',
  path: '/',
  expires: -1,
  httpOnly: true,
  secure: true,
  sameSite: 'None'
});
  
await page.goto('https://my.telegram.org/apps');
  
// await page.screenshot({ path: 'example.png' });
  
await page.waitForSelector('#app_title');
await page.type('#app_title', app_title);
await page.type('#app_shortname', app_shortname);
await page.type('#app_url', app_url);

// await page.type('#app_platform', app_platform);
// await page.click('input[name="app_platform"][value="ios"]');
await page.type('#app_desc', app_desc);
await page.screenshot({ path: 'exam.png' });

await page.click('#app_save_btn', { timeout: 60000});
await page.screenshot({ path: 'exam2.png' });
  
// await page.waitForNavigation();

await page.screenshot({ path: 'examuy.png' });
  
const expectedUrl = 'https://my.telegram.org/apps';
  await sleep(10000)
console.log(expectedUrl)
await page.screenshot({ path: 'example2l.png' });
return 
const currentUrl = await page.url();
if (currentUrl == expectedUrl) {
  console.log('Successfully submitted form and landed on the expected page');
} else {
  console.log(`Expected to land on ${expectedUrl} but landed on ${currentUrl} instead`);
}
await browser.close();

}
module.exports = create_new_tg_app;

   async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}