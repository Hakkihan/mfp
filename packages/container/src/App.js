import React from "react";
// import { ReactDOM } from "react";
// import {mount} from 'marketing/MarketingApp';
import MarketingApp from "./components/MarketingApp";
import { BrowserRouter } from 'react-router-dom';
import Header from "./components/Header";
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

// console.log(mount);
const generateClassName = createGenerateClassName({
    productionPrefix: 'co',
});

export default () => {
    return (
        <BrowserRouter>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header />
                    < MarketingApp />
                </div>
            </StylesProvider>
        </BrowserRouter>



    );
}