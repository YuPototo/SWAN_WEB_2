import { ReactElement } from "react";
import { Switch, Route } from "react-router-dom";
import useGoogleAnalytics from "../../analytics/useAnalytics";

import routeDict from "./routeDict";

import Home from "../pageHome/Home";
import Profile from "../pageProfile/Profile";
import Signup from "../pageSignup/Signup";
import Login from "../pageLogin/Login";
import SubmitPost from "../pageSubmitPost/SubmitPost";
import EditPost from "../pageEditPost/EditPost";
import PagePost from "../pagePost/PagePost";
import NotFound from "../page404/NotFound";
import TalkToMe from "../pageStatics/TalkToMe";
import About from "../pageStatics/About";
import Privacy from "../pageStatics/Privacy";
import UserTerms from "../pageStatics/UserTerms";
import Forum from "../pageForum/PageForum";

export default function Routes(): ReactElement {
    useGoogleAnalytics();

    return (
        <Switch>
            <Route exact path={routeDict.home.path}>
                <Home />
            </Route>
            <Route path={routeDict.profile.path}>
                <Profile />
            </Route>
            <Route path={routeDict.signup.path}>
                <Signup />
            </Route>
            <Route path={routeDict.login.path}>
                <Login />
            </Route>
            <Route path={routeDict.submitPost.path}>
                <SubmitPost />
            </Route>
            <Route path={routeDict.postPage.path}>
                <PagePost />
            </Route>
            <Route path={routeDict.editPost.path}>
                <EditPost />
            </Route>
            <Route path={routeDict.talkToMe.path}>
                <TalkToMe />
            </Route>
            <Route path={routeDict.about.path}>
                <About />
            </Route>
            <Route path={routeDict.privacy.path}>
                <Privacy />
            </Route>
            <Route path={routeDict.userTerms.path}>
                <UserTerms />
            </Route>
            <Route path={routeDict.forum.path}>
                <Forum />
            </Route>
            <Route component={NotFound} />
        </Switch>
    );
}
