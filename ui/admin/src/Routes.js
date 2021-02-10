import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./common/Layout";
import Dashboard from "./components/dashboard/Dashboard";

const Routes = () => (
  <Layout>
    <Switch>
      <Route path="/" exact component={Dashboard} />
    </Switch>
  </Layout>
);

export default Routes;
