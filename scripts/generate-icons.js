/**
 * PaidSheet Icon Generator
 * Run this script ONCE after npm install to generate all required icon sizes.
 *
 * Usage:
 *   npm install sharp --save-dev
 *   node scripts/generate-icons.js
 *
 * This generates all sizes needed for:
 *   - PWA manifest
 *   - Android (Capacitor)
 *   - iOS (Capacitor)
 *   - Splash screens
 */

import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const INPUT_SVG = path.join(__dirname, '../public/icons/icon.svg');
const OUT_DIR = path.join(__dirname, '../public/icons');
const ANDROID_DIR = path.join(__dirname, '../android/app/src/main/res');
const IOS_DIR = path.join(__dirname, '../ios/App/App/Assets.xcassets/AppIcon.appiconset');

const PWA_SIZES = [72, 96, 128, 144, 152, 192, 384, 512];

// Maskable icon: 512x512 with safe zone padding (background extends to edges)
const ANDROID_ICONS = {
  'mipmap-mdpi':    48,
  'mipmap-hdpi':    72,
  'mipmap-xhdpi':   96,
  'mipmap-xxhdpi':  144,
  'mipmap-xxxhdpi': 192,
};

const IOS_ICONS = [
  { size: 20,  scale: 1, name: 'Icon-20.png' },
  { size: 20,  scale: 2, name: 'Icon-20@2x.png' },
  { size: 20,  scale: 3, name: 'Icon-20@3x.png' },
  { size: 29,  scale: 1, name: 'Icon-29.png' },
  { size: 29,  scale: 2, name: 'Icon-29@2x.png' },
  { size: 29,  scale: 3, name: 'Icon-29@3x.png' },
  { size: 40,  scale: 1, name: 'Icon-40.png' },
  { size: 40,  scale: 2, name: 'Icon-40@2x.png' },
  { size: 40,  scale: 3, name: 'Icon-40@3x.png' },
  { size: 60,  scale: 2, name: 'Icon-60@2x.png' },
  { size: 60,  scale: 3, name: 'Icon-60@3x.png' },
  { size: 76,  scale: 1, name: 'Icon-76.png' },
  { size: 76,  scale: 2, name: 'Icon-76@2x.png' },
  { size: 83.5,scale: 2, name: 'Icon-83.5@2x.png' },
  { size: 1024,scale: 1, name: 'Icon-1024.png' },
];

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function generatePWAIcons() {
  console.log('🔵 Generating PWA icons...');
  await ensureDir(OUT_DIR);
  for (const size of PWA_SIZES) {
    await sharp(INPUT_SVG)
      .resize(size, size)
      .png()
      .toFile(path.join(OUT_DIR, `icon-${size}.png`));
    console.log(`  ✅ icon-${size}.png`);
  }
  // Apple touch icon
  await sharp(INPUT_SVG).resize(180, 180).png().toFile(path.join(OUT_DIR, 'apple-touch-icon.png'));
  console.log('  ✅ apple-touch-icon.png (180x180)');
  // Favicon
  await sharp(INPUT_SVG).resize(32, 32).png().toFile(path.join(OUT_DIR, 'favicon-32.png'));
  console.log('  ✅ favicon-32.png');
}

async function generateAndroidIcons() {
  console.log('\n🤖 Generating Android icons...');
  for (const [folder, size] of Object.entries(ANDROID_ICONS)) {
    const dir = path.join(ANDROID_DIR, folder);
    await ensureDir(dir);
    await sharp(INPUT_SVG).resize(size, size).png().toFile(path.join(dir, 'ic_launcher.png'));
    await sharp(INPUT_SVG).resize(size, size).png().toFile(path.join(dir, 'ic_launcher_round.png'));
    console.log(`  ✅ ${folder}/ic_launcher.png (${size}x${size})`);
  }
  // Adaptive icon foreground (for Android 8+) - 108dp on 432x432 canvas
  const adaptiveDir = path.join(ANDROID_DIR, 'mipmap-anydpi-v26');
  await ensureDir(adaptiveDir);
  await fs.writeFile(path.join(adaptiveDir, 'ic_launcher.xml'), `<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@color/ic_launcher_background"/>
    <foreground android:drawable="@mipmap/ic_launcher_foreground"/>
</adaptive-icon>`);
}

async function generateIOSIcons() {
  console.log('\n🍎 Generating iOS icons...');
  await ensureDir(IOS_DIR);

  for (const icon of IOS_ICONS) {
    const px = Math.round(icon.size * icon.scale);
    await sharp(INPUT_SVG).resize(px, px).png().toFile(path.join(IOS_DIR, icon.name));
    console.log(`  ✅ ${icon.name} (${px}x${px})`);
  }

  // Contents.json for Xcode
  const contents = {
    images: IOS_ICONS.map(icon => ({
      filename: icon.name,
      idiom: icon.size >= 76 ? (icon.size === 1024 ? 'ios-marketing' : 'ipad') : 'iphone',
      scale: `${icon.scale}x`,
      size: `${icon.size}x${icon.size}`,
    })),
    info: { author: 'xcode', version: 1 },
  };
  await fs.writeFile(path.join(IOS_DIR, 'Contents.json'), JSON.stringify(contents, null, 2));
  console.log('  ✅ Contents.json');
}

async function generateSplashScreens() {
  console.log('\n💫 Generating splash screens...');
  const splashDir = path.join(__dirname, '../public/splash');
  await ensureDir(splashDir);

  const sizes = [
    { w: 640, h: 1136, name: 'splash-640x1136.png' },  // iPhone 5
    { w: 750, h: 1334, name: 'splash-750x1334.png' },  // iPhone 6/7/8
    { w: 1242, h: 2208, name: 'splash-1242x2208.png' }, // iPhone Plus
    { w: 1125, h: 2436, name: 'splash-1125x2436.png' }, // iPhone X
    { w: 1242, h: 2688, name: 'splash-1242x2688.png' }, // iPhone Max
    { w: 1668, h: 2388, name: 'splash-1668x2388.png' }, // iPad Pro 11"
    { w: 2048, h: 2732, name: 'splash-2048x2732.png' }, // iPad Pro 12.9"
    { w: 1080, h: 1920, name: 'splash-1080x1920.png' }, // Android Full HD
    { w: 1440, h: 2560, name: 'splash-1440x2560.png' }, // Android QHD
  ];

  for (const { w, h, name } of sizes) {
    const iconSize = Math.min(w, h) * 0.35;
    const iconPng = await sharp(INPUT_SVG).resize(Math.round(iconSize), Math.round(iconSize)).png().toBuffer();

    await sharp({
      create: { width: w, height: h, channels: 4, background: { r: 35, g: 109, b: 0, alpha: 1 } },
    })
      .composite([{
        input: iconPng,
        gravity: 'center',
      }])
      .png()
      .toFile(path.join(splashDir, name));
    console.log(`  ✅ ${name}`);
  }
}

async function main() {
  console.log('🚀 PaidSheet Icon Generator\n');
  try {
    await generatePWAIcons();
    await generateAndroidIcons();
    await generateIOSIcons();
    await generateSplashScreens();
    console.log('\n✨ All icons generated successfully!');
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

main();
