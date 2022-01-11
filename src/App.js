import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import viVN from "antd/lib/locale-provider/vi_VN";
import Admin from "./page/admin";
import Home from "./page/home";

const App = () => {
  return (
    <ConfigProvider locale={viVN}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/Home" component={Home} />
        </Switch>
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
