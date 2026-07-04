import { createCanvas, registerFont } from "canvas";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Run with: node scripts/generate-og-image.mjs

const WIDTH = 1200;
const HEIGHT = 630;

function drawOGImage() {
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext("2d");

  // ── Background ──
  ctx.fillStyle = "#0b0a10";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // ── Subtle grid pattern ──
  ctx.strokeStyle = "rgba(201, 162, 39, 0.04)";
  ctx.lineWidth = 1;
  const gridSize = 60;
  for (let x = 0; x <= WIDTH; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, HEIGHT);
    ctx.stroke();
  }
  for (let y = 0; y <= HEIGHT; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(WIDTH, y);
    ctx.stroke();
  }

  // ── Radial glow — top left ──
  const glow1 = ctx.createRadialGradient(0, 0, 0, 0, 0, 600);
  glow1.addColorStop(0, "rgba(201, 162, 39, 0.12)");
  glow1.addColorStop(1, "transparent");
  ctx.fillStyle = glow1;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // ── Radial glow — bottom right ──
  const glow2 = ctx.createRadialGradient(WIDTH, HEIGHT, 0, WIDTH, HEIGHT, 500);
  glow2.addColorStop(0, "rgba(201, 162, 39, 0.07)");
  glow2.addColorStop(1, "transparent");
  ctx.fillStyle = glow2;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // ── AK seal — top left ──
  const sealX = 72;
  const sealY = 72;
  const sealRadius = 28;

  ctx.beginPath();
  ctx.arc(sealX, sealY, sealRadius, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(201, 162, 39, 0.08)";
  ctx.fill();

  ctx.beginPath();
  ctx.arc(sealX, sealY, sealRadius, 0, Math.PI * 2);
  ctx.strokeStyle = "#c9a227";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = "#c9a227";
  ctx.font = "600 18px Georgia, serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("AK", sealX, sealY + 1);

  // ── Gold top accent line ──
  const lineGradient = ctx.createLinearGradient(0, 0, WIDTH * 0.6, 0);
  lineGradient.addColorStop(0, "#c9a227");
  lineGradient.addColorStop(0.5, "rgba(201, 162, 39, 0.4)");
  lineGradient.addColorStop(1, "transparent");
  ctx.fillStyle = lineGradient;
  ctx.fillRect(0, 0, WIDTH * 0.6, 2);

  // ── Eyebrow label ──
  ctx.fillStyle = "#c9a227";
  ctx.font = "400 18px monospace";
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.letterSpacing = "0.12em";
  ctx.fillText("FOUNDER  ·  FULL-STACK DEVELOPER", 72, 200);

  // ── Main name ──
  ctx.fillStyle = "#f4efe6";
  ctx.font = "700 96px Georgia, serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillText("Allan Kihiu", 72, 320);

  // ── Gold underline beneath name ──
  const nameMetrics = ctx.measureText("Allan Kihiu");
  const underlineGradient = ctx.createLinearGradient(72, 0, 72 + nameMetrics.width, 0);
  underlineGradient.addColorStop(0, "#c9a227");
  underlineGradient.addColorStop(1, "rgba(201, 162, 39, 0.2)");
  ctx.fillStyle = underlineGradient;
  ctx.fillRect(72, 332, nameMetrics.width, 2);

  // ── Tagline ──
  ctx.fillStyle = "#a39d93";
  ctx.font = "400 28px Georgia, serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillText("Founder of ChatEase & Royaltie Technologies", 72, 400);

  // ── Companies row ──
  const companies = ["ChatEase", "Matra", "Royaltie Technologies"];
  let companyX = 72;
  const companyY = 470;

  companies.forEach((company, i) => {
    // Pill background
    const pillWidth = ctx.measureText(company).width + 32;
    const pillHeight = 36;
    const pillY = companyY - 24;

    ctx.beginPath();
    ctx.roundRect(companyX, pillY, pillWidth, pillHeight, 18);
    ctx.fillStyle = "rgba(201, 162, 39, 0.08)";
    ctx.fill();
    ctx.strokeStyle = "rgba(201, 162, 39, 0.25)";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = "#e3c873";
    ctx.font = "400 16px monospace";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(company, companyX + 16, companyY - 6);

    companyX += pillWidth + 12;

    // Dot separator
    if (i < companies.length - 1) {
      ctx.beginPath();
      ctx.arc(companyX - 6, companyY - 6, 2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(201, 162, 39, 0.3)";
      ctx.fill();
      companyX += 4;
    }
  });

  // ── Bottom divider line ──
  const bottomLineY = HEIGHT - 80;
  const bottomGradient = ctx.createLinearGradient(72, 0, WIDTH - 72, 0);
  bottomGradient.addColorStop(0, "transparent");
  bottomGradient.addColorStop(0.1, "rgba(244, 239, 230, 0.1)");
  bottomGradient.addColorStop(0.9, "rgba(244, 239, 230, 0.1)");
  bottomGradient.addColorStop(1, "transparent");
  ctx.fillStyle = bottomGradient;
  ctx.fillRect(72, bottomLineY, WIDTH - 144, 1);

  // ── Portfolio URL — bottom left ──
  ctx.fillStyle = "#6b6660";
  ctx.font = "400 16px monospace";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText("portfolio-tsst.onrender.com", 72, HEIGHT - 44);

  // ── "Built with purpose" — bottom right ──
  ctx.fillStyle = "#6b6660";
  ctx.font = "italic 16px Georgia, serif";
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  ctx.fillText("Building with purpose, growing with intention.", WIDTH - 72, HEIGHT - 44);

  // ── Decorative nodes — top right corner ──
  const nodePositions = [
    { x: WIDTH - 120, y: 80 },
    { x: WIDTH - 80, y: 140 },
    { x: WIDTH - 160, y: 150 },
    { x: WIDTH - 60, y: 60 },
    { x: WIDTH - 200, y: 90 },
    { x: WIDTH - 140, y: 200 },
    { x: WIDTH - 90, y: 210 },
  ];

  // Draw edges first
  ctx.strokeStyle = "rgba(201, 162, 39, 0.15)";
  ctx.lineWidth = 1;
  nodePositions.forEach((node, i) => {
    nodePositions.slice(i + 1).forEach((other) => {
      const dist = Math.hypot(node.x - other.x, node.y - other.y);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(other.x, other.y);
        ctx.stroke();
      }
    });
  });

  // Draw nodes
  nodePositions.forEach((node) => {
    ctx.beginPath();
    ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = "#ffb627";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(node.x, node.y, 8, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 182, 39, 0.12)";
    ctx.fill();
  });

  return canvas;
}

// Generate and save
const canvas = drawOGImage();
const buffer = canvas.toBuffer("image/png");
const outputPath = join(__dirname, "../public/og-image.png");
mkdirSync(join(__dirname, "../public"), { recursive: true });
writeFileSync(outputPath, buffer);

console.log("✓ og-image.png generated at public/og-image.png");
console.log(`  Dimensions: ${canvas.width} × ${canvas.height}px`);