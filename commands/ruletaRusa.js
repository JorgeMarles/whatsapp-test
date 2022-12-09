async function ruletaRusa(client, args, msg) {
    

        if (args.length == 1) {
            const num = parseInt(args[0]);

            if (num > 0 && num <= 6) {
                const death = Math.floor(Math.random() * 5 + 1);

                let text = "";

                for (let i = 1; i <= 6; i++) {
                    if (i === death) {
                        text += `El número ${i} disparó ✅\n`;
                    } else {
                        text += `El número ${i} no dispara ❌\n`;
                    }
                }

                if (death == num) {
                    text += "*C A G A S T E* ☠️";
                } else {
                    text += "*Ganaste* 🏆";
                }

                msg.reply(text);
            } else {
                msg.reply("Elige un número del 1 al 6");
            }
        }
}

module.exports = ruletaRusa;
