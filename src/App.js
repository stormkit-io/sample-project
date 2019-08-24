import React from "react";
import logo from "./logo.png";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-content">
          <img src={logo} className="App-logo" alt="logo" />
          <p>This is your first app on Stormkit.</p>
          <div className="App-links">
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
