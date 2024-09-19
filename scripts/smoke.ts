const endpoint = process.env.SK_DEPLOYMENT_URL;

if (!endpoint) {
  throw new Error("SK_DEPLOYMENT_URL environment variable is missing.");
}

(async () => {
  try {
    const data = await fetch(endpoint);
    const content = await data.text();

    if (content.includes("<title>Stormkit | Sample Project</title>")) {
      console.log("Success!");
      process.exit(0);
    } else {
      console.log("Title is missing");
      process.exit(1);
    }
  } catch {
    console.log("Error while making request");
    process.exit(1);
  }
})();
