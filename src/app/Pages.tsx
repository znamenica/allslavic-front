import Navigation from "./Navigation";
import * as React from "react";
import {
    Routes,
    Route,
} from "react-router-dom";
import Layout from "./containers/Layout";
import Home from "./pages/Home";
import Tools from "./pages/Tools";
import Dictionary from "./pages/Dictionary";
import Grammar from "./pages/Grammar";

const Pages = () => {
    return (
        <>
            <Navigation />
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/tools" element={<Tools />} />
                    <Route path="/grammar" element={<Grammar />} />
                    <Route path="/dictionary" element={<Dictionary />} />
                </Route>
            </Routes>
        </>
    );
};

export default Pages;
