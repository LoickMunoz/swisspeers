import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Container from "@material-ui/core/Container";

import Home from "./components/Home";
import Detail from "./components/Detail";

import "./App.css";

export default function App() {
  return (
    <Router>
      <Container maxWidth="xl">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/detail/:id">
            <Detail />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}
