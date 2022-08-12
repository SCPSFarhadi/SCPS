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
import DangleSetpoint from "./Dangle";

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
        let id = selectedNode
        let sleepMode = document.getElementById("workMode1").checked
        let AutomateMode = document.getElementById("workMode2").checked;
        let maintenanceMode = document.getElementById("workMode3").checked
        let cValve1 = document.getElementById('controlValve1').checked;
        let cValve2 = document.getElementById('controlValve2').checked;
        let fanAir1 = document.getElementById('fanAir1').checked;
        let fanAir2 = document.getElementById('fanAir2').checked;
        let dongleValue1 = document.getElementById('dongle1').value;
        let dongleValue2 = document.getElementById('dongle2').value;

        if((sleepMode && AutomateMode) ||(sleepMode && maintenanceMode) || (AutomateMode && maintenanceMode) ){
            alert("Please Check only one mode");
            return;
        }
        let data = {nodeid:id,
            temp:value,
            fanAir1:fanAir1,
            fanAir2:fanAir2,
            perm:perm,
            cValve1:cValve1,
            cValve2:cValve2,
            dongleValue1:dongleValue1,
            dongleValue2:dongleValue2,
            sleepMode:sleepMode,
            optimalMode:AutomateMode,
            manualMode:maintenanceMode
        }

        console.log("sent data: ")
        console.log(data)

        axios
            .post(baseUrl+'api/users/setnodeconfig/' , data,config)
            .then((res) => {
                console.log("data sent")
            })
    }
    function handleChecking(){
        if(document.getElementById("controlValve1") && document.getElementById("controlValve2")
            && document.getElementById('fanAir1') && document.getElementById('fanAir2')
        ){
            console.log("fun4")
            let input1 = document.getElementById("dongle1")
            let input2 = document.getElementById("dongle2")
            let controlValveTest1 = document.getElementById("controlValve1").checked
            let controlValveTest2 = document.getElementById("controlValve2").checked
            let fanAirTest1 = document.getElementById('fanAir1').checked
            let fanAirTest2 = document.getElementById('fanAir2').checked

            input1.disabled = false;
            input2.disabled = false;

            if(controlValveTest1 || fanAirTest1) {
                console.log("1 is disabled")
                input1.disabled = true;
            }
            if(controlValveTest2 || fanAirTest2){
                console.log("2 is disabled")
                input2.disabled = true;
            }




        }

    }


    return (
        <React.Fragment>
            <Typography variant="h4">
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
                            id="occupantPermission"
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

                    <IndeterminateCheckboxWork setDisableCheckBox = {setDisableCheckBox} handleCheckingFanAir={handleChecking}/>
                    <IndeterminateCheckbox disableCheckBox={btnDisableCheckBox} handleCheckingFanAir={handleChecking}/>

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
                        Fan Air
                    </Typography>
                    <FormControlLabel
                        label="Fan air 1 on"
                        // control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
                        control={<Switch id="fanAir1" {...label} defaultChecked disabled={props.disableCheckBox} onChange={handleChecking}/>}
                    />
                    <FormControlLabel
                        label="Fan air 2 on"
                        control={<Switch id="fanAir2" {...label} defaultChecked disabled={props.disableCheckBox} onChange={handleChecking}/>}
                    />
                    <br />
                    <DangleSetpoint />
                    <br />
                    <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                </Grid>

            </Grid>
        </React.Fragment>
    );
}
