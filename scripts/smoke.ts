const endpoint = process.env.SK_DEPLOYMENT_URL?.replace(/\/$/, "");

if (!endpoint) {
  throw new Error("SK_DEPLOYMENT_URL environment variable is missing.");
}

type Check = {
  name: string;
  path: string;
  status: number;
  includes?: string[];
};

const checks: Check[] = [
  {
    name: "home page",
    path: "/",
    status: 200,
    includes: ["<title>Stormkit | Sample Project</title>"],
  },
  {
    name: "data loader fills the product page",
    path: "/products/1",
    status: 200,
    includes: [
      "<title>Essence Mascara Lash Princess · Stormkit Dynamic Pages</title>",
      'property="og:title" content="Essence Mascara Lash Princess"',
    ],
  },
  {
    name: "data loader passes through upstream 404",
    path: "/products/99999",
    status: 404,
  },
];

(async () => {
  let failed = false;

  for (const check of checks) {
    try {
      const res = await fetch(`${endpoint}${check.path}`, {
        redirect: "manual",
      });

      const content = await res.text();
      const missing = (check.includes || []).filter((s) => !content.includes(s));

      if (res.status !== check.status || missing.length > 0) {
        failed = true;
        console.log(
          `✗ ${check.name}: status ${res.status} (want ${check.status})` +
            (missing.length ? `, missing: ${missing.join(" | ")}` : "")
        );
      } else {
        console.log(`✓ ${check.name}`);
      }
    } catch (e) {
      failed = true;
      console.log(`✗ ${check.name}: request failed (${e})`);
    }
  }

  process.exit(failed ? 1 : 0);
})();
