import React from "react";
import './App.css'
import { Typography } from '@material-ui/core';
import { Link } from "react-router-dom";
import SignIn from "./routes/Signin";
import HeaderComponent from "./routes/Dashboard/Header/HeaderComponent";
import LineChart from "./Components/LineChart";


const App = () => {
    return (
        <div>
            {/*<SignIn />*/}
            {<HeaderComponent />}


        </div>
    );
}

export default App;