import React from "react";
import { Typography } from '@material-ui/core';
import { Link } from "react-router-dom";
import SignIn from "./Components/Signin";
import HeaderComponent from "./routes/Dashboard/Header/HeaderComponent";


const App = () => {
    return (
        <div>
            {/*<SignIn />*/}
            {<HeaderComponent />}
        </div>
    );
}

export default App;