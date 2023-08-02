const fs = require("fs").promises;
const puppeteer = require("puppeteer")

async function liquid(client, args, msg, switchl, getter) {

    if(getter()){
        msg.reply("Ya hay una petición, por favor espera a que se termine");
        return;
    }

    msg.reply("_Cargando... esto puede tardar varios segundos_")
    switchl();
    const datos = {
        EMAIL : "correo",
        CODIGO : "codigo",
        DOCUMENTO : "documento",
        PW : "contraseña de google",//NO de divisist
        URL : "https://divisist2.ufps.edu.co"
    };
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
	//console.log("Entramos :D");
	
	//console.log("Al entrar: "+page.url());
	//click a generar liquidacion
	await page.click("#content_completw > div.wrapper > div > section.content > div.row > div:nth-child(1) > div > a");
	await new Promise(r => setTimeout(r, tiempoAEsperar));

	//cuando la liquidación no esta disponible, se genera(es decir, se inserta un modal con el mensaje de error)
	//se supone que cuando no se encuentra este mensaje, entonces si hay liquidación
	const errorModals = await page.$x("//strong[contains(text(), 'no se encuentra habilitado')]");
    var resp = "";
	if (errorModals.length > 0) {
		let element = errorModals[0];
		let value = await element.evaluate(el => el.textContent)
		resp = value;
	} else {
	    resp = "Ya hay liquidación :D"
	}
	
    msg.reply(resp)
    switchl();
    //salimos
	await page.click("#content_completw > div.wrapper > header > nav > div > ul > li:nth-child(3) > a");
	await new Promise(r => setTimeout(r, tiempoAEsperar));
	await page.waitForSelector("html")

	//console.log("Salimos :D");
	//console.log("Al salir: "+page.url());
	await browser.close();

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
}


module.exports = liquid;