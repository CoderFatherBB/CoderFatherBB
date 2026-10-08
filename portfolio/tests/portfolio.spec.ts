import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const pauseScroll = async (page: import('@playwright/test').Page) => {
  // Let smooth scrolling and the animation frame settle before checking video visibility.
  await page.waitForTimeout(1000);
};

test('light default, theme persistence, navigation, and responsive layouts', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const width of [360, 390, 768, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await expect(page.locator('h1')).toContainText('I research');
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
    await page.locator('#contact').scrollIntoViewIfNeeded();
    await pauseScroll(page);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
  }
  await page.getByRole('button', { name: 'Use dark theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Menu', exact: false }).click();
  const dialog = page.getByRole('dialog', { name: 'Navigation' });
  await expect(dialog).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Menu', exact: false })).toBeFocused();
  await page.getByRole('button', { name: 'Menu', exact: false }).click();
  await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Work' }).click();
  await expect(dialog).toHaveCount(0);
  await expect(page).toHaveURL(/#work$/);
  expect(errors).toEqual([]);
});

test('video defaults to captions and sound, with playback controls and visibility pausing', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const video = page.locator('video');
  await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.readyState)).toBeGreaterThanOrEqual(2);
  await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.paused)).toBe(false);
  await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.textTracks[0].mode)).toBe('showing');
  await page.getByRole('button', { name: 'CC: Hide captions' }).click();
  expect(await video.evaluate((el: HTMLVideoElement) => el.textTracks[0].mode)).toBe('disabled');
  await page.getByRole('button', { name: 'CC: Show captions' }).click();
  if (await video.evaluate((el: HTMLVideoElement) => el.muted)) await page.getByRole('button', { name: 'Enable introduction sound' }).click();
  expect(await video.evaluate((el: HTMLVideoElement) => el.muted)).toBe(false);
  await page.getByRole('button', { name: 'Ask my AI assistant' }).click();
  await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.paused)).toBe(true);
  await page.getByRole('button', { name: 'Close assistant' }).click();
  await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.paused)).toBe(false);
  await page.locator('#skills').scrollIntoViewIfNeeded();
  await pauseScroll(page);
  await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.paused)).toBe(true);
  await page.locator('#home').scrollIntoViewIfNeeded();
  await pauseScroll(page);
  await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.paused)).toBe(false);
  await page.getByRole('button', { name: 'Pause introduction' }).click();
  await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.paused)).toBe(true);
  await page.locator('#skills').scrollIntoViewIfNeeded();
  await page.locator('#home').scrollIntoViewIfNeeded();
  await pauseScroll(page);
  expect(await video.evaluate((el: HTMLVideoElement) => el.paused)).toBe(true);
  await page.getByRole('button', { name: 'Play introduction' }).click();
  await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.paused)).toBe(false);
});

test('ID card, skills filters, projects, résumé downloads, and email copy', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/');
  const card = page.getByRole('button', { name: "Flip Bhavin's ID card" });
  await card.scrollIntoViewIfNeeded();
  await card.focus(); await page.keyboard.press('Enter');
  await expect(page.getByRole('button', { name: "Show front of Bhavin's ID card" })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: "Show front of Bhavin's ID card" }).click();
  await page.getByRole('group', { name: 'Filter skills by family' }).getByRole('button', { name: 'Languages', exact: true }).click();
  await expect(page.locator('.element.dimmed')).not.toHaveCount(0);
  const python = page.locator('.element').filter({ has: page.getByText('Python', { exact: true }) });
  await python.click();
  await expect(page.locator('.skill-inspector h3')).toHaveText('Python');
  await page.getByRole('button', { name: /Document intelligence/ }).click();
  await expect(page.locator('#project-rag')).toBeVisible();
  await expect(page.locator('#project-deliveriq')).toBeHidden();
  for (const file of ['/resumes/Bhavin_Baldota_CV_ATS.pdf']) {
    const response = await page.request.get(file);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('pdf');
  }
  await page.getByRole('button', { name: 'Copy ↗' }).click();
  await expect(page.getByRole('status')).toHaveText('Copied ✓');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('bhavinbaldota16@gmail.com');
});

