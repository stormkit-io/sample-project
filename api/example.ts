import * as http from "node:http";

export default (req: http.IncomingMessage) => {
  return {
    body: "Example API response",
    headers: {
      "X-Custom-Header": "Sample Project",
    },
    status: 200,
  };
};
