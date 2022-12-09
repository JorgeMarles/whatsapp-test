const fs = require("fs").promises;

async function help(client, args, msg) {
    const text = await fs.readFile("./commands/help/help.txt", "utf8");
    msg.reply(text);
}

module.exports = help;
