import React, { useState } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';


export const CheckListActionModal = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const [checklistName, setChecklistName] = useState('');

  const handleClick = (event) => {
    // setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };

  const onHandleName = ({ target }) => {
    // const value = target.value;
    // setChecklistName(value);
  };

  const onAddClick = () => {
    // console.log(checklistName);
    // setChecklistName('')
    // props.setIsCheckListAcctivated(true);
    // handleClose()
  }

  return (
    <div className='button-container flex'>
      {/* <Typography onClick={handleClick}>Checklist</Typography> */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}>
        <Typography sx={{ p: 0.5, width: '304px', height: '121px' }}>
          <div className='check-list-modal flex justify-center'>
            Item actions
            <a href='#' onClick={handleClose}>
              ✕
            </a>
          </div>
          <div className='check-list-inner flex column'>
             <div>Convert to card</div>
             <div>Delete</div>
          </div>
        </Typography>
      </Popover>
    </div>
  );
};
