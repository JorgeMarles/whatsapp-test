const fs = require("fs").promises;

async function help(client, msg) {
    if (msg.body === "/help") {
        const text = await fs.readFile("./commands/help/help.txt", "utf8");
        msg.reply(text);
    }
}

module.exports = help;
