let axios = require('axios');
const puppeteer = require('puppeteer');

async function create_new_tg_app(stel_token, tg_app_hash, app_title, app_shortname, app_url, app_platform, app_desc) {


  const browser = await puppeteer.launch();
const page = await browser.newPage();
  return console.log(page)
await page.goto('https://my.telegram.org/apps', {
  headers: {
    "Cookie": stel_token
  }
});

await page.type('#app_title', app_title);
await page.type('#app_shortname', app_shortname);
await page.type('#app_url', app_url);
// await page.type('#app_platform', app_platform);
await page.$eval('input[name="app_platform"][value="ios"]', input => input.click());
await page.type('#app_desc', app_desc);

await page.click('#app_save_btn');
await page.waitForNavigation();

await page.screenshot({ path: 'example.png' });
await browser.close();

}
module.exports = create_new_tg_app;