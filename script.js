const imageFileInput = document.querySelector("#imageFileInput");
const canvas = document.querySelector("#meme");
const topTextInput = document.querySelector("#topTextInput");
const bottomTextInput = document.querySelector("#bottomTextInput");

let image;

imageFileInput.addEventListener("change", (e) => {
    const imageDataUrl = URL.createObjectURL(e.target.files[0]);

    image = new Image();
    image.src = imageDataUrl;

    image.addEventListener("load", () => {
        updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value);
    }, { once: true });
});
const downloadBtn = document.querySelector("#downloadMeme");

downloadBtn.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "meme.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
});

topTextInput.addEventListener("input", () => {
    updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value);
});

bottomTextInput.addEventListener("input", () => {
    updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value);
});

function updateMemeCanvas(canvas, image, topText, bottomText) {
    if (!image) return;
    
    const ctx = canvas.getContext("2d");
    const maxWidth = 400; // Max width for meme
    const scaleFactor = maxWidth / image.width;
    const width = image.width * scaleFactor;
    const height = image.height * scaleFactor;
    const fontSize = Math.floor(width / 10);
    const yOffset = height / 25;

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, 0, 0, width, height);

    ctx.strokeStyle = "black";
    ctx.lineWidth = Math.floor(fontSize / 4);
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.lineJoin = "round";
    ctx.font = `${fontSize}px Impact, sans-serif`;

    ctx.textBaseline = "top";
    ctx.strokeText(topText, width / 2, yOffset);
    ctx.fillText(topText, width / 2, yOffset);

    ctx.textBaseline = "bottom";
    ctx.strokeText(bottomText, width / 2, height - yOffset);
    ctx.fillText(bottomText, width / 2, height - yOffset);
}
