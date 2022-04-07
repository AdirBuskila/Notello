import React, {useState} from 'react';
import Popper from '@mui/material/Popper';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import WhiteArrow from '../../assets/img/white-bold-arrow-down.png';

import STARRED from '../../assets/img/starred.svg';

export const StarredHeaderModal = () => {
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
        className='header-board  flex'
        onClick={handleClick('bottom-start')}>
        <span>Starred</span>
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
              <div className='header-board-typography header-dropdown'>
                <div className='workspace-modal-title drop-down-title flex'>
                  Starred boards
                  <a href='#' onClick={ev => onHandleModal(ev)}>
                    ✕
                  </a>
                </div>

                <section
                  className='starred-boards header-dropdown flex column'
                  style={{height: 'fit-content'}}>
                  <img src={STARRED} alt='starred' />
                  <h6>
                    Star important boards to access them quickly and easily.
                  </h6>
                </section>
              </div>
            </Paper>
          </Fade>
        )}
      </Popper>
    </div>
  );
};
