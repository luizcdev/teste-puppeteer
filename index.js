const puppeteer = require('puppeteer');

const run = async() => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto("") ;
 
  await page.evaluate(() => {
    document.querySelector("#user").value = '';
    document.querySelector("#pass").value = '';
    document.querySelector("#empresa").value = '';
    document.querySelector("#btnLogin").click();
  }) ;

  await page.waitForNavigation();
  

  const menus = await page.evaluate(() => {
    let menus = [];
    [...document.querySelectorAll(".botaoMenu")].map(
      element => menus.push({
        'className': element.className,
        'id': element.id,
        'href': element.href
      })
    );

    return menus;
  }) ;  

}

run();