test('reduced motion and automated accessibility in both themes', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.waitForTimeout(300);
  expect(await page.locator('video').evaluate((el: HTMLVideoElement) => el.paused)).toBe(true);
  for (const theme of ['light', 'dark']) {
    if (theme === 'dark') await page.getByRole('button', { name: 'Use dark theme' }).click();
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(results.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) }))).toEqual([]);
  }
});

test('desktop achievements travel and optional AI lab remain usable', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const root = page.locator('#achievements');
  await root.scrollIntoViewIfNeeded();
  await pauseScroll(page);
  const metrics = await root.evaluate(el => {
    const track = el.querySelector('.achievement-track')!;
    return { top: scrollY + el.getBoundingClientRect().top, travel: track.scrollWidth - track.clientWidth };
  });
  expect(metrics.travel).toBeGreaterThan(0);
  await page.evaluate(({ top, travel }) => scrollTo(0, top + travel), metrics);
  await pauseScroll(page);
  const transform = await page.locator('.achievement-track').evaluate(el => getComputedStyle(el).transform);
  expect(transform).not.toBe('none');
  await expect(page.getByRole('heading', { name: 'AI/ML repositories', exact: true })).toBeInViewport();
  await page.getByRole('button', { name: 'Enter my interactive AI lab' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
});

test('all sections and project panels work in both themes with the original portrait and one résumé', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  for (const theme of ['light', 'dark']) {
    if (theme === 'dark') await page.getByRole('button', { name: 'Use dark theme' }).click();
    for (const id of ['about', 'skills', 'work', 'research', 'certifications', 'experience', 'achievements', 'contact']) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      await expect(page.locator(`#${id}`)).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(1280);
    }
    for (const name of ['DeliverIQ', 'Document intelligence', 'Agents that collaborate', 'Crop Doctor']) {
      await page.getByRole('button', { name: new RegExp(name) }).click();
      await expect(page.locator('.project-content:visible h3')).toHaveText(name);
    }
    const filters = page.getByRole('group', { name: 'Filter skills by family' }).getByRole('button');
    for (let index = 0; index < await filters.count(); index++) {
      await filters.nth(index).click();
      const enabled = page.locator('.element:enabled');
      for (let element = 0; element < await enabled.count(); element++) {
        await enabled.nth(element).focus();
        const name = await enabled.nth(element).locator('.element-name').innerText();
        await expect(page.locator('.skill-inspector h3')).toHaveText(name);
      }
    }
  }
  const portrait = page.getByAltText('Bhavin Baldota wearing a black blazer and burgundy shirt');
  expect(await portrait.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
  const resumes = await page.locator('a[download]').evaluateAll(links => [...new Set(links.map(link => link.getAttribute('href')))]);
  expect(resumes).toEqual(['/resumes/Bhavin_Baldota_CV_ATS.pdf']);
});

test('assistant streams responses, handles errors, and fits small screens in both themes', async ({ page }) => {
  await page.route('**/api/chat', route => route.fulfill({ contentType: 'text/event-stream', body: 'data: 0:"Bhavin delivered "\n\ndata: 0:"14 production AI/ML systems."\n\n' }));
  await page.setViewportSize({ width: 360, height: 568 });
  await page.goto('/');
  for (const theme of ['light', 'dark']) {
    if (theme === 'dark') await page.getByRole('button', { name: 'Use dark theme' }).click();
    await page.getByRole('button', { name: 'Ask my AI assistant' }).click();
    const dialog = page.getByRole('dialog', { name: 'Bhavin’s assistant' });
    await expect(dialog).toBeVisible();
    await page.waitForTimeout(1000);
    const audit = await new AxeBuilder({ page }).include('.assistant-panel').withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(audit.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) }))).toEqual([]);
    const bounds = await dialog.boundingBox();
    expect(bounds!.x).toBeGreaterThanOrEqual(0); expect(bounds!.y).toBeGreaterThanOrEqual(0);
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(360);
    await page.getByRole('textbox', { name: 'Ask about Bhavin' }).fill('What has Bhavin delivered?');
    await page.getByRole('button', { name: 'Send message' }).click();
    await expect(dialog.getByText('Bhavin delivered 14 production AI/ML systems.').first()).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Ask about Bhavin' })).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(dialog).toHaveCount(0);
  }
  await page.unroute('**/api/chat');
  await page.route('**/api/chat', route => route.fulfill({ status: 503, body: 'Unavailable' }));
  await page.getByRole('button', { name: 'Ask my AI assistant' }).click();
  await page.getByRole('textbox', { name: 'Ask about Bhavin' }).fill('Tell me more');
  await page.getByRole('button', { name: 'Send message' }).click();
  await expect(page.getByText('I couldn’t answer that right now. Try a CV highlight below, or contact Bhavin directly.')).toBeVisible();
  await page.getByRole('button', { name: 'Close assistant' }).click();
});

