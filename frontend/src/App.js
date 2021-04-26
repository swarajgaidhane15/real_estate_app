import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";

import Layout from "./hocs/Layout";

import Home from "./containers/Home";
import About from "./containers/About";
import Contact from "./containers/Contact";
import Listings from "./containers/Listings";
import ListingDetail from "./containers/ListingDetail";
import Signin from "./containers/Signin";
import Signup from "./containers/Signup";

import NotFound from "./components/NotFound";
import PrivateRoute from "./components/PrivateRoute";

import store from "./store";

import "./sass/main.scss";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/listings" component={Listings} />
            <PrivateRoute
              exact
              path="/listings/:id"
              component={ListingDetail}
            />
            <Route exact path="/login" component={Signin} />
            <Route exact path="/signup" component={Signup} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
