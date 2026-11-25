import { expect, test } from '@playwright/test';

test('loads the local UI, API health response and shared Remotion composition', async ({
  page,
  request,
}) => {
  const pageErrors: string[] = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));

  const apiResponse = await request.get('/api/health');
  expect(apiResponse.status()).toBe(200);
  expect(await apiResponse.json()).toEqual({
    status: 'ok',
    service: 'TechVideoGenerator.Api',
  });

  const healthResponsePromise = page.waitForResponse(
    (response) => new URL(response.url()).pathname === '/api/health',
  );

  await page.goto('/');

  const healthResponse = await healthResponsePromise;
  expect(healthResponse.status()).toBe(200);
  expect(await healthResponse.json()).toEqual({
    status: 'ok',
    service: 'TechVideoGenerator.Api',
  });

  const serverAddress = await healthResponse.serverAddr();
  expect(serverAddress).not.toBeNull();
  expect(['127.0.0.1', '::1']).toContain(serverAddress!.ipAddress);

  await expect(
    page.getByRole('heading', { name: 'Tech Video Generator', exact: true }),
  ).toBeVisible();
  await expect(page.getByTestId('api-status')).toHaveText('API disponible: ok');
  await expect(page.getByTestId('remotion-player')).toBeVisible();
  await expect(page.getByTestId('tech-video-composition')).toBeVisible();
  expect(pageErrors).toEqual([]);
});
