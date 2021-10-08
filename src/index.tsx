import React from "react";
import ReactDOM from "react-dom";
import "styles/index.css";
import App from "./App";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

const emotionCache = createCache({
  key: "my-lower-case-alphabetical-cache-key",
});
emotionCache.compat = true;

ReactDOM.render(
  <React.StrictMode>
    <CacheProvider value={emotionCache}>
      <App />
    </CacheProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
