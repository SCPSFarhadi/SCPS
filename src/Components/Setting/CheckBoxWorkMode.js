import * as React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";

export default function IndeterminateCheckboxWork(props) {
    const [checked, setChecked] = React.useState([true, false,false]);
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    const handleChange1 = (event) => {
        setChecked([event.target.checked, event.target.checked]);
    };

    const handleChange2 = (event) => {
        // console.log(event.target.checked)
        props.setDisableCheckBox(!event.target.checked);
        props.handleCheckingFanAir();
        props.setModeSelect('maintenance')

    };

    const handleChange3 = (event) => {
        setChecked([checked[0], event.target.checked,checked[2]]);
        props.setModeSelect('automate')
        props.setBtnDisabled(!event.target.checked)
        if(props.btnEnergySelect)
            props.setEnergySelect(false)
        else
            props.setEnergySelect(true)
    };
    const handleChange4 = (event) => {
        setChecked([checked[0], checked[1],event.target.checked]);
        props.setModeSelect('sleep')
        if(props.btnSleepSelect)
            props.setSleepSelect(false)
        else
            props.setSleepSelect(true)

    };

    const children = (
        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
            <FormControlLabel
                label="Sleep mode"
                control={<Switch id="workMode1" {...label}  onChange={handleChange4}/>}
            />
            <FormControlLabel
                label="Energy Saving mode"
                control={<Switch id="workMode2" {...label}  onChange={handleChange3}/>}
            />
            <FormControlLabel
                label="Classic mode"
                control={<Switch id="workMode4" {...label}  onChange={handleChange3}/>}
            />

            <FormControlLabel
                label="Maintenance mode"
                control={<Switch id="workMode3" {...label} defaultChecked onChange={handleChange2} />}
            />
        </Box>
    );

    return (
        <div>
            <Typography variant="h5">
                Work mode
            </Typography>
            {children}
        </div>
    );
}
