const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");
const sticker = require("./commands/sticker/sticker");
const all = require("./commands/all");
const copypasta = require("./commands/copypasta/copypasta");
const ruletaRusa = require("./commands/ruletaRusa");
const papear = require("./commands/papear");
const help = require("./commands/help/help");
const stickerToImg = require("./commands/sticker-to-img");
const liquid = require("./commands/liquidacion");
const horariosIC = require("./commands/horariosInclusion");
const fs = require("fs");

let client = new Client({
    authStrategy: new LocalAuth()

});

client.initialize();
const data = fs.readFileSync("./commands-bot.json","utf-8");
const dataJSON = JSON.parse(data);
const cmmnds = dataJSON.commands.messageCommands;
const cmmndsFn = dataJSON.commands.functions;
const mentions = dataJSON.mentions;

client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
    console.log("Client is ready!");
});
var loading = false;
function switchloading(){
    loading = !loading;
}

function getter(){
    return loading;
}

client.on("message_create", async (msg) => {
    msg.body = msg.body.trim();
    if(msg.body.startsWith("/")){
        console.log("Comando "+msg.body);
        const allCommand = msg.body.slice(1);
        const words = allCommand.split(" ");
        const command = words[0];
        const args = words.slice(1);
        const i = cmmnds.indexOf(command);
        if(i>=0){
            const fn = cmmndsFn[i];
            eval(fn+"(client,args,msg,switchloading,getter)")
        }else{
            msg.reply("Comando desconocido 🧐 revisa que lo hayas escrito correctamente.");
        }
    }else if(msg.body === "@all" ){
        all(client, msg);//no lo supe optimizar
    }
});
