// ===================== POPUP 1: LỚP PHỦ CHO HỘP QUÀ VÀ ẢNH RANDOM =====================
let firstClickGift = true;
let isLetterShown = false; // Biến mới để kiểm soát đã mở thư chưa

// === THAY ĐỔI: Sử dụng số lượng ảnh để tạo danh sách ===
let currentImageIndex = 0;
const NUMBER_OF_IMAGES = 9; // <--- CHỈ CẦN THAY ĐỔI SỐ NÀY
// Hàm tạo danh sách ảnh: ["images/a1.png", "images/a2.png", ...]
const randomImages = Array.from(
    { length: NUMBER_OF_IMAGES },
    (_, i) => `images/a${i + 1}.jpg`
);
// =================================================================

const popupLayer = document.createElement("div");
popupLayer.style.cssText = `
  position: fixed;
  inset: 0;
  display: none;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
  z-index: 999999;
  flex-direction: column;
`;
document.body.appendChild(popupLayer);

const popupImg = document.createElement("img");
popupImg.style.cssText = `
  width: 260px;
  border-radius: 14px;
  transition: 0.4s ease;
  cursor: pointer;
  box-shadow: 0 0 20px rgba(255,255,255,0.6);
`;
popupLayer.appendChild(popupImg);

const popupText = document.createElement("div");
popupText.style.cssText = `
  margin-top: 20px;
  color: white;
  font-size: 1.2rem;
  width: 80%;
  text-align: center;
  opacity: 0;
  transition: 0.5s ease;
`;
popupLayer.appendChild(popupText);

// ===================== POPUP 2: NỀN GIẤY TRẮNG VÀ NÚT ĐÓNG (THƯ) =====================
// Các biến cần thiết cho popup nền trắng (Sẽ được tạo sau khi thư bay ra)
const giftPopup = document.createElement("div");
giftPopup.className = "gift-popup";
document.body.appendChild(giftPopup);

const giftPopupContent = document.createElement("p");
const closeBtn = document.createElement("button");
closeBtn.className = "popup-close-btn";
closeBtn.innerHTML = "&times;"; // Dấu X
closeBtn.onclick = () => {
    giftPopup.style.display = "none";
};

// Hàm hiển thị thư nền trắng
function showGiftMessage(message) {
    // Ẩn Popup 1 (Hộp quà/Ảnh)
    popupLayer.style.display = "none";

    giftPopup.innerHTML = ""; // Xóa nội dung cũ

    // Thêm nút đóng
    giftPopup.appendChild(closeBtn);

    // Thêm nội dung thư
    giftPopupContent.innerHTML = message;
    giftPopup.appendChild(giftPopupContent);

    // Hiển thị popup 2 (Thư nền trắng)
    giftPopup.style.display = "block";
    isLetterShown = true; // Đánh dấu đã mở thư lần đầu
}

// ===================== FLYING LETTER (Giữ nguyên) =====================
function flyingLetter() {
    const letter = document.createElement("div");
    letter.innerText = "✉️";
    letter.style.cssText = `
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 2.8rem;
    opacity: 1;
    transition: 1.2s ease-out;
    z-index: 999999;
  `;
    document.body.appendChild(letter);

    setTimeout(() => {
        letter.style.transform = "translate(-50%, -200%) rotate(-25deg)";
        letter.style.opacity = "0";
    }, 50);

    setTimeout(() => letter.remove(), 1500);
}

const fallingAssets = [
    {
        src: "https://firebasestorage.googleapis.com/v0/b/webai-54992.appspot.com/o/Gift_Flat_Icon_Vector.svg?alt=media&token=8bb72a2d-183c-462b-a1b8-e42af9bf52e0",
        width: 80,
        height: 80,
    },
    { src: "images/b1.png", width: 150, height: 150 },
    { src: "images/b2.png", width: 200, height: 200 },
    { src: "images/b3.png", width: 100, height: 100 },
    { src: "images/b4.png", width: 150, height: 150 },
    { src: "images/b5.png", width: 100, height: 100 },
];

