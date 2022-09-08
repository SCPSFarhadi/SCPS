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
                label="HVAC on"
                // control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
                control={<Switch id="controlValve1" {...label} defaultChecked onChange={props.handleCheckingFanAir} disabled={props.disableCheckBox}/>}
            />
        </Box>
    );

    return (
        <div>
            <Typography variant="h5">
                HVAC Control
            </Typography>
            {children}
        </div>
    );
}
