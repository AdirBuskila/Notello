import React, { useState, useEffect } from 'react';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import { boardService } from '../services/board.service';


export const CheckListModal = () => {


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
        style={{zIndex:'10'}}
            onBlur={() => {
                setOpen(false)
            }}
        >
            <Button className='header-board' onClick={handleClick('bottom-start')}>
            </Button>
            <Popper className='checklist-popper' open={open} anchorEl={anchorEl} placement={placement} transition>
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Paper >
                            <Typography className='header-board-typography' sx={{ p: 1, mt: 1, width: '304px', height: '260px' }}>
                                <div className='workspace-modal-title flex'>
                                    Add a Checklist
                                    <a href='#' onClick={(ev) => onHandleModal(ev)}>
                                        ✕
                                    </a>
                                </div>
                                <hr />
                                <section className='starred-boards flex column' style={{height: 'fit-content'}}>
                                   <h6>Star important boards to access them quickly and easily.</h6>
                                </section>
                            </Typography>
                        </Paper>
                    </Fade>
                )}
            </Popper>
        </div>
    );
}