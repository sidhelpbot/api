const puppeteer = require('puppeteer');
// (() => {

  
// })();
async function func(){
console.log('yes')                         
    const browser = await puppeteer.launch();
const page = await browser.newPage();
console.log("yo")
}
func()