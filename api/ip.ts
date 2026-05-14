import * as http from "node:http";

// Using object-return syntax
export default (req: http.IncomingMessage) => {
  const ip = req.socket.remoteAddress;
  const id = req.headers["x-user-id"] || "unknown";

  return {
    body: { ip, id },
    headers: {
      "X-Custom-Header": "Sample Project",
      "Content-Type": "application/json",
    },
    status: 200,
  };
};
