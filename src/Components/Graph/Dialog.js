import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import {blue, green, orange, red} from '@mui/material/colors';
import {Divider, Icon, ListItemIcon, MenuList} from "@mui/material";
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SettingsInputHdmiIcon from '@mui/icons-material/SettingsInputHdmi';
import PowerIcon from '@mui/icons-material/Power';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import MenuItem from "@mui/material/MenuItem";
import {Check} from "@material-ui/icons";
import ClearIcon from '@mui/icons-material/Clear';
import SensorsIcon from '@mui/icons-material/Sensors';
import {useSelector} from "react-redux";
import store from "../../store";
import axios from "axios";
import {baseUrl} from "../../Actions/auth";
const listData = ['20°C', '04/26 20:11',1,1];

export default function SimpleDialog(props) {
    const { onClose, selectedNode,nodeColor,open } = props;
    const faucetState = ((listData[2] === 1) ? 'open' : 'close');
    const isPersonInRoom = ((listData[2] === 1) ? 'person in' : 'no person');
    const [dry_temp, set_dry_temp] = React.useState(0);
    const [wet_temp, set_wet_temp] = React.useState(0);
    const update_temp = () => {
        axios
            .post(baseUrl+'api/users/DungleUpdate/')

            .then((res) => {
                // console.log(res.data['dry_temp'])
                // let y = JSON.parse(res.data)
                // console.log(y)
                set_dry_temp(res.data['dry_temp'])
                set_wet_temp(res.data['wet_temp'])
                setTimeout(update_temp, 1000)
            })
    }

    update_temp();
    const handleClose = () => {
        onClose();
    };
    let lastTime = useSelector(() => store.getState().receiveData.lastTime);
    let lastTemp = useSelector(() => store.getState().receiveData.lastTemp);

    const handleListItemClick = () => {
        onClose();
    };

    return (
        // <Dialog onClose={handleClose} open={open} fullWidth>
        <div>
            <Typography variant="h3" gutterBottom>
                Details
            </Typography>
            <List sx={{ pt: 0 }}>
                <ListItem button onClick={() => handleListItemClick()}>
                    <ListItemAvatar>
                        <Avatar sx={{ bgcolor: nodeColor[100], color: nodeColor[600] }}>
                            <ToggleOffIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={`Node Id:  ${props.details.nodeId}`} />
                </ListItem>

                <ListItem button onClick={() => handleListItemClick()} key={listData[0]}>
                    <ListItemAvatar>
                        <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                            <DeviceThermostatIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText id={'wet_temp'} primary={`Wet temperature: ${wet_temp} Centigrade`} />
                </ListItem>

                <ListItem button onClick={() => handleListItemClick()} key='1'>
                    <ListItemAvatar>
                        <Avatar sx={{ bgcolor: orange[100], color: orange[600] }}>
                            <AccessTimeIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText id={'dry_temp'} primary={`Dry temperature: ${dry_temp} Centigrade`} />
                </ListItem>
                <ListItem button onClick={() => handleListItemClick()} key='2'>
                    <ListItemAvatar>
                        <Avatar sx={{ bgcolor: orange[100], color: orange[600] }}>
                            <SensorsIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={`Soil humidity sensor 1: ${props.details.analogSensor1} %`} />
                </ListItem>
                <ListItem button onClick={() => handleListItemClick()} key='3'>
                    <ListItemAvatar>
                        <Avatar sx={{ bgcolor: orange[100], color: orange[600] }}>
                            <SensorsIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={`Soil humidity sensor 2: ${props.details.analogSensor2} %`} />
                </ListItem>

                <ListItem button onClick={() => handleListItemClick()} key={listData[1]}>
                    <ListItemAvatar>
                        <MenuList dense>
                            <MenuItem>
                                <ListItemAvatar>
                                    <Avatar sx={props.hvac1Color}>
                                        <PowerIcon/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText inset>Control valve 1 {props.details.hvac1.toUpperCase()}</ListItemText>
                            </MenuItem>
                            <MenuItem disabled={props.details.type===1}>
                                <ListItemAvatar >
                                    <Avatar sx={props.hvac2Color}>
                                        <PowerIcon/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText inset >Control valve 2 {props.details.hvac2.toUpperCase()}</ListItemText>
                            </MenuItem>
                            <MenuItem disabled={(props.details.parameter === '1') || (props.details.type===1)}>
                                <ListItemAvatar>
                                    <Avatar sx={props.fanair1Color}>
                                        <PowerIcon/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText inset>Control valve 3 {props.details.fanAir1.toUpperCase()}</ListItemText>

                            </MenuItem>
                            <MenuItem disabled={(props.details.parameter === '1' )|| (props.details.type===1) }>
                                <ListItemAvatar >
                                    <Avatar sx={props.fanair2Color}>
                                        <PowerIcon/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText inset >Control valve 4 {props.details.fanAir2.toUpperCase()}</ListItemText>
                            </MenuItem>

                        </MenuList>
                    </ListItemAvatar>



                </ListItem>
                {/*</ListItem>*/}

                {/*<ListItem autoFocus button onClick={() => handleListItemClick()}>*/}
                {/*    <ListItemAvatar>*/}
                {/*        <Avatar>*/}
                {/*            <AddIcon />*/}
                {/*        </Avatar>*/}
                {/*    </ListItemAvatar>*/}
                {/*    <ListItemText primary="Graph" onClick={props.handleClick}/>*/}
                {/*</ListItem>*/}
            </List>
        </div>
    );

    {/*</Dialog>*/}
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};
