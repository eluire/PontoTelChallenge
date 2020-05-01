import React from "react";
import { Switch, Route, Redirect } from "react-router";
import Home from "./Components/Home/Home";
import Consulta from "./Components/Consulta/Consulta";
import Bovespa from "./Components/Bovespa/Bovespa";
import ConsultaPersonalizada from "./Components/ConsultaPersonalizada/ConsultaPersonalizada";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/consulta" component={Consulta} />
      <Route path="/bovespa" component={Bovespa} />
      <Route path="/consulta_personalizada" component={ConsultaPersonalizada} />
      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default Routes;
