import React, { lazy, Suspense, useState, useEffect } from "react";
// import { ReactDOM } from "react";
// import {mount} from 'marketing/MarketingApp';
// import MarketingApp from "./components/MarketingApp";
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Header from "./components/Header";
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
// import AuthApp from "./components/AuthApp";
import Progress from "./components/Progress";
import {createBrowserHistory} from 'history';

const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));
const DashboardLazy = lazy(() => import('./components/DashboardApp'));
// console.log(mount);
const generateClassName = createGenerateClassName({
    productionPrefix: 'co',
});
const history = createBrowserHistory();

export default () => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    useEffect(() => {
        if(isSignedIn) {
            history.push('/dashboard');
        }
    }, [isSignedIn]);

    return (
        <Router history={history}>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)} />
                    <Suspense fallback={<Progress />}>
                        <Switch>
                            <Route path="/auth" >
                                <AuthLazy onSignIn={() => setIsSignedIn(true)} />
                            </Route>
                            <Route path="/dashboard">
                                {!isSignedIn && <Redirect to="/" /> }
                                <DashboardLazy  />
                            </Route>
                            <Route path="/" component={MarketingLazy}></Route>
                        </Switch>
                    </Suspense>


                </div>
            </StylesProvider>
        </Router>



    );
}