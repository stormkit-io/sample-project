/**
 * Documentation page: https://www.stormkit.io/docs/deployments/status-checks
 *
 * 1. Visit https://app.stormkit.io
 * 2. Go to **Your App** > **Your environment** > **Status Checks**
 * 3. Add a new status check with the following command: npm run test:puppeeter
 *
 * Every time Stormkit will deploy your application, it will run this script
 * and publish the deployment only if this test passes.
 */

import puppeteer from "puppeteer";

const endpoint = process.env.SK_DEPLOYMENT_URL;

if (!endpoint) {
  throw new Error("SK_DEPLOYMENT_URL environment variable is missing.");
}

(async () => {
  // See https://pptr.dev/troubleshooting#setting-up-chrome-linux-sandbox
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // Set viewport width and height (no need in reality, just here for an example)
  await page.setViewport({ width: 1280, height: 720 });

  await page.goto(endpoint, { waitUntil: "networkidle0" });

  // Should click on the `Click to see` button
  await page.locator("text/Click to see").click();

  // Then we should receive an API response with an example data
  const apiResponseWrapper = await page.waitForSelector(".cm-content", {
    timeout: 5000,
  });

  await page.waitForSelector("text/https://www.stormkit.io/docs/writing-apis", {
    timeout: 5000,
  });

  const apiResponse = await apiResponseWrapper.evaluate((el) => el.textContent);

  // Finally close the browser
  await browser.close();

  console.log("API Response:\n");

  // This should be a JSON response
  console.log(JSON.parse(apiResponse));

  console.log("\nSuccess 🎉");

  process.exit(0);
})();
