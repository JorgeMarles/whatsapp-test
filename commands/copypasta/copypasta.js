const fs = require("fs").promises;

async function copypasta(client, msg) {
    if (typeof msg.body === "string" && msg.body.startsWith("/copypasta")) {
        const command = msg.body.split(" ");

        if (command.length == 2) {
            const data = await fs.readFile(
                "./commands/copypasta/copypastas.json",
                "utf8"
            );
            const json = JSON.parse(data);
            const text = json[command[1]];

            if (text !== undefined) {
                msg.reply(text);
            }
        }
    }
}

module.exports = copypasta;
