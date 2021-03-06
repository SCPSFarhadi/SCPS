import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import {InputLabel, Select, Slider} from "@mui/material";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Switch from "@mui/material/Switch";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';




export default function ControlPanelForm() {

  const [disabled, setBtnDisabled] = React.useState(true);
  const [perm, setBtnPerm] = React.useState("Off");
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const clickSubmit = function() {
    console.log("in click")
    let sleepMode = perm
    let setPoint = document.getElementById("setPoint").value
    console.log(setPoint)

    if(sleepMode === "Off" && !setPoint.value){
      alert("Please add set");

    }


};
  return (
    <React.Fragment>
      <Typography variant="h3" gutterBottom>
      Control Panel
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3}>
          <Typography variant="h5">
            HVAC Mode
          </Typography>
        </Grid>

        <Grid item xs={12} sm={9}>

          <FormControl> 
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel value="Cooling" control={<Radio />} label="Cooling" />
              <FormControlLabel value="Heating" control={<Radio />} label="Heating" />
            </RadioGroup>
          </FormControl>

        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant="h5">
            Sleep mode
          </Typography>
        </Grid>

        <Grid item xs={12} sm={9}>

              <Select
                  labelId="demo-simple-select-label"
                  id="sleepModeId"
                  value={perm}
                  label="Sleep Mode"
                  onChange={(event) => {
                    console.log("FADAYAT SHAVAM")
                      setBtnPerm(event.target.value)
                      if (event.target.value === "Off") {
                          setBtnDisabled(false);
                      } else {
                          setBtnDisabled(true);
                      }
                  }}
                  // onChange={handleChange}
              >
                  <MenuItem value={"On"}>On</MenuItem>
                  <MenuItem value={"Off"}>Off</MenuItem>
              </Select>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant="h5">
            Fan
          </Typography>
        </Grid>


        <Grid item xs={12} sm={9}>
             {/* <FormControlLabel
                label="Fan"
                control={<Switch id="workMode1" {...label} />}
            /> */}
          <FormControl> 
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel value="On" control={<Radio />} label="On" />
              <FormControlLabel value="Off" control={<Radio />} label="Off" />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={3}>
          <Typography variant="h5" >
            Set Point
          </Typography>
        </Grid>


        <Grid item xs={12} sm={9}>
          
          <TextField
              id="setPoint"
              name="setpoint"
              label="Set Point"
              fullWidth
              autoComplete="25"
              variant="standard"
              disabled={disabled}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={clickSubmit}>Submit</Button>
        </Grid>
        <br />
        <Grid item xs={12}>
          <Typography variant="h3" gutterBottom>
            Weather
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant="h5" >
            Longitude
          </Typography>
        </Grid>


        <Grid item xs={12} sm={9}>
          
          <TextField
              id="setPoint"
              name="setpoint"
              label="Longitude"
              fullWidth
              autoComplete="25"
              variant="standard"
          />

        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant="h5" >
            Latitude
          </Typography>
        </Grid>


        <Grid item xs={12} sm={9}>
          
          <TextField
              id="setPoint"
              name="setpoint"
              label="Latitude"
              fullWidth
              autoComplete="25"
              variant="standard"
          />

        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" >Refresh Weather</Button>
        </Grid>
      </Grid>
      
    </React.Fragment>
    
  );
}
