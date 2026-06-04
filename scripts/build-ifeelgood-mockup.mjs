import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const MOCKUP_DIR = path.resolve("public/cases/ifeelgood/mockup");
const SCALE = 3;

const FRAME_WIDTH = 448;
const FRAME_HEIGHT = 916;
const SCREEN = { x: 19, y: 21, width: 402, height: 874, radius: 47 };
const BACKGROUND = { r: 245, g: 245, b: 244 };
const BACKGROUND_TOLERANCE = 12;

/**
 * Returns true when a pixel matches the Figma export background color.
 */
function isBackgroundPixel(r, g, b) {
  return (
    Math.abs(r - BACKGROUND.r) <= BACKGROUND_TOLERANCE &&
    Math.abs(g - BACKGROUND.g) <= BACKGROUND_TOLERANCE &&
    Math.abs(b - BACKGROUND.b) <= BACKGROUND_TOLERANCE
  );
}

/**
 * Returns true when a pixel is inside the rounded screen rectangle.
 */
function isInsideScreen(x, y, screen) {
  const { x: sx, y: sy, width, height, radius } = screen;

  if (x < sx || y < sy || x >= sx + width || y >= sy + height) {
    return false;
  }

  const right = sx + width;
  const bottom = sy + height;

  const inTopLeft =
    x >= sx + radius || y >= sy + radius ||
    (x - sx - radius) ** 2 + (y - sy - radius) ** 2 <= radius ** 2;
  const inTopRight =
    x <= right - radius || y >= sy + radius ||
    (x - (right - radius)) ** 2 + (y - sy - radius) ** 2 <= radius ** 2;
  const inBottomLeft =
    x >= sx + radius || y <= bottom - radius ||
    (x - sx - radius) ** 2 + (y - (bottom - radius)) ** 2 <= radius ** 2;
  const inBottomRight =
    x <= right - radius || y <= bottom - radius ||
    (x - (right - radius)) ** 2 + (y - (bottom - radius)) ** 2 <= radius ** 2;

  return inTopLeft && inTopRight && inBottomLeft && inBottomRight;
}

/**
 * Builds screen-mask and shadow PNGs for the ifeelgood iPhone mockup.
 */
async function buildGeneratedLayers() {
  const width = FRAME_WIDTH * SCALE;
  const height = FRAME_HEIGHT * SCALE;
  const screen = {
    x: Math.round(SCREEN.x * SCALE),
    y: Math.round(SCREEN.y * SCALE),
    width: Math.round(SCREEN.width * SCALE),
    height: Math.round(SCREEN.height * SCALE),
    radius: Math.round(SCREEN.radius * SCALE),
  };

  const maskSvg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="${screen.x}"
        y="${screen.y}"
        width="${screen.width}"
        height="${screen.height}"
        rx="${screen.radius}"
        ry="${screen.radius}"
        fill="white"
      />
    </svg>
  `;

  await sharp(Buffer.from(maskSvg))
    .png()
    .toFile(path.join(MOCKUP_DIR, "screen-mask.png"));

  const shadowSvg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="${36 * SCALE}" />
        </filter>
      </defs>
      <ellipse
        cx="${width / 2}"
        cy="${height - 40 * SCALE}"
        rx="${180 * SCALE}"
        ry="${28 * SCALE}"
        fill="rgba(0,0,0,0.28)"
        filter="url(#blur)"
      />
    </svg>
  `;

  await sharp(Buffer.from(shadowSvg))
    .png()
    .toFile(path.join(MOCKUP_DIR, "shadow.png"));
}

/**
 * Removes export background and punches a transparent hole in the screen area.
 */
async function processIphonePro() {
  const filePath = path.join(MOCKUP_DIR, "iphone-pro.png");
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing asset: ${filePath}`);
  }

  const { data, info } = await sharp(filePath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const scale = info.width / FRAME_WIDTH;
  const screen = {
    x: Math.round(SCREEN.x * scale),
    y: Math.round(SCREEN.y * scale),
    width: Math.round(SCREEN.width * scale),
    height: Math.round(SCREEN.height * scale),
    radius: Math.round(SCREEN.radius * scale),
  };

  for (let y = 0; y < info.height; y += 1) {
    for (let x = 0; x < info.width; x += 1) {
      const index = (y * info.width + x) * 4;
      const r = data[index];
      const g = data[index + 1];
      const b = data[index + 2];

      if (isBackgroundPixel(r, g, b)) {
        data[index + 3] = 0;
        continue;
      }

      if (isInsideScreen(x, y, screen) && r > 235 && g > 235 && b > 235) {
        data[index + 3] = 0;
      }
    }
  }

  await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4,
    },
  })
    .png()
    .toFile(`${filePath}.tmp`);

  fs.renameSync(`${filePath}.tmp`, filePath);
}

/**
 * Upscales a downloaded Figma PNG to the target width when needed.
 * The target width must be chosen per asset to avoid double-upscaling.
 */
async function upscaleAsset(fileName, targetWidth) {
  const filePath = path.join(MOCKUP_DIR, fileName);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing asset: ${filePath}`);
  }

  const image = sharp(filePath);
  const metadata = await image.metadata();
  if (!metadata.width || !metadata.height) {
    throw new Error(`Unable to read dimensions for ${fileName}`);
  }

  if (metadata.width >= targetWidth) {
    return;
  }

  await image
    .resize(metadata.width * SCALE, metadata.height * SCALE, {
      kernel: sharp.kernel.lanczos3,
    })
    .png()
    .toFile(`${filePath}.tmp`);

  fs.renameSync(`${filePath}.tmp`, filePath);
}

fs.mkdirSync(MOCKUP_DIR, { recursive: true });
await buildGeneratedLayers();

await upscaleAsset("iphone-pro.png", FRAME_WIDTH * SCALE);

await processIphonePro();
