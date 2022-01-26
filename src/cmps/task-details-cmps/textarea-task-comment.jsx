import React, { useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { utilService } from '../../services/util.service';
import { boardService } from '../../services/board.service';


export const AddCommentCmp = (props) => {
  const {task, group, board,} = props
  
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState('');
  const [isAdding, onIsAdding] = useState(false);

  const groupIdx = boardService.getGroupIdxById(board, group._id)
  const taskIdx = board.groups[groupIdx].tasks.findIndex((currTask)=>{
    return (currTask._id === task._id)
  })

  const onHandleModal = () => {
    console.log(newComment);
    onIsAdding(!isAdding);
  };

  const onCloseModal = () => {
    console.log(newComment);
    if (newComment !== '') return;
    onHandleModal();
  };

  const onHandleChange = ({ target }) => {
    const value = target.value;
    setNewComment(value);
    console.log(newComment);

  };
  
  const onAdd = () => {
    const comment = {
      _id: utilService.makeId(),
      txt: newComment,
      createdAt: Date.now(),
      byMember: {
        _id: utilService.makeId(),
        fullname: 'Guest',
        imgUrl: ''
      }
    }
 
    board.groups[groupIdx].tasks[taskIdx].comments.push(comment)
    const action = {type: 'SET_BOARD', board}
    dispatch(action)
    
  };

  return (
    <React.Fragment>
      {!isAdding && (
        <textarea
          rows='2'
          placeholder='Write a comment...'
          className='add-comment flex align-center'
          onClick={onHandleModal}></textarea>
      )}
      {isAdding && (
        <div className='new-comment flex column'>
          <textarea
            autoFocus
            // onBlurCapture={onCloseModal}
            onChange={onHandleChange}
            rows='2'
            defaultValue={newComment}
            placeholder={`Add a more detailed comment `}></textarea>
          <div className='new-comment-actions flex align-center'>
            <Button
              onClick={() => {onAdd()}}
              variant='contained'
            >
              Save
            </Button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
