import React, { useState } from 'react';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
// import WhiteArrow from '../assets/img/white-bold-arrow-down.png';
import AddIcon from '@mui/icons-material/Add';
// import SendIcon from '@mui/icons-material/Send';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import AutoAwesomeMosaicOutlinedIcon from '@mui/icons-material/AutoAwesomeMosaicOutlined';

import CreateBoard from '../assets/img/create-board.svg';

// import STARRED from '../assets/img/starred.svg';

export const CreateHeaderModal = () => {
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
        sx={{ width: '10px' }}
        className='header-board add-header'
        onClick={handleClick('bottom-start')}>
        <span>Create</span>
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
                sx={{ mt: 1, width: '304px', height: '284px' }}>
                <div className='workspace-modal-create-title flex space-between'>
                  Create
                  <a href='#' onClick={(ev) => onHandleModal(ev)}>
                    ✕
                  </a>
                </div>
                <hr />
                <section
                  className='starred-boards create flex column'
                  style={{ height: 'fit-content' }}>
                  <article>
                    <div className='upper-actions'>
                      <img src={CreateBoard} alt='create-board' />
                      <h4>Create board</h4>
                    </div>
                    <p>
                      A board is made up of cards ordered on lists. Use it to
                      manage projects, track information, or organize anything.
                    </p>
                  </article>
                  <article>
                    <div className='upper-actions'>
                      <AutoAwesomeMosaicOutlinedIcon />
                      <h4>Start with a template</h4>
                    </div>
                    <p>Get started faster with a board template.</p>
                  </article>
                  <article>
                    <div className='upper-actions'>
                      <PeopleAltOutlinedIcon />
                      <h4>Create Workspace</h4>
                    </div>
                    <p>
                      A Workspace is a group of boards and people. Use it to
                      organize your company, side hustle, family or friends.
                    </p>
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
