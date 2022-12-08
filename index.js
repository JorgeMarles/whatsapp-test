const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");
const sticker = require("./commands/sticker/sticker");
const all = require("./commands/all");
const copypasta = require("./commands/copypasta/copypasta");
const ruletaRusa = require("./commands/ruletaRusa");
const papear = require("./commands/papear");
const help = require("./commands/help/help");

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
    all(client, msg);
    sticker(client, msg);
    copypasta(client, msg);
    ruletaRusa(client, msg);
    papear(client, msg);
    help(client, msg);
});
