const { MessageMedia } = require("whatsapp-web.js");
const messageSticker = require("./messageSticker");

async function sticker(client, args, msg) {
    let media = null;

        if (msg.hasMedia) {
            media = await download(msg);
        } else if (msg.hasQuotedMsg) {
            const msgQuote = await msg.getQuotedMessage();

            if (msgQuote.hasMedia) {
                media = await download(msgQuote);
            } else {
                const contact = await msgQuote.getContact();
                const profilePicUrl = await contact.getProfilePicUrl();
                let profilePic = "./commands/sticker/defaultProfile.png";

                if (profilePicUrl != null) {
                    profilePic = await MessageMedia.fromUrl(profilePicUrl);
                }

                const imgBuffer = await messageSticker(
                    typeof profilePic === "string"
                        ? profilePic
                        : Buffer.from(profilePic.data, "base64"),
                    await contact.getFormattedNumber(),
                    msgQuote.body
                );

                const data = imgBuffer.toString("base64");

                media = new MessageMedia("image/png", data);
            }
        }

        if (media !== null) {
            msg.reply(media, null, {
                sendMediaAsSticker: true,
            });
        } else {
            msg.reply(
                "Ha ocurrido un error, intente con un mensaje más reciente"
            );
        }
}

async function download(msg) {
    try {
        return await msg.downloadMedia();
    } catch {
        return null;
    }
}

module.exports = sticker;
