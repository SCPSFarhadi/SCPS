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

export default function ControPanel(props) {
    const [btnDisabled, setBtnDisabled] = useState(false)
    const [btnDisableCheckBox, setDisableCheckBox] = useState(true)
    const [perm, setPerm] = React.useState('');
    const [room, setRoom] = React.useState('Fancoil Select');
    const selectedNode = props.selectedNode;

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
    function handleSubmit(e) {
        console.log("temp for fun")
        e.preventDefault();
        var baseData ={
            "cValve1": true,
            "cValve2": true,
            "classicMode": false,
            "dongleValue1": "20",
            "dongleValue2": "20",
            "energysavingMode": false,
            "fanAir1": true,
            "fanAir2": true,
            "manualMode": true,
            "nodeid": props.details.nodeId,
            "perm": true,
            "sleepMode": false,
            "temp": 20
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        let token = localStorage.getItem('token_access')
        if (token) {
            config.headers['Authorization'] = `JWT ${token}`;
        }

        let cValveOpen1 = document.getElementById("cValveOpen1").checked // false true
        if(cValveOpen1){
            baseData.cValve1 = true;
            axios
                .post(baseUrl+'api/users/setnodeconfig/' , baseData,config)
                .then((res) => {
                    console.log("data sent")
                })
        }else{
            baseData.cValve1 = false;
            axios
                .post(baseUrl+'api/users/setnodeconfig/' , baseData,config)
                .then((res) => {
                    console.log("data sent 1")
                })
            let x = parseInt(document.getElementById("cValveFactor1").value)
            let y = parseInt(document.getElementById("cvalve1w").value)

            setTimeout(() => {
                axios.post(baseUrl+'api/users/setnodeconfig/' , {"cvavleid":1,"status":"open"},config)
            }, y/x);
            axios.post(baseUrl+'api/users/setnodeconfig/' , {"cvavleid":1,"status":"close"},config)
        }

        let cValveOpen2 = document.getElementById("cValveOpen2").checked // false true
        if(cValveOpen2){
            baseData.cValve2 = true;
            axios
                .post(baseUrl+'api/users/setnodeconfig/' , baseData,config)
                .then((res) => {
                    console.log("data sent 2" )
                })
        }else{
            baseData.cValve2 = false;
            axios
                .post(baseUrl+'api/users/setnodeconfig/' , baseData,config)
                .then((res) => {
                    console.log("data sent")
                })
            let x = parseInt(document.getElementById("cValveFactor2").value)
            let y = parseInt(document.getElementById("cvalve2w").value)
            setTimeout(() => {
                axios.post(baseUrl+'api/users/setnodeconfig/' , {"cvavleid":2,"status":"open"},config)
            }, y/x);
            axios.post(baseUrl+'api/users/setnodeconfig/' , {"cvavleid":2,"status":"close"},config)
        }

        let cValveOpen3 = document.getElementById("cValveOpen3").checked // false true
        if(cValveOpen3){
            baseData.fanAir1 = true;
            axios
                .post(baseUrl+'api/users/setnodeconfig/' , baseData,config)
                .then((res) => {
                    console.log("data sent 3")
                })
        }else{
            baseData.fanAir1 = false;
            axios
                .post(baseUrl+'api/users/setnodeconfig/' , baseData,config)
                .then((res) => {
                    console.log("data sent")
                })
            let x = parseInt(document.getElementById("cValveFactor3").value)
            let y = parseInt(document.getElementById("cvalve3w").value)
            setTimeout(() => {
                axios.post(baseUrl+'api/users/setnodeconfig/' , {"cvavleid":3,"status":"open"},config)
            }, y/x);
            axios.post(baseUrl+'api/users/setnodeconfig/' , {"cvavleid":3,"status":"close"},config)
        }

        let cValveOpen4 = document.getElementById("cValveOpen4").checked // false true
        if(cValveOpen4){
            baseData.fanAir2 = true;
            axios
                .post(baseUrl+'api/users/setnodeconfig/' , baseData,config)
                .then((res) => {
                    console.log("data sent 4")
                })
        }else{
            baseData.fanAir2 = false;
            axios
                .post(baseUrl+'api/users/setnodeconfig/' , baseData,config)
                .then((res) => {
                    console.log("data sent")
                })
            let x = parseInt(document.getElementById("cValveFactor4").value)
            let y = parseInt(document.getElementById("cvalve4w").value)
            setTimeout(() => {
                axios.post(baseUrl+'api/users/setnodeconfig/' , {"cvavleid":4,"status":"open"},config)
            }, y/x);
            axios.post(baseUrl+'api/users/setnodeconfig/' , {"cvavleid":4,"status":"close"},config)
        }

        // let cValveOpen5 = document.getElementById("cValveOpen5").checked // false true
        // if(cValveOpen5){
        //     axios
        //         .post(baseUrl+'api/users/setnodeconfig/' , {"cvavleid":5,"status":"open"},config)
        //         .then((res) => {
        //             console.log("data sent 5")
        //         })
        // }else{
        //     axios
        //         .post(baseUrl+'api/users/setnodeconfig/' , {"cvavleid":5,"status":"close"},config)
        //         .then((res) => {
        //             console.log("data sent")
        //         })
        //     let x = parseInt(document.getElementById("cValveFactor5").value)
        //     let y = parseInt(document.getElementById("cvalve5w").value)
        //     setTimeout(() => {
        //         axios.post(baseUrl+'api/users/setnodeconfig/' , {"cvavleid":5,"status":"open"},config)
        //     }, y/x);
        //     axios.post(baseUrl+'api/users/setnodeconfig/' , {"cvavleid":5,"status":"close"},config)
        // }


    }

    return (
        <React.Fragment>
            <Typography variant="h3" gutterBottom>
                Control Panel
            </Typography>
            <Grid container spacing={3}>

                <Grid item xs={12}>
                    <IndeterminateCheckbox disableCheckBox={btnDisableCheckBox}/>
                    <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                </Grid>

            </Grid>
        </React.Fragment>
    );
}