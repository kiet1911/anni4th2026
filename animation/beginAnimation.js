//pigoen begin fly 
//take div
function animateBox() {
    const box = document.getElementById('bgletter');
    const startTop = 100;          // %
    const endTop = 25;             // %
    const duration = 5000;          // 1 giây
    const startTime = performance.now();

    function step(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1); // 0 → 1
        // Tính top hiện tại: từ start → end theo tỉ lệ progress
        const currentTop = startTop + (endTop - startTop) * progress;
        box.style.top = currentTop + '%';

        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}
//count before fly 
setTimeout(() => {
    animateBox();
}, 3000);
