document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const hero = document.getElementById("hero");
  const mainScene = document.getElementById("main-scene");
  const bgMusic = document.getElementById("bg-music");
  const heartBtn = document.getElementById("heart-btn");
  
  // Texto máquina de escribir
  const messageText = "Estas flores jamás podrán compararse con lo hermosa que eres, pero quería regalarte un pequeño jardín que florezca cada vez que pienses en nosotros. ❤️";
  const typewriterElement = document.getElementById("typewriter-text");

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

  // Partículas para el fondo
  const stars = Array.from({ length: 120 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 2,
    alpha: Math.random(),
    speed: Math.random() * 0.02
  }));

  function animateSky() {
    ctx.clearRect(0, 0, width, height);

    // Dibujar estrellas titilantes
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

  // Acción del Botón Inicial
  startBtn.addEventListener("click", () => {
    // Intentar reproducir música
    bgMusic.play().catch(err => console.log("Audio requiere interacción previa:", err));

    // Transición de salida
    hero.classList.add("fade-out");
    
    setTimeout(() => {
      hero.style.display = "none";
      mainScene.classList.remove("hidden");
      startTypewriter();
    }, 1500);
  });

  // Animación Máquina de Escribir
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
    }, 50);
  }

  // Sorpresa al hacer clic en el corazón
  heartBtn.addEventListener("click", () => {
    alert("¡Eres mi persona favorita en todo el universo! 💖✨");
    createPetalBurst();
  });

  // Ráfaga de pétalos/flores sencillas
  function createPetalBurst() {
    for (let i = 0; i < 30; i++) {
      const petal = document.createElement("div");
      petal.innerHTML = "🌸";
      petal.style.position = "fixed";
      petal.style.left = Math.random() * 100 + "vw";
      petal.style.top = "-20px";
      petal.style.fontSize = Math.random() * 20 + 15 + "px";
      petal.style.zIndex = "99";
      petal.style.transition = `transform ${Math.random() * 3 + 2}s linear, top ${Math.random() * 3 + 2}s linear`;
      
      document.body.appendChild(petal);

      setTimeout(() => {
        petal.style.top = "105vh";
        petal.style.transform = `rotate(${Math.random() * 360}deg)`;
      }, 50);

      setTimeout(() => petal.remove(), 5000);
    }
  }
});
