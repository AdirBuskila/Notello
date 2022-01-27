import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useHistory } from "react-router-dom";
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';

import { utilService } from '../services/util.service';

export const ArchiveModal = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { board, groupIdx, taskIdx, task } = props;
  const dispatch = useDispatch()
  const history = useHistory()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };

  const onHandleDeleteAction = () => {
    history.push(`/b/${board._id}`);
    board.groups[groupIdx].tasks.splice(taskIdx, 1);
    const activity = {
      _id: utilService.makeId(),
      txt: `deleted task - ${task.title}`,
      createdAt: Date.now(),
      byMember: 'Guest',
      task: {
        _id: task._id,
        title: task.title,
      },
    }; 
    submitChanges(board, activity);
    
  }

  const onHandleArchiveAction = () => {
    board.groups[groupIdx].tasks[taskIdx].isArchived = true;
    const activity = {
      _id: utilService.makeId(),
      txt: `archived task - ${task.title}`,
      createdAt: Date.now(),
      byMember: 'Guest',
      task: {
        _id: task._id,
        title: task.title,
      },
    }; 
    submitChanges(board, activity);
  }

  const onHandleRetrieveAction = () => {
    if ( task.isArchived !== true) return
    board.groups[groupIdx].tasks[taskIdx].isArchived = false;
    const activity = {
      _id: utilService.makeId(),
      txt: `retrieved task - ${task.title}`,
      createdAt: Date.now(),
      byMember: 'Guest',
      task: {
        _id: task._id,
        title: task.title,
      },
    }; 
    submitChanges(board, activity);
  }


  const submitChanges = async (board, activity) => {
      try {
        board.activities.unshift(activity);
          const action = {type: 'SET_BOARD', board};
          await dispatch(action);
      } catch (err) {
          console.log('Cant handle card state change', err);
      }
  }


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
            Archive
            <a onClick={handleClose}>
              ✕
            </a>
          </div>
          <div className='archive-modal flex column'>
            <span>Actions</span>
            <p>Each action below effects criticaly on the task state.
                Choose carefully.
            </p>
            <section className='archive-actions flex align-center'>
              <button onClick={onHandleArchiveAction} className='archive-action'>Archive</button>
              <button onClick={onHandleRetrieveAction} className='return-action'>
              Retrieve
              {/* <div>
              <AutorenewSharpIcon className='retrieve-action' sx={{fontSize: 'small'}} />
              </div> */}
                  </button>
              <button onClick={onHandleDeleteAction} className='delete-action'>Delete</button>
            </section>
          </div>
        </div>
      </Popover>
    </div>
  );
};