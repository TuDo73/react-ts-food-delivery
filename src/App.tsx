import React from "react";
// Router
import {
  BrowserRouter as Router,
  Switch as Routes,
  Route,
} from "react-router-dom";

// Components
import Home from "pages/Home";
import Payment from "pages/Payment";
import Header from "components/Header";
import Footer from "components/Footer";
import ScrollToTop from "components/ScrollToTop";

// Context
import ScreenProvider from "contexts/screen";
import LoadingProvider from "contexts/loading";

// Styles
import { Global } from "@emotion/react";
import { GlobalStyles } from "./styles/GlobalStyles";

function App() {
  return (
    <ScreenProvider>
      <LoadingProvider>
        <Router>
          <ScrollToTop />
          <div className="App">
            <Global styles={GlobalStyles} />
            <Header />
            <Routes>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/payment">
                <Payment />
              </Route>
            </Routes>
            <Footer />
          </div>
        </Router>
      </LoadingProvider>
    </ScreenProvider>
  );
}

export default App;
