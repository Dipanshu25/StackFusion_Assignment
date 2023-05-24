import React from "react";
import { Switch, Route } from "react-router-dom";

import ListComp from "./listComponent.js";

export default function AppRoutes() {
  return (
    <main>
      <Switch>
        <Route exact path="/list" component={() => <ListComp />} />
      </Switch>
    </main>
  );
}
