import puppeteer from "puppeteer";

const endpoint = process.env.SK_DEPLOYMENT_URL;

if (!endpoint) {
  throw new Error("SK_DEPLOYMENT_URL environment variable is missing.");
}

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set viewport width and height
  await page.setViewport({ width: 1280, height: 720 });

  await page.goto(endpoint, { waitUntil: "networkidle0" });
  await browser.close();

  console.log("Worked!");
  process.exit(0);
})();
