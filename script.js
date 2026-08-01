document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const hero = document.getElementById("hero");
  const mainScene = document.getElementById("main-scene");
  const bgMusic = document.getElementById("bg-music");
  const heartBtn = document.getElementById("heart-btn");

  const typewriterElement = document.getElementById("typewriter-text");
  const messageText = "Estas flores jamás podrán compararse con lo hermosa que eres, pero quería regalarte un pequeño jardín que florezca cada vez que pienses en nosotros. ❤️";

  // Canvas y Estrellas
  const canvas = document.getElementById("sky-canvas");
  const ctx = canvas.getContext("2d");
  let width, height;

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  const stars = Array.from({ length: 100 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 2,
    alpha: Math.random(),
    speed: Math.random() * 0.02
  }));

  function animateSky() {
    ctx.clearRect(0, 0, width, height);
    stars.forEach(star => {
      star.alpha += star.speed;
      if (star.alpha > 1 || star.alpha < 0) star.speed = -star.speed;
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(star.alpha)})`;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(animateSky);
  }
  animateSky();

  // Función para crear tulipanes
  function growGarden() {
    const garden = document.getElementById("garden-container");
    garden.innerHTML = "";
    const numberOfTulips = 5;

    for (let i = 0; i < numberOfTulips; i++) {
      const tulip = document.createElement("div");
      tulip.className = "tulip";
      tulip.style.animationDelay = `${i * 0.3}s`;
      tulip.innerHTML = `
        <div class="tulip-flower"></div>
        <div class="tulip-stem"></div>
      `;
      garden.appendChild(tulip);
    }
  }

  // Al hacer clic en "Ábrelo ❤️"
  startBtn.addEventListener("click", () => {
    bgMusic.play().catch(err => console.log("Audio requiere interacción previa:", err));
    hero.classList.add("fade-out");

    setTimeout(() => {
      hero.style.display = "none";
      mainScene.classList.remove("hidden");

      // 1. Crecen tulipanes
      growGarden();

      // 2. Aparece la carta (3.5 seg)
      setTimeout(() => {
        const msgBox = document.getElementById("typewriter-container");
        msgBox.classList.add("show-element");
        startTypewriter();
      }, 3500);

      // 3. Aparecen fotos (8.5 seg)
      setTimeout(() => {
        document.getElementById("photos-section").classList.add("show-element");
      }, 8500);

      // 4. Aparece el corazón y la propuesta (11 seg)
      setTimeout(() => {
        document.getElementById("heart-section").classList.add("show-element");
        document.getElementById("final-section").classList.add("show-element");
      }, 11000);

    }, 1500);
  });

  // Efecto Máquina de Escribir
  function startTypewriter() {
    let index = 0;
    typewriterElement.textContent = "";
    const timer = setInterval(() => {
      if (index < messageText.length) {
        typewriterElement.textContent += messageText.charAt(index);
        index++;
      } else {
        clearInterval(timer);
      }
    }, 45);
  }

  // Click en corazón
  heartBtn.addEventListener("click", () => {
    alert("¡Eres mi persona favorita en todo el universo! 💖✨");
    createPetalBurst();
  });

  function createPetalBurst() {
    for (let i = 0; i < 25; i++) {
      const petal = document.createElement("div");
      petal.innerHTML = "🌸";
      petal.className = "falling-petal";
      petal.style.left = Math.random() * 100 + "vw";
      petal.style.fontSize = Math.random() * 20 + 15 + "px";
      petal.style.animationDuration = (Math.random() * 2 + 2) + "s";
      document.body.appendChild(petal);
      setTimeout(() => petal.remove(), 4000);
    }
  }

  // Lógica Botones Aceptar / Rechazar
  const acceptBtn = document.getElementById("accept-btn");
  const rejectBtn = document.getElementById("reject-btn");
  const proposalButtons = document.getElementById("proposal-buttons");
  const celebrationMessage = document.getElementById("celebration-message");

  let rejectClicks = 0;

  rejectBtn.addEventListener("click", () => {
    rejectClicks++;

    if (rejectClicks <= 4) {
      const acceptScale = 1 + (rejectClicks * 0.35);
      const acceptFontSize = 1.1 + (rejectClicks * 0.2);
      acceptBtn.style.transform = `scale(${acceptScale})`;
      acceptBtn.style.fontSize = `${acceptFontSize}rem`;

      const rejectScale = 1 - (rejectClicks * 0.18);
      const rejectFontSize = 1.1 - (rejectClicks * 0.15);
      rejectBtn.style.transform = `scale(${rejectScale})`;
      rejectBtn.style.fontSize = `${rejectFontSize}rem`;
    } else {
      rejectClicks = 0;
      acceptBtn.style.transform = "scale(1)";
      acceptBtn.style.fontSize = "1.1rem";
      rejectBtn.style.transform = "scale(1)";
      rejectBtn.style.fontSize = "1.1rem";
    }
  });

  acceptBtn.addEventListener("click", () => {
    proposalButtons.style.display = "none";
    celebrationMessage.classList.remove("hidden-element");
    celebrationMessage.classList.add("show-element");
    startInfinitePetals();
  });

  function startInfinitePetals() {
    const petals = ["🌸", "🌺", "🌷", "💖"];
    setInterval(() => {
      const petal = document.createElement("div");
      petal.className = "falling-petal";
      petal.textContent = petals[Math.floor(Math.random() * petals.length)];
      petal.style.left = Math.random() * 100 + "vw";
      petal.style.fontSize = Math.random() * 15 + 15 + "px";
      
      const duration = Math.random() * 3 + 3;
      petal.style.animationDuration = duration + "s";

      document.body.appendChild(petal);
      setTimeout(() => petal.remove(), duration * 1000);
    }, 250);
  }
});
