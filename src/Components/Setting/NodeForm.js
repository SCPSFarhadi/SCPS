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

export default function NodeForm() {
    const [btnDisabled, setBtnDisabled] = useState(false)
    const [perm, setPerm] = React.useState('');
    const [room, setRoom] = React.useState('Fancoil Select');
    function valuetext(value) {
        return `${value}°C`;
    }
    const marks = [
        {
            value: 20,
            label: '20°C',
        },
        {
            value: 30,
            label: '30°C',
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
        console.log("sent data: ")
        console.log({nodeid:id,temp:value,fanopen:fanOpen,perm:perm})
        axios
            .post(baseUrl+'api/users/setnodeconfig/' , {nodeid:id,temp:value,fanopen:fanOpen,perm:perm},config)
            .then((res) => {
                console.log("data sent")
            })
    }

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Node Setting
            </Typography>
            <Grid container spacing={3}>
                
                
                <Grid item xs={12}>
                    <Typography>
                        Set point:
                    </Typography>
                    <Slider
                        disabled={btnDisabled}
                        aria-label="SetPoint"
                        defaultValue={20}
                        getAriaValueText={valuetext}
                        step={0.5}
                        valueLabelDisplay="auto"
                        marks={marks}
                        onChange={(e, val) => value = val}
                        min={20}
                        max={30}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Room Occupant Permission</InputLabel>
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
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <IndeterminateCheckbox/>
                    <IndeterminateCheckboxWork/>
                    {/*<FormControlLabel*/}
                    {/*    control={<Checkbox color="secondary" id="checkSolenoid" name="saveAddress" value="yes"/>}*/}
                    {/*    label="Solenoid valve Open "*/}
                    {/*/>*/}
                    {/*<br/>*/}
                    {/*<FormControlLabel*/}
                    {/*    control={<Checkbox color="secondary" id="checWorkMode" name="saveAddress" value="yes"/>}*/}
                    {/*    label="work mode"*/}
                    {/*/>*/}
                    {/*<br/>*/}
                    <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                </Grid>

            </Grid>
        </React.Fragment>
    );
}
