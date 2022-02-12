import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from "@mui/material/IconButton";
import {Badge, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import Box from "@mui/material/Box";
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
export default function BasicMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const dropDownProfile = [
        {label:"Profile Setting",icon:<SettingsIcon/>},
        {label:"Logout",icon:<LogoutIcon/>},
    ];

    return (
        <div>
            <Box>
                <IconButton
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    color='inherit'
                >
                <Badge color="secondary">
                    <SettingsIcon />
                </Badge>
            </IconButton>
            </Box>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {dropDownProfile.map((item,i)=>(
                    <MenuItem component={ListItem} onClick={handleClose}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText>{item.label}</ListItemText>
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}