test('short-screen navigation and lab movement, discovery, chapter, and close in both themes', async ({ page }) => {
  await page.goto('/');
  for (const theme of ['light', 'dark']) {
    await page.setViewportSize({ width: 844, height: 390 });
    if (theme === 'dark') await page.getByRole('button', { name: 'Use dark theme' }).click();
    await page.setViewportSize({ width: 390, height: 568 });
    await page.getByRole('button', { name: 'Menu', exact: false }).click();
    await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Contact' }).click();
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.getByRole('button', { name: 'Enter my interactive AI lab' }).click();
    await page.waitForTimeout(1200);
    const audit = await new AxeBuilder({ page }).include('.game-overlay').withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(audit.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) }))).toEqual([]);
    if (await page.getByRole('button', { name: 'Enter the lab', exact: true }).count()) await page.getByRole('button', { name: 'Enter the lab', exact: true }).click();
    const initial = await page.getByLabel('Player', { exact: true }).getAttribute('style');
    for (let step = 0; step < 10; step++) await page.keyboard.press('ArrowUp');
    for (let step = 0; step < 10; step++) await page.keyboard.press('ArrowRight');
    expect(await page.getByLabel('Player', { exact: true }).getAttribute('style')).not.toBe(initial);
    const career = page.getByRole('button', { name: 'CAREER fragment. Unlocked. Open chapter.' });
    await expect(career).toBeVisible();
    await career.click();
    await expect(page.getByRole('heading', { name: 'Professional field log' })).toBeVisible();
    await page.keyboard.press('Escape');
    await page.getByRole('button', { name: 'Close exploration game' }).click();
    await expect(page.getByRole('dialog')).toHaveCount(0);
  }
});

test('touch selections keep all stack tiles visible and categories have six ordered blue shades', async ({ browser }) => {
  test.setTimeout(60000);
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3000');
  for (const theme of ['light', 'dark']) {
    if (theme === 'dark') await page.getByRole('button', { name: 'Use dark theme' }).tap();
    const tiles = page.locator('.element');
    for (let index = 0; index < await tiles.count(); index++) {
      await tiles.nth(index).tap();
      await expect(tiles.nth(index)).toHaveAttribute('aria-pressed', 'true');
      await expect.poll(() => tiles.nth(index).evaluate(el => Number(getComputedStyle(el).opacity))).toBe(1);
      await expect(tiles.nth(index).locator('.element-name')).toBeVisible();
    }
    const shades = await page.locator('.element:not(.selected)').evaluateAll(elements => {
      const groups = new Map<string, number>();
      for (const element of elements) {
        const rgb = getComputedStyle(element).backgroundColor.match(/\d+/g)!.map(Number);
        groups.set(element.getAttribute('data-category')!, rgb[0] + rgb[1] + rgb[2]);
      }
      return [...groups].sort((a,b) => Number(a[0])-Number(b[0])).map(entry => entry[1]);
    });
    expect(shades).toHaveLength(6);
    expect(new Set(shades).size).toBe(6);
    expect(shades).toEqual([...shades].sort((a,b) => a-b));
    const filters = page.getByRole('group', { name: 'Filter skills by family' }).getByRole('button');
    for (let index = 1; index < await filters.count(); index++) {
      await filters.nth(index).tap();
      await page.locator('.element:enabled').last().tap();
      expect(await tiles.evaluateAll(elements => elements.every(el => Number(getComputedStyle(el).opacity) > .5))).toBe(true);
    }
    await filters.first().tap();
  }
  await context.close();
});

