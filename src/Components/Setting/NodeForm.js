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

export default function NodeForm() {
    const [btnDisabled, setBtnDisabled] = useState(false)

    function valuetext(value) {
        return `${value}°C`;
    }
    const marks = [
        {
            value: 0,
            label: '0°C',
        },
        {
            value: 20,
            label: '20°C',
        },
        {
            value: 37,
            label: '37°C',
        },
        {
            value: 100,
            label: '100°C',
        },
    ];

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Node Set State
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField required
                               id="NodeId"
                               label="ID"
                               autoComplete="given-name"
                               name="NodeId"
                               variant="outlined"
                               fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputLabel id="demo-simple-select-label">Room Select</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value="Permission"
                        label="Permission"
                        // onChange={handleChange}
                    >
                        <MenuItem value={10}>room 1</MenuItem>
                        <MenuItem value={20}>room 2</MenuItem>
                        <MenuItem value={30}>room 3</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="Set"
                        name="Set"
                        label="Set"
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="access"
                        name="access"
                        label="access"
                        fullWidth
                        autoComplete="access"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography >
                        Temperature:
                    </Typography>
                    <Slider
                        disabled={btnDisabled}
                        aria-label="Temperature"
                        defaultValue={20}
                        getAriaValueText={valuetext}
                        step={10}
                        valueLabelDisplay="auto"
                        marks={marks}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Permission</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value="Permission"
                            label="Permission"
                            onChange={(event) => {
                                console.log(event)
                                if(event.target.value ==="YES"){
                                    setBtnDisabled(false);
                                }
                                else {
                                    setBtnDisabled(true);
                                }
                            }}
                            // onChange={handleChange}
                        >
                            <MenuItem value={10}>YES</MenuItem>
                            <MenuItem value={20}>NO</MenuItem>
                            <MenuItem value={30}>Depends</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox color="secondary" name="saveAddress" value="yes"/>}
                        label="Solenoid valve Open "
                    />
                    <Button variant="contained">Submit</Button>
                </Grid>

            </Grid>
        </React.Fragment>
    );
}
