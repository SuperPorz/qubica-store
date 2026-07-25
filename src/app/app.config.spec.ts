import { describe, it, expect } from 'vitest';
import { appConfig } from './app.config';

describe('appConfig', () => {
  it('should have at least 3 providers (HttpClient, Router, Animations)', () => {
    expect(appConfig.providers).toBeDefined();
    expect(Array.isArray(appConfig.providers)).toBe(true);
    expect(appConfig.providers.length).toBeGreaterThanOrEqual(3);
  });

  it('should have a valid providers array (not empty)', () => {
    expect(appConfig.providers.length).toBeGreaterThan(0);
  });
});
