import * as http from "http";
import fetch from "node-fetch";

export default (req: http.IncomingMessage, res: http.ServerResponse) => {
  console.log("sample log from sample-project");

  fetch("https://api.stormkit.io", {
    referrerPolicy: "strict-origin-when-cross-origin",
    body: null,
    method: "GET",
  }).then(async (data) => {
    const text = await data.text();

    res.setHeader("Content-Type", "application/json");
    res.write(
      JSON.stringify({
        apiVersion: text.split("Version: ")[1].split(/\s/)[0],
      })
    );

    res.end();
  });
};
