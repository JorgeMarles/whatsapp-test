const qrcode = require("qrcode-terminal");
const { Client, Buttons } = require("whatsapp-web.js");

const client = new Client();

client.initialize();

client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
    client.sendMessage("573227398660@c.us", "a");

    console.log("Client is ready!");
});

client.on("message", (message) => {
    console.log(message);
});
