import React , {Fragment} from "react";
import './App.css'
import { Typography } from '@material-ui/core';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import SignIn from "./routes/Signin";
import HeaderComponent from "./routes/Dashboard/Header/HeaderComponent";
import LineChart from "./Components/LineChart";
import Register from './routes/Register.js'
import {Login} from "./routes/Login";

const App = () => {
    return (
        <BrowserRouter>
                    <Routes>
                        <Route path="/signin" element={<SignIn />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/" element={<HeaderComponent />} />
                        <Route path="/dashboard" element={<HeaderComponent />} />
                        {/*<Route path="/register">*/}
                        {/*    <Register />*/}
                        {/*</Route>*/}
                    </Routes>
        </BrowserRouter>

    );
}

export default App;