import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {FormControl, InputLabel, Select, Slider} from "@mui/material";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import {useState} from "react";
import axios from "axios";
import {baseUrl} from "../../Actions/auth";
import {AUTH_ERROR, RECEIVE_ROOMTEMP} from "../../Actions/types";
import {returnErrors} from "../../Actions/messages";
import {useDispatch, useSelector} from "react-redux";
import IndeterminateCheckbox from "./CheckBoxValve";
import IndeterminateCheckboxWork from "./CheckBoxWorkMode";

export default function Calculation(props) {

    const [btnDisableCheckBox, setDisableCheckBox] = useState(true)
    const [perm, setPerm] = React.useState('');
    const selectedNode = props.selectedNode;

    let value=20;
    function handleSubmit() {
        // console.log("temp for fun")
        // console.log(value)
        // const config = {
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // };
        // let token = localStorage.getItem('token_access')
        // if (token) {
        //     config.headers['Authorization'] = `JWT ${token}`;
        // }
        // var id = selectedNode
        // var fanOpen = document.getElementById("fanOpen").checked
        // let sleepMode = document.getElementById("workMode1").checked
        // let optimalMode = document.getElementById("workMode2").checked;
        // let manualMode = document.getElementById("workMode3").checked
        //
        // if((sleepMode && optimalMode) ||(sleepMode && manualMode) || (optimalMode && manualMode) ){
        //     alert("Please Check only one mode");
        //     return;
        // }
        //
        // let valve1 = document.getElementById('valve1').checked;
        // let valve2 = document.getElementById('valve2').checked;
        // let valve3 = document.getElementById('valve3').checked;
        // let data = {nodeid:id.id,temp:value,fanopen:fanOpen,perm:perm,valve1:valve1,valve2:valve2,valve3:valve3,sleepMode:sleepMode,optimalMode:optimalMode,manualMode:manualMode}
        // console.log(fanOpen)
        // console.log("sent data: ")
        // console.log(data)
        // axios
        //     .post(baseUrl+'api/users/setnodeconfig/' , data,config)
        //     .then((res) => {
        //         console.log("data sent")
        //     })
    }

    return (
        <React.Fragment>
            <Typography variant="h3" gutterBottom>
                Calculation
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={3}>
                    <Typography variant="h5">
                        Surface area
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={9}>

                    <TextField
                        id="setpoint"
                        name="setpoint"
                        label="Surface area"
                        fullWidth
                        autoComplete="25"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Typography variant="h5">
                        Daily participation
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={9}>

                    <TextField
                        id="setpoint"
                        name="setpoint"
                        label="Daily participation"
                        fullWidth
                        autoComplete="25"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Typography variant="h5">
                        Minimum daily temperature
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={9}>

                    <TextField
                        id="setpoint"
                        name="setpoint"
                        label="Minimum temperature"
                        fullWidth
                        autoComplete="25"
                        variant="standard"
                    />
                </Grid>

                <Grid item xs={12} sm={3}>
                    <Typography variant="h5">
                        Maximum daily temperature
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={9}>

                    <TextField
                        id="setpoint"
                        name="setpoint"
                        label="Maximum temperature"
                        fullWidth
                        autoComplete="25"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Typography variant="h5">
                        Height from sea level
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={9}>

                    <TextField
                        id="setpoint"
                        name="setpoint"
                        label="Height from sea level"
                        fullWidth
                        autoComplete="25"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Typography variant="h5">
                        Maximum wind speed
                    </Typography>
                </Grid>


                <Grid item xs={12} sm={9}>

                    <TextField
                        id="setpoint"
                        name="setpoint"
                        label="Maximum wind speed"
                        fullWidth
                        autoComplete="25"
                        variant="standard"
                    />
                </Grid>

                <Grid item xs={12} sm={3}>
                    <Typography variant="h5">
                        Minimum wind speed
                    </Typography>
                </Grid>


                <Grid item xs={12} sm={9}>

                    <TextField
                        id="setpoint"
                        name="setpoint"
                        label="Minimum wind speed"
                        fullWidth
                        autoComplete="25"
                        variant="standard"
                    />
                </Grid>

                <Grid item xs={12} sm={3}>
                    <Typography variant="h5">
                        R_n
                    </Typography>
                </Grid>


                <Grid item xs={12} sm={9}>

                    <TextField
                        id="setpoint"
                        name="setpoint"
                        label="R_n"
                        fullWidth
                        autoComplete="25"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained">Water need</Button>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
