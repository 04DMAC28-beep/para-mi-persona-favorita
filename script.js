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
/* Ocultar elementos antes de su turno */
.hidden-element {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 1.5s ease, transform 1.5s ease;
  pointer-events: none;
}

/* Mostrar elementos con animación suave */
.show-element {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

/* --- DIBUJO Y ANIMACIÓN DE TULIPANES --- */
#garden-container {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 15px;
  height: 220px;
  width: 100%;
  margin-top: 20px;
}

.tulip {
  display: flex;
  flex-direction: column;
  align-items: center;
  transform-origin: bottom center;
  animation: growTulip 2.5s ease-out forwards;
}

.tulip-flower {
  width: 35px;
  height: 45px;
  background: linear-gradient(to top, #ff4b2b, #ff758c);
  border-radius: 50% 50% 45% 45%;
  position: relative;
  box-shadow: 0 0 10px rgba(255, 75, 43, 0.5);
  transform: scale(0);
  animation: bloom 1.5s 1.8s ease-out forwards;
}

.tulip-stem {
  width: 6px;
  height: 0;
  background: linear-gradient(to top, #2e7d32, #4caf50);
  border-radius: 3px;
  animation: stemGrow 2s ease-out forwards;
}

@keyframes stemGrow {
  to { height: 160px; }
}

@keyframes bloom {
  to { transform: scale(1); }
}

@keyframes growTulip {
  0% { transform: scale(0); }
  100% { transform: scale(1); }
}

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
/* Estilos para la Propuesta Interactiva */
.proposal-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 25px;
  min-height: 80px; /* Espacio reservado para cuando el botón crezca */
}

.choice-btn {
  padding: 12px 25px;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: transform 0.3s ease, font-size 0.3s ease, box-shadow 0.3s ease;
}

.choice-btn.accept {
  background: #4caf50;
  color: white;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.4);
}

.choice-btn.reject {
  background: #e53935;
  color: white;
  box-shadow: 0 4px 15px rgba(229, 57, 53, 0.4);
}

/* Mensaje Final de Celebración */
.celebration {
  margin-top: 30px;
  text-shadow: 0 0 15px rgba(255, 105, 180, 0.8);
  animation: heartPulse 1.5s infinite alternate;
}

.celebration h2 {
  font-size: 2rem;
  color: #ffb7c5;
}

.celebration h1 {
  font-family: 'Dancing Script', cursive;
  font-size: 2.8rem;
  color: #fff;
  margin-top: 10px;
}

@keyframes heartPulse {
  to { transform: scale(1.05); }
}

/* Pétalo para la lluvia constante */
.falling-petal {
  position: fixed;
  top: -30px;
  z-index: 100;
  pointer-events: none;
  animation: fallLinear linear forwards;
}

@keyframes fallLinear {
  to {
    transform: translateY(105vh) rotate(360deg);
  }
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
