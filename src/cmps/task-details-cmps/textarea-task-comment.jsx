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
  console.log('newComment', newComment);

  const groupIdx = boardService.getGroupIdxById(board, group._id)
  const taskIdx = board.groups[groupIdx].tasks.findIndex((currTask)=>{
    return (currTask._id === task._id)
  })


  const onHandleChange = ({ target }) => {
    const value = target.value;
    setNewComment(value);

  };
  
  const onAdd = async () => {
    console.log('hi');
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
    setNewComment('')
    // console.log('newComment', newComment);
    try{
      board.groups[groupIdx].tasks[taskIdx].comments.push(comment)
      const action = {type: 'SET_BOARD', board}
      await dispatch(action)
    } catch (err) {
      console.log('cannot add new comment', err);
    }

  };

  return (
    <React.Fragment>
        <div className='new-comment flex column'>
          <textarea
            // autoFocus
            onChange={onHandleChange}
            rows='2'
            // defaultValue={newComment}
            placeholder={`Add a more detailed comment `}>
            </textarea>
          {(newComment.length) ? <div className='new-comment-actions flex align-center'>
            <Button
            variant='contained'
            onClick={onAdd}
            >Save</Button>
          </div>: null}
        </div>
    </React.Fragment>
  );
};
