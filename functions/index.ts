import * as http from "node:http";
import fetch from "node-fetch";

// Using standard Node.js API
export default (req: http.IncomingMessage, res: http.ServerResponse) => {
  console.log("sample log from sample-project");

  fetch("https://api.stormkit.io", {
    referrerPolicy: "strict-origin-when-cross-origin",
    body: null,
    method: "GET",
  })
    .then(async (data) => {
      const text = await data.text();

      res.setHeader("Content-Type", "application/json");
      res.write(
        JSON.stringify({
          apiVersion: text.split("Version: ")[1].split(/\s/)[0],
        })
      );

      res.end();
    })
    .catch((e) => {
      console.log(e);

      res.setHeader("Content-Type", "application/json");
      res.write(
        JSON.stringify({
          error:
            "Something went wrong while fetching api version. Check the runtime logs for more information.",
        })
      );

      res.end();
    });
};
