import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CheckBoxOutlined from '@mui/icons-material/CheckBoxOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { utilService } from '../services/util.service';

export const CheckListModal = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const { board, groupIdx, taskIdx, task, isCheckListAcctivated } = props;
  const dispatch = useDispatch();
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
    if (!checklistName) return; // add nice modal
    const checklist = {
      _id: utilService.makeId(),
      title: checklistName,
      todos: [],
    };
    task.checklists.unshift(checklist);
    board.groups[groupIdx].tasks[taskIdx] = task;
    const action = { type: 'SET_BOARD', board };
    dispatch(action);
    props.setIsCheckListAcctivated(!isCheckListAcctivated);
    setChecklistName('');
    handleClose();
  };

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
        <React.Fragment>
          <div className='check-list-modal flex column align center'>
            <div className='close-button pointer' onClick={handleClose}>
              ✕
            </div>

            <div className='check-list-inner flex column align-center'>
              <p>Add checklist</p>
              <div className='check-list-title flex column '>
                <div className='flex column'>
                  <span>Title</span>
                  <input
                    onClick={(ev) => ev.stopPropagation()}
                    defaultValue='Checklist'
                    autoFocus
                    onChange={onHandleName}
                    placeholder='Checklist'
                    onFocus={(ev) => {
                      ev.currentTarget.select();
                    }}></input>
                </div>
                <div className='flex column'>
                  <span>Copy items from</span>
                  <select>
                    <option value='-1'>(none)</option>
                    <option value='0'>checklist-1</option>
                    <option value='1'>checklist-2</option>
                    <option value='2'>checklist-3</option>
                  </select>
                </div>
              </div>
              <button onClick={onAddClick}>Add</button>
            </div>
          </div>
        </React.Fragment>
      </Popover>
    </div>
  );
};
