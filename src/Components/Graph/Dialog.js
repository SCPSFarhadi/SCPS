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
import {blue, green, orange, purple, red} from '@mui/material/colors';
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
import {useSelector} from "react-redux";
import store from "../../store";
import WaterIcon from '@mui/icons-material/Water';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import LightIcon from '@mui/icons-material/Light';
import AirIcon from '@mui/icons-material/Air';
import ModeIcon from "@mui/icons-material/Mode";
const listData = ['20°C', '04/26 20:11',1,1];
export default function SimpleDialog(props) {
    const { onClose, selectedNode,nodeColor,open } = props;
    const faucetState = ((listData[2] === 1) ? 'open' : 'close');
    const isPersonInRoom = ((listData[2] === 1) ? 'person in' : 'no person');
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
            <DialogTitle>Details</DialogTitle>
            <List sx={{ pt: 0 }}>
                <ListItem button onClick={() => handleListItemClick()} key="1">
                    <ListItemAvatar>
                        <Avatar sx={{ bgcolor: nodeColor[100], color: nodeColor[600] }}>
                            <ToggleOffIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={`Room id: ${props.details.nodeId}`} />
                </ListItem>

                <ListItem button onClick={() => handleListItemClick()} key="2">
                    <ListItemAvatar>
                        <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                            <DeviceThermostatIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={`Room temperature: ${props.details.temp} Centigrade`} />
                </ListItem>
                <ListItem button onClick={() => handleListItemClick()} key="3">
                    <ListItemAvatar>
                        <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                            <DeviceThermostatIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={`Set point ${props.details.setPoint} Centigrade`} />
                </ListItem>

                <ListItem button onClick={() => handleListItemClick()} key="7">
                    <ListItemAvatar>
                        <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                            <WaterIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={`Humidity Sensor: ${props.details.humiditySensor} %`} />
                </ListItem>
                <ListItem button onClick={() => handleListItemClick()} key={listData[1]}>
                    <ListItemAvatar>
                        <MenuList dense>
                            <MenuItem>
                                <ListItemAvatar>
                                    <Avatar sx={props.hvac}>
                                        <PowerIcon/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText inset>HVAC {props.details.hvac1.toUpperCase()}</ListItemText>
                            </MenuItem>
                        </MenuList>
                    </ListItemAvatar>



                </ListItem>

                <ListItem button onClick={() => handleListItemClick()} key="8">
                    <ListItemAvatar>
                        <Avatar sx={{ bgcolor: orange[100], color: orange[600] }}>
                            <ModeIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={`Working Mode: ${props.details.mode}`} />
                </ListItem>
                <ListItem button onClick={() => handleListItemClick()} key="9">
                    <ListItemAvatar>
                        <Avatar sx={{ bgcolor: purple[100], color: purple[600] }}>
                            <LightIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={`Light Sensor: ${props.details.lightSensor} lux`} />
                </ListItem>

                <ListItem button onClick={() => handleListItemClick()} key="10">
                    <ListItemAvatar>
                        <Avatar sx={{ bgcolor: red[100], color: red[600] }}>
                            <AccessTimeIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={`Last occupancy: ${props.details.lastOccupancy}`} />
                </ListItem>
            </List>
        </div>
    );

        {/*</Dialog>*/}
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

