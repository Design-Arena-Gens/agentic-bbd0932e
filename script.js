const ctaButtons = document.querySelectorAll("[data-cta]");
const scrollTriggers = document.querySelectorAll("[data-scroll]");
const yearLabel = document.getElementById("year");
const terminalStream = document.getElementById("terminal-stream");
const animatedBlocks = [
  ...document.querySelectorAll(".card"),
  ...document.querySelectorAll(".pipeline-visual .node"),
  document.querySelector(".pipeline-meta"),
  ...document.querySelectorAll(".project-card"),
  document.querySelector(".contact-info"),
  document.querySelector(".contact-form"),
].filter(Boolean);

// Auto-update footer year
yearLabel.textContent = new Date().getFullYear();

// Scroll links
scrollTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const selector = trigger.dataset.scroll;
    if (!selector) return;
    const target = document.querySelector(selector);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// CTA buttons target contact section
ctaButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = document.querySelector("#contact");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Terminal typing effect
const terminalLines = [
  "Initializing agentic workflow...",
  "└─ Booting planning agent [ok]",
  "└─ Loading AI toolkit extensions [ok]",
  "Generating design primitives...",
  "└─ Calibrating interface heuristics [ok]",
  "└─ Synthesizing responsive breakpoints [ok]",
  "Compiling deployment playbook...",
  "└─ Provisioning edge build pipelines [ok]",
  "Quality gates engaged. Deploying in 3...2...1...",
  "Launch complete. Monitoring telemetry. ✅",
];

let terminalIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLine() {
  if (!terminalStream) return;

  const currentLine = terminalLines[terminalIndex];

  if (!isDeleting) {
    terminalStream.textContent = `${terminalStream.textContent}${currentLine.charAt(
      charIndex
    )}`;
    charIndex += 1;

    if (charIndex === currentLine.length) {
      terminalStream.textContent = `${terminalStream.textContent}\n`;
      isDeleting = true;
      setTimeout(typeLine, 400);
      return;
    }
  } else {
    // After finishing a line, reset for next line without deleting characters.
    isDeleting = false;
    charIndex = 0;
    terminalIndex = (terminalIndex + 1) % terminalLines.length;
  }

  setTimeout(typeLine, 28 + Math.random() * 40);
}

typeLine();

// Viewport animation observer
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

animatedBlocks.forEach((block) => {
  block.setAttribute("data-visible", "");
  observer.observe(block);
});

// Background matrix grid
const canvas = document.getElementById("matrix-grid");
const ctx = canvas?.getContext("2d");

const grid = {
  spacing: 60,
  offset: 0,
  speed: 0.25,
  pulse: 0,
};

function resizeCanvas() {
  if (!canvas || !ctx) return;
  canvas.width = window.innerWidth * window.devicePixelRatio;
  canvas.height = window.innerHeight * window.devicePixelRatio;
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
}

function drawGrid() {
  if (!canvas || !ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

  const width = canvas.width / window.devicePixelRatio;
  const height = canvas.height / window.devicePixelRatio;

  grid.offset += grid.speed;
  grid.pulse += 0.01;

  ctx.strokeStyle = "rgba(90, 150, 255, 0.08)";
  ctx.lineWidth = 1;

  for (
    let x = -grid.spacing;
    x < width + grid.spacing;
    x += grid.spacing
  ) {
    ctx.beginPath();
    ctx.moveTo(
      x + ((grid.offset + grid.pulse * 20) % grid.spacing),
      0
    );
    ctx.lineTo(
      x + ((grid.offset + grid.pulse * 20) % grid.spacing),
      height
    );
    ctx.stroke();
  }

  for (
    let y = -grid.spacing;
    y < height + grid.spacing;
    y += grid.spacing
  ) {
    ctx.beginPath();
    ctx.moveTo(
      0,
      y + ((grid.offset + Math.sin(grid.pulse) * 40) % grid.spacing)
    );
    ctx.lineTo(
      width,
      y + ((grid.offset + Math.sin(grid.pulse) * 40) % grid.spacing)
    );
    ctx.stroke();
  }

  ctx.fillStyle = "rgba(77, 220, 255, 0.12)";
  const highlightSpacing = grid.spacing * 2;

  for (
    let x = 0;
    x < width + highlightSpacing;
    x += highlightSpacing
  ) {
    const shimmerX = (x + (grid.offset * 2) % highlightSpacing) - highlightSpacing;
    const gradient = ctx.createLinearGradient(
      shimmerX - 20,
      0,
      shimmerX + 20,
      height
    );
    gradient.addColorStop(0, "rgba(77, 220, 255, 0)");
    gradient.addColorStop(0.5, "rgba(77, 220, 255, 0.08)");
    gradient.addColorStop(1, "rgba(77, 220, 255, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(shimmerX - 40, 0, 80, height);
  }

  ctx.restore();
  requestAnimationFrame(drawGrid);
}

if (canvas && ctx) {
  resizeCanvas();
  drawGrid();
  window.addEventListener("resize", resizeCanvas);
}

// Form validation feedback (non-blocking example)
const contactForm = document.querySelector(".contact-form");
contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const button = contactForm.querySelector("button[type='submit']");
  if (!button) return;
  button.textContent = "Thanks — I'll reply soon!";
  button.disabled = true;
  button.classList.add("submitted");
  setTimeout(() => {
    button.disabled = false;
    button.textContent = "Initiate project sync";
    button.classList.remove("submitted");
    contactForm.reset();
  }, 5000);
});
