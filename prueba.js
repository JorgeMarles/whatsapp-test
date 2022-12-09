const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");
const stickerToImg = require("./commands/sticker-to-img");

let client = new Client({
    authStrategy: new LocalAuth(),
});


client.initialize();


client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
    console.log("Client is ready!");
});

client.on("message_create", async (msg) => {
    if(msg.id.remote==="120363041571375638@g.us"){
        console.log(msg._data.isViewOnce);
    }
});
