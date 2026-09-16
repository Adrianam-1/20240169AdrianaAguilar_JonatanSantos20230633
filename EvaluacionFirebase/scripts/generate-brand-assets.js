// One-off generator: rasteriza assets/brand/mark.svg a los PNG que necesita Expo
// (icono, adaptive icon, splash, favicon). No forma parte del build de la app.
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const root = path.join(__dirname, '..');
const markSvgPath = path.join(root, 'assets', 'brand', 'mark.svg');
const outDir = path.join(root, 'assets', 'images');

const YELLOW = '#F6C915';
const NAVY = '#1E3A5F';
const CREAM = '#FFFDF6';

async function solidCanvas(size, color) {
  return sharp({
    create: { width: size, height: size, channels: 4, background: color },
  });
}

async function markOnCanvas(size, { background = null, markScale = 0.86 } = {}) {
  const markSize = Math.round(size * markScale);
  const markBuffer = await sharp(markSvgPath).resize(markSize, markSize).png().toBuffer();

  const base = background
    ? sharp({ create: { width: size, height: size, channels: 4, background } })
    : sharp({ create: { width: size, height: size, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } });

  const offset = Math.round((size - markSize) / 2);
  return base
    .composite([{ input: markBuffer, left: offset, top: offset }])
    .png()
    .toBuffer();
}

async function monochromeCanvas(size, markScale = 0.6) {
  const markSize = Math.round(size * markScale);
  // Silueta plana: solo el círculo exterior, en blanco, sobre transparente.
  const silhouette = Buffer.from(
    `<svg width="${markSize}" height="${markSize}" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <circle cx="256" cy="256" r="230" fill="#FFFFFF" />
    </svg>`
  );
  const markBuffer = await sharp(silhouette).resize(markSize, markSize).png().toBuffer();
  const offset = Math.round((size - markSize) / 2);
  return sharp({ create: { width: size, height: size, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([{ input: markBuffer, left: offset, top: offset }])
    .png()
    .toBuffer();
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });

  // Icono principal (iOS + fallback): fondo crema, marca centrada.
  const icon = await markOnCanvas(1024, { background: CREAM, markScale: 0.82 });
  fs.writeFileSync(path.join(outDir, 'icon.png'), icon);

  // Adaptive icon Android: foreground con zona segura (~60%), background sólido, monochrome.
  const foreground = await markOnCanvas(1024, { background: null, markScale: 0.6 });
  fs.writeFileSync(path.join(outDir, 'android-icon-foreground.png'), foreground);

  const background = await (await solidCanvas(1024, NAVY)).png().toBuffer();
  fs.writeFileSync(path.join(outDir, 'android-icon-background.png'), background);

  const monochrome = await monochromeCanvas(1024, 0.6);
  fs.writeFileSync(path.join(outDir, 'android-icon-monochrome.png'), monochrome);

  // Splash: marca sobre transparente, se apoya sobre backgroundColor del plugin.
  const splash = await markOnCanvas(1024, { background: null, markScale: 0.9 });
  fs.writeFileSync(path.join(outDir, 'splash-icon.png'), splash);

  // Favicon web.
  const favicon = await markOnCanvas(196, { background: YELLOW, markScale: 0.86 });
  fs.writeFileSync(path.join(outDir, 'favicon.png'), favicon);

  console.log('Brand assets generados en assets/images/.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
