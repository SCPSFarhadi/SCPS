import * as React from 'react';
import "@progress/kendo-theme-material/dist/all.css";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { process } from "@progress/kendo-data-query";

import { bikeStations } from "./data";
import TestLineChart from "./TestChart";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import {Graph} from "react-d3-graph";
import Box from "@mui/material/Box";
import {BottomNavigation, BottomNavigationAction} from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import {blue, green, red} from "@mui/material/colors";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import EditIcon from "@mui/icons-material/Edit";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {ResponsiveContainer} from "recharts";

const BooleanCell = (props) => {
    return (
        <td>{props.dataItem[props.field] ? '✅' : '❌'}</td>
    )
}

export default function TestReport() {

    const [dataState, setDataState] = React.useState({ skip: 0, take: 10 })
    const [result, setResult] = React.useState(process(bikeStations, dataState));

    const onDataStateChange = (event) => {
        setDataState(event.dataState);
        setResult(process(bikeStations, event.dataState));
    }
    const theme = createTheme();
    return (
        <div>
            <Grid
                data={result}
                filterable={true}
                onDataStateChange={onDataStateChange}
                pageable={true}
                total={bikeStations.length}
                {...dataState}
                resizable={true}
                xs={6}
            >
                <GridColumn field="ID" title="ID"/>
                <GridColumn field="Type" title="Type" />
                <GridColumn field="pass_rate" title="Pass rate" />
                <GridColumn field="result" title="status" cell={BooleanCell} />
            </Grid>
            <ThemeProvider theme={theme}>
                <CssBaseline />

                <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
                    <Paper variant="outlined" sx={{ my: { xs: 3, md: 3 }, p: { xs: 3, md: 1 } }} style={{border: "solid 1px #555", backgroundColor: "#fbfbf7", boxShadow: "0 0 10px rgb(0 0 0 / 60%)",
                        MozBoxShadow: "0 0 10px rgba(0,0,0,0.6)", WebkitBoxShadow: "0 0 10px rgb(0 0 0 / 60%)", OBoxShadow: "0 0 10px rgba(0,0,0,0.6)"}} >
                        <ResponsiveContainer>
                                <TestLineChart />
                        </ResponsiveContainer>

                    </Paper>
                </Container>
            </ThemeProvider>

        </div>


    );
}