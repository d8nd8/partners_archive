import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const MOCKUP_DIR = path.resolve("public/cases/fino/mockup");
const SOURCE_SCREENSHOT = path.resolve("public/cases/fino.png");

const CANVAS_WIDTH = 2880;
const CANVAS_HEIGHT = 3306;

const MACBOOK_SCREEN_AREA = {
  left: 0.2723,
  top: 0.1888,
  width: 0.4554,
  height: 0.4428,
};

const BACKGROUND = { r: 245, g: 245, b: 244 };

/**
 * Builds screen-content.png with the FINO screenshot placed in the MacBook screen area.
 */
async function buildScreenContent() {
  if (!fs.existsSync(SOURCE_SCREENSHOT)) {
    throw new Error(`Missing asset: ${SOURCE_SCREENSHOT}`);
  }

  const screenLeft = Math.round(CANVAS_WIDTH * MACBOOK_SCREEN_AREA.left);
  const screenTop = Math.round(CANVAS_HEIGHT * MACBOOK_SCREEN_AREA.top);
  const screenWidth = Math.round(CANVAS_WIDTH * MACBOOK_SCREEN_AREA.width);
  const screenHeight = Math.round(CANVAS_HEIGHT * MACBOOK_SCREEN_AREA.height);

  const screenshot = await sharp(SOURCE_SCREENSHOT)
    .resize(screenWidth, screenHeight, {
      fit: "cover",
      position: "centre",
    })
    .png()
    .toBuffer();

  const background = await sharp({
    create: {
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
      channels: 3,
      background: BACKGROUND,
    },
  })
    .png()
    .toBuffer();

  await sharp(background)
    .composite([
      {
        input: screenshot,
        left: screenLeft,
        top: screenTop,
      },
    ])
    .png()
    .toFile(path.join(MOCKUP_DIR, "screen-content.png"));
}

fs.mkdirSync(MOCKUP_DIR, { recursive: true });
await buildScreenContent();
