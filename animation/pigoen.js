const totalFrames = 4;
let currentFrame = 1;
const fps = 8; // 8–12 là đẹp với 4 frame
const frameDuration = 1000 / fps;
let lastTime = 0;

const img = document.getElementById("pigoen01Frame");
const img2 = document.getElementById("pigoen02Frame");
// preload trước
const frames = [];
const frames2 = [];
for (let i = 1; i <= totalFrames; i++) {
    const image = new Image();
    const image2 = new Image();
    image.src = `./img/pigoenL/pigoenL_${String(i).padStart(3, '0')}.png`;
    image2.src = `./img/pigoenR/pigoenR_${String(i).padStart(3, '0')}.png`;
    frames.push(image);
    frames2.push(image2);
}

function animate(time) {
    if (time - lastTime >= frameDuration) {
        currentFrame++;
        if (currentFrame > totalFrames) currentFrame = 1;

        img.src = frames[currentFrame - 1].src;
        img2.src = frames2[currentFrame-1].src;
        lastTime = time;
    }
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);