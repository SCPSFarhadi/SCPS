import * as React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Typography from "@mui/material/Typography";
import {useState} from "react";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
export default function IndeterminateCheckbox(props) {
    const [checked, setChecked] = React.useState([true, false,false]);



    const handleChange2 = (event) => {
        setChecked([event.target.checked, checked[1],checked[2]]);
    };

    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    const children = (
        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
                <FormControlLabel
                    label="control vale 1 open"
                    // control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
                    control={<Switch id="cValveOpen1" {...label} defaultChecked onChange={handleChange2} />}
                />

                    <TextField
                        id="cvalve1w"
                        name="setpoint"
                        label="waterneed"
                        fullWidth
                        autoComplete="25"
                        variant="standard"
                    />
            <FormControlLabel
                label="control vale 2 open"
                control={<Switch id="cValveOpen2" {...label} defaultChecked onChange={handleChange2} />}
                
            />

                <TextField
                        id="cvalve2w"
                        name="setpoint"
                        label="waterneed"
                        fullWidth
                        autoComplete="25"
                        variant="standard"
                    />
            <FormControlLabel
                label="control vale 3 open"
                control={<Switch id="cValveOpen3" {...label} defaultChecked onChange={handleChange2} />}
            />

                    <TextField
                        id="cvalve3w"
                        name="setpoint"
                        label="waterneed"
                        fullWidth
                        autoComplete="25"
                        variant="standard"
                    />
            <FormControlLabel
                label="control vale 4 open"
                control={<Switch id="cValveOpen4" {...label} defaultChecked onChange={handleChange2} />}
            />

            < TextField
                        id="cvalve4w"
                        name="setpoint"
                        label="waterneed"
                        fullWidth
                        autoComplete="25"
                        variant="standard"
                    />
            <FormControlLabel
                label="control vale 5 open"
                control={<Switch id="cValveOpen5" {...label} defaultChecked onChange={handleChange2} />}
            />

                <TextField
                        id="cvalve5w"
                        name="setpoint"
                        label="waterneed"
                        fullWidth
                        autoComplete="25"
                        variant="standard"
                    />
            {/*<div>*/}
            {/*    <Switch {...label} defaultChecked />*/}
            {/*    <Switch {...label} />*/}
            {/*    <Switch {...label} disabled defaultChecked />*/}
            {/*    <Switch {...label} disabled />*/}
            {/*</div>*/}
        </Box>
    );

    return (
        <div>
            <Typography variant="h5">
                Control Valve
            </Typography>
            {children}
        </div>
    );
}
