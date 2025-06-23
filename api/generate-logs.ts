import * as http from "node:http";

// Using object-return syntax
export default (req: http.IncomingMessage) => {
  for (let i = 0; i < 250; i++) {
    console.log(`Log entry number ${i + 1}`);
  }

  return {
    body: "Example API response",
    headers: {
      "X-Custom-Header": "Sample Project",
    },
    status: 200,
  };
};
