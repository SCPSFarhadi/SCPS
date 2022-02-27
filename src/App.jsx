import React, {Component, Fragment} from "react";
import './App.css'
import { Typography } from '@material-ui/core';
import {BrowserRouter, Link, Redirect, Route, Switch} from "react-router-dom";
import SignIn from "./routes/Signin";
import HeaderComponent from "./routes/Dashboard/Header/HeaderComponent";
import LineChart from "./Components/LineChart";
import Register from './routes/Register.js'
import PrivateRoute from "./Components/common/PrivateRoute";
import {Provider} from "react-redux";
import store from "./store";


import {Login} from "./routes/Login";
import SendData from "./Components/SendData";
import {loadUser} from "./Actions/auth";
import Navbar from "./routes/Dashboard/Header/testNavbar";

class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser());
    }
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    {/*<Routes>*/}
                    {/*    <Route path="/signin" element={<SignIn />} />*/}
                    {/*    <Route path="/login" element={<Login />} />*/}
                    {/*    <Route path="/" element={<HeaderComponent />} />*/}
                    {/*    <PrivateRoute path="/dashboard" element={<HeaderComponent />} />*/}
                    {/*    <Route path="/data" element={<SendData />} />*/}
                    {/*    /!*<Route path="/register">*!/*/}
                    {/*    /!*    <Register />*!/*/}
                    {/*    /!*</Route>*!/*/}
                    {/*</Routes>*/}
                    <Switch>
                        <PrivateRoute exact path="/admin" component={HeaderComponent} />
                        <Route exact path="/" render={props => {
                                return <Redirect to="/admin"/> ;
                        }} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={SignIn} />
                        <PrivateRoute exact path="/test" component={Navbar} />
                    </Switch>
                </BrowserRouter>

            </Provider>

        );
    }
}

export default App;