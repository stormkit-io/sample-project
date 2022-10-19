import React, { useState } from "react";
import Code from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import logo from "./logo.png";
import "./App.css";

function generateApiResponse(response) {
  return `{
  "api-docs": "${response.docs}"
}`;
}

function App() {
  const [apiResponse, setApiResponse] = useState();
  const [loading, setLoading] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-content">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            This is your first app on Stormkit.
            <br />
            This small application gets shipped together with an api.
            <br />
            <a
              href="/api"
              className="App-link"
              target="_blank"
              onClick={(e) => {
                e.preventDefault();

                setLoading(true);

                fetch("/api")
                  .then(async (res) => {
                    const data = await res.json();
                    setApiResponse(data);
                  })
                  .finally(() => {
                    setLoading(false);
                  });
              }}
            >
              Click to see
            </a>
          </p>
          {loading && <div className="App-api-response">Loading...</div>}
          {apiResponse && (
            <div className="App-api-response">
              <Code
                minHeight="170px"
                maxHeight="170px"
                value={JSON.stringify(
                  {
                    "API Endpoint": `${window.location.href.replace(
                      /\/$/,
                      ""
                    )}/api`,
                    "API Version": `#${apiResponse.apiVersion}`,
                    "API Docs": "https://www.stormkit.io/docs/writing-apis",
                    Source: "https://api.stormkit.io",
                    Comment:
                      "We just made a call to `/api` to scrape the content " +
                      "of api.stormkit.io and return the version number.",
                  },
                  null,
                  2
                )}
                extensions={[json()]}
                theme="dark"
              ></Code>
            </div>
          )}
          <div className="App-links" style={{ marginBottom: "1rem" }}>
            <a
              className="App-link"
              href="https://www.stormkit.io/docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read the docs
            </a>{" "}
            |{" "}
            <a
              href="https://github.com/stormkit-dev/sample-project"
              target="_blank"
              rel="noopener noreferrer"
              className="App-link"
            >
              Fork the repo
            </a>{" "}
          </div>
        </div>
        <div className="App-social">
          <a
            href="https://twitter.com/stormkitio"
            target="_blank"
            rel="noreferrer noopener"
          >
            <i className="fab fa-twitter" />
          </a>
          <a
            href="https://www.youtube.com/channel/UC6C_-UuAiIWlGOIokT03lRQ"
            target="_blank"
            rel="noreferrer noopener"
          >
            <i className="fab fa-youtube" />
          </a>
        </div>
      </header>
    </div>
  );
}

export default App;
