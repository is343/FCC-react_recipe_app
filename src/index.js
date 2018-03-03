import React from "react";
import { render } from "react-dom";
import App from "./App";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const Index = () => (
  <div style={styles}>
    <App name="CodeSandbox" />
    <h2>Start editing to see some magic happen {"\u2728"}</h2>
  </div>
);

render(<App />, document.getElementById("root"));
