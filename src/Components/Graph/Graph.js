import { Graph } from "react-d3-graph";
import React, {useRef} from 'react';
import {useSelector, connect, useDispatch} from "react-redux";
import store from "../../store";
import SimpleDialog from "./Dialog";
import {blue, green, yellow, red} from "@mui/material/colors";
import actions from "redux-form/lib/actions";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Matrix from "../Matrix/matrix";
import {
    BottomNavigation,
    BottomNavigationAction,
    CardActions,
    CardContent, ListItem,
    ListItemAvatar,
    ListItemText, Menu
} from "@mui/material";
import Button from "@mui/material/Button";

import RestoreIcon from '@mui/icons-material/Restore';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from "@mui/material/Grid";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import EditIcon from '@mui/icons-material/Edit';
import AlbumIcon from '@mui/icons-material/Album';
import NodeForm from "../Setting/NodeForm";

import LineChart from "./nodeChart";
import {Label} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import axios from "axios";
import {baseUrl} from "../../Actions/auth";
import {RECEIVE_NODETEMP} from "../../Actions/types";
import LineChart2 from "./nodeChart";
import MenuItem from "@mui/material/MenuItem";
import EdithDialog from "./EditDialog";
import UploadDialog from "./UploadImage";
import html2canvas from "html2canvas";
import SaveIcon from '@mui/icons-material/Save';
import exportAsImage from "./ExportAsImage";
import Avatar from "@mui/material/Avatar";
import CircleIcon from '@mui/icons-material/Circle';
import List from "@mui/material/List";
import PositionedMenu from "./RoomSelect";

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);
// the graph configuration, just override the ones you need
const myConfig = {
    nodeHighlightBehavior: true,
    node: {
        shape:'rec',
        color: "green",
        size: 420,
        highlightStrokeColor: "blue",
    },
    link: {
        highlightColor: "lightblue",
    },
};

