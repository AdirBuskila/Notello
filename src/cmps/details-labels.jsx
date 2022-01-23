import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import WhiteArrow from '../assets/img/white-bold-arrow-down.png'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';

import { boardService } from '../services/board.service';

export const LabelsModal = (props) => {

    const dispatch = useDispatch();
    const board = useSelector(
        (state) => state.boardModule.board
    );


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

    const handleColorPick = async (ev) => {
        const name = ev.target.innerText;
        const bgc = getComputedStyle(ev.target).backgroundColor
        const label = {name, bgc};
        const {groupIdx, task} = props
        const group = board.groups.find((group, idx) => {
            return idx === groupIdx 
        })
        await boardService.addLabel(label, board._id, group._id, task._id, `Label ${name} has been added`);
        props.onLoadBoard()
    }



    return (
        <div className='button-container flex' onClick={handleClick('bottom-start')}>
            <LocalOfferOutlinedIcon color='action' />
            <Typography>Labels</Typography>
            <Popper className='checklist-popper' open={open} anchorEl={anchorEl} placement={placement} transition>
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Paper >
                            <Typography className='header-board-typography' sx={{ p: 1, mt: 1, width: '304px', height: '320px' }}>

                                <div className='labels-modal-title flex'>
                                    Labels
                                    <a href='#' onClick={(ev) => onHandleModal(ev)}>
                                        ✕
                                    </a>
                                </div>
                                <hr />
                                <section className='labels-details flex column' style={{ height: 'fit-content' }}>
                                    <section className='flex align-center'>
                                        <div className='flex yellow' onClick={(ev) => handleColorPick(ev)}>
                                            <span>Important</span>
                                        </div>
                                        <ModeEditOutlinedIcon />
                                    </section>
                                    <section className='flex align-center'>
                                        <div className='flex orange' onClick={(ev) => handleColorPick(ev)}>
                                            <span>Special</span>
                                        </div>
                                        <ModeEditOutlinedIcon />
                                    </section>
                                    <section className='flex align-center'>
                                        <div className='flex red' onClick={(ev) => handleColorPick(ev)}>
                                            <span>Urgent</span>
                                        </div>
                                        <ModeEditOutlinedIcon />
                                    </section>
                                    <section className='flex align-center'>
                                        <div className='flex dark-red' onClick={(ev) => handleColorPick(ev)}>
                                            <span>Casual</span>
                                        </div>
                                        <ModeEditOutlinedIcon />
                                    </section>
                                    <section className='flex align-center'>
                                        <div className='flex purple' onClick={(ev) => handleColorPick(ev)}>
                                            <span>Work</span>
                                        </div>
                                        <ModeEditOutlinedIcon />
                                    </section>
                                    <section className='flex align-center'>
                                        <div className='flex blue' onClick={(ev) => handleColorPick(ev)}>
                                            <span>Private</span>
                                        </div>
                                        <ModeEditOutlinedIcon />
                                    </section>
                                </section>
                            </Typography>
                        </Paper>
                    </Fade>
                )}
            </Popper>
        </div>
    );
}
