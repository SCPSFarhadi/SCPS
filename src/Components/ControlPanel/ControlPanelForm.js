import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from "@mui/material/Button";

export default function ControlPanelForm() {
  return (
    <React.Fragment>
      <Typography variant="h3" gutterBottom>
      Control Panel
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3}>
          <Typography variant="h5">
            Session
          </Typography>
        </Grid>

        <Grid item xs={12} sm={9}>

          <FormControlLabel
              control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
              label="Winter"
          />
          <FormControlLabel
              control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
              label="Summer"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant="h5">
            Control valve
          </Typography>
        </Grid>

        <Grid item xs={12} sm={9}>

          <FormControlLabel
              control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
              label="Open"
          />
          <FormControlLabel
              control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
              label="Close"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant="h5">
            Fan
          </Typography>
        </Grid>


        <Grid item xs={12} sm={9}>

          <FormControlLabel
              control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
              label="Open"
          />
          <FormControlLabel
              control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
              label="Close"
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <Typography variant="h5">
            Set Point
          </Typography>
        </Grid>


        <Grid item xs={12} sm={9}>

          <TextField
              id="setpoint"
              name="setpoint"
              label="Set Point"
              fullWidth
              autoComplete="25"
              variant="standard"
          />
        </Grid>
        {/*<Grid item xs={12} sm={6}>*/}
        {/*  <TextField*/}
        {/*    required*/}
        {/*    id="country"*/}
        {/*    name="country"*/}
        {/*    label="Country"*/}
        {/*    fullWidth*/}
        {/*    autoComplete="shipping country"*/}
        {/*    variant="standard"*/}
        {/*  />*/}
        {/*</Grid>*/}
        <Grid item xs={12}>
          <Button variant="contained">Submit</Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
