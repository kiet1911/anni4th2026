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
//letter
function letterActive() {
    const envelope = document.querySelector('.envelope');
    // const photoss = document.querySelector('.frame-container');
    console.log(envelope);
    envelope.style.opacity = 1;
    document.body.opacity = 0.4;
    // photoss.style.opacity = 1;
    setTimeout(() => {
        envelope.classList.add('active');
        // Sau khi mở thư thì chạy typing effect
        setTimeout(() => {
            const text = "To my love Kim Ngân,\n\nHappy Birthday, cutie! May your cake be as sweet as you, and may your smile today shine brighter than all the candles. 🎂✨";
            const target = document.getElementById("letter-text");
            let i = 0;
            const speed = 50; // tốc độ chữ (ms)
            function typeWriter() {
                if (i < text.length) {
                    target.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, speed);
                }
            }
            typeWriter();
        }, 3000); // chờ animation mở thư xong
    }, 7000);
}



//count before fly 
setTimeout(() => {
    animateBox();
    // letterActive();
}, 3000);

//letter


