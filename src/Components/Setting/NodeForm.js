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

export default function NodeForm() {
    const [btnDisabled, setBtnDisabled] = useState(false)
    const [perm, setPerm] = React.useState('');
    const [room, setRoom] = React.useState('');
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
            value: 50,
            label: '50°C',
        },
        {
            value: 100,
            label: '100°C',
        },
    ];
    let value;
    const dispatch = useDispatch();
    function handleSubmit() {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        let token = localStorage.getItem('token_access')
        if (token) {
            config.headers['Authorization'] = `JWT ${token}`;
        }
        var id = document.getElementById("NodeId").value

        var fanOpen = document.getElementById("checkSolenoid").value
        console.log(fanOpen)
        axios
            .post(baseUrl+'api/users/setnodeconfig/' , {nodeid:id,temp:value,fanopen:fanOpen,perm:perm},config)
            .then((res) => {
                console.log("data sent")
            })
    }

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
                        value={room}
                        label="room"
                        onChange={(event) => {
                            setRoom(event.target.value)
                        }}
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
                    <Typography>
                        Temperature:
                    </Typography>
                    <Slider
                        disabled={btnDisabled}
                        aria-label="Temperature"
                        defaultValue={20}
                        getAriaValueText={valuetext}
                        step={0.5}
                        valueLabelDisplay="auto"
                        marks={marks}
                        onChange={(e, val) => value = val}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Permission</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={perm}
                            label="Permission"
                            onChange={(event) => {
                                setPerm(event.target.value)
                                if (event.target.value === "YES") {
                                    setBtnDisabled(false);
                                } else {
                                    setBtnDisabled(true);
                                }
                            }}
                            // onChange={handleChange}
                        >
                            <MenuItem value={"YES"}>YES</MenuItem>
                            <MenuItem value={"NO"}>NO</MenuItem>
                            <MenuItem value={""}>Depends</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox color="secondary" id="checkSolenoid" name="saveAddress" value="yes"/>}
                        label="Solenoid valve Open "
                    />
                    <br/>
                    <FormControlLabel
                        control={<Checkbox color="secondary" id="checWorkMode" name="saveAddress" value="yes"/>}
                        label="work mode"
                    />
                    <br/>
                    <Button variant="contained" onSubmit={handleSubmit}>Submit</Button>
                </Grid>

            </Grid>
        </React.Fragment>
    );
}
