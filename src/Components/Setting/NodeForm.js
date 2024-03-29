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

    const [btnDisabled, setBtnDisabled] = useState(true)
    const [btnSleepSelect, setSleepSelect] = useState(false)
    const [btnEnergySelect, setEnergySelect] = useState(false)
    const [btnDisableCheckBox, setDisableCheckBox] = useState(true)
    const [value,setValue]= useState(20);
    const [modeSelect, setModeSelect] = useState('')
    const [menuItemSelect, setMenuItemSelect] = useState('LOW')
    const [classicMode, setClassicMode] = React.useState(true);
    const [perm, setPerm] = React.useState('');
    const [room, setRoom] = React.useState('Fancoil Select');
    const selectedNode = props.selectedNode;
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    function valuetext(value) {
        return `${value}°C`;
    }
    const changeValue = (event, value) => {
        console.log("selected temp")
        console.log(value)
        setValue(value);
    };
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
        // let id = props.details.nodeid ? props.details.nodeid : selectedNode
        console.log("selected Node")
        let id = selectedNode
        console.log(selectedNode)
        console.log("seted id"+id)
        let sleepMode = document.getElementById("workMode1").checked
        let EnergySavingMode = document.getElementById("workMode2").checked;
        let maintenanceMode = document.getElementById("workMode3").checked
        let classicMode = document.getElementById("workMode4").checked
        let cValve1 = document.getElementById('controlValve1').checked;
        let cValve2 = document.getElementById('controlValve2').checked;
        let fanAir1 = document.getElementById('fanAir1').checked;
        let fanAir2 = document.getElementById('fanAir2').checked;
        let dongleValue1 = document.getElementById('dongle1').value;
        let dongleValue2 = document.getElementById('dongle2').value;

        if((sleepMode && EnergySavingMode) ||(sleepMode && maintenanceMode) || (EnergySavingMode && maintenanceMode) ){
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
            energysavingMode:EnergySavingMode,
            classicMode:classicMode,
            manualMode:maintenanceMode,
            fanspeed:menuItemSelect.toLowerCase()
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
                                               setBtnDisabled={setBtnDisabled} setSleepSelect={setSleepSelect} btnSleepSelect={btnSleepSelect}
                                               setEnergySelect={setEnergySelect} btnEnergySelect={btnEnergySelect} setClassicMode={setClassicMode}/>
                </Grid>



                <Grid item xs={12}>
                    <Typography>
                        Set point:
                    </Typography>
                    {/*<Grid item xs={12} sm={9}>*/}

                    {/*    <TextField*/}
                    {/*        id="setPoint"*/}
                    {/*        name="setpoint"*/}
                    {/*        label="Set Point"*/}
                    {/*        fullWidth*/}
                    {/*        autoComplete="25"*/}
                    {/*        variant="standard"*/}
                    {/*        disabled={btnDisabled}*/}
                    {/*        onChange={(e, val) => value=val}*/}
                    {/*    />*/}
                    {/*</Grid>*/}
                    <Slider
                        disabled={btnDisabled}
                        aria-label="SetPoint"
                        defaultValue={20}
                        getAriaValueText={valuetext}
                        step={0.5}
                        valueLabelDisplay="auto"
                        marks={marks}
                        onChange={changeValue}
                        min={17}
                        max={30}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth disabled={btnDisabled} >
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

                    {/*<IndeterminateCheckboxWork setDisableCheckBox = {setDisableCheckBox} handleCheckingFanAir={handleChecking}/>*/}
                    <IndeterminateCheckbox disableCheckBox={btnDisableCheckBox} handleCheckingFanAir={handleChecking} details={props.details}/>

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
                        disabled={props.details.type===1 || btnSleepSelect||btnEnergySelect}
                        // control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
                        control={<Switch id="fanAir1" {...label} defaultChecked disabled={btnSleepSelect||btnEnergySelect} onChange={handleChecking}/>}
                    />
                    <FormControlLabel disabled={props.details.parameter === '1' || btnSleepSelect||btnEnergySelect}
                        label="Fan air 2 on"
                        control={<Switch id="fanAir2" {...label} defaultChecked disabled={btnSleepSelect||btnEnergySelect} onChange={handleChecking}/>}
                    />
                    <br />
                    <DangleSetpoint  btnSleepSelect={btnSleepSelect} btnMaintenanceSelect={btnEnergySelect} pr={props.details}/>
                    <br />
                </Grid>

                <Grid item xs={12}>
                    <Typography variant='h5'>
                        Fan Speed:
                    </Typography>

                    <Select
                        labelId="demo-simple-select-label"
                        id="sleepModeId"
                        disabled={modeSelect !== 'maintenance'}
                        value={menuItemSelect}
                        label="Sleep Mode"
                        onChange={(event) => {
                            console.log("change Fan Speed")
                            setMenuItemSelect(event.target.value)
                        }}
                        style={{width:"150px"}}
                        // onChange={handleChange}
                    >
                        <MenuItem value={"LOW"}>LOW</MenuItem>
                        <MenuItem value={"MED"}>MED</MenuItem>
                        <MenuItem value={"HIGH"}>HIGH</MenuItem>

                    </Select>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                </Grid>
            </Grid>


        </React.Fragment>
    );
}
