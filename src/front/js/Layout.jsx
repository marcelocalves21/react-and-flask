import React, { useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Context } from "./store/appContext";

import { Home } from "./pages/Home.jsx";
import { Demo } from "./pages/Demo.jsx";
import { Single } from "./pages/Single.jsx";
import { LogIn } from "./pages/LogIn.jsx";
import injectContext from "./store/appContext";

import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/Footer.jsx";
import ScrollToTop from "./component/ScrollToTop.jsx";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";
  const { store, actions } = useContext(Context);
  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <LogIn />
            </Route>
            {store.user.auth ? (
              <>
                <Route exact path="/demo">
                  <Demo />
                </Route>
                <Route exact path="/single/:theid">
                  <Single />
                </Route>
              </>
            ) : (
              <Route>
                <h1>Not found!</h1>
              </Route>
            )}

            <Route>
              <h1>Not found!</h1>
            </Route>
          </Switch>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
