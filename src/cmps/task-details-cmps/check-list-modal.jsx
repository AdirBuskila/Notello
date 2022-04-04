import React, { useState } from 'react';
import {useSelector, useDispatch } from 'react-redux';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import CheckBoxOutlined from '@mui/icons-material/CheckBoxOutlined';

import { saveBoard } from '../../store/actions/board.action';

import { utilService } from '../../services/util.service';
import { boardService } from '../../services/board.service';

export const CheckListModal = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { board, groupIdx, taskIdx, task } = props;
  const [checklistName, setChecklistName] = useState('Checklist');
  const loggedInUser = useSelector((state) => state.userModule.loggedInUser);
  const dispatch = useDispatch();

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

  const onHandleKeyDown = (ev) => {
    if(ev.keyCode === 13) {
      ev.preventDefault();
      return onAddClick();
    }
  }

  const onAddClick = () => {
    if (!checklistName) return; // add nice modal
    const checklist = {
      _id: utilService.makeId(),
      title: checklistName,
      todos: [],
    };
    const activity = boardService.addTaskActivity(`created checklist - ${checklist.title}`,task._id, task.title, loggedInUser)
    try {
      if (activity) board.activities.unshift(activity);
      task.checklists.unshift(checklist);
      board.groups[groupIdx].tasks[taskIdx] = task;
      dispatch(saveBoard(board))
    } catch (err) {
      console.log(`Cant add new checklist`, err);
    }
    setChecklistName('Checklist')
    handleClose()
  }

  return (
    <div className='button-container flex'>
      <CheckBoxOutlined onClick={handleClick} color='action' />
      <Typography onClick={handleClick}>Checklist</Typography>
      <Popover
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
                  onKeyDown={(ev) => {onHandleKeyDown(ev)}}
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
