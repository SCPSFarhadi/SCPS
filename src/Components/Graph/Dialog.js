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
import {Icon} from "@mui/material";
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SettingsInputHdmiIcon from '@mui/icons-material/SettingsInputHdmi';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

const listData = ['20°C', '04/26 20:11',1,1];

export default function SimpleDialog(props) {
    const { onClose, selectedNode,nodeColor,open } = props;
    const faucetState = ((listData[2] === 1) ? 'open' : 'close');
    const isPersonInRoom = ((listData[2] === 1) ? 'person in' : 'no person');
    const handleClose = () => {
        onClose();
    };

    const handleListItemClick = () => {
        onClose();
    };

    return (
        // <Dialog onClose={handleClose} open={open} fullWidth>
        <div>
            <DialogTitle>Short Details</DialogTitle>
            <List sx={{ pt: 0 }}>
                <ListItem button onClick={() => handleListItemClick()}>
                    <ListItemAvatar>
                        <Avatar sx={{ bgcolor: nodeColor[100], color: nodeColor[600] }}>
                            <ToggleOffIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={`Id: ${selectedNode.id}`} />
                </ListItem>

                <ListItem button onClick={() => handleListItemClick()} key={listData[0]}>
                    <ListItemAvatar>
                        <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                            <DeviceThermostatIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={listData[0]} />
                </ListItem>

                <ListItem button onClick={() => handleListItemClick()} key={listData[1]}>
                    <ListItemAvatar>
                        <Avatar sx={{ bgcolor: orange[100], color: orange[600] }}>
                            <AccessTimeIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={listData[1]} />
                </ListItem>

                <ListItem button onClick={() => handleListItemClick()} key={listData[1]}>
                    <ListItemAvatar>
                        <Avatar sx={{ bgcolor: red[100], color: red[600] }}>
                            <SettingsInputHdmiIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={faucetState} />
                </ListItem>

                <ListItem button onClick={() => handleListItemClick()} key={listData[1]}>
                    <ListItemAvatar>
                        <Avatar sx={{ bgcolor: blue[50], color: blue[600] }}>
                            <PersonAddAltIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={isPersonInRoom} />
                </ListItem>


                <ListItem autoFocus button onClick={() => handleListItemClick()}>
                    <ListItemAvatar>
                        <Avatar>
                            <AddIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Node Setting" onClick={props.handleClick}/>
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

