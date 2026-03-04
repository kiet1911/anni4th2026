const totalFrames = 4;
let currentFrame = 1;
const fps = 8; // 8–12 là đẹp với 4 frame
const frameDuration = 1000 / fps;
let lastTime = 0;

const img = document.getElementById("pigoen01Frame");

// preload trước
const frames = [];
for (let i = 1; i <= totalFrames; i++) {
  const image = new Image();
  image.src = `./img/pigoenL/pigoenL_${String(i).padStart(3,'0')}.png`;
  frames.push(image);
}

function animate(time) {
  if (time - lastTime >= frameDuration) {
    currentFrame++;
    if (currentFrame > totalFrames) currentFrame = 1;

    img.src = frames[currentFrame - 1].src;
    lastTime = time;
  }
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);