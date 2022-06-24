import { Graph } from "react-d3-graph";
import React from 'react';
import {useSelector,connect} from "react-redux";
import store from "../../store";
import SimpleDialog from "./Dialog";
import {blue, green, red} from "@mui/material/colors";
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
import {BottomNavigation, BottomNavigationAction, CardActions, CardContent} from "@mui/material";
import Button from "@mui/material/Button";

import RestoreIcon from '@mui/icons-material/Restore';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from "@mui/material/Grid";

import AlbumIcon from '@mui/icons-material/Album';
import NodeForm from "../Setting/NodeForm";
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import NodeChart from "./nodeChart";
function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

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
        color: "green",
        size: 820,
        highlightStrokeColor: "blue",
    },
    link: {
        highlightColor: "lightblue",
    },
};

function MakeGraph(props) {
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


    const onDoubleClickNode = function(nodeId) {
        let modData = { ...dataState };

        let selectNode = modData.nodes.filter(item => {
            return item.id === nodeId;
        });
        selectNode.forEach(item => {
            if (item.color && item.color === "red") item.color = "blue";
            else item.color = "red";
        });
        setData(modData );
    };
    const theme = createTheme();
    const data = [
        createData('00:00', 17),
        createData('06:00', 6),
        createData('09:00', 8),
        createData('12:00', 15),
        createData('15:00', 20),
        createData('18:00', 24),
        createData('21:00', 24),
        createData('24:00', undefined),
    ];
    function createData(time, amount) {
        return { time, amount };
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
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
                            <Paper variant="outlined" sx={{ my: { xs: 3, md: 3 }, p: { xs: 3, md: 1 } }}>
                                <React.Fragment>
                                    <React.Fragment>
                                        <div>
                                            <div>
                                                {/*<SimpleDialog*/}
                                                {/*    open={open}*/}
                                                {/*    onClose={handleClose}*/}
                                                {/*    selectedNode={selectedNode}*/}
                                                {/*    nodeColor={nodeColor}*/}
                                                {/*    handleClick = {props.handelClick}*/}
                                                {/*/>*/}
                                            </div>
                                            <div style={{height:'100%',width:'100%'}}>
                                                <Graph
                                                    id="graph-id" // id is mandatory
                                                    data={props.data}
                                                    config={myConfig}
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
                                                <BottomNavigationAction label="Refresh" icon={<RestoreIcon />} />
                                                <BottomNavigationAction label="Locations" icon={<LocationOnIcon />} />
                                                <BottomNavigationAction label="Errors" icon={<ErrorOutlineIcon />} />
                                            </BottomNavigation>
                                        </Box>
                                    </React.Fragment>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                            <AlbumIcon sx={{ bgcolor: blue[100], color: blue[600] }}/>
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small">Learn More</Button>
                                    </CardActions>
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
                            <Paper variant="outlined" sx={{ my: { xs: 3, md: 3 }, p: { xs: 4, md: 1 } }}>
                                <React.Fragment>
                                    <React.Fragment>
                                        <SimpleDialog
                                            open={true}
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
                        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                                <React.Fragment>
                                    <React.Fragment>
                                        <NodeForm />
                                    </React.Fragment>
                                </React.Fragment>
                            </Paper>
                            <Copyright />
                        </Container>
                    </ThemeProvider>
                </Grid>
                <Grid item xs={3}>
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
                        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                                <React.Fragment>
                                    <React.Fragment>

                                    <NodeChart/>
                                    </React.Fragment>
                                </React.Fragment>
                            </Paper>
                            <Copyright />
                        </Container>
                    </ThemeProvider>
                </Grid>
                <Grid item xs={3}>
                    <Label>xs=8</Label>
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