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
    const buttonSc = document.getElementById('switchPhase');
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
                else {
                    buttonSc.style.display = 'block';
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
// Thêm vào file beginAnimation.js hoặc tạo file mới
document.addEventListener('DOMContentLoaded', function () {
    const heartBtn = document.getElementById('btnHeart');
    const heartBump = document.getElementById('heart-seal-bump');
    const envelope = document.querySelector('.envelope');
    const buttonSc = document.getElementById('switchPhase');
    let pressTimer;
    let isPressing = false;

    // TẠO AUDIO ELEMENT
    const pressSound = new Audio();
    pressSound.src = "/anni4th2026/audio/heartSound.mp3"; // Thay bằng file audio của bạn
    pressSound.volume = 1;
    pressSound.loop = true; // Lặp lại khi đang nhấn giữ

    // Hoặc dùng file local
    // const pressSound = new Audio('./audio/press-sound.mp3');

    // Tạo âm thanh nổ khi mở thiệp
    const explosionSound = new Audio();
    explosionSound.src = '/anni4th2026/audio/pageSound.mp3';
    explosionSound.volume = 1;

    //sound chạy khi mở trang 
    const romaticSound = new Audio();
    romaticSound.src = '/anni4th2026/audio/Perfect.mp3'
    romaticSound.volume = 1;

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

    buttonSc.addEventListener('click', () => {
        console.log("hdkajhskd");
    })

    function startPress(e) {
        e.preventDefault();
        if (isPressing) return;

        isPressing = true;
        heartBtn.classList.add('pressing');
        heartBump.style.display = 'block';

        // PHÁT AUDIO KHI BẮT ĐẦU NHẤN GIỮ
        playPressSound();

        // Reset progress animation
        const progress = heartBtn.querySelector('.progress');
        progress.style.animation = 'none';
        progress.offsetHeight; // Trigger reflow
        progress.style.animation = 'progressFill 4s linear forwards';

        // Set timer để mở thiệp sau 4s
        pressTimer = setTimeout(() => {
            if (isPressing) {
                // Dừng âm thanh nhấn giữ
                stopPressSound();

                // Phát âm thanh nổ
                playExplosionSound();

                // Mở thiệp
                letterActive();

                // Hiệu ứng đặc biệt khi mở
                createHeartExplosion();

                //
                playRomaticSound();

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

        // DỪNG AUDIO KHI KẾT THÚC NHẤN
        stopPressSound();

        // Reset progress bar
        const progress = heartBtn.querySelector('.progress');
        progress.style.animation = 'none';
    }

    // Hàm phát âm thanh khi nhấn giữ
    function playPressSound() {
        pressSound.currentTime = 0; // Reset về đầu
        pressSound.play().catch(error => {
            console.log('Không thể phát audio:', error);
            // Fallback: tạo âm thanh đơn giản nếu không phát được file
            createBeepSound();
        });
    }

    function playRomaticSound() {
        romaticSound.currentTime = 0;

        romaticSound.play().catch(error => {
            console.log('Không thể phát audio:', error);
        })
    }

    // Hàm dừng âm thanh nhấn giữ
    function stopPressSound() {
        pressSound.pause();
        pressSound.currentTime = 0;
    }

    // Hàm phát âm thanh nổ
    function playExplosionSound() {
        explosionSound.currentTime = 0;
        explosionSound.play().catch(error => console.log('Không thể phát âm thanh nổ:', error));
    }

    // Fallback: tạo âm thanh beep đơn giản bằng Web Audio API
    function createBeepSound() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.value = 800;
        gainNode.gain.value = 0.1;

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.start();
        oscillator.stop(0.1);
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


document.addEventListener("DOMContentLoaded", function () {

    const switchBtn = document.getElementById("switchPhase");

    switchBtn.addEventListener("click", () => {

        // Fade mượt
        document.body.style.transition = "opacity 1s ease";
        document.body.style.opacity = "0";

        setTimeout(() => {

            // Xóa Phase 1
            document.querySelector(".bgletter")?.remove();
            document.querySelector(".second-bg")?.remove();
            switchBtn.remove();

            document.body.style.opacity = "1";
            document.body.style.background = "black";
            document.body.style.margin = "0";
            document.body.style.overflow = "hidden";

            startGalaxyPhase();

        }, 1000);
    });

});
function waitForAllTextures(textures, callback) {
    let loadedCount = 0;
    const totalTextures = textures.length;

    textures.forEach((texture, index) => {
        if (texture.image && texture.image.complete) {
            loadedCount++;
            if (loadedCount === totalTextures) {
                callback();
            }
        } else {
            texture.addEventListener('load', () => {
                loadedCount++;
                if (loadedCount === totalTextures) {
                    callback();
                }
            });

            texture.addEventListener('error', () => {
                // Nếu lỗi vẫn tính là đã load để không bị treo
                loadedCount++;
                if (loadedCount === totalTextures) {
                    callback();
                }
            });
        }
    });
}
function startGalaxyPhase() {

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js";

    script.onload = () => {

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            5000
        );
        camera.position.z = 15;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        document.body.appendChild(renderer.domElement);

        scene.add(new THREE.AmbientLight(0xffffff, 1));

        /* =================================
           🌌 STAR PARTICLE BACKGROUND
        ================================= */

        const starGeometry = new THREE.BufferGeometry();
        const starCount = 4000;
        const positions = new Float32Array(starCount * 3);

        for (let i = 0; i < starCount; i++) {
            const r = 1000;
            positions[i * 3] = (Math.random() - 0.5) * r;
            positions[i * 3 + 1] = (Math.random() - 0.5) * r;
            positions[i * 3 + 2] = (Math.random() - 0.5) * r;
        }

        starGeometry.setAttribute(
            "position",
            new THREE.BufferAttribute(positions, 3)
        );

        const starMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 1.2,
            sizeAttenuation: true
        });

        const stars = new THREE.Points(starGeometry, starMaterial);
        scene.add(stars);

        /* =================================
           🌍 GLOBE GRID
        ================================= */

        const radius = 3;
        const latSegments = 5;
        const lonSegments = 10;

        const loadingManager = new THREE.LoadingManager();
        const loader = new THREE.TextureLoader(loadingManager);

        const globeGroup = new THREE.Group();
        scene.add(globeGroup);

        let sphereTiles = [];
        let galaxyTiles = [];

        let exploded = false;
        let transitionTime = 0;
        const transitionDuration = 2;

        const TOTAL_IMAGES = 53;

        for (let lat = 0; lat < latSegments; lat++) {
            for (let lon = 0; lon < lonSegments; lon++) {

                const index = (lat * lonSegments + lon) % TOTAL_IMAGES;
                const texture = loader.load(`/anni4th2026/imgWe/we${index}.webp`);

                texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
                texture.minFilter = THREE.LinearMipmapLinearFilter;
                texture.magFilter = THREE.LinearFilter;

                const phiStart = (lat / latSegments) * Math.PI;
                const phiLength = Math.PI / latSegments;

                const thetaStart = (lon / lonSegments) * Math.PI * 2;
                const thetaLength = (Math.PI * 2) / lonSegments;

                const geometry = new THREE.SphereGeometry(
                    radius,
                    16, 16,
                    thetaStart, thetaLength,
                    phiStart, phiLength
                );

                const material = new THREE.MeshBasicMaterial({
                    map: texture,
                    transparent: true,
                    opacity: 1
                });

                const tile = new THREE.Mesh(geometry, material);
                globeGroup.add(tile);
                sphereTiles.push(tile);
            }
        }

        /* =================================
           ⏳ WAIT ALL TEXTURES LOADED
        ================================= */

        loadingManager.onLoad = () => {

            console.log("✅ All textures loaded");

            // Chờ thêm 4 giây sau khi load xong
            setTimeout(() => {

                exploded = true;
                const layers = 6;

                sphereTiles.forEach((tile, index) => {

                    const texture = tile.material.map;

                    const worldPos = new THREE.Vector3();
                    tile.getWorldPosition(worldPos);

                    const direction = worldPos.clone().normalize();

                    const plane = new THREE.Mesh(
                        new THREE.PlaneGeometry(1.1, 1.1),
                        new THREE.MeshBasicMaterial({
                            map: texture,
                            side: THREE.DoubleSide,
                            transparent: true,
                            opacity: 1
                        })
                    );

                    plane.position.copy(worldPos);

                    plane.quaternion.setFromUnitVectors(
                        new THREE.Vector3(0, 0, 1),
                        direction
                    );

                    const layer = index % layers;
                    const baseAngle = (index * 0.05) % (Math.PI * 2);

                    plane.userData = {
                        angle: baseAngle,
                        speed: 0.0005 + (layer * 0.0003),
                        radius: 5 + layer * 1.5,
                        height: (layer - layers / 2) * 1.5,
                        direction: direction,
                        rotationSpeed: new THREE.Vector3(
                            (Math.random() - 0.5) * 0.1,
                            (Math.random() - 0.5) * 0.1,
                            (Math.random() - 0.5) * 0.1
                        ),
                        originalPos: worldPos.clone(),
                        phase: Math.random() * Math.PI * 2
                    };

                    scene.add(plane);
                    galaxyTiles.push(plane);
                });

                scene.remove(globeGroup);

            }, 4000);
        };

        /* =================================
           🎬 ANIMATION LOOP
        ================================= */

        function animate() {
            requestAnimationFrame(animate);

            stars.rotation.y += 0.0003;

            if (!exploded) {
                globeGroup.rotation.y += 0.002;
            }
            else {

                if (transitionTime < transitionDuration) {

                    transitionTime += 0.016;
                    let t = transitionTime / transitionDuration;
                    if (t > 1) t = 1;

                    galaxyTiles.forEach(tile => {

                        const dir = tile.userData.direction;
                        const distance = t * 3;

                        tile.position.x = tile.userData.originalPos.x + dir.x * distance;
                        tile.position.y = tile.userData.originalPos.y + dir.y * distance;
                        tile.position.z = tile.userData.originalPos.z + dir.z * distance;

                        tile.rotation.x += tile.userData.rotationSpeed.x;
                        tile.rotation.y += tile.userData.rotationSpeed.y;
                    });

                    camera.position.z = 12 + t * 4;
                }
                else {

                    galaxyTiles.forEach(tile => {

                        tile.userData.angle += tile.userData.speed;

                        const r = tile.userData.radius;
                        const a = tile.userData.angle;

                        tile.position.x = Math.cos(a) * r;
                        tile.position.z = Math.sin(a) * r;
                        tile.position.y = tile.userData.height +
                            Math.sin(a * 2 + tile.userData.phase) * 1.2;

                        tile.lookAt(0, 0, 0);
                    });
                }
            }

            renderer.render(scene, camera);
        }

        animate();

        window.addEventListener("resize", () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    };

    document.head.appendChild(script);
}