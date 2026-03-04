document.addEventListener("DOMContentLoaded", () => {

    const flowerElements = document.querySelectorAll(".flowerFrame");

    const flowerTotalFrames = 3;
    let flowerCurrentFrame = 1;
    let flowerDirection = 1;

    const flowerFps = 6;
    const flowerFrameDuration = 1000 / flowerFps;
    let flowerLastTime = 0;

    // preload 1 lần thôi
    const flowerFrames = [];
    for (let i = 1; i <= flowerTotalFrames; i++) {
        const img = new Image();
        img.src = `./img/flower/flower_${String(i).padStart(3,'0')}.png`;
        flowerFrames.push(img);
    }

    function animate(time) {

        if (time - flowerLastTime >= flowerFrameDuration) {

            flowerCurrentFrame += flowerDirection;

            if (
                flowerCurrentFrame === flowerTotalFrames ||
                flowerCurrentFrame === 1
            ) {
                flowerDirection *= -1;
            }

            // 🔥 update tất cả flower
            flowerElements.forEach(el => {
                el.src = flowerFrames[flowerCurrentFrame - 1].src;
            });

            flowerLastTime = time;
        }

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
});