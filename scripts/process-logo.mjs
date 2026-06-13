import sharp from "sharp";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "../public");

const sourceCandidates = [
  path.join(publicDir, "logo-source.png"),
  path.join(publicDir, "logo.png"),
  path.join(
    process.env.USERPROFILE || "",
    ".cursor/projects/c-Users-PC-Projects-premium-arac-kiralama/assets/c__Users_PC_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_WhatsApp_Image_2026-06-06_at_17.57.46-df9c6403-0d5e-46b0-a81f-40f40a77b79f.png"
  ),
];

const input = sourceCandidates.find((p) => fs.existsSync(p));
if (!input) {
  console.error("Logo kaynağı bulunamadı.");
  process.exit(1);
}

console.log("Kaynak:", input);

function isGold(r, g, b) {
  return r > 120 && g > 90 && b < 140 && r >= g - 15 && g > b + 20;
}

function isNavy(r, g, b) {
  return r < 80 && g < 90 && b > 60 && b > r + 10;
}

function removeWhiteBackground(pixels) {
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;

    if (isGold(r, g, b) || isNavy(r, g, b)) continue;

    if (lum >= 248 || (r > 235 && g > 235 && b > 235)) {
      pixels[i + 3] = 0;
    } else if (lum > 220 && r > 210 && g > 210 && b > 210) {
      const alpha = Math.round((248 - lum) * 12);
      pixels[i + 3] = Math.min(pixels[i + 3], Math.max(0, alpha));
    }
  }
}

async function buildLogo(filename, width) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = new Uint8Array(data);
  removeWhiteBackground(pixels);

  const outPath = path.join(publicDir, filename);

  await sharp(pixels, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .trim({ threshold: 1 })
    .resize({ width, withoutEnlargement: false })
    .png({ palette: false, compressionLevel: 9 })
    .toFile(outPath);

  const meta = await sharp(outPath).metadata();
  console.log(`✓ ${filename}: ${meta.width}x${meta.height}`);
}

await buildLogo("logo-light.png", 560);
await buildLogo("logo-dark.png", 560);
await sharp(path.join(publicDir, "logo-light.png"))
  .resize(192, 192, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile(path.join(publicDir, "logo-icon.png"));
console.log("✓ logo-icon.png (192x192)");
