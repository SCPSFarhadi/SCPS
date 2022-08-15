import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

export default function PositionedMenu() {
    return (
        <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
                <React.Fragment>
                    <Button variant="text" {...bindTrigger(popupState)}>
                        view
                    </Button>
                    <Menu {...bindMenu(popupState)}>
                        <MenuItem onClick={popupState.close}>Room 1</MenuItem>
                        <MenuItem onClick={popupState.close}>Room 2t</MenuItem>
                        <MenuItem onClick={popupState.close}>Room 3</MenuItem>
                    </Menu>
                </React.Fragment>
            )}
        </PopupState>
    );
}