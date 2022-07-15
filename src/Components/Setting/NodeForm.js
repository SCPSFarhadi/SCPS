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
import Switch from '@mui/material/Switch';

export default function NodeForm(props) {
    const [btnDisabled, setBtnDisabled] = useState(false)
    const [btnDisableCheckBox, setDisableCheckBox] = useState(true)
    const [perm, setPerm] = React.useState('');
    const [room, setRoom] = React.useState('Fancoil Select');
    const selectedNode = props.selectedNode;
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
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
    let value=20;
    const dispatch = useDispatch();
    function handleSubmit() {
        console.log("temp for fun")
        console.log(value)
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        let token = localStorage.getItem('token_access')
        if (token) {
            config.headers['Authorization'] = `JWT ${token}`;
        }
        var id = selectedNode
        var fanOpen = document.getElementById("fanOpen").checked
        let sleepMode = document.getElementById("workMode1").checked
        let optimalMode = document.getElementById("workMode2").checked;
        let manualMode = document.getElementById("workMode3").checked

        if((sleepMode && optimalMode) ||(sleepMode && manualMode) || (optimalMode && manualMode) ){
            alert("Please Check only one mode");
            return;
        }

        let valve1 = document.getElementById('valve1').checked;
        let valve2 = document.getElementById('valve2').checked;
        let valve3 = document.getElementById('valve3').checked;
        let data = {nodeid:id.id,temp:value,fanopen:fanOpen,perm:perm,valve1:valve1,valve2:valve2,valve3:valve3,sleepMode:sleepMode,optimalMode:optimalMode,manualMode:manualMode}
        console.log(fanOpen)
        console.log("sent data: ")
        console.log(data)
        axios
            .post(baseUrl+'api/users/setnodeconfig/' , data,config)
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
                                if (event.target.value === "NO") {
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

                    <IndeterminateCheckboxWork setDisableCheckBox = {setDisableCheckBox}/>
                    <IndeterminateCheckbox disableCheckBox={btnDisableCheckBox}/>

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
                    <Typography variant="h5">
                        Fan On
                    </Typography>
                    <FormControlLabel control={<Switch id="valve5" {...label} defaultChecked/>} label="fan 1 on" />
                    <FormControlLabel control={<Switch id="valve5" {...label} defaultChecked/>} label="fan 2 on" />
                    <br />
                    <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                </Grid>

            </Grid>
        </React.Fragment>
    );
}
