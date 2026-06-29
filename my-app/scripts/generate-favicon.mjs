import { createCanvas } from "canvas";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Install dependency first:
// npm install canvas --save-dev
// Then run: node scripts/generate-favicon.mjs

const SIZES = [16, 32, 48];

function drawAKSeal(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");

  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - 1;

  // Background
  ctx.fillStyle = "#0b0a10";
  ctx.beginPath();
  ctx.arc(cx, cy, size / 2, 0, Math.PI * 2);
  ctx.fill();

  // Gold circle border
  ctx.strokeStyle = "#c9a227";
  ctx.lineWidth = Math.max(1, size * 0.06);
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.stroke();

  // "AK" text
  const fontSize = size * 0.38;
  ctx.fillStyle = "#c9a227";
  ctx.font = `600 ${fontSize}px Georgia, serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("AK", cx, cy + size * 0.02);

  return canvas;
}

function canvasToIcoBuffer(canvases) {
  const images = canvases.map((canvas) => {
    const buffer = canvas.toBuffer("image/png");
    return { buffer, width: canvas.width, height: canvas.height };
  });

  // ICO header
  const headerSize = 6;
  const dirEntrySize = 16;
  const dirSize = images.length * dirEntrySize;
  const headerTotal = headerSize + dirSize;

  let totalSize = headerTotal;
  const imageOffsets = [];

  images.forEach(({ buffer }) => {
    imageOffsets.push(totalSize);
    totalSize += buffer.length;
  });

  const ico = Buffer.alloc(totalSize);

  // ICO file header
  ico.writeUInt16LE(0, 0); // reserved
  ico.writeUInt16LE(1, 2); // type: ICO
  ico.writeUInt16LE(images.length, 4); // image count

  // Directory entries
  images.forEach(({ buffer, width, height }, i) => {
    const offset = headerSize + i * dirEntrySize;
    ico.writeUInt8(width >= 256 ? 0 : width, offset);
    ico.writeUInt8(height >= 256 ? 0 : height, offset + 1);
    ico.writeUInt8(0, offset + 2); // color count
    ico.writeUInt8(0, offset + 3); // reserved
    ico.writeUInt16LE(1, offset + 4); // color planes
    ico.writeUInt16LE(32, offset + 6); // bits per pixel
    ico.writeUInt32LE(buffer.length, offset + 8); // image size
    ico.writeUInt32LE(imageOffsets[i], offset + 12); // image offset
  });

  // Image data
  images.forEach(({ buffer }, i) => {
    buffer.copy(ico, imageOffsets[i]);
  });

  return ico;
}

// Generate all sizes
const canvases = SIZES.map((size) => drawAKSeal(size));

// Write ICO
const icoBuffer = canvasToIcoBuffer(canvases);
const outputPath = join(__dirname, "../public/favicon.ico");
mkdirSync(join(__dirname, "../public"), { recursive: true });
writeFileSync(outputPath, icoBuffer);

console.log(`✓ favicon.ico generated at public/favicon.ico`);
console.log(`  Sizes included: ${SIZES.join("px, ")}px`);