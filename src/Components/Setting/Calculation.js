import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {ButtonGroup, FormControl, Input, InputLabel, ListItem, Select, Slider} from "@mui/material";
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

import List from "@mui/material/List";

export default function Calculation(props) {

    const [btnDisableCheckBox, setDisableCheckBox] = useState(true)
    const [perm, setPerm] = React.useState('');
    const [variant, setVariant] = useState('standard');
    const [shrink, setShrink] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState('');
    const [value4, setValue4] = useState('');
    const [value5, setValue5] = useState('');
    const [waterneedText, setWaterneedText] = useState('');
    const selectedNode = props.selectedNode;

    const handleChange1 = (event) => {setValue1(event.target.value);};
    const handleChange2 = (event) => {setValue2(event.target.value);};
    const handleChange3 = (event) => {setValue3(event.target.value);};
    const handleChange4 = (event) => {setValue4(event.target.value);};
    const handleChange5 = (event) => {setValue5(event.target.value);};
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    let value=20;

    const lookup_table =
        {'-40': {'1': 70, '2': 41, '3': 11},
         '-35': {'1': 75, '2': 51, '3': 26, '4': 2},
         '-30': {'1': 79, '2': 58, '3': 38, '4': 18},
         '-25': {'1': 82, '2': 65, '3': 47, '4': 30, '5': 13},
         '-20': {'1': 85, '2': 69, '3': 54, '4': 39, '5': 24, '6': 10},
         '-15': {'1': 87, '2': 73, '3': 60, '4': 48, '5': 35, '6': 22, '7': 10},
         '-10': {'1': 88, '2': 77, '3': 66, '4': 54, '5': 43, '6': 32, '7': 21, '8': 11, '9': 1},
         '-5': {'1': 90, '2': 80, '3': 70, '4': 60, '5': 50, '6': 42, '7': 37, '8': 22, '9': 12, '10': 3},
         '0': {'1': 91, '2': 82, '3': 73, '4': 65, '5': 56, '6': 47, '7': 39, '8': 31, '9': 23, '10': 15},
         '5': {'1': 92, '2': 84, '3': 76, '4': 68, '5': 61, '6': 53, '7': 46, '8': 38, '9': 31, '10': 24},
         '10': {'1': 93, '2': 86, '3': 78, '4': 71, '5': 65, '6': 58, '7': 51, '8': 45, '9': 38, '10': 32, '15': 1},
         '15': {'1': 93, '2': 87, '3': 80, '4': 74, '5': 68, '6': 62, '7': 56, '8': 50, '9': 44, '10': 38, '15': 11},
         '20': {'1': 94, '2': 88, '3': 82, '4': 76, '5': 71, '6': 65, '7': 60, '8': 54, '9': 49, '10': 44, '15': 19},
         '25': {'1': 94, '2': 89, '3': 84, '4': 78, '5': 73, '6': 68, '7': 63, '8': 58, '9': 53, '10': 48, '15': 25, '20': 4},
         '30': {'1': 95, '2': 90, '3': 85, '4': 80, '5': 75, '6': 70, '7': 66, '8': 61, '9': 57, '10': 52, '15': 31, '20': 12},
         '35': {'1': 95, '2': 90, '3': 86, '4': 81, '5': 77, '6': 72, '7': 68, '8': 64, '9': 60, '10': 55, '15': 36, '20': 18, '25': 2},
         '40': {'1': 95, '2': 91, '3': 87, '4': 82, '5': 78, '6': 74, '7': 70, '8': 66, '9': 62, '10': 58, '15': 40, '20': 24, '25': 8},
         '45': {'1': 96, '2': 92, '3': 87, '4': 83, '5': 80, '6': 76, '7': 72, '8': 68, '9': 64, '10': 61, '15': 44, '20': 28, '25': 14, '30': 1},
         '50': {'1': 96, '2': 92, '3': 88, '4': 84, '5': 81, '6': 77, '7': 73, '8': 70, '9': 66, '10': 63, '15': 47, '20': 32, '25': 19, '30': 7},
         '55': {'1': 96, '2': 92, '3': 89, '4': 85, '5': 82, '6': 78, '7': 75, '8': 71, '9': 68, '10': 65, '15': 50, '20': 36, '25': 23, '30': 12, '35': 1},
         '60': {'1': 96, '2': 93, '3': 89, '4': 86, '5': 82, '6': 79, '7': 76, '8': 73, '9': 70, '10': 67, '15': 52, '20': 39, '25': 27, '30': 16, '35': 6},
         '65': {'1': 97, '2': 93, '3': 90, '4': 86, '5': 83, '6': 80, '7': 77, '8': 74, '9': 71, '10': 68, '15': 54, '20': 42, '25': 30, '30': 20, '35': 11, '40': 1},
         '70': {'1': 97, '2': 93, '3': 90, '4': 87, '5': 84, '6': 81, '7': 78, '8': 75, '9': 72, '10': 69, '15': 56, '20': 44, '25': 33, '30': 23, '35': 14, '40': 6},
         '75': {'1': 97, '2': 94, '3': 91, '4': 87, '5': 85, '6': 82, '7': 79, '8': 76, '9': 73, '10': 70, '15': 58, '20': 46, '25': 36, '30': 26, '35': 18, '40': 10, '45': 3},
         '80': {'1': 97, '2': 94, '3': 91, '4': 88, '5': 85, '6': 82, '7': 79, '8': 77, '9': 74, '10': 72, '15': 59, '20': 48, '25': 38, '30': 29, '35': 21, '40': 13, '45': 6},
         '85': {'1': 97, '2': 94, '3': 91, '4': 88, '5': 86, '6': 83, '7': 80, '8': 78, '9': 75, '10': 72, '15': 61, '20': 50, '25': 40, '30': 31, '35': 23, '40': 16, '45': 9, '50': 2},
         '90': {'1': 97, '2': 94, '3': 91, '4': 89, '5': 86, '6': 83, '7': 81, '8': 78, '9': 76, '10': 73, '15': 62, '20': 51, '25': 42, '30': 33, '35': 26, '40': 18, '45': 12, '50': 6},
         '95': {'1': 97, '2': 94, '3': 92, '4': 89, '5': 86, '6': 84, '7': 81, '8': 79, '9': 76, '10': 74, '15': 63, '20': 53, '25': 44, '30': 35, '35': 28, '40': 21, '45': 15, '50': 9},
         '100': {'1': 97, '2': 95, '3': 92, '4': 89, '5': 87, '6': 84, '7': 82, '8': 79, '9': 77, '10': 75, '15': 64, '20': 54, '25': 45, '30': 37, '35': 30, '40': 23, '45': 17, '50': 11},};
    function handleSubmit() {
        console.log("calculate waterneed")
        let s = parseFloat(document.getElementById("surfaceArea").value);
        let p = parseFloat(document.getElementById("dailyPart").value);
        let T_min = parseFloat(document.getElementById("minimumDaily").value);
        let T_max = parseFloat(document.getElementById("maxDaily").value);
        let h = parseFloat(document.getElementById("heightSea").value);
        let u_max = parseFloat(document.getElementById("maximumWind").value);
        let u_min = parseFloat(document.getElementById("minimumWind").value);
        let R_n = parseFloat(document.getElementById("R_n").value);
        let k_c = parseFloat(document.getElementById("cropCoeif").value);
        let dry = parseInt(document.getElementById('dry_temp').textContent.split(' ')[2]);
        let wet = parseInt(document.getElementById('wet_temp').textContent.split(' ')[2]);
        console.log("s:"+s)
        console.log("p:"+p)
        console.log('T_min:'+T_min)
        console.log('T_max:'+T_max)
        console.log('h:'+h)
        console.log(wet)
        console.log(dry)

        // let tim = parseInt(s)  / parseInt(R_n)  *1000;
        // console.log(tim)
        // var timesRun = 0;
        // var interval = setInterval(function(){
        //     timesRun += 1000;
        //     if(timesRun === parseInt(R_n)*1000){
        //         clearInterval(interval);
        //     }
        //     console.log("a message to server "+timesRun)
        // }, tim);

        let first_key = (dry < -40)? -40: (dry > 100)? 100: Math.ceil(dry/5)*5;
        let second_key = (dry-wet <= 10)? Math.ceil(dry-wet): Math.ceil((dry-wet)/5)*5;
        let rh = lookup_table[first_key.toString()][second_key.toString()]
        if (isNaN(rh)) rh = 0;
        console.log(rh)
        let T;
        let u_2;
        let deltea;
        let y;
        let et0;
        let e0min;
        let e0max;
        let e_a;
        let e_s;
        let waterneed;

        T=(T_max-T_min)/2;
        console.log("t is :" + T)
        y=0.655*0.001*101352*Math.pow(1-2.25577*0.00001*h,5.25588);
        console.log("gamma is :" + y)
        u_2=(u_max-u_min)/2;
        console.log("u_2 is :" + u_2)
        deltea=4098*[(0.6108*Math.pow(Math.E,((17.27*T)/(T+273.3))))/Math.pow((T+273.3),2)]
        console.log("delta is :" + deltea)
        e0min=0.6108*Math.pow(Math.E,(17.27*T_min)/(T_min+273.3));
        console.log("e0min is :" + e0min)
        e0max=0.6108*Math.pow(Math.E,(17.27*T_max)/(T_max+273.3));
        console.log("e0max is :" + e0max)
        e_a=(rh*e0max+rh*e0min)/2;
        console.log("ea is :" + e_a)
        e_s=(rh*e0max+e0min)/2;
        console.log("es is :" + e_s)
        et0=(0.408*deltea*(R_n)+y*(900/(T+273)*u_2*(e_s-e_a)))/(deltea+y*(1+0.34*u_2));
        console.log("et0 is :" + et0)
        waterneed=et0*s*k_c-s*p;
        setWaterneedText(waterneed);

    }

    return (
        <React.Fragment>
            <Typography variant="h3" gutterBottom>
                Calculation
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={3}>
                    <Typography variant="h5">
                        City Name
                    </Typography>
                </Grid>


                <Grid item xs={12} sm={9}>

                    <TextField
                        id="city_name"
                        name="setpoint"
                        label="city_name"
                        fullWidth
                        autoComplete="25"
                        variant="standard"
                    />
                </Grid>
                {/*<Grid item xs={12} sm={3}>*/}
                {/*    <Typography variant="h5">*/}
                {/*        Latitude*/}
                {/*    </Typography>*/}
                {/*</Grid>*/}

                {/*<Grid item xs={12} sm={9}>*/}

                {/*    <TextField*/}
                {/*        id="latitude"*/}
                {/*        name="setpoint"*/}
                {/*        label="Latitude"*/}
                {/*        fullWidth*/}
                {/*        autoComplete="25"*/}
                {/*        variant="standard"*/}
                {/*    />*/}
                {/*</Grid>*/}

                <Grid item xs={12}>
                    <Button variant="contained" onClick={()=>{
                        var databuilt = {'city_name':document.getElementById('city_name').value}
                        axios
                            .post(baseUrl+'api/users/weather/' , databuilt,config)

                            .then((res) => {
                                let y = JSON.parse(res.data)
                                setShrink(true)
                                setVariant('filled')
                                setDisabled(true)
                                setValue1(y['rain']['1h']*1000)
                                setValue2(y['main']['temp_min'])
                                setValue3(y['main']['temp_max'])
                            })

                    }}>Get Data</Button>
                </Grid>


                <Grid item xs={12} sm={12}>
                    <Typography variant="h4">
                        Calculate
                    </Typography>
                </Grid>

                <Grid item xs={6} sm={6}>
                    <List>
                        <ListItem>
                            <TextField label="Daily Participation" onChange={handleChange1} value={value1} disabled={disabled} variant={variant} shrink={shrink} style={{width: "100%"}} id='dailyPart' />
                        </ListItem>
                        <ListItem>
                            <TextField label="Min daily Temp" onChange={handleChange2} value={value2} disabled={disabled} variant={variant} shrink={shrink} style={{width: "100%"}} id='minimumDaily'/>
                        </ListItem>
                        <ListItem>
                            <TextField label="Max daily Temp" onChange={handleChange3} value={value3} disabled={disabled} variant={variant} shrink={shrink} style={{width: "100%"}} id='maxDaily'/>
                        </ListItem>
                    </List>
                </Grid>

                <Grid item xs={6} sm={6}>
                    <List>
                        <ListItem>
                            <TextField label="Min wind speed" onChange={handleChange4} value={value4} disabled={disabled} variant={variant} shrink={shrink} style={{width: "100%"}} id='minimumWind'/>
                        </ListItem>
                        <ListItem>
                            <TextField label="Max wind speed" onChange={handleChange5} value={value5} disabled={disabled} variant={variant} shrink={shrink} style={{width: "100%"}} id='maximumWind'/>
                        </ListItem>
                    </List>
                    <ButtonGroup variant="contained" aria-label="outlined primary button group" style={{marginLeft:"15px"}}>
                        <Button onClick={()=>{
                            setVariant('standard')
                            setDisabled(false)
                        }}>Edit</Button>
                        <Button onClick={()=>{
                            setVariant('filled')
                            setDisabled(true)
                        }}>Refresh</Button>
                    </ButtonGroup>
                </Grid>
                <br/>

                <Grid item xs={12} sm={3}>
                    <Typography variant="h5">
                        Surface area
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={9}>

                    <TextField
                        id="surfaceArea"
                        name="surfaceArea"
                        label="Surface area"
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
                        label="Crop coefficient"
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
                        R_n
                    </Typography>
                </Grid>


                <Grid item xs={12} sm={9}>

                    <TextField
                        id="R_n"
                        name="R_n"
                        label="R_n"
                        fullWidth
                        autoComplete="25"
                        variant="standard"
                    />
                </Grid>

                <Grid item xs={12} sm={12}>
                    <Grid container>
                        <Grid item xs={6} sm={6}>
                                <Button variant="contained" onClick={handleSubmit}>Water need</Button>
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                style={{width: "100%"}}
                                id='waterneed'
                                name='waterneed'
                                label='calculated waterneed'
                                variant='filled'
                                disabled
                                InputLabelProps={{shrink: true}}
                                value={waterneedText}/>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
        </React.Fragment>
    );
}