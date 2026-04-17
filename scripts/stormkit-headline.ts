import { chromium } from "playwright";

(async () => {
  const browser = await chromium.launch({
    executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
  });
  const page = await browser.newPage();

  await page.goto("https://www.stormkit.io", { waitUntil: "networkidle" });

  const headline = await page.locator("h1").first().textContent();

  await browser.close();

  console.log(headline?.trim());
})();
