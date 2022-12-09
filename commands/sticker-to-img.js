const { MessageMedia } = require("whatsapp-web.js");


async function stickerToImg(client, args, msg){
    if(msg.hasQuotedMsg){
        const msgQuote = await msg.getQuotedMessage();
        if(msgQuote.type==="sticker"){
            let media;
            try{
                media = await msgQuote.downloadMedia();
                if(media !== null){
                    if(args[0]==="unavez"){
                        msg.reply(media,{isViewOnce:true});
                    }else{
                        msg.reply(media);
                    }
                }else{
                    msg.reply("errorsito:(")
                }
            }catch{
                msg.reply("error, no tengo ese sticker en caché :/")
            }
            
        }else{
            msg.reply("es con un sticker pendejo(not recognized sticker)")
        }
    }else{
        msg.reply("es con un sticker pendejo(not recognized quoted message)")
    }
}

module.exports = stickerToImg;