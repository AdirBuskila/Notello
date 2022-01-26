import React, { useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Button from '@mui/material/Button';
import { boardService } from '../../services/board.service';
import { useDispatch } from 'react-redux';


export const AddDescription = (props) => {
  const [newDescriptionTxt, setNewDescription] = useState({});
  const [isAdding, onIsAdding] = useState(false);

  const { task, group ,board} = props

  const groupIdx = boardService.getGroupIdxById(board, group._id)
    const taskIdx = board.groups[groupIdx].tasks.findIndex((currTask)=>{
      return (currTask._id === task._id)
    })

  const dispatch = useDispatch()


  const onHandleModal = () => {
    onIsAdding(!isAdding);
  };

  const onHandleChange = ({ target }) => {
    const value = target.value;
    setNewDescription(value);
  };

  const onAdd = () => {
    console.log(board.groups[groupIdx].tasks[taskIdx]);
    board.groups[groupIdx].tasks[taskIdx].description = newDescriptionTxt
    const action = {type: 'SET_BOARD', board}
    dispatch(action)
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
            <a href='#' onClick={onHandleModal}>
              ✕
            </a>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