function createStars() {
    const starsContainer = document.querySelector(".snow-container");
    const numberOfStars = 100;

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement("div");
        star.classList.add("star");
        star.style.left = Math.random() * 100 + "%";
        star.style.top = Math.random() * 60 + "%"; // Chỉ ở nửa trên màn hình
        star.style.animationDelay = Math.random() * 2 + "s";
        starsContainer.appendChild(star);
    }
}

// Gọi hàm tạo sao khi trang web load
createStars();

function createSnow() {
    const snowContainer = document.querySelector(".snow-container");
    const snow = document.createElement("div");
    snow.classList.add("snow");

    // Vị trí ngẫu nhiên theo chiều ngang
    snow.style.left = Math.random() * 100 + "%";

    // Tốc độ rơi và kích thước ngẫu nhiên
    const duration = Math.random() * 5 + 8;
    const size = Math.random() * 3 + 2;

    snow.style.width = size + "px";
    snow.style.height = size + "px";
    snow.style.opacity = Math.random() * 0.7 + 0.3;

    // Thêm animation
    snow.style.animation = `fall ${duration}s linear`;

    snowContainer.appendChild(snow);

    // Xóa bông tuyết sau khi rơi xong
    setTimeout(() => {
        snow.remove();
    }, duration * 1000);
}

// Cập nhật keyframes animation
const style = document.createElement("style");
style.textContent = `
  @keyframes fall {
    from {
      transform: translateY(-10px);
    }
    to {
      transform: translateY(100vh);
    }
  }
  
  @keyframes sway {
    from {
      transform: translateX(-15px);
    }
    to {
      transform: translateX(15px);
    }
  }
`;
document.head.appendChild(style);

// Tạo tuyết với tần suất thấp hơn
setInterval(createSnow, 200);

// Thêm vào cuối file
const musicBtn = document.querySelector(".music-toggle");
const audio = document.getElementById("bgMusic");

musicBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        musicBtn.textContent = "🔊";
    } else {
        audio.pause();
        musicBtn.textContent = "🔈";
    }
});

// Thêm hiệu ứng di chuyển cho ông già Noel
function moveSanta() {
    const santaContainer = document.querySelector(".santa-container");

    // Reset vị trí khi ông già Noel bay ra khỏi màn hình
    setInterval(() => {
        const rect = santaContainer.getBoundingClientRect();
        if (rect.left > window.innerWidth) {
            santaContainer.style.left = "-200px";
        }
    }, 100);
}

// Gọi hàm di chuyển ông già Noel
moveSanta();

// Thêm hiệu ứng quà rơi
function createGift() {
    const gift = document.createElement("div");
    gift.classList.add("gift");

    const asset =
        fallingAssets[Math.floor(Math.random() * fallingAssets.length)];
    gift.style.backgroundImage = `url('${asset.src}')`;
    const assetWidth = asset.width || 50;
    const assetHeight = asset.height || assetWidth;
    gift.style.width = `${assetWidth}px`;
    gift.style.height = `${assetHeight}px`;

    // Vị trí ngẫu nhiên theo chiều ngang
    const randomX = Math.random() * (window.innerWidth - assetWidth);
    gift.style.left = randomX + "px";
    gift.style.top = "-50px";

    const message =
        "Giáng Sinh năm nay đến nhẹ nhàng như những bông tuyết rơi, và anh chỉ muốn nói rằng em chính là điều ấm áp nhất mùa đông của anh... Yêu em nhiều ♥";

    gift.addEventListener("click", () => {
        popupLayer.style.display = "flex";

        // --- LOGIC MỚI: HIỂN THỊ ẢNH THEO THỨ TỰ ---

        if (isLetterShown) {
            // Lần 3 trở đi: Chỉ hiện ảnh theo thứ tự (currentImageIndex)
            popupText.style.opacity = 0;

            // 1. Chọn ảnh theo thứ tự và gán vào popupImg
            popupImg.src = randomImages[currentImageIndex];
            popupImg.style.opacity = 1;

            // 2. Chuyển sang ảnh kế tiếp (vòng lặp)
            currentImageIndex = (currentImageIndex + 1) % randomImages.length;

            // 3. Tự động ẩn Popup 1 sau 2.5 giây
            setTimeout(() => {
                popupLayer.style.display = "none";
            }, 2500); // Đã thay đổi thành 2500ms (2.5 giây)
        } else if (firstClickGift) {
            // Lần 1: Hiện hộp đóng (close.png)
            popupImg.src = "images/close.png";
            popupImg.style.opacity = 1;
            popupText.style.opacity = 0; // Ẩn text ban đầu
            firstClickGift = false; // Chuyển sang trạng thái click thứ 2 (mở hộp)
        }

        // Xóa quà sau khi click
        gift.remove();
    });

    document.body.appendChild(gift);

    // Animation rơi mượt mà hơn
    let pos = -50;
    let speed = 1;
    const maxSpeed = 3;
    const acceleration = 0.05;

    const fall = setInterval(() => {
        speed = Math.min(speed + acceleration, maxSpeed);
        pos += speed;
        gift.style.top = pos + "px";

        // Kiểm tra va chạm với đáy màn hình
        if (pos > window.innerHeight) {
            clearInterval(fall);
            gift.remove();
        }
    }, 20);
}

