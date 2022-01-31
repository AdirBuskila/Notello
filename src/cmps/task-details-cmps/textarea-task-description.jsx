import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { boardService } from '../../services/board.service';
import { useDispatch, useSelector } from 'react-redux';

import { saveBoard } from '../../store/actions/board.action';

export const AddDescription = (props) => {
  const loggedInUser = useSelector((state) => state.userModule.loggedInUser);
  const [newDescriptionTxt, setNewDescription] = useState({});
  const [isAdding, onIsAdding] = useState(false);
  const { task, group, board } = props;
  const groupIdx = boardService.getGroupIdxById(board, group._id);
  const taskIdx = board.groups[groupIdx].tasks.findIndex((currTask) => {
    return currTask._id === task._id;
  });

  const dispatch = useDispatch();

  const onHandleModal = () => {
    onIsAdding(!isAdding);
  };

  const onHandleChange = ({ target }) => {
    const value = target.value;
    setNewDescription(value);
  };

  const onAdd = () => {
    const activity = boardService.addTaskActivity(
      `changed ${task.title} task description to - ${newDescriptionTxt}`,
      task._id, task.title,
      loggedInUser
    );
    try {
      if (activity) board.activities.unshift(activity);
      board.groups[groupIdx].tasks[taskIdx].description = newDescriptionTxt;
      dispatch(saveBoard(board))
    } catch (err) {
      console.log('Cannot add description to task');
    }
  };

  return (
    <React.Fragment>
      {!isAdding && (
        <button className='add-description flex' onClick={onHandleModal}>
          <p>Add a more detailed description</p>
        </button>
      )}
      {isAdding && (
        <div className='new-description flex column'>
          <textarea
            autoFocus
            onChange={onHandleChange}
            rows='4'
            placeholder={`Add a more detailed description... `}></textarea>
          <div className='new-description-actions flex align-center'>
            <Button
              onClick={onAdd}
              variant='contained'
              sx={{ textTransform: 'none', minWidth: 52.5 }}>
              Save
            </Button>
            <button onClick={onHandleModal}>✕</button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
