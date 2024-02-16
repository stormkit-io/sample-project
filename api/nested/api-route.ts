import * as http from "node:http";
import qs from "query-string";

export default (req: http.IncomingMessage) => {
  const parsed = qs.parse(req.url.split("?")[1] || "");

  return {
    body: `nested/api-route path query: ${JSON.stringify(parsed)}`,
    status: 200,
  };
};
