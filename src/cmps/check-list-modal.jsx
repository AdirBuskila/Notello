import React, { useState, useEffect } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CheckBoxOutlined from '@mui/icons-material/CheckBoxOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';


export const CheckListModal = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const [checklistName, setChecklistName] = useState('');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };

  const onHandleName = ({ target }) => {
    const value = target.value;
    setChecklistName(value);
  };

  const onAddClick = () => {
    setChecklistName('')
    props.setIsCheckListAcctivated(true);
    handleClose()
  }

  return (
    <div className='button-container flex'>
      {/* <div className='flex align-center' onClick={handleClick}> */}
      <CheckBoxOutlined onClick={handleClick} color='action' />
      <Typography onClick={handleClick}>Checklist</Typography>
      {/* </div> */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}>
        <div sx={{ p: 0.5, width: '304px', height: '227px' }}>
          <div className='check-list-modal flex justify-center'>
            Add checklist
            <a href='#' onClick={handleClose}>
              ✕
            </a>
          </div>
          <div className='check-list-inner flex column'>
            <div className='check-list-title flex column '>
              <span>Title</span>
              <input onChange={onHandleName} placeholder='Checklist'></input>
              <span>Copy items from</span>
              <select>
                <option value='-1'>none</option>
                <option value='0'>checklist-1</option>
                <option value='1'>checklist-2</option>
                <option value='2'>checklist-3</option>
              </select>
            </div>
            <button onClick={onAddClick}>Add</button>
          </div>
        </div>
      </Popover>
    </div>
  );
};
