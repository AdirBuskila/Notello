import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';

export const ArchiveModal = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
//   const { board, groupIdx, taskIdx, task } = props;
  const dispatch = useDispatch()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };


//   const submitChanges = (task) => {
//     board.groups[groupIdx].tasks[taskIdx] = task;
//     const action = { type: 'SET_BOARD', board };
//     dispatch(action);
//   }


  return (
    <div className='button-container flex align-center'>
        <div className='flex align-center'>
        <Inventory2OutlinedIcon onClick={handleClick} color='action' />
              <Typography onClick={handleClick}>Archive</Typography>
        </div>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}>
        <div sx={{ p: 0.5, width: '304px' }}>
          <div className='archive-task-modal flex justify-center'>
            Cover
            <a onClick={handleClose}>
              ✕
            </a>
          </div>
          <div className='archive-modal flex column'>
            <span>Size</span>
            <section className='archive-actions'>
              
            </section>
          </div>
        </div>
      </Popover>
    </div>
  );
};