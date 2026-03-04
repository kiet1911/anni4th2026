//pigoen begin fly 
//take div
function animateBox() {
    const box = document.getElementById('bgletter');
    const startTop = 110;          // %
    const endTop = 30;             // %
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
    // console.log(envelope);
    envelope.style.opacity = 1;
    // photoss.style.opacity = 1;
    setTimeout(() => {
        envelope.classList.add('active');
        // Sau khi mở thư thì chạy typing effect
        setTimeout(() => {
            const text = "Gửi em Kim Ngân,\n\nHappy Anniversary 4th của tụi mình nha 😘, mới đây đã 4 năm rồi thời gian trôi thật nhanh nhớ những ngày đầu hai đứa còn ngại ngùng với nhau mà tới nay đã 4 năm rồi. Cùng nhau trải qua những lần cãi vả, vui có, buồn có nhưng cuối cùng chúng ta vẫn về với nhau. Cám ơn em vì đã kiên nhẫn và yêu thương anh. Dạ rồi nha, chúc em và anh luôn yêu thương nhau, cùng nhau phát triển, càng hiểu nhau thêm và nhường nhịn nhau hơn nữa nha. Chúc cả hai những năm sau vẫn luôn có nhau, anh yêu kim ngân của anh nhìu nhìu lắm nhóoo 😍🍰🌷";
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
        }, 10); // chờ animation mở thư xong
    }, 10);
}

//count before fly 
setTimeout(() => {
    animateBox();
    // letterActive();
}, 3000);

//letter heart animation 
// Thêm vào file beginAnimation.js hoặc tạo file mới
document.addEventListener('DOMContentLoaded', function () {
    const heartBtn = document.getElementById('btnHeart');
    const heartBump = document.getElementById('heart-seal-bump');
    const envelope = document.querySelector('.envelope');
    let pressTimer;
    let isPressing = false;

    // Tạo progress ring
    const progressRing = document.createElement('div');
    progressRing.className = 'progress-ring';
    const progress = document.createElement('div');
    progress.className = 'progress';
    progressRing.appendChild(progress);
    heartBtn.appendChild(progressRing);

    // Sự kiện khi bắt đầu nhấn
    heartBtn.addEventListener('mousedown', startPress);
    heartBtn.addEventListener('touchstart', startPress);

    // Sự kiện khi kết thúc nhấn
    heartBtn.addEventListener('mouseup', endPress);
    heartBtn.addEventListener('touchend', endPress);
    heartBtn.addEventListener('mouseleave', cancelPress);
    heartBtn.addEventListener('touchcancel', cancelPress);

    function startPress(e) {
        e.preventDefault();
        if (isPressing) return;

        isPressing = true;
        heartBtn.classList.add('pressing');

        heartBump.style.display = 'block';


        // Reset progress animation
        const progress = heartBtn.querySelector('.progress');
        progress.style.animation = 'none';
        progress.offsetHeight; // Trigger reflow
        progress.style.animation = 'progressFill 4s linear forwards';

        // Set timer để mở thiệp sau 4s
        pressTimer = setTimeout(() => {
            if (isPressing) {
                // Mở thiệp
                letterActive();

                // Hiệu ứng đặc biệt khi mở
                createHeartExplosion();

                // Ẩn nút heart
                setTimeout(() => {
                    heartBtn.style.opacity = '1';
                    heartBtn.style.zIndex = '1';
                    heartBtn.style.pointerEvents = 'none';
                }, 500);
            }
        }, 4000);
    }

    function endPress(e) {
        e.preventDefault();
        cancelPress();
    }

    function cancelPress() {
        if (!isPressing) return;

        isPressing = false;
        heartBtn.classList.remove('pressing');
        heartBump.style.display = 'none';
        clearTimeout(pressTimer);

        // Reset progress bar
        const progress = heartBtn.querySelector('.progress');
        progress.style.animation = 'none';
    }

    // Hiệu ứng nổ trái tim khi đủ 4s
    function createHeartExplosion() {
        for (let i = 0; i < 12; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'explosion-heart';
                heart.innerHTML = '❤️';
                heart.style.left = Math.random() * 100 + '%';
                heart.style.top = Math.random() * 100 + '%';
                heart.style.animation = `heartExplosion ${1 + Math.random()}s ease-out forwards`;
                heart.style.fontSize = (20 + Math.random() * 30) + 'px';
                heart.style.position = 'fixed';
                heart.style.zIndex = '100';
                heart.style.pointerEvents = 'none';
                document.body.appendChild(heart);

                setTimeout(() => {
                    heart.remove();
                }, 2000);
            }, i * 100);
        }
    }
});

// Thêm CSS cho hiệu ứng nổ
const style = document.createElement('style');
style.textContent = `
    @keyframes heartExplosion {
        0% {
            opacity: 1;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 0.8;
            transform: scale(1.5) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);


