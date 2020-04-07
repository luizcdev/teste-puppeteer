const puppeteer = require('puppeteer');

const getMenuPage = async() => {
  const browser = await puppeteer.launch({headless: false});
  const page = (await browser.pages())[0];
  await page.goto("") ;
 
  await page.evaluate(() => {
    document.querySelector("#user").value = '';
    document.querySelector("#pass").value = '';
    document.querySelector("#empresa").value = '';
    document.querySelector("#btnLogin").click();
  }) ;

  await page.waitForNavigation();
  return browser;
}

const getInitialMenus = async() => {  
  
  const menuPage = await getMenuPage();
  const page = (await menuPage.pages())[0];

  return await page.evaluate(() => {
    let menus = [];
    [...document.querySelectorAll(".botaoMenu")].map(element => menus.push(element.id))

    return menus;
    }
  );

}

const openMenu = async(buttonId) => {
  if (!buttonId)
    return;

  const menuPage = await getMenuPage();
  const page = (await menuPage.pages())[0];
  
  const selector = "#" + buttonId;

  await page.$eval(selector, elem => elem.click());

}

const run = async() => {
  const initialMenus = await getInitialMenus();
  console.log(initialMenus);

  initialMenus.map(e => openMenu(e));

  console.log("finish");
};

run();