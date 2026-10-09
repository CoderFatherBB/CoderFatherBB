import { test, expect } from '@playwright/test';

for (const width of [360, 390, 768, 1440]) test(`hero labels and ID-card return hint stay clear at ${width}px in both themes`, async ({ page }, testInfo) => {
  await page.setViewportSize({ width, height: 900 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  for (const theme of ['light', 'dark']) {
    if (theme === 'dark') await page.getByRole('button', { name: 'Use dark theme' }).click();
    const canvas = await page.locator('.video-canvas').boundingBox();
    const controls = await page.locator('.video-controls').boundingBox();
    const watermark = await page.locator('.ghost-name').boundingBox();
    expect(controls!.y).toBeGreaterThanOrEqual(canvas!.y + canvas!.height);
    expect(watermark!.y + watermark!.height).toBeLessThanOrEqual(canvas!.y);
    await expect(page.getByText('MEET BHAVIN', { exact: true })).toBeVisible();
    expect(await page.locator('.ghost-name').evaluate(el => getComputedStyle(el).webkitTextStrokeColor)).not.toBe('rgba(0, 0, 0, 0)');
    const card = page.getByRole('button', { name: "Flip Bhavin's ID card" });
    await card.click();
    const back = await page.locator('.id-back').boundingBox();
    const hint = await page.locator('.id-back .flip-hint').boundingBox();
    expect(hint!.y).toBeGreaterThanOrEqual(back!.y);
    expect(hint!.y + hint!.height).toBeLessThan(back!.y + back!.height - 8);
    expect(await page.locator('.id-back').evaluate(el => el.scrollHeight <= el.clientHeight)).toBe(true);
    await page.locator('.id-card').screenshot({ path: testInfo.outputPath(`id-return-${width}-${theme}.png`) });
    await page.getByRole('button', { name: "Show front of Bhavin's ID card" }).click();
    await page.locator('.video-canvas').scrollIntoViewIfNeeded();
    await page.locator('.hero-stage').screenshot({ path: testInfo.outputPath(`hero-${width}-${theme}.png`) });
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
  }
});

test('poster survives delayed media, then the first MP4 pass has decoded avatar frames', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  let release!: () => void;
  const gate = new Promise<void>(resolve => { release = resolve; });
  await page.route('**/hero/hero.mp4', async route => { await gate; await route.continue(); });
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('.video-canvas')).not.toHaveClass(/frame-ready/);
  await expect(page.locator('.video-loading-poster')).toBeVisible();
  expect(await page.locator('.video-canvas').evaluate(el => getComputedStyle(el).backgroundImage)).toContain('poster.webp');
  release();
  const video = page.locator('video');
  await expect(page.locator('.video-canvas')).toHaveClass(/frame-ready/);
  await expect(page.locator('.video-loading-poster')).toBeHidden();
  expect(await video.evaluate((el: HTMLVideoElement) => el.currentSrc)).toContain('hero.mp4');
  expect(await video.evaluate((el: HTMLVideoElement) => el.currentTime)).toBeLessThan(7);
  const darkPixels = await video.evaluate((el: HTMLVideoElement) => {
    const canvas = document.createElement('canvas'); canvas.width = 160; canvas.height = 90;
    const context = canvas.getContext('2d')!; context.drawImage(el, 0, 0, 160, 90);
    const { data } = context.getImageData(0, 0, 160, 90); let count = 0;
    for (let i = 0; i < data.length; i += 4) if (data[i] < 100 && data[i+1] < 100 && data[i+2] < 100) count++;
    return count;
  });
  expect(darkPixels).toBeGreaterThan(200);
});

test('enabling blocked sound restarts the first introduction and produces an audio signal', async ({ page }) => {
  await page.addInitScript(() => {
    const play = HTMLMediaElement.prototype.play;
    let rejected = false;
    HTMLMediaElement.prototype.play = function() {
      if (!this.muted && !rejected) { rejected = true; return Promise.reject(new DOMException('Blocked', 'NotAllowedError')); }
      return play.call(this);
    };
  });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const video = page.locator('video');
  await expect(page.getByRole('button', { name: 'Enable introduction sound' })).toBeVisible();
  await video.evaluate((el: HTMLVideoElement) => { el.currentTime = 6; });
  await page.getByRole('button', { name: 'Enable introduction sound' }).click();
  await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.paused)).toBe(false);
  expect(await video.evaluate((el: HTMLVideoElement) => el.currentTime)).toBeLessThan(3);
  expect(await video.evaluate((el: HTMLVideoElement) => el.muted)).toBe(false);
  expect(await video.evaluate((el: HTMLVideoElement) => el.textTracks[0].mode)).toBe('showing');
  const signal = await video.evaluate(async (el: HTMLVideoElement) => {
    const context = new AudioContext();
    const source = context.createMediaElementSource(el); const analyser = context.createAnalyser();
    source.connect(analyser); analyser.connect(context.destination); await context.resume();
    const samples = new Uint8Array(analyser.fftSize);
    const peak = await new Promise<number>(resolve => {
      let greatest = 0, frames = 0;
      function sample() { analyser.getByteTimeDomainData(samples); greatest = Math.max(greatest, ...samples.map(value => Math.abs(value - 128))); if (++frames >= 45) resolve(greatest); else requestAnimationFrame(sample); }
      sample();
    });
    await context.close(); return peak;
  });
  expect(signal).toBeGreaterThan(2);
  await expect(page.locator('.video-canvas')).toHaveClass(/frame-ready/);
});
