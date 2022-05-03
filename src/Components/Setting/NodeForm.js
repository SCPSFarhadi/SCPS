import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {Slider} from "@mui/material";
import Button from "@mui/material/Button";

export default function NodeForm() {

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
                    <TextField
                        required
                        id="room"
                        name="room"
                        label="room"
                        fullWidth
                        autoComplete="room"
                        variant="standard"
                    />
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
                        aria-label="Temperature"
                        defaultValue={20}
                        getAriaValueText={valuetext}
                        step={10}
                        valueLabelDisplay="auto"
                        marks={marks}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography >
                        Faucet:
                    </Typography>
                    <Slider
                        aria-label="faucet"
                        defaultValue={30}
                        getAriaValueText={valuetext}
                        valueLabelDisplay="auto"
                        step={5}
                        marks
                        min={10}
                        max={110}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox color="secondary" name="saveAddress" value="yes"/>}
                        label="Waiting Until Response "
                    />
                    <Button variant="contained">Submit</Button>
                </Grid>

            </Grid>
        </React.Fragment>
    );
}