// Giảm tần suất tạo quà
setInterval(createGift, 3000); // 8 giây một lần

function addTreeLights() {
    const tree = document.querySelector(".tree");
    const colors = ["#ff0", "#f00", "#0f0", "#00f", "#ff0"];

    for (let i = 0; i < 20; i++) {
        const light = document.createElement("div");
        light.classList.add("light");
        light.style.background =
            colors[Math.floor(Math.random() * colors.length)];
        light.style.left = Math.random() * 100 + "%";
        light.style.top = Math.random() * 100 + "%";
        light.style.animationDelay = Math.random() * 2 + "s";
        tree.appendChild(light);
    }
}

function updateCountdown() {
    const christmas = new Date(new Date().getFullYear(), 11, 25);
    const now = new Date();
    const diff = christmas - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days
        .toString()
        .padStart(2, "0");
    document.getElementById("hours").textContent = hours
        .toString()
        .padStart(2, "0");
    document.getElementById("minutes").textContent = minutes
        .toString()
        .padStart(2, "0");
    document.getElementById("seconds").textContent = seconds
        .toString()
        .padStart(2, "0");
}

setInterval(updateCountdown, 1000);

function animateClouds() {
    const clouds = document.querySelectorAll(".cloud");
    clouds.forEach((cloud, index) => {
        cloud.style.animation = `float ${15 + index * 2}s linear infinite`;
        cloud.style.top = `${index * 15}%`;
    });
}

function createFirework(x, y) {
    const colors = ["#ff0", "#ff4", "#4ff", "#f4f", "#4f4"];
    const particles = 30;
    const container = document.querySelector(".fireworks-container");

    const containerRect = container.getBoundingClientRect();
    y = Math.min(y, containerRect.height);

    for (let i = 0; i < particles; i++) {
        const particle = document.createElement("div");
        particle.className = "firework-particle";
        particle.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];

        const angle = (i * 360) / particles;
        const velocity = 2 + Math.random() * 2;

        particle.style.left = x + "px";
        particle.style.top = y + "px";

        container.appendChild(particle);

        const rad = (angle * Math.PI) / 180;
        const vx = Math.cos(rad) * velocity;
        const vy = Math.sin(rad) * velocity;

        let posX = x;
        let posY = y;

        const animate = () => {
            posX += vx;
            posY += vy;

            if (
                posX < 0 ||
                posX > containerRect.width ||
                posY < 0 ||
                posY > containerRect.height
            ) {
                particle.remove();
                return;
            }

            particle.style.left = posX + "px";
            particle.style.top = posY + "px";

            requestAnimationFrame(animate);
        };

        animate();
    }
}

function createParticle(e) {
    const particle = document.createElement("div");
    particle.className = "mouse-particle";
    particle.style.left = e.pageX + "px";
    particle.style.top = e.pageY + "px";
    document.body.appendChild(particle);

    setTimeout(() => particle.remove(), 1000);
}

