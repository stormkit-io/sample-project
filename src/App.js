import React from "react";
import logo from "./logo.png";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>This is your first app on Stormkit.</p>
        <div>
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
      </header>
    </div>
  );
}

export default App;
