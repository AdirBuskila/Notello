import React, { useState, useEffect } from 'react';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import { Avatar } from '@mui/material';
import WhiteArrow from '../assets/img/white-bold-arrow-down.png';

import Template1 from '../assets/img/templates/template1.jpg';
import Template2 from '../assets/img/templates/template2.png';
import Template3 from '../assets/img/templates/template3.jpg';
import Template4 from '../assets/img/templates/template4.jpg';
import Template5 from '../assets/img/templates/template5.jpg';
import Template6 from '../assets/img/templates/template6.jpg';
import Template7 from '../assets/img/templates/template7.jpg';

// import AVATAR2 from '../assets/img/avatar2.png';
// import AVATAR3 from '../assets/img/avatar3.png';
// import AVATAR4 from '../assets/img/avatar4.png';

import { boardService } from '../services/board.service';

export const TemplatesHeaderModal = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState();

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const onHandleModal = (ev) => {
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
        <span>Templates</span>
        <img src={WhiteArrow} alt='arrow' />
      </Button>
      <Popper
        className='popper'
        open={open}
        anchorEl={anchorEl}
        placement={placement}
        transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <Typography
                className='header-board-typography'
                sx={{ p: 1, mt: 1, width: '290px' }}>
                <div className='workspace-modal-title flex'>
                  Templates
                  <a href='#' onClick={(ev) => onHandleModal(ev)}>
                    ✕
                  </a>
                </div>
                <hr />
                <section
                  className='recent-boards flex column'
                  style={{ height: 'fit-content' }}>
                  <article className='recent flex align-center'>
                    <Avatar
                      style={{ height: '32px' }}
                      sx={{ borderRadius: '3px' }}
                      variant='square'>
                      <img
                        className='avatar-img'
                        src={Template1}
                        alt='template1'
                      />
                    </Avatar>
                    <div className='avatar-details flex column'>
                      <p>Template 1</p>
                    </div>
                  </article>
                  <article className='recent flex align-center'>
                    <Avatar
                      style={{ height: '32px' }}
                      sx={{ borderRadius: '3px' }}
                      variant='square'>
                      <img
                        className='avatar-img'
                        src={Template2}
                        alt='template2'
                      />
                    </Avatar>
                    <div className='recent avatar-details  flex column'>
                      <p>Template 2</p>
                    </div>
                  </article>
                  <article className='recent flex align-center'>
                    <Avatar
                      style={{ height: '32px' }}
                      sx={{ borderRadius: '3px' }}
                      variant='square'>
                      <img
                        className='avatar-img'
                        src={Template3}
                        alt='template3'
                      />
                    </Avatar>
                    <div className='avatar-details  flex column'>
                      <p>Template 3</p>
                    </div>
                  </article>
                  <article className='recent flex align-center'>
                    <Avatar
                      style={{ height: '32px' }}
                      sx={{ borderRadius: '3px' }}
                      variant='square'>
                      <img
                        className='avatar-img'
                        src={Template4}
                        alt='template3'
                      />
                    </Avatar>
                    <div className='avatar-details  flex column'>
                      <p>Template 4</p>
                    </div>
                  </article>
                  <article className='recent flex align-center'>
                    <Avatar
                      style={{ height: '32px' }}
                      sx={{ borderRadius: '3px' }}
                      variant='square'>
                      <img
                        className='avatar-img'
                        src={Template5}
                        alt='template3'
                      />
                    </Avatar>
                    <div className='avatar-details  flex column'>
                      <p>Template 5</p>
                    </div>
                  </article>
                  <article className='recent flex align-center'>
                    <Avatar
                      style={{ height: '32px' }}
                      sx={{ borderRadius: '3px' }}
                      variant='square'>
                      <img
                        className='avatar-img'
                        src={Template6}
                        alt='template3'
                      />
                    </Avatar>
                    <div className='avatar-details  flex column'>
                      <p>Template 6</p>
                    </div>
                  </article>
                  <article className='recent flex align-center'>
                    <Avatar
                      style={{ height: '32px' }}
                      sx={{ borderRadius: '3px' }}
                      variant='square'>
                      <img
                        className='avatar-img'
                        src={Template7}
                        alt='template3'
                      />
                    </Avatar>
                    <div className='avatar-details  flex column'>
                      <p>Template 7</p>
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
