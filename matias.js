const fs = require("fs").promises;
const puppeteer = require("puppeteer")
const datos = {
    EMAIL : "karenlizethqv@ufps.edu.co",
    CODIGO : "1152250",
    PW : "Helen08Villasmil*",//NO de divisist
    URL : "https://divisist2.ufps.edu.co"
};
(async () => {
  const tiempoAEsperar = 1500;

  //const browser = await puppeteer.launch();
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36');

  //console.log("Verificando...")
  await page.goto(datos.URL, { waitUntil: "domcontentloaded" });
  //console.log(page.url());
  //await page.screenshot({path:Date.now()+".png"})
  // Set screen size

  await page.setViewport({width: 1840, height: 892});
  const elemento = await page.$("body > div.login-box2 > div.login-box-body > div.cd-panel.from-left.is-visible");
  await clickOnElement(elemento, 1550, 570)
  await new Promise(r => setTimeout(r, tiempoAEsperar));
  //cerramos el panel
  //console.log("cerramos el panel");


  //esperamos que el form cargue
  await page.waitForSelector("#form_login_google > button")
  await page.click("#form_login_google > button")

  const navigationPromise = page.waitForNavigation()

  await navigationPromise

  await page.waitForSelector('input[type="email"]')
  await page.click('input[type="email"]')

  await navigationPromise

  //TODO : change to your email 
  await page.type('input[type="email"]', datos.EMAIL)

  await page.waitForSelector('#identifierNext')
  await page.click('#identifierNext')

  const milliseconds = 500;

  await new Promise(r => setTimeout(r,milliseconds ))

  await page.waitForSelector('input[type="password"]')
  await page.click('input[type="email"]')
  await new Promise(r => setTimeout(r,milliseconds*10 ))

  //TODO : change to your password

  await page.type('input[type="password"]', datos.PW)

  await page.waitForSelector('#passwordNext')
  await page.click('#passwordNext')

  await navigationPromise
  await new Promise(r => setTimeout(r,tiempoAEsperar*3 ))
  console.log("Entramos :D");

  //console.log("Al entrar: "+page.url());
  //click a generar liquidacion
  await page.click("#content_completw > div.wrapper > aside > section > ul > li:nth-child(5) > a");
  await new Promise(r => setTimeout(r, 500));
  await page.click("#content_completw > div.wrapper > aside > section > ul > li.treeview.active > ul > li:nth-child(1) > a");
  await new Promise(r => setTimeout(r, tiempoAEsperar));

  await page.type("#codigo", "1155304");
  let v1=-1, v2=-1, v3=-1;
  let first = true;
  let i = 0;
  while(true){
      await page.click("#form_materia > div.box-body > div > div > span > button");
      await new Promise(r => setTimeout(r, 500))

      const element = await page.$("#collapse1 > div > div > table > tbody > tr:nth-child(2) > td:nth-child(3)")
      let value = await page.evaluate(el => el.textContent.trim(), element)
      if(v1===-1)v1 = value;
      const element2 = await page.$("#collapse1 > div > div > table > tbody > tr:nth-child(3) > td:nth-child(3)")
      let value2 = await page.evaluate(el => el.textContent.trim(), element2)
      if(v2===-1)v2 = value2;
      const element3 = await page.$("#collapse1 > div > div > table > tbody > tr:nth-child(4) > td:nth-child(3)")
      let value3 = await page.evaluate(el => el.textContent.trim(), element3)
      if(v3===-1)v3 = value3;
      //
      //
      //cuando la liquidación no esta disponible, se genera(es decir, se inserta un modal con el mensaje de error)
      //se supone que cuando no se encuentra este mensaje, entonces si hay liquidación

      console.log(`Adarme: ${value} - Boris: ${value2} - Matías: ${value3} a las ${new Date().toISOString()} : i: ${i}`);

    i++;


      if(i%60===0){
        console.clear();
      }
      
      
      await new Promise(r => setTimeout(r, 9500));
  }



  async function clickOnElement(elem, x = null, y = null) {
      const rect = await page.evaluate(el => {
        const { top, left, width, height } = el.getBoundingClientRect();
        return { top, left, width, height };
      }, elem);

      // Use given position or default to center
      const _x = x !== null ? x : rect.width / 2;
      const _y = y !== null ? y : rect.height / 2;

      await page.mouse.click(rect.left + _x, rect.top + _y);
    }
})();
