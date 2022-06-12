import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Profile from './Navtabs/profile';
import {Divider, List} from "@mui/material";
import {Component} from "react";
import MuiDrawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {mainListItems, secondaryListItems} from "./ListItems";

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {useDispatch, useSelector} from "react-redux";

import Chart from '../../../Components/Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import LineChart from "../../../Components/LineChart";
import './Chart.css';
import {BrowserRouter, Route, Router, Switch} from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListItemText from "@mui/material/ListItemText";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import SettingsIcon from "@mui/icons-material/Settings";
import SecurityIcon from '@mui/icons-material/Security';

import {connect} from "react-redux";
import {login} from "../../../Actions/auth";
import MatrixForm from "../../../Components/Matrix/MatrixSetting";
import MakeGraph from "../../../Components/Graph/Graph.js";
// import ProfileSetting from "./Navtabs/ProfileSetting";
import ProfileSetting from '../../../Components/ProfileSetting/ProfSetting.js'
import TestReport from '../../../Components/Reports/Testing/testReport'
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import ConfigForm from '../../../Components/Setting/NodeSetting'

import ReportStates from '../../../Components/Reports/Report'

import store from '../../../store'
import FaultTab from "./FaultTab";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);
//
const mdTheme = createTheme();
// function DashboardContent() {
//     const [open, setOpen] = React.useState(true);
//     const toggleDrawer = () => {
//         setOpen(!open);
//     };