function addTreeInteraction() {
    const tree = document.querySelector(".tree");
    const bells = document.querySelectorAll(".bell");

    tree.addEventListener("click", () => {
        tree.classList.add("shake");

        bells.forEach((bell) => {
            bell.style.animation = "none";
            bell.offsetHeight;
            bell.style.animation = "bellRing 0.5s";
        });

        setTimeout(() => {
            tree.classList.remove("shake");
            bells.forEach((bell) => {
                bell.style.animation = "bellRing 2s infinite";
            });
        }, 500);
    });
}

function decorateTree() {
    const tree = document.querySelector(".tree");
    const bellPositions = [
        { left: "40%", top: "20%" },
        { right: "20%", top: "40%" },
        { left: "30%", top: "60%" },
        { right: "25%", top: "70%" },
    ];

    bellPositions.forEach((pos) => {
        const bell = document.createElement("div");
        bell.className = "bell";
        Object.assign(bell.style, pos);
        tree.appendChild(bell);
    });

    const colors = ["red", "gold", "silver"];
    const numOrnaments = 30;

    for (let i = 0; i < numOrnaments; i++) {
        const ornament = document.createElement("div");
        ornament.className = `ornament ${
            colors[Math.floor(Math.random() * colors.length)]
        }`;

        const left = 20 + Math.random() * 60;
        const top = 15 + Math.random() * 75;

        ornament.style.left = `${left}%`;
        ornament.style.top = `${top}%`;

        tree.appendChild(ornament);
    }

    const lights = 30;
    for (let i = 0; i < lights; i++) {
        const light = document.createElement("div");
        light.className = "light";
        light.style.left = `${Math.random() * 100}%`;
        light.style.top = `${Math.random() * 100}%`;
        light.style.animationDelay = `${Math.random() * 2}s`;
        light.style.background = `hsl(${Math.random() * 360}, 100%, 70%)`;
        tree.appendChild(light);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const treeImage = document.querySelector(".tree img");

    if (treeImage && treeImage.complete) {
        decorateTree();
        addTreeLights();
    } else if (treeImage) {
        treeImage.addEventListener("load", () => {
            decorateTree();
            addTreeLights();
        });
    }

    animateClouds();
    addTreeInteraction();

    document.addEventListener("click", (e) => {
        if (
            e.target.closest(".gift-popup") ||
            e.target.closest(".music-toggle") ||
            e.target.closest(".tiktok-logo")
        ) {
            return;
        }
        createFirework(e.pageX, e.pageY);
        createParticle(e);
    });

    document.addEventListener("mousemove", (e) => {
        if (Math.random() < 0.1) {
            createParticle(e);
        }
    });
});

// Logic xử lý click vào ảnh popup (popupImg)
popupImg.addEventListener("click", () => {
    const message = `Merry ChristmaS...
Là ngày lễ giáng sinh, anh mong mọi điều tốt đẹp sẽ đến với em.
Cầu cho em người gái anh thương lúc nào cũng hạnh phúc, luôn nở nụ cười thật tươi nhé.
Chúc em một mùa giáng sinh an lành, hạnh phúc ấm áp bên gia đình và bên anh nhé.`;


    // Đây là lần click thứ hai: chuyển từ close.png sang hopopen.png, bay thư, và hiện nội dung nền trắng
    if (!isLetterShown) {
        // 1. Chuyển ảnh (close.png -> hopopen.png)
        popupImg.style.opacity = 0;

        setTimeout(() => {
            popupImg.src = "images/hopopen.png";
            popupImg.style.opacity = 1;

            // 2. Thư bay
            flyingLetter();

            // 3. Hiển thị nội dung thư nền trắng sau 500ms để hiệu ứng thư bay rõ hơn
            setTimeout(() => {
                showGiftMessage(message);
            }, 500);
        }, 300);
    }

    // Các lần click sau đó: KHÔNG LÀM GÌ, loại bỏ việc đóng popup thủ công theo yêu cầu của người dùng.
    else {
        // KHÔNG CÓ LỆNH ĐÓNG POPUP NÀO Ở ĐÂY
        return; // Đảm bảo không có hành động nào khác xảy ra.
    }
});
