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
                    <ListItemText primary={`Room temperature: ${props.details.temp}`} />
                </ListItem>

                <ListItem button onClick={() => handleListItemClick()} key={listData[1]}>
                    <ListItemAvatar>
                        <MenuList dense>
                            <MenuItem>
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: green[100], color: green[600] }}>
                                        <PowerIcon/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText inset>HVAC {props.details.hvac1}</ListItemText>
                            </MenuItem>
                        </MenuList>
                    </ListItemAvatar>



                </ListItem>
                <ListItem button onClick={() => handleListItemClick()} key="5">
                    <ListItemAvatar>
                        <Avatar sx={{ bgcolor: orange[100], color: orange[600] }}>
                            <AccountTreeIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={`Co2 sensor : ${props.details.analogSensor2}`} />
                </ListItem>

                <ListItem button onClick={() => handleListItemClick()} key="7">
                    <ListItemAvatar>
                        <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                            <WaterIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={`Humidity Sensor: ${props.details.humiditySensor}`} />
                </ListItem>

                <ListItem autoFocus button onClick={() => handleListItemClick()} key="9">
                    <ListItemAvatar>
                        <Avatar>
                            <AddIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Graph" onClick={props.handleClick}/>
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

