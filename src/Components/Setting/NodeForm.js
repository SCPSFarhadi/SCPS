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

    const [modeSelect, setModeSelect] = useState('')


    const [perm, setPerm] = React.useState('');
    const [room, setRoom] = React.useState('Fancoil Select');
    const selectedNode = props.selectedNode;
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    function valuetext(value) {
        return `${value}°C`;
    }
    const marks = [
        {
            value: 17,
            label: '17°C',
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
        let EnergySaving = document.getElementById("workMode2").checked;
        let maintenanceMode = document.getElementById("workMode3").checked
        let ClassicMode = document.getElementById("workMode4").checked
        let cValve1 = document.getElementById('controlValve1').checked;
        let dongleValue1 = document.getElementById('dongle1').value;

        if((sleepMode && EnergySaving) ||(sleepMode && maintenanceMode) || (EnergySaving && maintenanceMode) ){
            alert("Please Check only one mode");
            return;
        }
        let data = {nodeid:id,
            temp:value,
            fanAir1:false,
            fanAir2:false,
            perm:perm,
            cValve1:cValve1,
            cValve2:false,
            dongleValue1:dongleValue1,
            dongleValue2:false,
            sleepMode:sleepMode,
            energysavingMode:EnergySaving,
            classicMode:ClassicMode,
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
                    <IndeterminateCheckboxWork setDisableCheckBox = {setDisableCheckBox} handleCheckingFanAir={handleChecking} setModeSelect={setModeSelect}
                                               setBtnDisabled={setBtnDisabled}/>
                </Grid>


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
                        min={17}
                        max={30}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth disabled={btnDisabled}>
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
                    <Typography variant='h5'>
                        Fan Speed:
                    </Typography>

                    <Select
                        labelId="demo-simple-select-label"
                        id="sleepModeId"
                        // value={menuItemSelect}
                        label="Sleep Mode"
                        // onChange={(event) => {
                        //     console.log("FADAYAT SHAVAM")
                        //     setBtnMenuItemSelect(event.target.value)
                        //     if (event.target.value === "sleep") {
                        //         setBtnDisabled(true);
                        //     } else {
                        //         setBtnDisabled(false);
                        //     }
                        // }}
                        style={{width:"150px"}}
                        // onChange={handleChange}
                    >
                        <MenuItem value={"low"}>low</MenuItem>
                        <MenuItem value={"mid"}>mid</MenuItem>
                        <MenuItem value={"high"}>high</MenuItem>

                    </Select>
                </Grid>
                <Grid item xs={12}>
                    <IndeterminateCheckbox disableCheckBox={btnDisableCheckBox} handleCheckingFanAir={handleChecking}/>

                    {/*<DangleSetpoint />*/}
                    {/*<br />*/}
                    <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
