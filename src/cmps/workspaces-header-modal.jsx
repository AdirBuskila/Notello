import React, { useState, useEffect } from 'react';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import { orange, blue, red } from '@mui/material/colors';
import { Avatar } from '@mui/material';
import WhiteArrow from '../assets/img/white-bold-arrow-down.png'

import { boardService } from '../services/board.service';

export const WorkspacesHeaderModal = () => {


    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState();


    const handleClick = (newPlacement) => (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
    };

    const onHandleModal = (ev) => {
        ev.preventDefault()
        setOpen(false)
    }



    return (
        <div
         onBlur={()=> {
            setOpen(false)
        }} 
        >
            <Button className='header-board' onClick={handleClick('bottom-start')}>
                <span>Workspaces</span>
                <img src={WhiteArrow} alt="arrow" />
            </Button>
            <Popper className='popper' open={open} anchorEl={anchorEl} placement={placement} transition>
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Paper >
                            <Typography className='header-board-typography' sx={{ p: 1, mt: 1, width: '290px', height: '304px' }}>
                                
                                <div className='workspace-modal-title flex'>
                                    Workspace
                                <a href='#' onClick={(ev) => onHandleModal(ev)}>
                                    ✕
                                </a>
                                    </div>
                                <hr />
                                <h4>Current Workspace</h4>
                                <section className='flex'>
                                    <Avatar sx={{ bgcolor: red[500], borderRadius: '3px' }} variant="square">
                                        <span>NC</span>
                                    </Avatar>
                                    <p>My Workspace</p>
                                </section>
                                <hr />
                                <h4>Your Workspaces</h4>
                                <section className='flex'>
                                    <Avatar sx={{ bgcolor: blue[500], borderRadius: '3px' }} variant="square">
                                        <span>NG</span>
                                    </Avatar>
                                    <p>Notello</p>
                                </section>
                                <section className='flex'>
                                    <Avatar sx={{ bgcolor: orange[500], borderRadius: '3px' }} variant="square">
                                        <span>AB</span>
                                    </Avatar>
                                    <p>MUI</p>
                                </section>
                            </Typography>
                        </Paper>
                    </Fade>
                )}
            </Popper>
        </div>
    );
}