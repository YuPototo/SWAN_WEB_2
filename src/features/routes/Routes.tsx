import { ReactElement } from "react";
import { Switch, Route } from "react-router-dom";

import routeDict from "./routeDict";

import Home from "../pageHome/Home";
import Profile from "../pageProfile/Profile";
import NotFound from "../page404/NotFound";

export default function Routes(): ReactElement {
    return (
        <Switch>
            <Route exact path={routeDict.home.path}>
                <Home />
            </Route>
            <Route path={routeDict.profile.path}>
                <Profile />
            </Route>
            <Route component={NotFound} />
        </Switch>
    );
}
