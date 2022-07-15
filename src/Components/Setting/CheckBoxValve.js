import * as React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Typography from "@mui/material/Typography";
import {useState} from "react";


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
                control={<Switch id="valve1" {...label} defaultChecked onChange={handleChange2} />}
            />
            <FormControlLabel
                label="control vale 2 open"
                control={<Switch id="valve2" {...label} defaultChecked onChange={handleChange2} />}
            />
            <FormControlLabel
                label="control vale 3 open"
                control={<Switch id="valve3" {...label} defaultChecked onChange={handleChange2} />}
            />
            <FormControlLabel
                label="control vale 4 open"
                control={<Switch id="valve3" {...label} defaultChecked onChange={handleChange2} />}
            />
            <FormControlLabel
                label="control vale 5 open"
                control={<Switch id="valve3" {...label} defaultChecked onChange={handleChange2} />}
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
