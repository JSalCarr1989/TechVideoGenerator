import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/integration/browser',
  fullyParallel: false,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:5081',
    headless: true,
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'dotnet run --no-build --project src/api/TechVideoGenerator.Api.csproj --launch-profile Integrated',
    url: 'http://127.0.0.1:5081/api/health',
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
