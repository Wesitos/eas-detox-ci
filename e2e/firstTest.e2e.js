const METRO_URL = 'http://localhost:8081'

const handleDevClientReuse = async () => {
  try {
    await element(by.text('Enter URL manually')).tap();
  } catch {
    // We're not using dev-client
    return;
  }

  await element(by.id('DevLauncherURLInput')).typeText(METRO_URL);
  await element(by.text('Connect')).tap();
};

const handleDevClient = async () => {
  try {
    await expect(element(by.text('Enter URL manually'))).toBeVisible();
  } catch {
    // We're not using dev-client
    return;
  }

  try {
    await element(by.text(METRO_URL)).tap();
  } catch {
    await handleDevClientReuse();
    return;
  }

  await element(by.text('Got It')).tap();
  await element(by.text('Go home')).tap();
};

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp({
      newInstance: true,
    });

    // When using the dev client and not reusing the app
    await handleDevClient();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should show hello screen on launch', async () => {
    await expect(element(by.text('Hello world!'))).toBeVisible();
  });
});
