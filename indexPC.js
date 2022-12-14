const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");

const papear = require("./commands/papear");

const fs = require("fs");

let client = new Client({
    authStrategy: new LocalAuth()

});


client.initialize();

const data = fs.readFileSync("./contacts.json","utf-8");
const dataJSON = JSON.parse(data);
const contactos = dataJSON.contactos;
const yo = dataJSON.me;

client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
    console.log("Client is ready!");
});

client.on("message_create", async (msg) => {
    msg.body = msg.body.trim();
    var siEsta = esta(contactos,msg.from) > -1 || esta(contactos,msg.to) > -1;
    console.log(siEsta);
    if(siEsta&&msg.hasMedia){
        let media = await msg.downloadMedia();
        client.sendMessage(yo.id,media);
    }
    
});

function esta(contactos, persona){
    var pos = -1;
    for(var i = 0; pos == -1 && i < contactos.length; i++ ){
        if(contactos[i].id == persona){
            pos = i;
        }
    }
    return pos;
}