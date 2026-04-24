import * as http from "node:http";

// Using object-return syntax
export default (req: http.IncomingMessage) => {
  const ip = req.socket.remoteAddress;

  return {
    body: `Your IP is: ${ip}`,
    headers: {
      "X-Custom-Header": "Sample Project",
    },
    status: 200,
  };
};