test('audible autoplay rejection keeps video and captions running and enables sound on interaction', async ({ page }) => {
  await page.addInitScript(() => {
    const play = HTMLMediaElement.prototype.play;
    let rejected = false;
    HTMLMediaElement.prototype.play = function() {
      if (!this.muted && !rejected) { rejected = true; return Promise.reject(new DOMException('Autoplay blocked', 'NotAllowedError')); }
      return play.call(this);
    };
  });
  await page.goto('/');
  const video = page.locator('video');
  await expect(page.getByText('TAP ♪ FOR SOUND')).toBeVisible();
  await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.paused)).toBe(false);
  await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.textTracks[0].mode)).toBe('showing');
  await page.locator('h1').click();
  await expect(page.getByRole('button', { name: 'Mute introduction' })).toBeVisible();
  expect(await video.evaluate((el: HTMLVideoElement) => el.muted)).toBe(false);
  await page.getByRole('button', { name: 'Mute introduction' }).click();
  expect(await video.evaluate((el: HTMLVideoElement) => el.muted)).toBe(true);
  await page.locator('h1').click();
  expect(await video.evaluate((el: HTMLVideoElement) => el.muted)).toBe(true);
});

test('video starts with audible sound and captions when the browser permits autoplay', async () => {
  const { chromium } = await import('@playwright/test');
  const browser = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto('http://127.0.0.1:3000');
    const video = page.locator('video');
    await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.paused)).toBe(false);
    expect(await video.evaluate((el: HTMLVideoElement) => el.muted)).toBe(false);
    await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.textTracks[0].mode)).toBe('showing');
    await expect(page.getByRole('button', { name: 'Mute introduction' })).toHaveAttribute('aria-pressed', 'true');
  } finally { await browser.close(); }
});

test('shared launchers persist, adapt to phone and desktop, and CV highlights work without AI', async ({ page }) => {
  await page.route('**/api/chat', route => route.abort());
  await page.goto('/');
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const dock = page.getByRole('navigation', { name: 'Interactive portfolio experiences' });
    const ai = dock.getByRole('button', { name: 'Ask my AI assistant' });
    const game = dock.getByRole('button', { name: 'Enter my interactive AI lab' });
    const a = (await ai.boundingBox())!, g = (await game.boundingBox())!;
    expect(width < 760 ? Math.abs(a.x - g.x) : Math.abs(a.y - g.y)).toBeLessThan(1);
    expect(width < 760 ? g.y - a.y : g.x - a.x).toBeGreaterThan(70);
    await ai.click();
    for (const label of ['Production impact', 'Research contributions', 'Projects & stack']) {
      await page.getByRole('button', { name: label, exact: true }).click();
    }
    await expect(page.getByRole('log')).toContainText('14 production AI/ML systems');
    await expect(page.getByRole('log')).toContainText('Coconut tree disease dataset');
    await expect(page.getByRole('log')).toContainText('DeliverIQ');
    await page.keyboard.press('Escape');
    await expect(ai).toBeFocused();
    await expect(ai).toBeVisible(); await expect(game).toBeVisible();
    await ai.click();
    await expect(page.getByRole('log')).toContainText('DeliverIQ');
    await page.getByRole('button', { name: 'New conversation' }).click();
    await expect(page.getByRole('log')).not.toContainText('DeliverIQ');
    await page.getByRole('button', { name: 'Close assistant' }).click();
  }
});

test('guided lab tour exposes all seven chapters and keeps progress after closing', async ({ page }) => {
  await page.goto('/');
  for (const theme of ['light', 'dark']) {
    if (theme === 'dark') await page.getByRole('button', { name: 'Use dark theme' }).click();
    await page.getByRole('button', { name: 'Enter my interactive AI lab' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    if (await page.getByRole('button', { name: 'Take a guided tour' }).count()) await page.getByRole('button', { name: 'Take a guided tour' }).click();
    else await page.getByRole('button', { name: 'ORIGIN fragment. Unlocked. Open chapter.' }).click();
    const chapters = page.getByRole('navigation', { name: 'All game chapters' }).getByRole('button');
    await expect(chapters).toHaveCount(7);
    for (let i = 0; i < 7; i++) {
      await chapters.nth(i).click();
      await expect(page.locator('#game-chapter-title')).toBeVisible();
    }
    await expect(page.locator('#game-chapter-title')).toHaveText('Building with others');
    const audit = await new AxeBuilder({ page }).include('.game-overlay').withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(audit.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) }))).toEqual([]);
    await page.getByRole('button', { name: 'Close exploration game' }).click();
    await expect(page.getByRole('dialog')).toHaveCount(0);
  }
});
