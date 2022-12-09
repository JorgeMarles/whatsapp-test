const fs = require("fs").promises;



async function copypasta(client, args, msg) {
    if (typeof msg.body === "string" && args.length > 0) {
        const copy = args[0];

        const data = await fs.readFile(
            "./commands/copypasta/copypastas.json",
            "utf8"
        );
        const json = JSON.parse(data);
        const text = json[copy];
        if (text !== undefined) {
            msg.reply(text);
        }else{
            msg.reply("No existe ese copypasta :(");
        }
    }
}

module.exports = copypasta;