function DashboardContent(props) {


    const [open, setOpen] = React.useState(true);
    const [menu, setMenu] = React.useState("Dashboard");

    let countError = useSelector(() => store.getState().errors.msg).length;
    let Errors = useSelector(() => store.getState().errors);

    let dateConfig = useSelector(() => store.getState().receiveData.config);
    let dataPychart = useSelector(() => store.getState().receiveData.pychart);


    let dataRoomTemp = useSelector(() => store.getState().receiveData.roomTemp);
    let chartData = []
    if(dataRoomTemp && dataRoomTemp.length!==0){
        chartData = dataRoomTemp
    }

    const dispatch = useDispatch();

    const toggleDrawer = () => {
        setOpen(!open);
    };
    let dataMiddle;
    if(menu === "Dashboard"){
        let modData = {};
        modData['nodes'] = [{ id: "1"}, { id: "2" }, { id: "3" }];
        modData['links'] =
            [
                { source: "1", target: "2" },
                { source: "2", target: "3" },
            ]
        ;

        if((Object.keys(dateConfig).length !== 0 )) {
            dateConfig = JSON.parse(dateConfig)
            modData['nodes'] = dateConfig.graph
            modData['links'] = dateConfig.links

        }

        if(Errors && Errors.id && Errors.id.length !== 0) {
            // console.log("something")
            let listErrorsID = Errors.id
            let listErrorColor = Errors.status
            // let modData = { ...dataState };
            for (let index = 0; index < listErrorsID.length; ++index) {
                let selectNode = modData.nodes.filter(item => {
                    return item.id === listErrorsID[index];
                });
                // console.log(selectNode)
                selectNode.forEach(item => {
                    // console.log(item)
                    // if(item.color){
                    // console.log(listErrorColor[index])
                    // console.log(item)
                    item.color = listErrorColor[index];
                    // }

                });
            }
            console.log(modData)
        }


        dataMiddle = <MakeGraph data={modData} />;
    }
    else if(menu === "Integrations"){
        dataMiddle = <MatrixForm />;
    }
    else if(menu === "Reports"){
        dataMiddle = <ReportStates />
    }
    else if(menu === "Graph"){
        if((Object.keys(dataPychart).length !== 0 && dataPychart)){
            console.log(dataPychart)
            dataPychart = JSON.parse(dataPychart)
            // dataPychart = dataPychart.message

            console.log("in pychart")
            console.log(dataPychart)
        }


        dataMiddle = <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12} md={8} lg={9}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240,
                        }}
                    >
                        <Chart data={chartData} />
                    </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={3}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240,
                        }}
                    >
                        <Deposits data={dataPychart}/>
                    </Paper>
                </Grid>
                {/* Recent Orders */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <div className='chart'>
                            <LineChart />
                        </div>
                        {/*<Orders />*/}
                    </Paper>

                </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
        </Container>;
    }
    else if(menu === "ProfileSetting"){
        dataMiddle = <ProfileSetting/>;
    }
    else if(menu === "Profile"){
        dataMiddle = <ProfileSetting/>;
    }
    else if(menu === "TestReport"){
        dataMiddle = <TestReport/>;
    }
    else if(menu === "Setting"){
        dataMiddle =  <ConfigForm
            formName="Sample Form Submit"
            formDescription="This is sample form using Material UI."
        />;
    }
    else{
        dataMiddle = <h1>Error loading data</h1>;
    }

    return (
            <ThemeProvider theme={mdTheme}>

                <Box sx={{ display: 'flex' }}>
                        <CssBaseline />
                        <AppBar position="absolute" open={open}>
                            <Toolbar
                                sx={{
                                    pr: '24px', // keep right padding when drawer closed
                                }}
                            >

                                <IconButton
                                    edge="start"
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={toggleDrawer}
                                    sx={{
                                        marginRight: '36px',
                                        ...(open && { display: 'none' }),
                                    }}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Typography
                                    component="h1"
                                    variant="h6"
                                    color="inherit"
                                    noWrap
                                    sx={{ flexGrow: 1 }}
                                >
                                    Dashboard
                                </Typography>
                                <Typography
                                    component="h4"
                                    variant="h6"
                                    color="inherit"
                                    noWrap

                                >
                                    Username: {localStorage.getItem('username')} {'\xa0\xa0\xa0\xa0\xa0\xa0'}
                                </Typography>
                                <Typography
                                    component="h4"
                                    variant="h6"
                                    color="inherit"
                                    noWrap

                                >
                                    Role: {localStorage.getItem('role')}
                                </Typography>
                                <IconButton color="inherit">
                                    <Profile setmenu={setMenu}/>
                                </IconButton>
                                    <FaultTab len={countError} errors={Errors}/>
                            </Toolbar>
                        </AppBar>
                        <Drawer variant="permanent" open={open}>
                            <Toolbar
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'flex-end',
                                    px: [1],
                                }}
                            >
                                <IconButton onClick={toggleDrawer}>
                                    <ChevronLeftIcon />
                                </IconButton>
                            </Toolbar>
                            <Divider />
                            <List component="nav">
                                <ListItemButton>
                                    <ListItemIcon>
                                        <DashboardIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Dashboard" onClick={() => setMenu("Dashboard")}/>
                                </ListItemButton>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <PeopleIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Graph" onClick={() => setMenu("Graph")}/>
                                </ListItemButton>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <BarChartIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Reports" onClick={() => setMenu("Reports")}/>
                                </ListItemButton>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <LayersIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Integrations" onClick={() => setMenu("Integrations")}/>
                                </ListItemButton>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <SecurityIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Security Tests" onClick={() => setMenu("TestReport")}/>
                                </ListItemButton>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <DisplaySettingsIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Node Setting" onClick={() => setMenu("Setting")}/>
                                </ListItemButton>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <SettingsIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Password" onClick={() => setMenu("ProfileSetting")}/>
                                </ListItemButton>

                                <Divider sx={{ my: 1 }} />
                                {secondaryListItems}
                            </List>
                        </Drawer>
                        <Box
                            component="main"
                            sx={{
                                backgroundColor: (theme) =>
                                    theme.palette.mode === 'light'
                                        ? theme.palette.grey[100]
                                        : theme.palette.grey[900],
                                flexGrow: 1,
                                height: '100vh',
                                overflow: 'auto',
                            }}
                        >
                            <Toolbar />

                            {dataMiddle}


                        </Box>
                    </Box>

            </ThemeProvider>

    );
}

// const mapStateToProps = (state) =>({
//     Errors: state.errors,
// });
// //
// export default connect (mapStateToProps,null)(DashboardContent);
export default DashboardContent;