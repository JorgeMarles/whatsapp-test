async function papear(client, args, msg) {
    if (msg.hasQuotedMsg) {
        const chat = await msg.getChat();
        const quote = await msg.getQuotedMessage();
        const contact = await quote.getContact();

        if (quote.hasMedia) {
            try {
                const media = await quote.downloadMedia();
                const text = `@${contact.id.user} papeado`;
                chat.sendMessage(text, {
                    mentions: [contact],
                    media,
                });
            } catch {
                msg.reply("Error al papear. Intente más tarde.");
            }
        }
    }
}

module.exports = papear;
