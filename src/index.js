import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { ThemeProvider } from "styled-components";

const root = ReactDOM.createRoot(document.getElementById("root"));

const theme = {
  colors: {
    primary_300: "#435512",
    primary_400: "#254113",
    primary_500: "#721198",
  },
};

root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