function MakeGraph(props) {
    let dataShortDetail = useSelector(() => store.getState().receiveData.shortDetail);
    let details = {
        "nodeId":" ",
        "time":  " ",
        "temp": " ",
        "lastOccupancy":" ",
        "lightSensor":" ",
        "humiditySensor":" ",
        "analogSensor1":" ",
        "analogSensor2":" ",
        "fanAir1":" ",
        "fanAir2":" ",
        "hvac1":" ",
        "hvac2":" ",
        "parameter":" "
    }
    if(dataShortDetail && !(Object.keys(dataShortDetail).length === 0)){
        console.log("short detail updated")
        details = dataShortDetail;
    }
    ///////// dialog state :
    const [openDialog, setOpenDialog] = React.useState(false);

    const [openDialogUpload, setOpenDialogUpload] = React.useState(false);




    const handleClickOpenDialog = () => {
        console.log("fun")
        setOpenDialog(true);
    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const handleClickOpenDialogUpload = () => {
        console.log("fun upload")
        setOpenDialogUpload(true);
    };
    const handleCloseDialogUpload = () => {
        setOpenDialogUpload(false);
    };


    let modData = props.data;
    let menus = "Nodes not loaded";
    if(modData) {
        menus = modData['nodes'].map((l,i)=>{
            let secondary = "waiting for node status...";
            if(modData.nodes[i].color)
                secondary = modData.nodes[i].color
            return (
                <ListItem key={i}>
                    <ListItemAvatar>
                        <CircleIcon  style={{ color: green[500] }} />
                    </ListItemAvatar>
                    <ListItemText primary={l.id} secondary={secondary} />
                </ListItem>
                // <MenuItem key={i} value={l.id}>{l.id}</MenuItem>

            )
        })
    }
    const dispatch = useDispatch();
    const [value, setValue] = React.useState(0);
    let count_run = 0;
    // make a dialog ready:
    const [open, setOpen] = React.useState(false);
    const [selectedNode, setSelectedNode] = React.useState("");
    const [nodeColor, setColor] = React.useState(green);
    const [dataState, setData] = React.useState(props.data);
    const handleClickOpen = (node) => {
        setSelectedNode(node);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    let dataTime = useSelector(() => store.getState().receiveData.time);
    let dataTemp = useSelector(() => store.getState().receiveData.temp);
    let times = [];
    let temps = [];
    if(dataTime && dataTemp && dataTime.length !==0 && dataTemp.length !==0){
        times = dataTime;
        temps = dataTemp;
    }
    React.useEffect(() => {
        let nodes = props.data.nodes;
        // eslint-disable-next-line array-callback-return
        nodes.map((node)=>{
            let availableNode = document.getElementById(node.id);
            if (availableNode) {
                availableNode.addEventListener('click',function (){
                    handleClickOpen(node);
                })
            }
        })
    }, [])

    const getLastData = (id) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        let token = localStorage.getItem('token_access')
        if (token) {
            config.headers['Authorization'] = `JWT ${token}`;
        }

        axios
            .post(baseUrl+'api/users/sendlastdata/' , {nodeid:id},config)
            .then((res) => {
                console.log("resieve data in graph")
                console.log(res.data)
                dispatch({
                    type: RECEIVE_NODETEMP,
                    payload: res.data,
                });
            })
            .catch((err) => {
                console.log("error in receive node temp "+err)
            });
    };

    const onClickedNode = function(nodeId) {
        console.log("in click")
        let modData = { ...dataState };

        let selectNode = modData.nodes.filter(item => {
            return item.id === nodeId;
        });
        selectNode.forEach(item => {
            item.color = "#f8c0cb";
            setSelectedNode(item.id);
            getLastData(item.id);

        });
        setData(modData)


    };
    const theme = createTheme();
    const useStyles = makeStyles({border: "solid 1px #555", backgroundColor: "#fbfbf7", boxShadow: "0 0 10px rgb(0 0 0 / 60%)",
        MozBoxShadow: "0 0 10px rgba(0,0,0,0.6)", WebkitBoxShadow: "0 0 10px rgb(0 0 0 / 60%)", OBoxShadow: "0 0 10px rgba(0,0,0,0.6)"});

    function handleRefresh() {
        console.log("hiiiiii")
        axios
            .get(baseUrl + 'api/users/graph/' )
            .then((res) => {
                console.log("get data from server")
            })
            .catch((err) => {
                console.log("error in receive data "+err)
            });
    }
    const canvasRef = useRef()
    function handleSaveButton() {
        exportAsImage(document.querySelector("#graphDiv"), "test").then(r =>console.log("done"))
        // html2canvas(document.querySelector("#graphDiv")).then(canvas => {
        //     document.body.appendChild(canvas)
        // });

    }

    // let graphSelect = document.getElementById('graph-id-graph-wrapper')
    //     if(graphSelect)
    //         graphSelect.style.backgroundImage = `url(${backGroundImage})`
    //
    // console.log("background:")
    // console.log(backGroundImage)
    return (
        <Box sx={{ flexGrow: 1 }}>
             <EdithDialog modData={props.data} handleClickOpenDialog={handleClickOpenDialog} handleCloseDialog={handleCloseDialog} openDialog={openDialog}/>
             <UploadDialog setBackground={props.setBAckGroundImage} modData={props.data} handleClickOpenDialog={handleClickOpenDialogUpload} handleCloseDialog={handleCloseDialogUpload} openDialog={openDialogUpload}/>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <AppBar
                            position="absolute"
                            color="default"
                            elevation={0}
                            sx={{
                                position: 'relative',
                                borderBottom: (t) => `1px solid ${t.palette.divider}`,
                            }}
                        >
                        </AppBar>
                        <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
                            <Paper variant="outlined" sx={{ my: { xs: 3, md: 3 }, p: { xs: 3, md: 1 } }} style={{border: "solid 1px #555", backgroundColor: "#fbfbf7", boxShadow: "0 0 10px rgb(0 0 0 / 60%)",
                                MozBoxShadow: "0 0 10px rgba(0,0,0,0.6)", WebkitBoxShadow: "0 0 10px rgb(0 0 0 / 60%)", OBoxShadow: "0 0 10px rgba(0,0,0,0.6)"}} >
                                <React.Fragment>
                                    <React.Fragment>
                                        <div>

                                            <div id='graphDiv' style={{height:'100%',width:'100%',backgroundImage:`url(${props.backGroundImage})`}}>
                                                <Graph
                                                    id="graph-id" // id is mandatory
                                                    data={props.data}
                                                    config={myConfig}
                                                    onDoubleClickNode={onClickedNode}
                                                    ref={canvasRef}
                                                    // onDoubleClickNode = {onDoubleClickNode}
                                                />
                                            </div>

                                        </div>
                                        <Box sx={{ width: 500 }}>
                                            <BottomNavigation
                                                showLabels
                                                value={value}
                                                onChange={(event, newValue) => {
                                                    setValue(newValue);
                                                }}
                                            >
                                                <BottomNavigationAction label="Refresh" icon={<RestoreIcon sx={{ color: green[600] }} />} onClick={handleRefresh} />
                                                <BottomNavigationAction label="Locations" icon={<LocationOnIcon sx={{ color: blue[600] }}/>}  onClick={handleClickOpenDialogUpload}/>
                                                <BottomNavigationAction label="Errors" icon={<ErrorOutlineIcon sx={{ color: red[600] }}/>} />
                                                <BottomNavigationAction label="Warnings" icon={<WarningAmberIcon sx={{ color: 'warning.main' }}/>} />
                                                <BottomNavigationAction label="Edit" icon={<EditIcon sx={{ color: blue[800] }}/>} onClick={handleClickOpenDialog} />
                                                <BottomNavigationAction label="Save" icon={<SaveIcon sx={{ color: yellow[800] }}/>} onClick={handleSaveButton} />
                                                <PositionedMenu/>
                                            </BottomNavigation>
                                        </Box>
                                    </React.Fragment>
                                    <React.Fragment>
                                        <div>
                                            <List>
                                                {menus}
                                            </List>

                                        </div>
                                    </React.Fragment>
                                </React.Fragment>
                            </Paper>
                        </Container>
                    </ThemeProvider>

                </Grid>
                
                <Grid item xs={4}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <AppBar
                            position="absolute"
                            color="default"
                            elevation={0}
                            sx={{
                                position: 'relative',
                                borderBottom: (t) => `1px solid ${t.palette.divider}`,
                            }}
                        >
                        </AppBar>
                        <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
                            <Paper variant="outlined" sx={{ my: { xs: 3, md: 3 }, p: { xs: 3, md: 1 } }} style={{border: "solid 1px #555", backgroundColor: "#f3eec3", boxShadow: "0 0 10px rgb(0 0 0 / 60%)",
                                MozBoxShadow: "0 0 10px rgba(0,0,0,0.6)", WebkitBoxShadow: "0 0 10px rgb(0 0 0 / 60%)", OBoxShadow: "0 0 10px rgba(0,0,0,0.6)"}}>
                                <React.Fragment>
                                    <React.Fragment>
                                        <SimpleDialog
                                            open={true}
                                            details = {details}
                                            onClose={handleClose}
                                            selectedNode={selectedNode}
                                            nodeColor={nodeColor}
                                            handleClick = {props.handelClick}
                                        />
                                    </React.Fragment>
                                </React.Fragment>
                            </Paper>
                        </Container>
                    </ThemeProvider>
                </Grid>

                <Grid item xs={8}>
                <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <AppBar
                            position="absolute"
                            color="default"
                            elevation={0}
                            sx={{
                                position: 'relative',
                                borderBottom: (t) => `1px solid ${t.palette.divider}`,
                            }}
                        >
                        </AppBar>
                        <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
                            <Paper variant="outlined" sx={{ my: { xs: 3, md: 3 }, p: { xs: 3, md: 1 } }} style={{border: "solid 1px #555", backgroundColor: "#caf0f8", boxShadow: "0 0 10px rgb(0 0 0 / 60%)",
                                MozBoxShadow: "0 0 10px rgba(0,0,0,0.6)", WebkitBoxShadow: "0 0 10px rgb(0 0 0 / 60%)", OBoxShadow: "0 0 10px rgba(0,0,0,0.6)"}}>
                                <React.Fragment>
                                    <React.Fragment>
                                        <LineChart2 times={times} temps={temps}/>
                                    </React.Fragment>
                                </React.Fragment>
                            </Paper>
                        </Container>
                    </ThemeProvider>
                </Grid>

                <Grid item xs={4}>
                <ThemeProvider theme={theme} >
                        <CssBaseline />
                        <AppBar
                            position="absolute"
                            color="default"
                            elevation={0}
                            sx={{
                                position: 'relative',
                                borderBottom: (t) => `1px solid ${t.palette.divider}`,
                            }}
                        >
                        </AppBar>
                        <Container component="main" maxWidth="lg" sx={{ mb: 4 }} >
                            <Paper variant="outlined" sx={{ my: { xs: 3, md: 3 }, p: { xs: 3, md: 1 } }} style={{border: "solid 1px #555", backgroundColor: "#f3eec3", boxShadow: "0 0 10px rgb(0 0 0 / 60%)",
                                MozBoxShadow: "0 0 10px rgba(0,0,0,0.6)", WebkitBoxShadow: "0 0 10px rgb(0 0 0 / 60%)", OBoxShadow: "0 0 10px rgba(0,0,0,0.6)"}}>
                                <div className="p-6">
                                    <NodeForm selectedNode={selectedNode}/>
                                </div>         
                            </Paper>
                        </Container>
                    </ThemeProvider>
                </Grid>
            </Grid>
        </Box>


    );
}

function mapStateToProps(state) {
    return { Errors:state.errors };
}

export default connect(mapStateToProps)(MakeGraph);

// export default MakeGraph;
