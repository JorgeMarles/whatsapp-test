async function all(client, msg) {
    if (
        msg.fromMe
    ) {
        
        const chat = await msg.getChat();

        if (chat.isGroup) {
            let mentions = [];
            let text = "";

            for (let participant of chat.participants) {
                const contact = await client.getContactById(
                    participant.id._serialized
                );

                mentions.push(contact);
                text += `@${participant.id.user} `;
            }

            await chat.sendMessage(text, { mentions });
        }
    }
}

module.exports = all;
