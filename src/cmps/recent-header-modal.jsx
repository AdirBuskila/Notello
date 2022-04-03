import React, {useState} from 'react';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import {Avatar} from '@mui/material';
import WhiteArrow from '../assets/img/white-bold-arrow-down.png';

import AVATAR2 from '../assets/img/avatar2.png';
import AVATAR3 from '../assets/img/avatar3.png';
import AVATAR4 from '../assets/img/avatar4.png';

import {boardService} from '../services/board.service';

export const RecentHeaderModal = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState();

  const handleClick = newPlacement => event => {
    setAnchorEl(event.currentTarget);
    setOpen(prev => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const onHandleModal = ev => {
    ev.preventDefault();
    setOpen(false);
  };

  return (
    <div
      onBlur={() => {
        setOpen(false);
      }}>
      <Button
        className='header-board flex'
        onClick={handleClick('bottom-start')}>
        <span>Recent</span>
        <img src={WhiteArrow} alt='arrow' />
      </Button>
      <Popper
        className='popper'
        open={open}
        anchorEl={anchorEl}
        placement={placement}
        transition>
        {({TransitionProps}) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <Typography
                className='header-board-typography'
                sx={{p: 1, mt: 1, width: '290px'}}>
                <div className='workspace-modal-title flex'>
                  Recent boards
                  <a href='#' onClick={ev => onHandleModal(ev)}>
                    ✕
                  </a>
                </div>

                <section
                  className='recent-boards flex column'
                  style={{height: 'fit-content'}}>
                  <article className='recent flex align-center'>
                    <Avatar
                      style={{height: '32px'}}
                      sx={{borderRadius: '3px'}}
                      variant='square'>
                      <img className='avatar-img' src={AVATAR2} alt='avatar2' />
                    </Avatar>
                    <div className='avatar-details flex column'>
                      <p>My Workspace</p>
                      <h5>First Workspace</h5>
                    </div>
                  </article>
                  <article className='recent flex align-center'>
                    <Avatar
                      style={{height: '32px'}}
                      sx={{borderRadius: '3px'}}
                      variant='square'>
                      <img className='avatar-img' src={AVATAR3} alt='avatar3' />
                    </Avatar>
                    <div className='recent avatar-details  flex column'>
                      <p>My Workspace</p>
                      <h5>Second Workspace</h5>
                    </div>
                  </article>
                  <article className='recent flex align-center'>
                    <Avatar
                      style={{height: '32px'}}
                      sx={{borderRadius: '3px'}}
                      variant='square'>
                      <img className='avatar-img' src={AVATAR4} alt='avatar4' />
                    </Avatar>
                    <div className='avatar-details  flex column'>
                      <p>My Workspace</p>
                      <h5>Third Workspace</h5>
                    </div>
                  </article>
                </section>
              </Typography>
            </Paper>
          </Fade>
        )}
      </Popper>
    </div>
  );
};
