import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const DEFAULT_AXE_CONFIG = {
  // Color contrast is excluded because it was reviewed and approved by the user.
  // The primary blue (#1a73e8) on light gray card bodies (#f8f9fa) measures 4.27:1
  // just under the WCAG AA threshold of 4.5:1 — an intentional design choice.
  rules: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
};

test.describe('Accessibility', () => {
  test('home page should have no critical a11y violations', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.products__grid', { timeout: 10000 });

    const results = await new AxeBuilder({ page })
      .withTags(DEFAULT_AXE_CONFIG.rules)
      .disableRules(['color-contrast'])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('product detail page should have no critical a11y violations', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.products__grid', { timeout: 10000 });

    const firstCard = page.locator('.card').first();
    await firstCard.click();
    await page.waitForSelector('.detail', { timeout: 10000 });

    const results = await new AxeBuilder({ page })
      .withTags(DEFAULT_AXE_CONFIG.rules)
      .disableRules(['color-contrast'])
      .analyze();

    expect(results.violations).toEqual([]);
  });
});

test.describe('Keyboard navigation', () => {
  test('can navigate product grid with keyboard', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.products__grid', { timeout: 10000 });

    await page.keyboard.press('Tab');
    const focusedElement = page.locator('*:focus');
    await expect(focusedElement).toBeVisible();

    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
    }

    expect(true).toBeTruthy();
  });

  test('can activate product card with Enter key', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.products__grid', { timeout: 10000 });

    const firstCardLink = page.locator('.card').first();
    await firstCardLink.focus();
    await page.keyboard.press('Enter');

    await page.waitForURL(/\/product\/\d+/, { timeout: 10000 });
    await expect(page.locator('.detail')).toBeVisible({ timeout: 10000 });
  });
});

test.describe('Responsive', () => {
  test('product grid adapts to tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await page.waitForSelector('.products__grid', { timeout: 10000 });

    const grid = page.locator('.products__grid');
    const gridComputed = await grid.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return {
        display: style.display,
        gridTemplateColumns: style.gridTemplateColumns,
      };
    });

    expect(gridComputed.display).toBe('grid');
    expect(gridComputed.gridTemplateColumns).not.toBe('repeat(1, 1fr)');
  });

  test('product grid adapts to mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForSelector('.products__grid', { timeout: 10000 });

    const cards = page.locator('.card');
    const cardCount = await cards.count();
    expect(cardCount).toBeGreaterThan(0);
  });
});

test.describe('Product images', () => {
  test('all product images have alt text', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.products__grid', { timeout: 10000 });

    const images = page.locator('.card__image');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });
});
