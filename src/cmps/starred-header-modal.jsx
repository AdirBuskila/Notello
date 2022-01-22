import React, { useState, useEffect } from 'react';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import WhiteArrow from '../assets/img/white-bold-arrow-down.png'

import { boardService } from '../services/board.service';

import STARRED from '../assets/img/starred.svg'

export const StarredHeaderModal = () => {


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
            onBlur={() => {
                setOpen(false)
            }}
        >
            <Button className='header-board' onClick={handleClick('bottom-start')}>
                <span>Starred</span>
                <img src={WhiteArrow} alt="arrow" />
            </Button>
            <Popper className='popper' open={open} anchorEl={anchorEl} placement={placement} transition>
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Paper >
                            <Typography className='header-board-typography' sx={{ p: 1, mt: 1, width: '304px', height: '260px' }}>

                                <div className='workspace-modal-title flex'>
                                    Starred boards
                                    <a href='#' onClick={(ev) => onHandleModal(ev)}>
                                        ✕
                                    </a>
                                </div>
                                <hr />
                                <section className='starred-boards flex column' style={{height: 'fit-content'}}>
                                   <img src={STARRED} alt='starred' />
                                   <p>Star important boards to access them quickly and easily.</p>
                                </section>
                            </Typography>
                        </Paper>
                    </Fade>
                )}
            </Popper>
        </div>
    );
}