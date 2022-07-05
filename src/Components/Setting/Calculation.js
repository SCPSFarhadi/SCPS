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
        console.log("hello world")
        let s = parseFloat(document.getElementById("surfaceArea").value);
        let p = parseFloat(document.getElementById("dailyPart").value);
        let T_min = parseFloat(document.getElementById("minimumDaily").value);
        let T_max = parseFloat(document.getElementById("maxDaily").value);
        let h = parseFloat(document.getElementById("heightSea").value);
        let u_max = parseFloat(document.getElementById("maximumWind").value);
        let u_min = parseFloat(document.getElementById("minimumWind").value);
        let R_n = parseFloat(document.getElementById("R_n").value);
        let k_c = parseFloat(document.getElementById("cropCoeif").value);

        console.log(s+p+T_min+T_max+h+u_min+u_max+R_n+k_c)
        let temp1; //Dry Tem
        let temp2; //Wet T
        let T;
        let u_2;
        let deltea;
        T=T_max-T_min;
        let y;
        let et0;
        let e0min;
        let e0max;
        let e_a;
        let e_s;
        let waterneed;
        y=0.655*0.001*101352*Math.pow(1-2.25577*0.00001*h,5.25588);
        u_2=(u_max-u_min)/2;
        deltea=4098*[(0.6108*Math.pow(Math.E,(17.27*T)/(T+273.3)))/Math.pow((17.27*T)/(T+273.3),2)]

        e0min=4098*0.6108*Math.pow(Math.E,(17.27*T_min)/(T_min+273.3));

        e0max=4098*0.6108*Math.pow(Math.E,(17.27*T_max)/(T_max+273.3));

        e_a=(96*e0max+96*e0min)/2;

        e_s=(96*e0max+e0min)/2;

        et0=(0.408*deltea*(R_n)+y*(900/(T+273)*u_2*(e_s-e_a)))/(deltea+y*(1+0.34*u_2));

        waterneed=et0*s*k_c-p;
        alert(waterneed)

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
                        id="surfaceArea"
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
                        id="dailyPart"
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
                        id="minimumDaily"
                        name="setpoint"
                        label="Minimum temperature"
                        fullWidth
                        autoComplete="25"
                        variant="standard"
                    />
                </Grid>

                <Grid item xs={12} sm={3}>
                    <Typography variant="h5">
                        Crop coefficient
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={9}>

                    <TextField
                        id="cropCoeif"
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
                        id="maxDaily"
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
                        id="heightSea"
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
                        id="maximumWind"
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
                        id="minimumWind"
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
                        id="R_n"
                        name="setpoint"
                        label="R_n"
                        fullWidth
                        autoComplete="25"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" onClick={handleSubmit}>Water need</Button>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
