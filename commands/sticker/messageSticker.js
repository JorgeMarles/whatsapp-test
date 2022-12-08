const { loadImage, createCanvas } = require("canvas");

async function createSticker(img, username, text) {
    const canvas = createCanvas(0, 0);
    const context = canvas.getContext("2d");
    context.font = "20px LiberationMono";
    let textSize = drawMultilineText(context, text, 175, 100);
    let canvasSize = {
        width: textSize.x + 50 > 420 ? textSize.x + 50 : 420,
        height: textSize.y + 50,
    };

    return await draw(img, username, text, canvasSize.width, canvasSize.height);
}

async function draw(img, username, text, width, height) {
    const canvas = createCanvas(width, height);
    const context = canvas.getContext("2d");

    // Profile Pic
    const imgData = await loadImage(img);
    drawRoundedImg(context, imgData);

    //Message Background
    context.beginPath();
    context.fillStyle = "#2a2233";
    context.roundRect(125, 0, width - 125, height, 25);
    context.fill();

    // User Name
    context.font = "20px LiberationMono";
    context.fillStyle = "#06cf9c";
    context.fillText(username, 175, 50);

    // Message Body
    context.fillStyle = "#ffffff";
    drawMultilineText(context, text, 175, 100);

    // Save canvas
    return canvas.toBuffer("image/png");
}

function drawRoundedImg(context, img) {
    context.drawImage(img, 0, 0, 100, 100);

    context.globalCompositeOperation = "destination-in";

    context.fillStyle = "#000";
    context.beginPath();
    context.arc(
        100 * 0.5, // x
        100 * 0.5, // y
        100 * 0.5, // radius
        0, // start angle
        2 * Math.PI // end angle
    );
    context.fill();

    // restore to default composite operation (is draw over current image)
    context.globalCompositeOperation = "source-over";
}

function drawMultilineText(context, text, x = 0, y = 0) {
    //Arr of words
    const wordsBreaks = text.split(" ");
    const words = [];
    wordsBreaks.forEach((item) => {
        if (item.search(/\n/) === -1) {
            words.push({
                word: item,
                break: false,
            });
        } else {
            const splitItem = item.split(/\n/);
            splitItem.forEach((part, i) => {
                words.push({
                    word: part,
                    break: i < splitItem.length - 1,
                });
            });
        }
    });

    // Actual coordinates for writing
    let pointerX = x;
    let pointerY = y;

    // Count of characters
    let lineSize = 0;

    // Max X and Y
    let final = {
        x,
        y,
    };

    words.forEach((item, i) => {
        let size = context.measureText(item.word + " ");
        context.fillText(item.word, pointerX, pointerY);
        pointerX += size.width;
        lineSize += item.word.length;

        if (final.x < pointerX) {
            final.x = pointerX;
        }

        if (lineSize > 40 || item.break) {
            pointerX = x;
            pointerY += context.measureText(" ").width * 2.5;
            lineSize = 0;
        }
    });

    final.y = pointerY;

    return final;
}

module.exports = createSticker;
