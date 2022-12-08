async function all(client, msg) {
    if (
        msg.fromMe &&
        typeof msg.body === "string" &&
        msg.body.search(/@all/) != -1
    ) {
        let command = msg.body.split(" ");
        const chat = await msg.getChat();

        if (chat.isGroup) {
            let mentions = [];
            let text = "";

            for (word of command) {
                if (word.search(/@all/) != -1) {
                    for (let participant of chat.participants) {
                        const contact = await client.getContactById(
                            participant.id._serialized
                        );

                        mentions.push(contact);
                        text += `@${participant.id.user} `;
                    }
                } else {
                    text += `${word} `;
                }
            }

            await chat.sendMessage(text, { mentions });
        }
    }
}

module.exports = all;
