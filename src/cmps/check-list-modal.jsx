import React, { useState} from 'react';
import { useDispatch } from 'react-redux';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import CheckBoxOutlined from '@mui/icons-material/CheckBoxOutlined';

import { utilService } from '../services/util.service'

export const CheckListModal = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { board, groupIdx, taskIdx, task } = props;
  const [checklistName, setChecklistName] = useState('');
  const dispatch = useDispatch()

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

  const onAddClick = async () => {
    if (!checklistName) return // add nice modal 
    const checklist = { _id: utilService.makeId(), title: checklistName, todos: [] }
    const activity = {
      _id: utilService.makeId(),
      txt: `created checklist - (${checklist.title})`,
      createdAt: Date.now(),
      byMember: 'user',
      task: {
        _id: task._id,
        title: task.title
      }
    }
    try {
      board.activities.unshift(activity);
      task.checklists.unshift(checklist);
      board.groups[groupIdx].tasks[taskIdx] = task;
      const action = { type: 'SET_BOARD', board };
      await dispatch(action);
    } catch (err) {
        console.log(`Cant add new checklist`, err);
    }
    setChecklistName('')
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
        <div sx={{ p: 0.5, width: '304px', height: '227px' }}>
          <div className='check-list-modal flex justify-center'>
            Add checklist
            <a onClick={handleClose}>
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
